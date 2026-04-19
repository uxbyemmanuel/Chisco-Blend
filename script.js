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
