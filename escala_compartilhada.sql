-- Escala de Pregação: banco simples para colaboração sem login.
-- ATENÇÃO: políticas públicas permitem leitura e escrita por qualquer pessoa
-- com a URL e a chave pública do projeto. Para acesso restrito, implemente login
-- e políticas RLS por usuário antes de usar dados confidenciais.

create table if not exists public.escala_compartilhada (
  id integer primary key check (id = 1),
  state jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.escala_compartilhada enable row level security;

grant select, insert, update on public.escala_compartilhada to anon;

drop policy if exists "Acesso público à escala" on public.escala_compartilhada;
create policy "Acesso público à escala"
on public.escala_compartilhada
for all
to anon
using (true)
with check (true);
