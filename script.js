const dialog = document.querySelector(".info-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector(".dialog-description");
const toast = document.querySelector(".toast");

const messages = {
  neural: {
    title: "Neural Auth",
    text: "Una plataforma de autenticación pensada para integrar seguridad y una experiencia sencilla. El enlace del servicio se añadirá aquí cuando esté disponible."
  },
  whatsapp: {
    title: "Comunidad WhatsApp",
    text: "Aquí encontrarás ofertas, novedades y conversación con la comunidad. El enlace de invitación se añadirá cuando esté disponible."
  },
  discord: {
    title: "Comunidad Discord",
    text: "Noticias, ventas y soporte para la comunidad de MrGarabato. El enlace de invitación se añadirá cuando esté disponible."
  },
  panel: {
    title: "Panel MrGarabato",
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
    text: "Creaciones y novedades de Roblox dentro del universo MrGarabato."
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
    text: "Creaciones y proyectos de FiveM dentro del universo MrGarabato."
  }
};

function openInfo(key) {
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
let audioContext;
let masterGain;
let playing = false;

function setVolume() {
  if (masterGain && audioContext) {
    masterGain.gain.setTargetAtTime(Number(volumeControl.value) / 100 * 0.035, audioContext.currentTime, 0.08);
  }
}

async function toggleAudio() {
  if (playing) {
    await audioContext.suspend();
    playing = false;
  } else {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      showToast("El audio ambiental no está disponible en este navegador.");
      return;
    }
    if (!audioContext) {
      audioContext = new AudioContextClass();
      masterGain = audioContext.createGain();
      masterGain.gain.value = 0;
      masterGain.connect(audioContext.destination);
      [110, 164.81, 220].forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator();
        const voiceGain = audioContext.createGain();
        oscillator.type = index === 1 ? "sine" : "triangle";
        oscillator.frequency.value = frequency;
        voiceGain.gain.value = index === 1 ? 0.22 : 0.13;
        oscillator.connect(voiceGain);
        voiceGain.connect(masterGain);
        oscillator.start();
      });
      setVolume();
    }
    await audioContext.resume();
    playing = true;
  }
  audioToggle.setAttribute("aria-pressed", String(playing));
  audioToggle.setAttribute("aria-label", playing ? "Pausar ambiente" : "Reproducir ambiente");
  audioPlayer.classList.toggle("is-playing", playing);
}

audioToggle.addEventListener("click", () => {
  toggleAudio().catch(() => showToast("No se pudo iniciar el audio ambiental."));
});
volumeControl.addEventListener("input", setVolume);

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

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
  window.addEventListener("pointermove", (event) => {
    const offsetX = (event.clientX / window.innerWidth - 0.5) * 8;
    const offsetY = (event.clientY / window.innerHeight - 0.5) * 8;
    document.querySelector(".ambient--left").style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    document.querySelector(".ambient--right").style.transform = `translate(${-offsetX}px, ${-offsetY}px)`;
  }, { passive: true });
}
