/* ---- Edit these settings ---- */
const CONFIG = {
  whatsapp: "94717038384",            // WhatsApp number, country code first, no + or spaces
  facebook: "https://www.facebook.com/",   // replace with your page link
  instagram: "https://www.instagram.com/", // replace with your page link
  tiktok: "https://www.tiktok.com/"        // replace with your page link
};

// Social links
document.querySelectorAll("[data-soc]").forEach(a => { a.href = CONFIG[a.dataset.soc]; });
document.getElementById("yr").textContent = new Date().getFullYear();

// Sticky nav colour + mobile menu
const nav = document.getElementById("nav"), links = document.getElementById("links"), burger = document.getElementById("burger");
const onScroll = () => nav.classList.toggle("solid", scrollY > 60);
addEventListener("scroll", onScroll, { passive: true }); onScroll();
burger.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
links.addEventListener("click", e => { if (e.target.tagName === "A") { links.classList.remove("open"); burger.setAttribute("aria-expanded", false); } });

// Hero photo slideshow
const slides = [...document.querySelectorAll(".slides div")]; let i = 0;
setInterval(() => {
  slides[i].classList.remove("on"); i = (i + 1) % slides.length;
  slides[i].classList.add("on");
}, 5000);

// Reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15 });
document.querySelectorAll(".rise").forEach(el => io.observe(el));

// Booking form -> WhatsApp
const form = document.getElementById("bookForm"), err = document.getElementById("err");
const dateInput = form.elements.date; dateInput.min = new Date().toISOString().split("T")[0];
form.addEventListener("submit", e => {
  e.preventDefault();
  const f = Object.fromEntries(new FormData(form));
  if (!f.name.trim() || !f.phone.trim() || !f.date || !f.time || !(+f.guests > 0)) {
    err.textContent = "Please fill in your name, phone, date, time and number of guests."; return;
  }
  err.textContent = "";
  const msg = `Hello Prime Plate, I would like to book a table.\n\nName: ${f.name}\nPhone: ${f.phone}\nDate: ${f.date}\nTime: ${f.time}\nGuests: ${f.guests}\nSeating: ${f.area}` + (f.note.trim() ? `\nNotes: ${f.note}` : "");
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
});
