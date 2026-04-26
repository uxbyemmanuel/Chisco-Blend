// Announcement bar close
const closeBtn = document.querySelector('.announcement-close');
const announcementBar = document.querySelector('.announcement-bar');

if (closeBtn && announcementBar) {
  closeBtn.addEventListener('click', () => {
    announcementBar.style.display = 'none';
  });
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// Wishlist toggle
document.querySelectorAll('.wishlist-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.textContent = btn.textContent === '♡' ? '♥' : '♡';
    btn.style.color = btn.textContent === '♥' ? '#FA6A39' : '';
  });
});

// Newsletter form
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

// Spring shop labels — parallax scroll effect
const springItems = document.querySelectorAll('.spring-item');

function updateSpringLabels() {
  springItems.forEach(item => {
    const label = item.querySelector('.spring-label');
    if (!label) return;

    const rect = item.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Skip if section is far above or below the viewport
    if (rect.bottom < -100 || rect.top > windowHeight + 100) return;

    // Calculate scroll progress through the viewport (0 = entering, 1 = exiting)
    const sectionHeight = rect.height;
    const totalDistance = windowHeight + sectionHeight;
    const scrolled = windowHeight - rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / totalDistance));

    // Label movement bounds (adjust these two numbers for more/less movement)
    const minTop = 80;                    // highest the label can go
    const maxTop = sectionHeight - 100;   // lowest the label can go

    const labelTop = minTop + (maxTop - minTop) * progress;

    label.style.top = labelTop + 'px';
    label.style.bottom = 'auto';
  });
}

// Use requestAnimationFrame for smooth scrolling performance
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
updateSpringLabels(); // run once when page loads
