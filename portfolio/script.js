// Modern Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Update Year in Footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Close mobile menu if open
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Intersection Observer for Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll('.card, .section h2, .chips li, .hero-text');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
  });

  // Add animation classes
  document.addEventListener('scroll', () => {
    document.querySelectorAll('.animate-in').forEach(el => {
      el.style.opacity = '';
      el.style.transform = '';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
  }, { passive: true });

  // Header Background on Scroll
  const header = document.querySelector('.site-header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      header.style.background = 'rgba(10, 10, 10, 0.95)';
      header.style.backdropFilter = 'blur(20px)';
    } else {
      header.style.background = 'rgba(10, 10, 10, 0.8)';
      header.style.backdropFilter = 'blur(20px)';
    }

    // Hide/show header on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
  }, { passive: true });

  // Parallax Effect for Hero Section
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    }, { passive: true });
  }

  // Typing Effect for Hero Title
  const heroTitle = document.querySelector('.hero-text h1');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid var(--accent)';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        heroTitle.style.borderRight = 'none';
      }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
  }

  // Hover Effects for Cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Skills Animation
  const skillChips = document.querySelectorAll('.chips li');
  skillChips.forEach((chip, index) => {
    chip.style.animationDelay = `${index * 0.1}s`;
    chip.classList.add('skill-animate');
  });

  // Form Enhancement
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      // Add floating label effect
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', function() {
        if (!this.value) {
          this.parentElement.classList.remove('focused');
        }
      });
      
      // Add character count for textarea
      if (input.tagName === 'TEXTAREA') {
        const charCount = document.createElement('div');
        charCount.className = 'char-count';
        charCount.style.cssText = 'font-size: 0.8rem; color: var(--text-muted); text-align: right; margin-top: 0.5rem;';
        input.parentElement.appendChild(charCount);
        
        input.addEventListener('input', function() {
          const count = this.value.length;
          const max = 500;
          charCount.textContent = `${count}/${max}`;
          
          if (count > max * 0.8) {
            charCount.style.color = 'var(--accent)';
          } else {
            charCount.style.color = 'var(--text-muted)';
          }
        });
      }
    });
  }

  // Smooth reveal for sections
  const sections = document.querySelectorAll('.section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(section);
  });

  // Add loading animation
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

  // Cursor trail effect (optional)
  let mouseX = 0;
  let mouseY = 0;
  let cursorTrail = [];

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Create cursor trail effect
    if (Math.random() > 0.9) {
      createCursorTrail();
    }
  });

  function createCursorTrail() {
    const trail = document.createElement('div');
    trail.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: var(--accent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      left: ${mouseX}px;
      top: ${mouseY}px;
      opacity: 0.6;
    `;
    
    document.body.appendChild(trail);
    
    // Animate and remove
    setTimeout(() => {
      trail.style.transform = 'scale(0)';
      trail.style.opacity = '0';
      trail.style.transition = 'all 0.5s ease';
      
      setTimeout(() => {
        document.body.removeChild(trail);
      }, 500);
    }, 100);
  }
});

// Add CSS for new animations
const style = document.createElement('style');
style.textContent = `
  .skill-animate {
    animation: skillPop 0.6s ease forwards;
    opacity: 0;
    transform: scale(0.8);
  }
  
  @keyframes skillPop {
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .focused label {
    color: var(--accent) !important;
  }
  
  .loaded .hero-text {
    animation: fadeInUp 1s ease forwards;
  }
  
  .animate-in {
    animation: fadeInUp 0.6s ease forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .site-header {
    transition: all 0.3s ease;
  }
  
  .hero-text h1 {
    overflow: hidden;
    white-space: nowrap;
  }
`;
document.head.appendChild(style);
