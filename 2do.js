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
















// ===== Carrusel Div 1 =====
const carouselTrack = document.querySelector(".carousel-track");
const slides = Array.from(carouselTrack.children);
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

let currentIndex = 0;
const totalSlides = slides.length;

function updateCarousel() {
  const offset = -currentIndex * 100;
  carouselTrack.style.transform = `translateX(${offset}%)`;
}

// Botones manuales
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateCarousel();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
});

// Deslizamiento automático
setInterval(() => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
}, 4000); // cada 4 segundos
















// ===== Contador de tickets =====
const minusBtn = document.getElementById("minus-btn");
const plusBtn = document.getElementById("plus-btn");
const ticketInput = document.getElementById("ticket-amount");
const quickBtns = document.querySelectorAll(".quick-btn");
const ticketTotal = document.getElementById("ticket-total");

const ticketPrice = 1;
function updateTotal() {
  const amount = parseInt(ticketInput.value) || 1;
  ticketTotal.textContent = (amount * ticketPrice).toFixed(2);
  updatePaymentAmount();
}

minusBtn.addEventListener("click", () => {
  ticketInput.value = Math.max(1, parseInt(ticketInput.value)-1);
  updateTotal();
});

plusBtn.addEventListener("click", () => {
  ticketInput.value = parseInt(ticketInput.value)+1;
  updateTotal();
});

ticketInput.addEventListener("input", updateTotal);

quickBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    ticketInput.value = parseInt(btn.textContent);
    updateTotal();
  });
});

// ===== Métodos de pago =====
const payBtns = document.querySelectorAll(".pay-btn");
const selectedMethod = document.getElementById("selected-method");
const paymentData = document.getElementById("payment-data");
const paymentAmount = document.getElementById("payment-amount");
const paymentRef = document.getElementById("payment-ref");

const paymentDetails = {
  "Pago Móvil": {data:"Banco de Venezuea (0102) V-11055128 04242708903", rate:320},
  "Binance": {data:"Binance Pay Jeinnermarin28@gmail.com ", rate:1},
  "Paypal": {data:"Jeinner Marín jeinnermarin28@gmai.com", rate:1},
  "Zelle": {data:"Anisa Cova  Anicova805@gmail.com", rate:1},
  "Zinli": {data:"jeinnermarin28i@correo.com", rate:1}
};

let currentMethod = null;

function updatePaymentAmount() {
  if (!currentMethod) return;
  const amount = parseInt(ticketInput.value) || 1;
  const rate = paymentDetails[currentMethod].rate;
  paymentAmount.textContent = (amount * ticketPrice * rate).toFixed(2) + (currentMethod === "Pago Móvil" ? " VES" : " $");
}

payBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    currentMethod = btn.dataset.method;

    // Actualizar info visible
    selectedMethod.textContent = currentMethod;
    paymentData.textContent = paymentDetails[currentMethod].data;
    updatePaymentAmount();

    // Resaltar botón seleccionado
    payBtns.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");

    // Mostrar datos de pago y formulario
    document.querySelector(".payment-info").style.display = "block";
    document.querySelector(".user-form").style.display = "block";
    document.getElementById("send-whatsapp").style.display = "inline-flex";
  });
});



// ===== Enviar pedido via WhatsApp =====
const sendBtn = document.getElementById("send-whatsapp");

sendBtn.addEventListener("click", () => {
  const name = document.getElementById("user-name").value.trim();
  const phone = document.getElementById("user-phone").value.trim();
  const email = document.getElementById("user-email").value.trim();
  const tickets = ticketInput.value;
  const total = paymentAmount.textContent;
  const method = currentMethod || "No seleccionado";
  const reference = paymentRef.value.trim() || "-";

  if(!name || !phone || !email || !currentMethod){
    alert("Por favor completa todos los campos y selecciona un método de pago");
    return;
  }

  const message = 
`*Nuevo pedido - Rifa Inv_starshop*
Nombre: ${name}
Telefono: ${phone}
Correo: ${email}
Cantidad de tickets: ${tickets}
Monto: ${total}
Método de pago: ${method}
Referencia bancaria: ${reference}`;

  const whatsappURL = `https://wa.me/584124303809?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, "_blank");
});












// ===== LIGHTBOX PARA CARRUSEL =====
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector(".lightbox-img");
const lightboxClose = lightbox.querySelector(".lightbox-close");
const lightboxPrev = lightbox.querySelector(".lightbox-btn.prev");
const lightboxNext = lightbox.querySelector(".lightbox-btn.next");

const carouselImages = document.querySelectorAll(".carousel-track img");

let lbIndex = 0;

// Abrir lightbox al hacer click en imagen
carouselImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    lbIndex = index;
    showLightbox();
  });
});

function showLightbox() {
  lightbox.style.display = "flex";
  lightboxImg.src = carouselImages[lbIndex].src;
}

// Cerrar lightbox
lightboxClose.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Navegar imágenes
lightboxPrev.addEventListener("click", () => {
  lbIndex = (lbIndex - 1 + carouselImages.length) % carouselImages.length;
  showLightbox();
});

lightboxNext.addEventListener("click", () => {
  lbIndex = (lbIndex + 1) % carouselImages.length;
  showLightbox();
});

// Cerrar al hacer click afuera
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

// Cerrar con ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lightbox.style.display = "none";
  }
});






























