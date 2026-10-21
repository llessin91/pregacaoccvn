# Guia rápido — Escala de Pregação

## Publicar

1. Baixe e extraia o projeto completo.
2. Envie o projeto completo para a raiz de um repositório GitHub. Mantenha juntos `index.html`, `vercel.json`, a pasta `api`, a pasta `database` e os guias.
3. Na Vercel, importe esse repositório e mantenha a configuração padrão do projeto, sem comando de build ou diretório de saída personalizado.
4. No Supabase, abra o SQL Editor e execute o conteúdo de `database/escala_compartilhada.sql`.
5. Na Vercel, abra **Settings → Environment Variables** e cadastre `SUPABASE_URL` (Project URL) e `SUPABASE_ANON_KEY` (chave pública anon/publishable). Salve e faça um novo deploy.
6. Confirme que o topo do site mostra **Compartilhado** e envie à equipe o endereço normal do site.

## Montar a próxima escala

No seletor **Escala em edição**, alterne entre as escalas já salvas. Use **Montar próxima escala** para começar outra sem apagar a atual. O nome muda automaticamente conforme a primeira e a última data (por exemplo, “1/jan à 13/fev”), e o botão de WhatsApp usa somente a escala selecionada. O botão discreto **Excluir escala**, ao lado do seletor, remove apenas a escala selecionada após confirmação; as outras são preservadas. Se excluir a última escala existente, uma escala vazia será criada automaticamente. A lista de pregadores e os dados da comunidade continuam compartilhados.

## Segurança importante

O projeto está configurado sem login, conforme solicitado. Isso **não** torna o banco privado: a política SQL pública permite que qualquer pessoa com a URL e a chave pública do projeto leia ou altere a tabela. O link facilita a configuração e o acesso, mas não limita as permissões. Nunca use a chave `service_role` no site ou no GitHub, e não guarde dados pessoais/sensíveis. Para restringir o acesso à equipe, será preciso implementar autenticação e políticas RLS individuais.

As credenciais ficam no servidor da Vercel, não no navegador. O projeto inclui `api/scale.js` e `vercel.json`: mantenha esses itens na raiz ao enviar ao GitHub. O guia completo está em `README.md`.
