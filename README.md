# Escala de Pregação

Aplicação web responsiva para organizar uma escala de pregação, eventos e pregadores. Funciona sem instalação e pode ser hospedada como site estático na Vercel, com o código versionado no GitHub.

## O que o site faz

- Cadastra e remove pregadores.
- Permite manter várias escalas independentes: a atual continua guardada enquanto você monta a próxima.
- O nome de cada escala é calculado pelas datas cadastradas, por exemplo, “1/jan à 13/fev”; o período se atualiza quando datas são adicionadas ou removidas.
- Permite escolher dias específicos em um calendário mensal e cadastrar uma escala com datas de vários meses.
- Registra cada data como pregação (pregador e tema) **ou** evento (nome do evento).
- Bloqueia o cadastro de uma data que já esteja ocupada em qualquer outra escala salva, mostrando em qual escala ela já foi usada.
- Retira da lista de disponíveis os pregadores já escalados.
- Permite reordenar/trocar atribuições por arrastar no computador e por controles no celular.
- Monta um texto editável para copiar e colar no WhatsApp usando somente a escala selecionada.
- Salva nome, identificação, cidade e mensagem de encerramento da comunidade.
- Mantém cache local no navegador e pode sincronizar a escala entre dispositivos usando Supabase.

## Antes de publicar

O site pode ser usado localmente sem conta Supabase, mas nesse modo cada navegador guarda seus próprios dados. Para compartilhar dados, crie e configure o Supabase **antes** de divulgar o endereço.

> **Atenção — acesso sem login:** a versão sem autenticação é pública. A chave `anon`/`publishable` do Supabase usada no navegador não é uma senha, e uma política aberta para a função `anon` permite que qualquer pessoa com acesso ao projeto e à chave pública leia ou edite a escala — não somente quem recebeu o link. O link compartilhado facilita a configuração, mas não restringe tecnicamente o acesso. Não guarde informações pessoais ou sensíveis. Para acesso restrito à equipe, será necessário implementar login e políticas RLS por usuário.

## 1. Criar e configurar o banco Supabase

1. Crie um projeto no Supabase e aguarde a conclusão da inicialização.
2. No projeto, abra o **SQL Editor**, crie uma consulta e execute todo o conteúdo de [`database/escala_compartilhada.sql`](database/escala_compartilhada.sql). Isso cria a tabela, o controle de acesso (RLS) e a política pública necessária para este modo sem login.
3. Copie a **Project URL** e a chave pública **anon** ou **publishable** nas configurações de API do projeto. Nunca use a chave `service_role`/secret.
4. Na Vercel, abra **Settings → Environment Variables** e adicione `SUPABASE_URL` com a Project URL e `SUPABASE_ANON_KEY` com a chave pública. A integração do site usa a rota `/api/scale`; as credenciais ficam no servidor da Vercel e não são pedidas nem guardadas pelo navegador.
5. Salve as variáveis e faça um novo deploy (ou redeploy). Abra o site e confirme que o indicador superior mostra **Compartilhado**. Use **Copiar link do site** para enviar o endereço à equipe.

O site sincroniza periodicamente e mantém uma cópia local para uso durante interrupções. Se duas pessoas editarem a mesma escala ao mesmo tempo, a última sincronização pode substituir alterações recentes da outra pessoa. As credenciais são lidas pela função da Vercel e não ficam salvas nos navegadores.

## 2. Enviar o projeto ao GitHub

1. Baixe e extraia o pacote completo. Mantenha `index.html`, `README.md` e a pasta `database` juntos, na raiz do projeto.
2. No GitHub, crie um repositório novo. Se o projeto vai ser público, lembre-se de que o site e o SQL não contêm uma chave secreta; nunca adicione chaves `service_role` nem arquivos `.env` com segredos.
3. Envie os arquivos extraídos para a raiz do repositório. Você pode usar o botão **Add file → Upload files** no GitHub ou o aplicativo GitHub Desktop.
4. Confira que `index.html` aparece na raiz do repositório, e não dentro de uma pasta adicional.

## 3. Publicar na Vercel

1. Entre na Vercel e escolha a opção para adicionar um projeto novo a partir de um repositório Git.
2. Conecte sua conta GitHub, selecione o repositório criado e importe o projeto.
3. O projeto contém uma função de API da Vercel (`api/scale.js`) além do site. Não remova a pasta `api` nem o arquivo `vercel.json`; mantenha a configuração padrão de build e a página `index.html` na raiz.
4. Inicie o deploy. Ao concluir, abra o endereço fornecido pela Vercel e teste o site.
5. Confirme que as variáveis `SUPABASE_URL` e `SUPABASE_ANON_KEY` foram adicionadas em **Settings → Environment Variables** e faça um redeploy. O site conecta automaticamente; compartilhe o endereço normal do site.

A Vercel acompanha o repositório: novos envios ao branch conectado geram novas implantações automaticamente. Se alterar o código, teste a publicação antes de compartilhar uma nova versão.

## 4. Usar mais de uma escala

1. A escala que já existia é mantida automaticamente na primeira atualização; suas datas não são apagadas.
2. No site, use o seletor **Escala em edição** para alternar entre escalas. O nome acompanha a primeira e a última data cadastradas, incluindo eventos.
3. Clique em **Montar próxima escala** para abrir uma escala vazia. Cadastre nela as novas datas; a escala anterior continuará salva e poderá ser selecionada novamente.
4. **Gerar texto para WhatsApp** considera apenas a escala atualmente selecionada. Os pregadores e os dados da comunidade permanecem compartilhados entre as escalas.
5. Use o botão discreto **Excluir escala** ao lado do seletor para apagar somente a escala selecionada. O site pede confirmação e mantém as outras escalas; se a última escala for excluída, uma escala vazia é criada automaticamente.
6. Uma escala sem datas aparece como **Nova escala**. Quando houver datas, o título passa automaticamente a mostrar o intervalo.

## 5. Teste rápido após publicar

- Cadastre um pregador e uma pregação; confira que ele sai da lista de disponíveis.
- Cadastre uma data como evento e confira que não exige pregador.
- Selecione datas em meses diferentes e gere o texto do WhatsApp; edite o texto e teste **Copiar texto**.
- Abra o endereço normal do site em outro navegador e confirme que as alterações aparecem nos dois dispositivos.
- Teste o layout em um celular e confirme se a escala permanece visível.

## Uso e privacidade

Sem Supabase, os dados ficam apenas no navegador/dispositivo atual. Com Supabase, os dados são salvos na nuvem. Como o acesso foi solicitado sem login, a política necessária ao funcionamento é permissiva; qualquer pessoa que obtenha a chave pública e a URL do projeto pode interagir com a tabela. Compartilhar o link apenas com a equipe não transforma o banco em privado.

Para remover dados compartilhados, faça isso diretamente no painel do Supabase; uma nova publicação não apaga nem restaura versões anteriores. Guarde cópias de segurança antes de mudanças importantes.
