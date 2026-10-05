// carrega-lista-projetos.js
// Busca os projetos no Firestore e monta uma linha por projeto na página
// projetos.html: imagem à esquerda, texto à direita (empilha no celular).

import { db } from "./firebase-init.js";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const lista = document.getElementById("projetos-lista");

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

function montarLinha(p) {
  const linha = document.createElement("div");
  linha.className = "projeto-linha";
  linha.innerHTML = `
    <div class="projeto-imagem">
      <img src="${escapeHtml(p.imagemUrl)}" alt="${escapeHtml(p.titulo)}" loading="lazy" />
    </div>
    <div class="projeto-texto">
      <h2>${escapeHtml(p.titulo)}</h2>
      <p>${escapeHtml(p.descricao)}</p>
      ${p.linkUrl ? `<a class="projeto-link" href="${escapeHtml(p.linkUrl)}" target="_blank" rel="noopener noreferrer">Ver projeto</a>` : ""}
    </div>
  `;
  return linha;
}

const q = query(collection(db, "projetos"), orderBy("criadoEm", "desc"));

onSnapshot(
  q,
  (snapshot) => {
    if (snapshot.empty) {
      lista.innerHTML = '<p class="projetos-vazio">Nenhum projeto publicado ainda.</p>';
      return;
    }
    lista.innerHTML = "";
    snapshot.docs.forEach((d) => {
      lista.appendChild(montarLinha(d.data()));
    });
  },
  () => {
    lista.innerHTML = '<p class="projetos-vazio">Não foi possível carregar os projetos agora.</p>';
  }
);
