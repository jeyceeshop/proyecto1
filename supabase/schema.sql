-- Aplicar una vez desde el editor SQL de un proyecto Supabase nuevo.
begin;

create table public.profiles (
  id uuid primary key references auth.users on delete restrict,
  full_name text not null check (char_length(btrim(full_name)) between 1 and 150),
  career text,
  avatar_path text,
  role text not null default 'student' check (role in ('student', 'coordinator')),
  created_at timestamptz not null default now()
);

create table public.evidences (
  id uuid primary key,
  student_id uuid not null references public.profiles(id),
  title text not null check (char_length(btrim(title)) between 1 and 150),
  unit text not null check (unit in ('I','II','III','IV','V')),
  description text not null check (char_length(btrim(description)) between 1 and 2000),
  learning text not null check (char_length(btrim(learning)) between 1 and 2000),
  file_path text unique not null check (file_path = student_id::text || '/' || id::text),
  file_type text not null check (file_type in ('application/pdf','image/jpeg','image/png','image/webp')),
  file_name text not null check (char_length(file_name) between 1 and 255),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  rejection_reason text check (char_length(btrim(rejection_reason)) between 1 and 1000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((status = 'rejected') = (rejection_reason is not null))
);

alter table public.profiles enable row level security;
alter table public.evidences enable row level security;
revoke all on public.profiles, public.evidences from public, anon, authenticated;
grant select on public.profiles, public.evidences to authenticated;

create function public.is_evidence_coordinator() returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'coordinator');
$$;
revoke all on function public.is_evidence_coordinator() from public, anon, authenticated;
grant execute on function public.is_evidence_coordinator() to authenticated;

create policy profile_read on public.profiles for select to authenticated
using (id = (select auth.uid()) or (select public.is_evidence_coordinator()));
create policy evidence_read on public.evidences for select to authenticated
using (student_id = (select auth.uid()) or (select public.is_evidence_coordinator()));

-- La galería recibe únicamente los campos autorizados de las evidencias aprobadas.
create view public.approved_evidences with (security_barrier = true) as
select e.id, e.title, e.unit, e.description, e.learning, p.full_name,
       e.file_type, e.id::text as file_path
from public.evidences e join public.profiles p on p.id = e.student_id
where e.status = 'approved';
revoke all on public.approved_evidences from public, anon, authenticated;
grant select on public.approved_evidences to anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
('evidencias-originales','evidencias-originales',false,10485760,array['application/pdf','image/jpeg','image/png','image/webp']),
('evidencias-publicadas','evidencias-publicadas',false,10485760,array['application/pdf','image/jpeg','image/png','image/webp']);

create policy originals_insert on storage.objects for insert to authenticated
with check (
  bucket_id = 'evidencias-originales'
  and (storage.foldername(name))[1] = (select auth.uid())::text
  and cardinality(storage.foldername(name)) = 1
  and storage.filename(name) ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
  and exists (select 1 from public.profiles p where p.id = (select auth.uid()))
  and not exists (select 1 from public.evidences e where e.file_path = name)
);

create policy originals_read on storage.objects for select to authenticated
using (bucket_id = 'evidencias-originales' and (
  (storage.foldername(name))[1] = (select auth.uid())::text
  or (select public.is_evidence_coordinator())
));

create policy originals_delete on storage.objects for delete to authenticated
using (bucket_id = 'evidencias-originales'
  and (storage.foldername(name))[1] = (select auth.uid())::text
  and not exists (select 1 from public.evidences e where e.file_path = name)
);

create policy publication_insert on storage.objects for insert to authenticated
with check (bucket_id = 'evidencias-publicadas' and (select public.is_evidence_coordinator())
  and exists (select 1 from public.evidences e where e.id::text = name and e.status = 'pending')
);

create policy publication_read on storage.objects for select to anon, authenticated
using (bucket_id = 'evidencias-publicadas'
  and exists (select 1 from public.approved_evidences e where e.file_path = name)
);

create policy publication_coordinator_read on storage.objects for select to authenticated
using (bucket_id = 'evidencias-publicadas' and (select public.is_evidence_coordinator()));

-- Las copias quedan inaccesibles al retirar la publicación. La limpieza física
-- se reserva a administración para evitar carreras con otra revisión.
-- Las funciones restringen las transiciones y derivan el propietario de la sesión.
create function public.submit_evidence(
  evidence_id uuid, evidence_title text, evidence_unit text,
  evidence_description text, evidence_learning text, original_name text, mime_type text
) returns void language plpgsql security definer set search_path = ''
as $$
declare
  owner_id uuid := auth.uid();
  path text := owner_id::text || '/' || evidence_id::text;
begin
  if owner_id is null or not exists (
    select 1 from storage.objects o where o.bucket_id = 'evidencias-originales'
      and o.name = path and o.metadata->>'mimetype' = mime_type
  ) then
    raise exception 'El archivo original no está disponible.';
  end if;
  insert into public.evidences
    (id, student_id, title, unit, description, learning, file_path, file_type, file_name)
  values
    (evidence_id, owner_id, btrim(evidence_title), evidence_unit, btrim(evidence_description),
     btrim(evidence_learning), path, mime_type, original_name)
  on conflict (id) do nothing;
end;
$$;

create function public.edit_evidence(
  evidence_id uuid, evidence_title text, evidence_unit text,
  evidence_description text, evidence_learning text
) returns void language plpgsql security definer set search_path = ''
as $$
begin
  update public.evidences
  set title = btrim(evidence_title), unit = evidence_unit, description = btrim(evidence_description),
      learning = btrim(evidence_learning), status = 'pending', rejection_reason = null, updated_at = now()
  where id = evidence_id and student_id = auth.uid() and status in ('pending','rejected');
  if not found then raise exception 'La evidencia ya no está disponible para edición.'; end if;
end;
$$;

create function public.delete_pending_evidence(evidence_id uuid) returns text
language plpgsql security definer set search_path = ''
as $$
declare path text;
begin
  delete from public.evidences where id = evidence_id and student_id = auth.uid() and status = 'pending'
  returning file_path into path;
  if path is null then raise exception 'Solo puedes eliminar tus evidencias pendientes.'; end if;
  return path;
end;
$$;

create function public.review_evidence(evidence_id uuid, expected_update timestamptz, decision text, reason text)
returns void language plpgsql security definer set search_path = ''
as $$
declare evidence public.evidences%rowtype;
begin
  if not public.is_evidence_coordinator() then raise exception 'Se requiere permiso de coordinación.'; end if;
  select * into evidence from public.evidences where id = evidence_id for update;
  if not found or evidence.updated_at is distinct from expected_update then
    raise exception 'La evidencia cambió. Actualiza la lista y vuelve a revisarla.';
  end if;

  if decision = 'approved' and evidence.status = 'pending' then
    if not exists (select 1 from storage.objects o where o.bucket_id = 'evidencias-publicadas'
      and o.name = evidence.id::text and o.metadata->>'mimetype' = evidence.file_type) then
      raise exception 'La copia de publicación no está disponible.';
    end if;
  elsif decision = 'rejected' and evidence.status in ('pending','approved') then
    if coalesce(char_length(btrim(reason)), 0) not between 1 and 1000 then
      raise exception 'Escribe un motivo de 1 a 1000 caracteres.';
    end if;
  else
    raise exception 'La decisión no está disponible para este estado.';
  end if;
  update public.evidences set status = decision, updated_at = now(),
    rejection_reason = case when decision = 'rejected' then btrim(reason) end
  where id = evidence_id;
end;
$$;

revoke all on function public.submit_evidence(uuid,text,text,text,text,text,text),
  public.edit_evidence(uuid,text,text,text,text), public.delete_pending_evidence(uuid),
  public.review_evidence(uuid,timestamptz,text,text) from public, anon, authenticated;
grant execute on function public.submit_evidence(uuid,text,text,text,text,text,text),
  public.edit_evidence(uuid,text,text,text,text), public.delete_pending_evidence(uuid),
  public.review_evidence(uuid,timestamptz,text,text) to authenticated;

commit;
