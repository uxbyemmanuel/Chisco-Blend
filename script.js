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

// Discover scroll — hover-edge auto-scroll + progress bar
const discoverWrapper = document.querySelector('.discover-wrapper');
const discoverScroll = document.querySelector('.discover-scroll');
const discoverEdgeLeft = document.querySelector('.discover-edge-left');
const discoverEdgeRight = document.querySelector('.discover-edge-right');
const progressBar = document.querySelector('.discover-progress-bar');

if (discoverWrapper && discoverScroll && progressBar) {
  let scrollAnimationId = null;
  const scrollSpeed = 6; // pixels per frame — increase for faster, decrease for slower

  // Continuously scroll while hovering an edge
  function startScrolling(direction) {
    stopScrolling();
    function step() {
      discoverScroll.scrollLeft += scrollSpeed * direction;
      scrollAnimationId = requestAnimationFrame(step);
    }
    step();
  }

  function stopScrolling() {
    if (scrollAnimationId) {
      cancelAnimationFrame(scrollAnimationId);
      scrollAnimationId = null;
    }
  }

  // Hover the right edge → scroll right
  if (discoverEdgeRight) {
    discoverEdgeRight.addEventListener('mouseenter', () => startScrolling(1));
    discoverEdgeRight.addEventListener('mouseleave', stopScrolling);
  }

  // Hover the left edge → scroll left
  if (discoverEdgeLeft) {
    discoverEdgeLeft.addEventListener('mouseenter', () => startScrolling(-1));
    discoverEdgeLeft.addEventListener('mouseleave', stopScrolling);
  }

  // Update progress bar + show/hide edge zones based on scroll position
  function updateScrollState() {
    const maxScroll = discoverScroll.scrollWidth - discoverScroll.clientWidth;

    if (maxScroll <= 0) {
      progressBar.style.width = '100%';
      discoverWrapper.classList.remove('can-scroll-left', 'can-scroll-right');
      return;
    }

    const scrollLeft = discoverScroll.scrollLeft;
    const progress = scrollLeft / maxScroll;

    // Progress bar grows from 30% to 100% as you scroll
    const barWidth = 30 + (progress * 70);
    progressBar.style.width = barWidth + '%';

    // Toggle edge visibility (small buffer of 5px to avoid flicker at the ends)
    if (scrollLeft > 5) {
      discoverWrapper.classList.add('can-scroll-left');
    } else {
      discoverWrapper.classList.remove('can-scroll-left');
    }

    if (scrollLeft < maxScroll - 5) {
      discoverWrapper.classList.add('can-scroll-right');
    } else {
      discoverWrapper.classList.remove('can-scroll-right');
    }
  }

  discoverScroll.addEventListener('scroll', updateScrollState);
  window.addEventListener('resize', updateScrollState);
  updateScrollState(); // run on page load
}
