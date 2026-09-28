// carrega-galeria.js
// Busca as fotos da galeria no Firestore e monta os itens dentro de #galeria-grid.
// Inclua junto com firebase-init.js na mesma pasta da sua index.html.

import { db } from "./firebase-init.js";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const grade = document.getElementById("galeria-grid");
const lightbox = document.getElementById("galeria-lightbox");
const lightboxImg = lightbox ? lightbox.querySelector("img") : null;
const lightboxLegenda = lightbox ? lightbox.querySelector("p") : null;

if (lightbox) {
  lightbox.addEventListener("click", () => lightbox.close());
}

function abrirFoto(foto) {
  if (!lightbox) return;
  lightboxImg.src = foto.url;
  lightboxImg.alt = foto.legenda || "";
  lightboxLegenda.textContent = foto.legenda || "";
  lightbox.showModal();
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

const q = query(collection(db, "galeria"), orderBy("criadoEm", "desc"));

onSnapshot(
  q,
  (snapshot) => {
    if (snapshot.empty) {
      grade.innerHTML = '<p class="galeria-vazia">Novas fotos em breve.</p>';
      return;
    }
    grade.innerHTML = "";
    snapshot.docs.forEach((d) => {
      const foto = d.data();
      const botao = document.createElement("button");
      botao.type = "button";
      botao.className = "galeria-item";
      botao.innerHTML = `<img src="${escapeHtml(foto.url)}" alt="${escapeHtml(foto.legenda || "")}" loading="lazy" />`;
      botao.addEventListener("click", () => abrirFoto(foto));
      grade.appendChild(botao);
    });
  },
  () => {
    grade.innerHTML = '<p class="galeria-vazia">Não foi possível carregar a galeria agora.</p>';
  }
);
