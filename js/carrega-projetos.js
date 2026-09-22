// carrega-projetos.js
// Busca os projetos no Firestore e monta os cards dentro da <section id="projetos">.
// Inclua este arquivo junto com firebase-init.js na mesma pasta da sua index.html.

import { db } from "./firebase-init.js";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const grade = document.getElementById("projetos-track");

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

function montarCard(p) {
  const conteudoInterno = `
    <img class="proj-card__imagem" src="${escapeHtml(p.imagemUrl)}" alt="" loading="lazy" />
    <div class="proj-card__corpo">
      <h3 class="proj-card__titulo">${escapeHtml(p.titulo)}</h3>
      <p class="proj-card__descricao">${escapeHtml(p.descricao)}</p>
    </div>
  `;

  if (p.linkUrl) {
    const a = document.createElement("a");
    a.className = "proj-card";
    a.href = p.linkUrl;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.innerHTML = conteudoInterno;
    return a;
  }

  const div = document.createElement("div");
  div.className = "proj-card";
  div.innerHTML = conteudoInterno;
  return div;
}

const q = query(collection(db, "projetos"), orderBy("criadoEm", "desc"));

onSnapshot(
  q,
  (snapshot) => {
    if (snapshot.empty) {
      grade.innerHTML = '<p class="proj-vazio">Novos projetos em breve.</p>';
      return;
    }
    grade.innerHTML = "";
    snapshot.docs.forEach((d) => {
      grade.appendChild(montarCard(d.data()));
    });
  },
  () => {
    grade.innerHTML = '<p class="proj-vazio">Não foi possível carregar os projetos agora.</p>';
  }
);
