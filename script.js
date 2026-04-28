// =====================
// ANNOUNCEMENT BAR CLOSE
// =====================
const closeBtn = document.querySelector('.announcement-close');
const announcementBar = document.querySelector('.announcement-bar');

if (closeBtn && announcementBar) {
  closeBtn.addEventListener('click', () => {
    announcementBar.style.display = 'none';
  });
}

// =====================
// NAVBAR SCROLL EFFECT
// =====================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (!navbar) return;
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// =====================
// WISHLIST TOGGLE
// =====================
document.querySelectorAll('.wishlist-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.textContent = btn.textContent === '♡' ? '♥' : '♡';
    btn.style.color = btn.textContent === '♥' ? '#FA6A39' : '';
  });
});

// =====================
// NEWSLETTER FORM
// =====================
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });
  const newsletterBtn = newsletterForm.querySelector('button');
  const newsletterInput = newsletterForm.querySelector('input');
  if (newsletterBtn && newsletterInput) {
    newsletterBtn.addEventListener('click', () => {
      if (newsletterInput.value) {
        newsletterInput.value = '';
        newsletterInput.placeholder = 'Thank you for subscribing!';
        setTimeout(() => {
          newsletterInput.placeholder = 'Enter your email';
        }, 3000);
      }
    });
  }
}

// =====================
// SPRING SHOP LABELS — PARALLAX SCROLL
// =====================
const springItems = document.querySelectorAll('.spring-item');

function updateSpringLabels() {
  springItems.forEach(item => {
    const label = item.querySelector('.spring-label');
    if (!label) return;

    const rect = item.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.bottom < -100 || rect.top > windowHeight + 100) return;

    const sectionHeight = rect.height;
    const totalDistance = windowHeight + sectionHeight;
    const scrolled = windowHeight - rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / totalDistance));

    const minTop = 80;
    const maxTop = sectionHeight - 100;

    const labelTop = minTop + (maxTop - minTop) * progress;

    label.style.top = labelTop + 'px';
    label.style.bottom = 'auto';
  });
}

let springTicking = false;
window.addEventListener('scroll', () => {
  if (!springTicking) {
    requestAnimationFrame(() => {
      updateSpringLabels();
      springTicking = false;
    });
    springTicking = true;
  }
});
window.addEventListener('resize', updateSpringLabels);
updateSpringLabels();

// =====================
// DISCOVER SCROLL — CLICK ARROWS + PROGRESS BAR
// =====================
const discoverScroll = document.querySelector('.discover-scroll');
const discoverArrowLeft = document.querySelector('.discover-arrow-left');
const discoverArrowRight = document.querySelector('.discover-arrow-right');
const progressBar = document.querySelector('.discover-progress-bar');

if (discoverScroll && discoverArrowLeft && discoverArrowRight && progressBar) {
  function getScrollDistance() {
    const card = discoverScroll.querySelector('.product-card');
    if (!card) return 300;
    const cardWidth = card.getBoundingClientRect().width;
    return cardWidth + 20;
  }

  discoverArrowRight.addEventListener('click', () => {
    discoverScroll.scrollBy({ left: getScrollDistance(), behavior: 'smooth' });
  });

  discoverArrowLeft.addEventListener('click', () => {
    discoverScroll.scrollBy({ left: -getScrollDistance(), behavior: 'smooth' });
  });

  function updateScrollState() {
    const maxScroll = discoverScroll.scrollWidth - discoverScroll.clientWidth;

    if (maxScroll <= 0) {
      progressBar.style.width = '100%';
      discoverArrowLeft.disabled = true;
      discoverArrowRight.disabled = true;
      return;
    }

    const scrollLeft = discoverScroll.scrollLeft;
    const progress = scrollLeft / maxScroll;
    progressBar.style.width = (30 + progress * 70) + '%';

    discoverArrowLeft.disabled = scrollLeft <= 5;
    discoverArrowRight.disabled = scrollLeft >= maxScroll - 5;
  }

  discoverScroll.addEventListener('scroll', updateScrollState);
  window.addEventListener('resize', updateScrollState);
  window.addEventListener('load', updateScrollState);
  updateScrollState();
}
