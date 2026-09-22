# Painel de administração de projetos

## Arquivos
- `firebase-init.js` — conecta seu site ao Firebase (edite com suas chaves).
- `admin.html` — painel de login + adicionar/editar/remover projetos.
- `carrega-projetos.js` — busca os projetos e monta os cards na sua index.html.
- `section-para-index.html` — trecho pronto para colar na sua index.html.
- `firestore.rules` — regras de segurança do banco de dados.

## Passo a passo

1. **Criar o projeto Firebase**
   - Acesse https://console.firebase.google.com e crie um projeto (grátis).
   - No menu lateral, ative **Firestore Database** (modo produção, qualquer região).
   - Ative **Authentication** → aba "Sign-in method" → habilite **E-mail/senha**.
   - Em "Configurações do projeto" → "Seus apps" → clique no ícone `</>` para
     criar um app Web. Copie o objeto `firebaseConfig` gerado.

2. **Configurar `firebase-init.js`**
   - Cole os valores copiados no lugar dos `SEU_..._AQUI`.

3. **Criar o usuário admin**
   - Em Authentication → "Users" → "Add user", crie o e-mail e senha que você
     vai usar para entrar no `admin.html`. (Não existe formulário de cadastro
     público de propósito — só você acessa o painel.)

4. **Aplicar as regras de segurança**
   - Em Firestore Database → "Regras", cole o conteúdo de `firestore.rules`
     e publique.

5. **Colocar os arquivos no seu site**
   - Copie `firebase-init.js`, `carrega-projetos.js` e `admin.html` para a
     mesma pasta da sua `index.html`.
   - Abra `section-para-index.html` e siga as instruções no topo dele para
     colar a `<section>`, o `<style>` e os `<script>` na sua `index.html`.

6. **Hospedar**
   - Como os arquivos usam `type="module"`, eles precisam ser servidos por
     um servidor HTTP (não funciona abrindo o arquivo direto com duplo clique).
     Isso já acontece normalmente em qualquer hospedagem real (GitHub Pages,
     Netlify, Vercel, etc.) — só não funciona com `file://` local.

7. **Testar**
   - Acesse `seusite.com/admin.html`, faça login e adicione um projeto de teste.
   - Ele deve aparecer automaticamente na `index.html`.

## Como funciona
Os projetos ficam guardados na coleção `projetos` do Firestore. Qualquer
pessoa pode *ler* esses dados (por isso os cards aparecem pra todo mundo),
mas só quem estiver logado no `admin.html` pode criar, editar ou apagar —
isso é garantido pelas regras em `firestore.rules`.
