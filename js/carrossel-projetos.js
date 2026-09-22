// carrossel-projetos.js
// Controla as setas do carrossel de projetos.
// Não precisa de type="module" — pode ficar como <script> normal.

(function () {
  const track = document.getElementById("projetos-track");
  const btnAnterior = document.querySelector(".projetos-seta--anterior");
  const btnProxima = document.querySelector(".projetos-seta--proxima");

  if (!track || !btnAnterior || !btnProxima) return;

  function larguraDeUmCard() {
    const primeiroCard = track.querySelector(".proj-card");
    if (!primeiroCard) return track.clientWidth;
    const estilo = getComputedStyle(track);
    const gap = parseFloat(estilo.columnGap || estilo.gap || "0");
    return primeiroCard.getBoundingClientRect().width + gap;
  }

  btnAnterior.addEventListener("click", () => {
    track.scrollBy({ left: -larguraDeUmCard(), behavior: "smooth" });
  });

  btnProxima.addEventListener("click", () => {
    track.scrollBy({ left: larguraDeUmCard(), behavior: "smooth" });
  });
})();
