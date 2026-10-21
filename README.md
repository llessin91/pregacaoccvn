# Escala de Pregação

Aplicação web responsiva para organizar uma escala de pregação, eventos e pregadores. Funciona sem instalação e pode ser hospedada como site estático na Vercel, com o código versionado no GitHub.

## O que o site faz

- Cadastra e remove pregadores.
- Permite escolher dias específicos em um calendário mensal e cadastrar escalas com datas de vários meses.
- Registra cada data como pregação (pregador e tema) **ou** evento (nome do evento).
- Retira da lista de disponíveis os pregadores já escalados.
- Permite reordenar/trocar atribuições por arrastar no computador e por controles no celular.
- Monta um texto editável para copiar e colar no WhatsApp, com intervalo baseado nas datas da escala.
- Salva nome, identificação, cidade e mensagem de encerramento da comunidade.
- Mantém cache local no navegador e pode sincronizar a escala entre dispositivos usando Supabase.

## Antes de publicar

O site pode ser usado localmente sem conta Supabase, mas nesse modo cada navegador guarda seus próprios dados. Para compartilhar dados, crie e configure o Supabase **antes** de divulgar o endereço.

> **Atenção — acesso sem login:** a versão sem autenticação é pública. A chave `anon`/`publishable` do Supabase usada no navegador não é uma senha, e uma política aberta para a função `anon` permite que qualquer pessoa com acesso ao projeto e à chave pública leia ou edite a escala — não somente quem recebeu o link. O link compartilhado facilita a configuração, mas não restringe tecnicamente o acesso. Não guarde informações pessoais ou sensíveis. Para acesso restrito à equipe, será necessário implementar login e políticas RLS por usuário.

## 1. Criar e configurar o banco Supabase

1. Crie um projeto no Supabase e aguarde a conclusão da inicialização.
2. No projeto, abra o **SQL Editor**, crie uma consulta e execute todo o conteúdo de [`database/escala_compartilhada.sql`](database/escala_compartilhada.sql). Isso cria a tabela, o controle de acesso (RLS) e a política pública necessária para este modo sem login.
3. No painel do Supabase, localize a **Project URL** e a chave pública **anon** ou **publishable** nas configurações de API do projeto. Use somente a chave pública. **Nunca** cole a chave `service_role`/secret no navegador ou no GitHub.
4. Depois de publicar o site (ou ao testá-lo localmente), abra **Configurações → Compartilhamento online** e informe a Project URL e a chave pública. Selecione **Salvar e conectar** e confira o indicador no topo.
5. Se a conexão ocorreu, use **Copiar link compartilhado** e envie o link para a equipe. Ao abrir o link, cada navegador armazena a configuração para futuras visitas. Faça um teste em outro navegador antes de depender do sistema.

O site sincroniza periodicamente e mantém uma cópia local para uso durante interrupções. Se duas pessoas editarem a mesma escala ao mesmo tempo, a última sincronização pode substituir alterações recentes da outra pessoa. O botão de desconexão remove a configuração apenas do navegador atual; ele não apaga os dados do Supabase.

## 2. Enviar o projeto ao GitHub

1. Baixe e extraia o pacote completo. Mantenha `index.html`, `README.md` e a pasta `database` juntos, na raiz do projeto.
2. No GitHub, crie um repositório novo. Se o projeto vai ser público, lembre-se de que o site e o SQL não contêm uma chave secreta; nunca adicione chaves `service_role` nem arquivos `.env` com segredos.
3. Envie os arquivos extraídos para a raiz do repositório. Você pode usar o botão **Add file → Upload files** no GitHub ou o aplicativo GitHub Desktop.
4. Confira que `index.html` aparece na raiz do repositório, e não dentro de uma pasta adicional.

## 3. Publicar na Vercel

1. Entre na Vercel e escolha a opção para adicionar um projeto novo a partir de um repositório Git.
2. Conecte sua conta GitHub, selecione o repositório criado e importe o projeto.
3. Como o site é estático e não precisa de compilação, deixe o comando de build e a pasta de saída sem configuração personalizada. A página inicial é `index.html` na raiz.
4. Inicie o deploy. Ao concluir, abra o endereço fornecido pela Vercel e teste o site.
5. Configure a conexão Supabase dentro de **Configurações → Compartilhamento online** e compartilhe o link gerado.

A Vercel acompanha o repositório: novos envios ao branch conectado geram novas implantações automaticamente. Se alterar o código, teste a publicação antes de compartilhar uma nova versão.

## 4. Teste rápido após publicar

- Cadastre um pregador e uma pregação; confira que ele sai da lista de disponíveis.
- Cadastre uma data como evento e confira que não exige pregador.
- Selecione datas em meses diferentes e gere o texto do WhatsApp; edite o texto e teste **Copiar texto**.
- Abra o link compartilhado em outro navegador e confirme que as alterações aparecem nos dois dispositivos.
- Teste o layout em um celular e confirme se a escala permanece visível.

## Uso e privacidade

Sem Supabase, os dados ficam apenas no navegador/dispositivo atual. Com Supabase, os dados são salvos na nuvem. Como o acesso foi solicitado sem login, a política necessária ao funcionamento é permissiva; qualquer pessoa que obtenha a chave pública e a URL do projeto pode interagir com a tabela. Compartilhar o link apenas com a equipe não transforma o banco em privado.

Para remover dados compartilhados, faça isso diretamente no painel do Supabase. Desconectar no site não apaga a tabela nem restaura versões anteriores. Guarde cópias de segurança antes de mudanças importantes.
