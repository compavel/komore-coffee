// ========================================
// Komore Coffee - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {

  // Initialize Lucide Icons
  lucide.createIcons();

  // ---- Navbar Scroll Effect ----
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // ---- Mobile Menu ----
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  let isMenuOpen = false;

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    mobileDrawer.classList.toggle('open', isMenuOpen);

    // Change icon
    const icon = mobileMenuBtn.querySelector('[data-lucide]');
    if (icon) {
      icon.setAttribute('data-lucide', isMenuOpen ? 'x' : 'menu');
      lucide.createIcons();
    }
  };

  mobileMenuBtn.addEventListener('click', toggleMenu);

  // Close mobile menu when clicking a link
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (isMenuOpen) {
        toggleMenu();
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (isMenuOpen && !mobileDrawer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      toggleMenu();
    }
  });

  // ---- Menu Filter Tabs ----
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuCards = document.querySelectorAll('.menu-card');

  const filterMenu = (category) => {
    menuCards.forEach((card, index) => {
      const cardCategory = card.getAttribute('data-category');
      const shouldShow = category === 'all' || cardCategory === category;

      if (shouldShow) {
        card.classList.remove('hidden');
        card.classList.add('show');
        card.style.animationDelay = `${index * 0.05}s`;
      } else {
        card.classList.add('hidden');
        card.classList.remove('show');
      }
    });
  };

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs
      menuTabs.forEach(t => t.classList.remove('active'));
      // Add active to clicked tab
      tab.classList.add('active');
      // Filter cards
      const filter = tab.getAttribute('data-filter');
      filterMenu(filter);
    });
  });

  // ---- Back to Top Button ----
  const backToTop = document.getElementById('backToTop');

  const handleBackToTop = () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleBackToTop);

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- Smooth Scroll for all anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- Current Year in Footer ----
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ---- Intersection Observer for Animations ----
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe sections for fade-in animation
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(section);
  });

  // ---- Active Nav Link Highlight ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('text-bark-800', 'font-semibold');
          link.classList.add('text-bark-600');

          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-bark-800', 'font-semibold');
            link.classList.remove('text-bark-600');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav);

  // ---- Console Easter Egg ----
  console.log(
    '%c☕ Komore Coffee %cWhere sunlight meets your cup',
    'background: #2C1810; color: #FFF9F3; padding: 8px 12px; border-radius: 4px 0 0 4px; font-weight: bold;',
    'background: #8B6F47; color: #FFF9F3; padding: 8px 12px; border-radius: 0 4px 4px 0;'
  );

});
