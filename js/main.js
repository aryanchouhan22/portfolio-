// Mobile menu
const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("navMenu");

toggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// Fade-in on scroll
const faders = document.querySelectorAll(".fade");

const appear = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.2 }
);

faders.forEach(el => appear.observe(el));
// ===== Simple Lightbox for thumbnails =====
(function () {
  const thumbs = document.querySelectorAll('.card-thumb');
  if (!thumbs.length) return;

  // Create modal markup once
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-overlay" tabindex="-1" aria-hidden="true"></div>
    <div class="lightbox-inner" role="dialog" aria-modal="true" aria-label="Image preview">
      <button class="lightbox-close" aria-label="Close (Esc)">✕</button>
      <img class="lightbox-img" src="" alt="">
      <div class="lightbox-caption" aria-hidden="true"></div>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lb = lightbox;
  const lbImg = lb.querySelector('.lightbox-img');
  const lbCaption = lb.querySelector('.lightbox-caption');
  const lbClose = lb.querySelector('.lightbox-close');
  const lbOverlay = lb.querySelector('.lightbox-overlay');

  // open modal on thumbnail click
  thumbs.forEach(thumb => {
    thumb.style.cursor = 'zoom-in';
    thumb.addEventListener('click', () => {
      const full = thumb.dataset.full || thumb.src;
      lbImg.src = full;
      lbImg.alt = thumb.alt || '';
      lbCaption.textContent = thumb.getAttribute('data-caption') || thumb.alt || '';
      lb.classList.add('show');
      document.documentElement.style.overflow = 'hidden'; // prevent background scroll
      lbClose.focus();
    });
  });

  // close function
  function closeLb() {
    lb.classList.remove('show');
    document.documentElement.style.overflow = ''; // restore scroll
    lbImg.src = '';
  }

  // close handlers
  lbClose.addEventListener('click', closeLb);
  lbOverlay.addEventListener('click', closeLb);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lb.classList.contains('show')) closeLb();
  });

  // Prevent click on image from closing (so user can click image for context)
  lbImg.addEventListener('click', (e) => e.stopPropagation());
})();
