// Subtle Matrix rain background. Respects reduced-motion preferences.
const canvas = document.getElementById("matrix-rain");
const ctx = canvas.getContext("2d");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let width = 0, height = 0, drops = [];
const fontSize = 14;
const glyphs = "01アイウエオカキクケコサシスセソタチツテト";

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  const columns = Math.ceil(width / fontSize);
  drops = Array.from({ length: columns }, () => Math.random() * (height / fontSize));
}
function drawRain() {
  ctx.fillStyle = "rgba(8, 13, 11, 0.10)";
  ctx.fillRect(0, 0, width, height);
  ctx.font = `${fontSize}px monospace`;
  for (let i = 0; i < drops.length; i++) {
    const char = glyphs[Math.floor(Math.random() * glyphs.length)];
    ctx.fillStyle = Math.random() > 0.975 ? "#b7ffd0" : "#35a968";
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
    drops[i] += 0.45;
  }
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
if (!reducedMotion) setInterval(drawRain, 65);

const toggle = document.getElementById("menu-toggle");
const navigation = document.getElementById("navigation");
toggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});
navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});
document.getElementById("year").textContent = new Date().getFullYear();
