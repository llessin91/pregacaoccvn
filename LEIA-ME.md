# Guia rápido

1. No Supabase → **SQL Editor**, execute `database/escala_compartilhada.sql`.
2. Na Vercel → projeto → **Settings → Environment Variables**, crie:
   - `SUPABASE_URL` = **Project URL** do Supabase.
   - `SUPABASE_ANON_KEY` = chave pública **anon** ou **publishable**.
3. Salve e faça **Redeploy**.
4. Abra o site: o topo deve mostrar **Compartilhado**. Envie à equipe o endereço normal do site pelo botão **Copiar link do site**.

**Nunca use `service_role` ou `secret`.** A chave pública é entregue ao navegador e não é secreta. Como não há login e o SQL permite acesso público, qualquer pessoa com URL e chave pode ler/editar a tabela. Não guarde dados pessoais ou sensíveis. Tutorial completo em `README.md`.
