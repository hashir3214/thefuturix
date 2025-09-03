// 3D Card Hover Effect
document.querySelectorAll('.card-3d').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `rotateY(${x / 18}deg) rotateX(${-y / 18}deg) scale(1.04)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Promo Slider
const slides = document.querySelectorAll('.promo-slide');
let currentSlide = 0;
let promoInterval;
function showSlide(idx) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === idx);
  });
}
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}
function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}
document.querySelector('.promo-prev').onclick = prevSlide;
document.querySelector('.promo-next').onclick = nextSlide;
function startPromoInterval() {
  promoInterval = setInterval(nextSlide, 7000);
}
function stopPromoInterval() {
  clearInterval(promoInterval);
}
document.getElementById('promoSlider').addEventListener('mouseenter', stopPromoInterval);
document.getElementById('promoSlider').addEventListener('mouseleave', startPromoInterval);
startPromoInterval();

// Swipe support for promo slider (mobile)
let touchStartX = null;
document.getElementById('promoSlider').addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});
document.getElementById('promoSlider').addEventListener('touchend', e => {
  if (touchStartX === null) return;
  let dx = e.changedTouches[0].screenX - touchStartX;
  if (dx > 40) prevSlide();
  else if (dx < -40) nextSlide();
  touchStartX = null;
});

// Fade-in on Scroll
function revealSections() {
  document.querySelectorAll('.section-fadein').forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      sec.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealSections);
window.addEventListener('DOMContentLoaded', revealSections);

// Always-visible Access Button scroll
document.querySelectorAll('.access-btn').forEach(btn => {
  btn.onclick = e => {
    e.preventDefault();
    document.getElementById('store').scrollIntoView({ behavior: 'smooth' });
  };
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const hero = document.getElementById('hero');
  if (!hero) return;
  let scrollY = window.scrollY;
  hero.style.backgroundPositionY = `${scrollY * 0.3}px`;
});

// Floating particles for hero section
const canvas = document.getElementById('particles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  for (let i = 0; i < 36; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 1,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.2
    });
  }
  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(255,215,0,0.8)';
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    }
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}