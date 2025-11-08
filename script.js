// ===== MENU HAMBURGUESA =====
const toggleBtn = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

toggleBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // Evita que el clic se propague al documento
  const isOpen = toggleBtn.classList.toggle('open');
  navLinks.classList.toggle('open');
  toggleBtn.setAttribute('aria-expanded', isOpen);
});

// Cierra el menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggleBtn.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', false);
  });
});

// Cierra el menú si se hace clic fuera
document.addEventListener('click', (e) => {
  if (
    navLinks.classList.contains('open') &&
    !navLinks.contains(e.target) &&
    !toggleBtn.contains(e.target)
  ) {
    navLinks.classList.remove('open');
    toggleBtn.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', false);
  }
});


// ===== SMOOTH SCROLL DESDE BOTÓN HERO =====
const scrollBtn = document.getElementById("scroll-to-disponibles");
if (scrollBtn) {
  scrollBtn.addEventListener("click", () => {
    const target = document.getElementById("disponibles");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}


// ===== FADE-IN HEADER =====
const fadeElements = document.querySelectorAll(".fade-in");
fadeElements.forEach((el) => (el.style.opacity = 0));

const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((ent) => {
      if (ent.isIntersecting) {
        ent.target.style.animation = ent.target.classList.contains("fade-in")
          ? "fadeUp .8s ease forwards"
          : "";
        heroObserver.unobserve(ent.target);
      }
    });
  },
  { threshold: 0.2 }
);

fadeElements.forEach((el) => heroObserver.observe(el));


// ===== FAQ ACCORDION (si existe en la página) =====
const faqBtns = document.querySelectorAll(".faq-item button");
faqBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    if (item) {
      item.classList.toggle("open");
      btn.querySelector("span")?.classList.toggle("rot");
    }
  });
});


// ===== HERO SLIDER AUTOMÁTICO =====
const slides = document.querySelectorAll(".hero-slider .slide");
let currentSlide = 0;
const slideInterval = 6000;

function showSlide(index) {
  slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

if (slides.length > 0) {
  showSlide(currentSlide);
  setInterval(nextSlide, slideInterval);
}







// BOTON FLOTANTE WHATSAPP
// Mostrar botón flotante de WhatsApp después de 5 segundos
window.addEventListener('load', () => {
    // Mostrar el botón flotante después de 5 segundos
    setTimeout(() => {
      const container = document.getElementById('whatsapp-container');
      container.classList.add('visible');
    }, 5000);

    // Permitir cerrar la notificación
    const closeBtn = document.getElementById('close-whatsapp-notification');
    const notification = document.getElementById('whatsapp-notification');

    closeBtn.addEventListener('click', () => {
      notification.classList.add('hidden');
    });
  });






















