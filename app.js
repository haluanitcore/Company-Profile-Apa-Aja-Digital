/* =============================================
   ApaAjaDigital — App.js
   All JavaScript interactions
   ============================================= */

(function () {
  'use strict';

  /* ===== STATE ===== */
  let currentPage = 'home';
  let lenis = null;
  let isMobileMenuOpen = false;
  let particleRestartFn = null;
  let parallaxCtx = [];

  const isTouch = () => navigator.maxTouchPoints > 0;

  /* ===== SPA NAVIGATION ===== */
  window.nav = function (pageId) {
    if (currentPage === pageId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const currentEl = document.getElementById('page-' + currentPage);
    const nextEl    = document.getElementById('page-' + pageId);
    const overlay   = document.getElementById('pageTransitionOverlay');

    if (!nextEl) return;

    function afterTransition() {
      if (currentEl) currentEl.classList.remove('active');
      nextEl.classList.add('active');
      currentPage = pageId;

      window.scrollTo(0, 0);
      if (lenis) lenis.scrollTo(0, { immediate: true });

      updateNavActive(pageId);
      announcePageChange(pageId);

      /* Fade overlay back out */
      if (overlay) {
        requestAnimationFrame(() => {
          overlay.classList.remove('fade-out');
        });
      }

      killPageParallax();
      setTimeout(() => {
        initReveal();
        initPageParallax(pageId);
      }, 60);

      if (pageId === 'home') {
        setTimeout(() => {
          initStatCounters();
          if (particleRestartFn) particleRestartFn();
        }, 100);
      }
      if (pageId === 'layanan')  setTimeout(initPriceCounters, 200);
      if (pageId === 'tentang')  setTimeout(initTimeline, 200);
    }

    if (overlay) {
      overlay.classList.add('fade-out');
      /* Wait for fade-out to complete (220ms) then switch page */
      setTimeout(afterTransition, 220);
    } else {
      afterTransition();
    }
  };

  function updateNavActive(pageId) {
    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
    const activeLink = document.getElementById('nav-' + pageId);
    if (activeLink) activeLink.classList.add('active');
  }

  const pageNames = {
    home: 'Beranda', ai: 'AI System', layanan: 'Layanan & Harga',
    portofolio: 'Portofolio', tentang: 'Tentang Kami', kontak: 'Hubungi Kami',
  };

  function announcePageChange(pageId) {
    const announcer = document.getElementById('page-announcer');
    if (!announcer) return;
    announcer.textContent = '';
    requestAnimationFrame(() => {
      announcer.textContent = 'Halaman ' + (pageNames[pageId] || pageId) + ' ditampilkan';
    });
  }

  /* ===== MOBILE MENU ===== */
  window.toggleMobileMenu = function () {
    isMobileMenuOpen = !isMobileMenuOpen;
    const hamburger = document.getElementById('hamburger');
    const drawer = document.getElementById('mobileDrawer');
    const overlay = document.getElementById('mobileOverlay');
    const stickyCtA = document.getElementById('mobileStickyCtA');

    hamburger.classList.toggle('open', isMobileMenuOpen);
    drawer.classList.toggle('open', isMobileMenuOpen);
    overlay.classList.toggle('open', isMobileMenuOpen);

    hamburger.setAttribute('aria-expanded', isMobileMenuOpen.toString());
    drawer.setAttribute('aria-hidden', (!isMobileMenuOpen).toString());

    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';

    if (stickyCtA) {
      stickyCtA.style.display = isMobileMenuOpen ? 'none' : '';
    }
  };

  /* ===== LENIS SMOOTH SCROLL ===== */
  function initLenis() {
    if (typeof Lenis === 'undefined') return;

    lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(time => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }

  /* ===== NAVBAR SCROLL ===== */
  function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ===== SCROLL REVEAL (IntersectionObserver) ===== */
  function initReveal() {
    const els = document.querySelectorAll('#page-' + currentPage + ' .reveal-up:not(.visible)');
    if (!els.length) return;

    if (typeof IntersectionObserver === 'undefined') {
      els.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    els.forEach(el => observer.observe(el));
  }

  /* ===== HERO ENTRANCE ANIMATION ===== */
  function initHeroEntrance() {
    if (typeof gsap === 'undefined') return;
    if (currentPage !== 'home') return;

    const spans = document.querySelectorAll('#page-home .hero-content .hero-headline span');
    if (!spans.length) return;

    gsap.set(spans, { opacity: 0, y: 32 });
    gsap.to(spans, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.1,
      delay: 0.2,
    });
  }

  /* ===== PARALLAX ===== */
  function killPageParallax() {
    if (typeof ScrollTrigger !== 'undefined') {
      parallaxCtx.forEach(ctx => ctx.kill && ctx.kill());
      parallaxCtx = [];
    }
  }

  function initPageParallax(pageId) {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    if (pageId === 'home') {
      initHomeParallax();
    } else if (pageId === 'ai') {
      initSectionParallax('#page-ai');
    } else if (pageId === 'layanan') {
      initSectionParallax('#page-layanan');
    } else if (pageId === 'portofolio') {
      initSectionParallax('#page-portofolio');
    } else if (pageId === 'tentang') {
      initSectionParallax('#page-tentang');
    } else if (pageId === 'kontak') {
      initSectionParallax('#page-kontak');
    }
  }

  function initHomeParallax() {
    const heroEl = document.querySelector('#page-home .hero');
    const canvas = document.getElementById('heroCanvas');
    if (!heroEl) return;

    /* Hero content drifts up slower than scroll */
    const heroContent = document.querySelector('#page-home .hero-content');
    if (heroContent) {
      const st1 = gsap.to(heroContent, {
        y: -90,
        ease: 'none',
        scrollTrigger: {
          trigger: heroEl,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        }
      });
      parallaxCtx.push(st1.scrollTrigger);
    }

    /* Canvas drifts at a different speed (depth illusion) */
    if (canvas) {
      const st2 = gsap.to(canvas, {
        y: 55,
        ease: 'none',
        scrollTrigger: {
          trigger: heroEl,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        }
      });
      parallaxCtx.push(st2.scrollTrigger);
    }

    /* Layanan cards stagger reveal */
    const cards = document.querySelectorAll('#page-home .layanan-card');
    cards.forEach((card, i) => {
      const st = gsap.from(card, {
        y: 40, opacity: 0, duration: 0.6, ease: 'expo.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        delay: i * 0.08,
      });
      parallaxCtx.push(st.scrollTrigger);
    });
  }

  function initSectionParallax(pageSelector) {
    /* Only handles the hero section parallax (y-drift on scroll).
       Card/content reveals are handled by IntersectionObserver (initReveal),
       so GSAP never touches opacity of content elements on non-home pages. */
    const heroSection = document.querySelector(pageSelector + ' section:first-child');
    const heroInner = document.querySelector(pageSelector + ' section:first-child > .container > div');

    if (!heroSection || !heroInner) return;

    const st = gsap.to(heroInner, {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      }
    });
    if (st.scrollTrigger) parallaxCtx.push(st.scrollTrigger);
  }

  /* ===== CARD 3D TILT ===== */
  function initCardTilt() {
    if (isTouch()) return;

    const selectors = [
      '.layanan-card',
      '.ai-card',
      '.pricing-card-v2',
      '.case-card',
      '.usecase-card',
      '.kontak-card',
    ].join(', ');

    document.querySelectorAll(selectors).forEach(card => {
      card.style.transformStyle = 'preserve-3d';
      card.style.willChange = 'transform';

      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        const intensity = card.classList.contains('pricing-card-v2--popular') ? 4 : 6;

        card.style.transform = `
          translateY(-6px)
          rotateX(${-y * intensity}deg)
          rotateY(${x * intensity}deg)
          scale(1.01)
        `;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => { card.style.transition = ''; }, 500);
      });
    });
  }

  /* ===== STAT COUNTERS ===== */
  function initStatCounters() {
    const counters = document.querySelectorAll('#page-home .stat-number[data-count]');
    if (!counters.length) return;

    counters.forEach(el => { delete el.dataset.animated; });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  }

  function animateCount(el) {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    function update(time) {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(update);
  }

  /* ===== PARTICLE CANVAS (Hero) ===== */
  function initParticleCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrameId;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function createParticles() {
      particles = [];
      const count = Math.min(65, Math.floor(canvas.width / 18));
      for (let i = 0; i < count; i++) {
        const isGold = Math.random() < 0.2;
        particles.push({
          x:       Math.random() * canvas.width,
          y:       Math.random() * canvas.height,
          r:       Math.random() * 1.6 + 0.3,
          vx:      (Math.random() - 0.5) * 0.22,
          vy:      (Math.random() - 0.5) * 0.22,
          opacity: Math.random() * 0.3 + 0.06,
          isGold,
          hue:     isGold ? 48 : (200 + Math.random() * 40),
          sat:     isGold ? 100 : 60,
          lit:     isGold ? 70 : 72,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, ${p.sat}%, ${p.lit}%, ${p.opacity})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = 0.04 * (1 - dist / 120);
            const isGoldLine = particles[i].isGold || particles[j].isGold;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isGoldLine
              ? `rgba(255, 214, 0, ${alpha * 1.4})`
              : `rgba(100, 140, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animFrameId = requestAnimationFrame(draw);
    }

    function startCanvas() {
      const homePage = document.getElementById('page-home');
      if (!homePage || !homePage.classList.contains('active')) return;
      resize();
      createParticles();
      cancelAnimationFrame(animFrameId);
      draw();
    }

    particleRestartFn = startCanvas;

    window.addEventListener('resize', () => {
      if (document.getElementById('page-home').classList.contains('active')) {
        resize();
        createParticles();
      }
    }, { passive: true });

    startCanvas();
  }

  /* ===== GLOW CARDS (mouse tracking) ===== */
  function initGlowCards() {
    if (isTouch()) return;

    document.addEventListener('mousemove', e => {
      document.querySelectorAll('.glow-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
      });
    }, { passive: true });
  }

  /* ===== PRICE COUNTERS ===== */
  function initPriceCounters() {
    const selectors = [
      '#page-layanan .pricing-number-v2:not([data-price-done])',
      '#page-layanan .maintenance-price:not([data-price-done])',
    ].join(', ');

    const els = document.querySelectorAll(selectors);
    if (!els.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.setAttribute('data-price-done', '1');
        observer.unobserve(el);

        const rawTarget = el.dataset.price
          ? parseInt(el.dataset.price, 10)
          : parseInt(el.textContent.replace(/[^\d]/g, ''), 10);

        if (!rawTarget || isNaN(rawTarget)) return;

        const originalText = el.textContent.trim();
        const obj = { val: 0 };
        const fmt = v => v.toLocaleString('id-ID');

        if (typeof anime !== 'undefined') {
          anime({
            targets: obj, val: rawTarget, duration: 1100,
            easing: 'easeOutQuart', round: 1,
            update: () => { el.textContent = fmt(Math.floor(obj.val)); },
            complete: () => { el.textContent = originalText; }
          });
        } else {
          animateCountGeneric(el, rawTarget, originalText, fmt);
        }
      });
    }, { threshold: 0.5 });

    els.forEach(el => observer.observe(el));
  }

  function animateCountGeneric(el, target, originalText, formatter) {
    const duration = 1100;
    const start = performance.now();
    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = formatter(Math.floor(eased * target));
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = originalText;
    }
    requestAnimationFrame(tick);
  }

  /* ===== TIMELINE (Tentang) ===== */
  function initTimeline() {
    const timeline = document.getElementById('prosesTimeline');
    if (!timeline) return;

    const steps = timeline.querySelectorAll('.proses-step');
    const lineFill = document.getElementById('prosesLineFill');
    if (!lineFill || !steps.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Array.from(steps).indexOf(entry.target);
          lineFill.style.height = ((idx + 1) / steps.length * 100) + '%';
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.5 });

    steps.forEach(step => observer.observe(step));
  }

  /* ===== CONTACT FORM ===== */
  window.handleFormSubmit = function (e) {
    e.preventDefault();

    const form = e.target;
    const nama    = form.querySelector('#nama').value.trim();
    const wa      = form.querySelector('#whatsapp').value.trim();
    const layanan = form.querySelector('#layanan').value;
    const pesan   = form.querySelector('#pesan').value.trim();

    const fields = [
      { el: form.querySelector('#nama'),     val: nama },
      { el: form.querySelector('#whatsapp'), val: wa },
      { el: form.querySelector('#layanan'),  val: layanan },
    ];

    let hasError = false;
    fields.forEach(({ el, val }) => {
      if (!val) {
        el.style.borderColor = '#ef4444';
        el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true });
        hasError = true;
      }
    });

    if (hasError) return;

    const layananLabels = {
      'landing-page':    'Landing Page',
      'company-profile': 'Company Profile',
      'ecommerce':       'E-Commerce',
      'ai-system':       'AI System',
      'high-performance':'High Performance Web/App',
      'maintenance':     'Maintenance & Support',
      'konsultasi':      'Belum tahu — butuh konsultasi',
    };

    const msg = encodeURIComponent(
      `Halo ApaAjaDigital!\n\n` +
      `*Nama/Perusahaan:* ${nama}\n` +
      `*No. WhatsApp:* ${wa}\n` +
      `*Layanan:* ${layananLabels[layanan] || layanan}\n` +
      (pesan ? `*Keterangan:* ${pesan}\n\n` : '\n') +
      `Mohon bantu untuk konsultasi lebih lanjut. Terima kasih!`
    );

    window.open(`https://wa.me/6282180598494?text=${msg}`, '_blank', 'noopener');
  };

  /* ===== KEYBOARD NAV ===== */
  function initKeyboardNav() {
    document.addEventListener('keydown', e => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target !== document.body) {
        const target = e.target;
        if (target.hasAttribute('onclick') && target.tagName !== 'BUTTON' && target.tagName !== 'A') {
          e.preventDefault();
          target.click();
        }
      }
      if (e.key === 'Escape' && isMobileMenuOpen) toggleMobileMenu();
    });
  }

  /* ===== SECTION ACCENT LINES (decorative) ===== */
  function initAccentLines() {
    /* Inject a subtle horizontal rule animation under section headers */
    document.querySelectorAll('.section-header').forEach(header => {
      const label = header.querySelector('.section-label');
      if (!label) return;
      label.classList.add('section-label--animated');
    });
  }

  /* ===== INIT ===== */
  function init() {
    initNavbarScroll();
    initKeyboardNav();
    initGlowCards();
    initAccentLines();

    setTimeout(() => {
      initLenis();
      initParticleCanvas();
      initReveal();
      initStatCounters();
      initCardTilt();

      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        initHeroEntrance();
        initPageParallax('home');
      }
    }, 150);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(initReveal, 60);
  }, { passive: true });

})();
