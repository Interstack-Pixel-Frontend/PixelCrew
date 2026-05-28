/* =============================================
   PIXELCREW PORTFOLIO — script.js
   Scroll-triggered slide-in animations + Python backend simulation
   Fully interactive, professional, responsive
   ============================================= */

// ==================== MOBILE BURGER MENU ====================
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

if (burger) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// ==================== SCROLL TRIGGER FOR SLIDE-IN IMAGES (LEFT OFFSCREEN) ====================
// Images slide from left, writeups fade up
const imageWrappers = document.querySelectorAll('.member-image-wrapper');
const writeups = document.querySelectorAll('.member-writeup');

const observerOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -60px 0px"
};

const slideObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      slideObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

imageWrappers.forEach(wrapper => slideObserver.observe(wrapper));
writeups.forEach(writeup => slideObserver.observe(writeup));

// Also handle any already-visible elements on load
setTimeout(() => {
  imageWrappers.forEach(wrapper => {
    const rect = wrapper.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      wrapper.classList.add('animated');
    }
  });
  writeups.forEach(writeup => {
    const rect = writeup.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      writeup.classList.add('animated');
    }
  });
}, 150);

// ==================== PYTHON BACKEND SIMULATION ====================
// Professional async contact form handler

class PythonBackendSimulator {
  static async submitInquiry(formData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();
        const service = formData.get('service');
        
        // Validation
        if (!name || name.length < 2) {
          resolve({ success: false, error: "Name must be at least 2 characters." });
        } else if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          resolve({ success: false, error: "Valid email required." });
        } else if (!service) {
          resolve({ success: false, error: "Please select a service." });
        } else {
          // Python-style logging to console
          console.log(`[PYTHON BACKEND] 📨 New inquiry received`);
          console.log(`   Name: ${name}`);
          console.log(`   Email: ${email}`);
          console.log(`   Service: ${service}`);
          console.log(`   Timestamp: ${new Date().toISOString()}`);
          console.log(`[PYTHON BACKEND] ✅ Inquiry logged to database`);
          
          resolve({
            success: true,
            message: `Thanks ${name}! PixelCrew will respond within 24 hours.`,
            inquiryId: `PC-${Date.now()}`
          });
        }
      }, 700);
    });
  }
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
const successDiv = document.getElementById('formSuccess');
const toast = document.getElementById('toastNotification');

function showToast(msg, isError = false) {
  toast.textContent = msg;
  toast.style.background = isError ? '#b91c1c' : '#ff5c2b';
  toast.style.opacity = '1';
  setTimeout(() => toast.style.opacity = '0', 4000);
}

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', document.getElementById('contactName').value);
    formData.append('email', document.getElementById('contactEmail').value);
    formData.append('service', document.getElementById('contactService').value);
    formData.append('payment', document.getElementById('contactPayment')?.value || '');
    formData.append('message', document.getElementById('contactMessage').value);
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending... ⏳';
    submitBtn.disabled = true;
    
    const response = await PythonBackendSimulator.submitInquiry(formData);
    
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    
    if (response.success) {
      successDiv.style.display = 'block';
      showToast(response.message);
      contactForm.reset();
      setTimeout(() => {
        successDiv.style.display = 'none';
      }, 5000);
    } else {
      showToast(response.error, true);
    }
  });
}

// ==================== SMOOTH SCROLL WITH FIXED HEADER OFFSET ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === "#" || href === "") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navHeight = document.querySelector('.nav')?.offsetHeight || 80;
      const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

// ==================== PARALLAX FLOATING EFFECT FOR HERO CARDS ====================
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    const cards = document.querySelectorAll('.hero-card');
    cards.forEach((card, idx) => {
      const offsetX = (mouseX - 0.5) * 20 * (idx + 1) * 0.2;
      const offsetY = (mouseY - 0.5) * 15 * (idx + 1) * 0.2;
      card.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  });
}

// ==================== ACTIVE NAV LINK ON SCROLL ====================
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  const scrollPos = window.scrollY + 150;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === `#${current}` && !link.classList.contains('nav-cta')) {
      link.style.color = '#ff5c2b';
    } else if (!link.classList.contains('nav-cta')) {
      link.style.color = 'rgba(245,240,232,0.75)';
    }
  });
});

// Console greeting
console.log("%c✨ PixelCrew Studio | Five minds. One direction. ✨", "color: #ff5c2b; font-size: 14px; font-family: monospace;");
console.log("%cImages slide in from left on scroll — fully responsive team gallery ready for your real photos.", "color: #1a6b45; font-size: 12px;");