# Escala de Pregação

Aplicação web responsiva para organizar pregadores, datas, eventos e texto para WhatsApp. A conexão Supabase é carregada automaticamente pela Vercel.

## Tutorial completo

### 1. Configurar o banco Supabase
1. Abra seu projeto Supabase e entre em **SQL Editor** → **New query**.
2. Copie todo o conteúdo de `database/escala_compartilhada.sql`, cole no editor e clique em **Run**. Isso cria a tabela e as permissões necessárias para o modo sem login.
3. Em **Project Settings** → **API** (ou **Data API / API Keys**), copie a **Project URL** e a chave pública **anon** ou **publishable**.

### 2. Publicar pelo GitHub
1. Crie um repositório no GitHub.
2. Envie todos os itens deste pacote para a raiz do repositório; mantenha `index.html`, `api/` e `database/` juntos.
3. Não envie arquivos `.env` com credenciais.

### 3. Cadastrar as chaves na Vercel
1. Na Vercel, abra seu projeto → **Settings** → **Environment Variables** → **Add**.
2. Nome: **SUPABASE_URL**. Valor: a **Project URL** copiada do Supabase, por exemplo `https://seu-projeto.supabase.co`.
3. Nome: **SUPABASE_ANON_KEY**. Valor: a chave pública **anon** ou **publishable** do Supabase. Não use `service_role`, `secret` nem a senha do banco.
4. Marque **Production** (e **Preview** caso queira ativar nos previews) e salve.
5. Vá a **Deployments** e faça **Redeploy** ou envie nova alteração ao GitHub. As variáveis passam a valer após uma nova implantação.

### 4. Conferir e compartilhar
1. Abra o endereço normal do site e entre em **Configurações**. O indicador superior deve mostrar **Compartilhado**.
2. Se mostrar **Modo local** ou **Verificar conexão**, confira nomes e valores das variáveis, confirme a execução do SQL e faça novo deploy.
3. Use **Copiar link do site** para enviar o endereço normal à equipe. As chaves não ficam no link. Teste uma alteração em outro aparelho.

## Segurança e limites

A chave `anon`/`publishable` **não é secreta**: precisa chegar ao navegador para a conexão com o Supabase. Guardá-la nas variáveis da Vercel não a torna invisível, mas evita inseri-la na interface ou escrever a chave no HTML. Nunca use `service_role`/`secret`.

O site não tem login e o SQL permite acesso público à tabela. Qualquer pessoa que obtenha a URL e a chave pública pode ler/alterar os dados; o endereço compartilhado não restringe permissões. Não salve dados pessoais ou sensíveis. Para limitar acesso à equipe, é necessário implementar login e políticas RLS apropriadas.

Sem variáveis de ambiente, o site funciona em modo local e salva apenas no navegador atual. Para testar a função localmente, use `vercel dev` com as variáveis configuradas.
