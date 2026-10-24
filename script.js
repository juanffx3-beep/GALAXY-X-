const dialog = document.querySelector(".info-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector(".dialog-description");
const catalog = document.querySelector(".catalog");
const termsList = document.querySelector(".terms-list");
const toast = document.querySelector(".toast");

const messages = {
  discord: {
    title: "Comunidad Discord",
    text: "Noticias, ventas y soporte para la comunidad de GALAXY X."
  },
  panel: {
    title: "Panel GALAXY X",
    text: "El panel de gestión estará disponible próximamente."
  },
  freefire: {
    title: "Free Fire",
    text: "Un espacio para novedades, proyectos y contenido relacionado con Free Fire."
  },
  left4dead: {
    title: "Left 4 Dead 2",
    text: "Proyectos y contenido de la comunidad de Left 4 Dead 2."
  },
  roblox: {
    title: "Roblox",
    text: "Creaciones y novedades de Roblox dentro del universo GALAXY X."
  },
  bloodstrike: {
    title: "Blood Strike",
    text: "Novedades y contenido relacionado con Blood Strike."
  },
  dota: {
    title: "Dota 2",
    text: "Proyectos y contenido de la comunidad de Dota 2."
  },
  fivem: {
    title: "FiveM",
    text: "Creaciones y proyectos de FiveM dentro del universo GALAXY X."
  }
};

function openInfo(key) {
  catalog.hidden = key !== "products";
  termsList.hidden = key !== "terms";
  dialogDescription.hidden = key === "products" || key === "terms";
  dialog.classList.toggle("info-dialog--catalog", key === "products");
  document.querySelector(".dialog-action").textContent = key === "products" ? "Cerrar catálogo" : "Entendido";

  if (key === "products") {
    dialogTitle.textContent = "Nuestros productos";
    selectProduct(0);
    dialog.showModal();
    return;
  }
  if (key === "terms") {
    dialogTitle.textContent = "Copyright y términos";
    dialog.showModal();
    return;
  }

  const content = messages[key];
  if (!content) return;
  dialogTitle.textContent = content.title;
  dialogDescription.textContent = content.text;
  dialog.showModal();
}

document.querySelectorAll("[data-dialog]").forEach((button) => {
  button.addEventListener("click", () => openInfo(button.dataset.dialog));
});

document.querySelectorAll("[data-game]").forEach((button) => {
  button.addEventListener("click", () => openInfo(button.dataset.game));
});

document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
document.querySelector(".dialog-action").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

const productCards = [...document.querySelectorAll("[data-product-choice]")];
const productPosition = document.querySelector(".catalog-position");
let selectedProduct = 0;

function selectProduct(index) {
  selectedProduct = (index + productCards.length) % productCards.length;
  productCards.forEach((card, cardIndex) => {
    const selected = cardIndex === selectedProduct;
    card.classList.toggle("is-selected", selected);
    card.setAttribute("aria-pressed", String(selected));
  });
  productPosition.textContent = `${selectedProduct + 1} / ${productCards.length}`;
}

productCards.forEach((card, index) => {
  card.addEventListener("click", () => selectProduct(index));
});
document.querySelectorAll("[data-product-step]").forEach((button) => {
  button.addEventListener("click", () => selectProduct(selectedProduct + Number(button.dataset.productStep)));
});

const year = document.querySelector("#year");
year.textContent = String(new Date().getFullYear());

const visitorNumber = document.querySelector(".visitor-number");
const visitsKey = "mrg-visits";
try {
  const visits = Number.parseInt(sessionStorage.getItem(visitsKey) || "0", 10) + 1;
  sessionStorage.setItem(visitsKey, String(visits));
  visitorNumber.textContent = String(visits);
} catch (error) {
  visitorNumber.textContent = "1";
}

const audioPlayer = document.querySelector(".audio-player");
const audioToggle = document.querySelector(".audio-toggle");
const volumeControl = document.querySelector(".volume-control");
const music = document.querySelector(".site-audio");

function setVolume() {
  music.volume = Number(volumeControl.value) / 100;
}

function updateAudioState() {
  const playing = !music.paused;
  audioToggle.setAttribute("aria-pressed", String(playing));
  audioToggle.setAttribute("aria-label", playing ? "Pausar música de GALAXY X" : "Reproducir música de GALAXY X");
  audioToggle.title = playing ? "Pausar música" : "Reproducir música";
  audioPlayer.classList.toggle("is-playing", playing);
}

async function startMusic() {
  try {
    await music.play();
  } catch (error) {
    if (error.name !== "NotAllowedError" && error.name !== "AbortError") {
      showToast("No se pudo cargar la música de GALAXY X.");
    }
  }
}

music.volume = 0.5;
setVolume();
music.addEventListener("play", updateAudioState);
music.addEventListener("pause", updateAudioState);
audioToggle.addEventListener("click", () => {
  if (music.paused) {
    startMusic();
  } else {
    music.pause();
  }
});
volumeControl.addEventListener("input", setVolume);

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

const bootScreen = document.querySelector(".boot-screen");
window.setTimeout(() => {
  bootScreen.classList.add("is-hidden");
  window.setTimeout(() => bootScreen.remove(), 300);
  startMusic();
}, 1000);

const canvas = document.querySelector(".stars");
const context = canvas.getContext("2d");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let stars = [];
let animationFrame = 0;

function createStars() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = Math.round(width * pixelRatio);
  canvas.height = Math.round(height * pixelRatio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  const count = Math.min(150, Math.round(width * height / 8200));
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.15 + 0.25,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.8 + 0.2
  }));
}

function drawStars(time = 0) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  context.clearRect(0, 0, width, height);
  for (let index = 0; index < stars.length; index += 1) {
    for (let neighbor = index + 1; neighbor < stars.length; neighbor += 1) {
      const deltaX = stars[index].x - stars[neighbor].x;
      const deltaY = stars[index].y - stars[neighbor].y;
      const distance = Math.hypot(deltaX, deltaY);
      if (distance < 105) {
        context.beginPath();
        context.moveTo(stars[index].x, stars[index].y);
        context.lineTo(stars[neighbor].x, stars[neighbor].y);
        context.strokeStyle = `rgba(147, 91, 221, ${(1 - distance / 105) * 0.15})`;
        context.stroke();
      }
    }
  }
  stars.forEach((star) => {
    const twinkle = reducedMotion ? 0.6 : 0.27 + (Math.sin(time * 0.0007 * star.speed + star.phase) + 1) * 0.34;
    context.beginPath();
    context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    context.fillStyle = `rgba(190, 130, 255, ${twinkle})`;
    context.fill();
  });
  if (!reducedMotion) animationFrame = window.requestAnimationFrame(drawStars);
}

createStars();
drawStars();
window.addEventListener("resize", () => {
  window.cancelAnimationFrame(animationFrame);
  createStars();
  drawStars();
}, { passive: true });

if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
  const trailCanvas = document.querySelector(".cursor-trail");
  const trailContext = trailCanvas.getContext("2d");
  const particles = [];
  let previousPointer = null;
  let trailFrame = 0;
  let previousFrameTime = 0;

  function resizeTrail() {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    trailCanvas.width = Math.round(window.innerWidth * pixelRatio);
    trailCanvas.height = Math.round(window.innerHeight * pixelRatio);
    trailContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  }

  function drawTrail(time) {
    const delta = previousFrameTime ? Math.min((time - previousFrameTime) / 16.67, 2) : 1;
    previousFrameTime = time;
    trailContext.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let index = particles.length - 1; index >= 0; index -= 1) {
      const particle = particles[index];
      particle.life -= delta;
      particle.x += particle.velocityX * delta;
      particle.y += particle.velocityY * delta;
      if (particle.life <= 0) {
        particles.splice(index, 1);
        continue;
      }
      trailContext.beginPath();
      trailContext.arc(particle.x, particle.y, particle.radius * particle.life, 0, Math.PI * 2);
      trailContext.fillStyle = `rgba(221, 137, 255, ${particle.life * 0.42})`;
      trailContext.fill();
    }

    if (particles.length) {
      trailFrame = window.requestAnimationFrame(drawTrail);
    } else {
      trailFrame = 0;
      previousFrameTime = 0;
    }
  }

  resizeTrail();
  window.addEventListener("resize", resizeTrail, { passive: true });
  window.addEventListener("pointermove", (event) => {
    if (previousPointer) {
      const deltaX = event.clientX - previousPointer.x;
      const deltaY = event.clientY - previousPointer.y;
      const distance = Math.hypot(deltaX, deltaY);
      const count = Math.min(3, Math.floor(distance / 9));
      for (let index = 0; index < count; index += 1) {
        const progress = (index + 1) / count;
        particles.push({
          x: previousPointer.x + deltaX * progress,
          y: previousPointer.y + deltaY * progress,
          radius: Math.random() * 1.7 + 1,
          life: 1,
          velocityX: (Math.random() - 0.5) * 0.3,
          velocityY: -Math.random() * 0.42
        });
      }
      if (particles.length > 28) particles.splice(0, particles.length - 28);
      if (particles.length && !trailFrame) trailFrame = window.requestAnimationFrame(drawTrail);
    }
    previousPointer = { x: event.clientX, y: event.clientY };
  }, { passive: true });
}
