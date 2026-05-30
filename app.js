/* ===== GLOBAL STAR FIELD (Removed for continuous image background) ===== */
/*
(function () {
    const canvas = document.getElementById('globalStars');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let stars = [];
    const STAR_COUNT = 120;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.8 + 0.3,
            baseOpacity: Math.random() * 0.5 + 0.1,
            twinkleSpeed: Math.random() * 0.02 + 0.005,
            twinkleOffset: Math.random() * Math.PI * 2,
            dx: (Math.random() - 0.5) * 0.08,
            dy: (Math.random() - 0.5) * 0.08,
            hue: 220 + Math.random() * 40 // blue range 220-260
        });
    }

    function draw(time) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            const twinkle = Math.sin(time * s.twinkleSpeed + s.twinkleOffset) * 0.5 + 0.5;
            const opacity = s.baseOpacity * (0.4 + twinkle * 0.6);
            const glow = s.r * (1 + twinkle * 0.5);

            // Draw glow
            const gradient = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glow * 3);
            gradient.addColorStop(0, `hsla(${s.hue},80%,70%,${opacity * 0.6})`);
            gradient.addColorStop(1, `hsla(${s.hue},80%,70%,0)`);
            ctx.beginPath();
            ctx.arc(s.x, s.y, glow * 3, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Draw star core
            ctx.beginPath();
            ctx.arc(s.x, s.y, glow * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${s.hue},80%,85%,${opacity})`;
            ctx.fill();

            // Drift
            s.x += s.dx;
            s.y += s.dy;
            if (s.x < -10) s.x = canvas.width + 10;
            if (s.x > canvas.width + 10) s.x = -10;
            if (s.y < -10) s.y = canvas.height + 10;
            if (s.y > canvas.height + 10) s.y = -10;
        });
        requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
})();
*/

/* ===== LENIS SMOOTH SCROLL ===== */
const lenis = new Lenis({ duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

/* ===== CUSTOM CURSOR (GSAP quickTo) [DISABLED] ===== */
/*
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

// gsap.quickTo — high-perf bindings for cursor tracking
const cursorX = gsap.quickTo(cursor, 'left', { duration: 0.05, ease: 'none' });
const cursorY = gsap.quickTo(cursor, 'top', { duration: 0.05, ease: 'none' });
const followerX = gsap.quickTo(follower, 'left', { duration: 0.35, ease: 'power3.out' });
const followerY = gsap.quickTo(follower, 'top', { duration: 0.35, ease: 'power3.out' });

document.addEventListener('mousemove', (e) => {
    cursorX(e.clientX);
    cursorY(e.clientY);
    followerX(e.clientX);
    followerY(e.clientY);
});

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { width: 0, height: 0, opacity: 0, duration: 0.2 });
        gsap.to(follower, {
            width: 48, height: 48,
            borderColor: '#4B6BFF',
            background: 'rgba(75,107,255,.08)',
            duration: 0.3, ease: 'power2.out'
        });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { width: 8, height: 8, opacity: 1, duration: 0.2 });
        gsap.to(follower, {
            width: 32, height: 32,
            borderColor: 'rgba(255,255,255,.25)',
            background: 'transparent',
            duration: 0.3, ease: 'power2.out'
        });
    });
});
*/

/* ===== MAGNETIC BUTTONS ===== */
document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        if (typeof anime !== 'undefined') {
            anime({
                targets: btn,
                translateX: 0,
                translateY: 0,
                duration: 800,
                easing: 'spring(1, 80, 10, 0)'
            });
        } else {
            btn.style.transform = 'translate(0,0)';
        }
    });
});

/* ===== NAV SCROLL EFFECT ===== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
});

/* ===== GSAP SCROLL ANIMATIONS ===== */
gsap.registerPlugin(ScrollTrigger);

// Reveal-up animations
document.querySelectorAll('.reveal-up').forEach(el => {
    ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        onEnter: () => el.classList.add('revealed'),
    });
});

// Hero word cascade animation
gsap.from('.hero__status-pill', {
    y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.1
});
gsap.from('.hero__title .word', {
    y: 60, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1, delay: 0.3
});
gsap.from('.hero__sub', {
    y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 1.2
});
gsap.from('.hero__stats .stat-item', {
    y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1, delay: 1.5
});
gsap.from('.hero__showreel', {
    y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 1.8
});

// Counter animation
document.querySelectorAll('.stat-number').forEach(num => {
    const target = parseInt(num.getAttribute('data-count'));
    ScrollTrigger.create({
        trigger: num,
        start: 'top 90%',
        once: true,
        onEnter: () => {
            gsap.to(num, {
                innerText: target,
                duration: 2,
                ease: 'power2.out',
                snap: { innerText: 1 },
                onUpdate: function () {
                    num.textContent = Math.round(parseFloat(num.textContent));
                }
            });
        }
    });
});

// Parallax on hero elements
gsap.to('.hero__gradient', {
    y: 200,
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
    }
});
gsap.to('.hero__orb--1', {
    y: 100, x: -50,
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
});
gsap.to('.hero__orb--2', {
    y: -80, x: 30,
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
});

/* ===== HERO PARTICLES ===== */
(function () {
    const canvas = document.getElementById('heroParticles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const count = 60;

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5 + 0.5,
            dx: (Math.random() - 0.5) * 0.3,
            dy: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.3 + 0.05
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(75,107,255,${p.opacity})`;
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        });
        requestAnimationFrame(drawParticles);
    }
    drawParticles();
})();

/* ===== SMOOTH SCROLL NAV LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) lenis.scrollTo(target, { offset: -80 });
    });
});

/* ===== CASES HORIZONTAL PINNED SCROLL ===== */
(function () {
    const casesSection = document.getElementById('cases');
    const casesWrapper = document.getElementById('casesHorizontal');

    if (casesSection && casesWrapper) {
        // Calculate the total scrollable width
        function getScrollAmount() {
            let wrapperWidth = casesWrapper.scrollWidth;
            return -(wrapperWidth - window.innerWidth);
        }

        const tween = gsap.to(casesWrapper, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: casesSection,
                pin: true,
                start: "top top",
                end: () => `+=${getScrollAmount() * -1}`,
                scrub: 1,
                invalidateOnRefresh: true
            }
        });

        // Internal parallax on card images — counter-movement for 3D illusion
        const cardImages = casesWrapper.querySelectorAll('.case-card__right img');
        cardImages.forEach(img => {
            gsap.to(img, {
                x: 80,
                ease: 'none',
                scrollTrigger: {
                    trigger: casesSection,
                    start: 'top top',
                    end: () => `+=${getScrollAmount() * -1}`,
                    scrub: 1,
                    invalidateOnRefresh: true
                }
            });
        });
    }
})();

/* ===== TESTIMONIALS INFINITE SCROLL ===== */
(function () {
    const track = document.getElementById('testimonials-track');
    if (!track) return;

    // Clone all cards for seamless loop
    const cards = track.querySelectorAll('.t-card');
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });

    let scrollPos = 0;
    let paused = false;
    const speed = 0.5; // px per frame

    // Get width of original cards (half of track since we cloned)
    function getHalfWidth() {
        const gap = 20;
        let w = 0;
        for (let i = 0; i < cards.length; i++) {
            w += cards[i].offsetWidth + gap;
        }
        return w;
    }

    function animate() {
        if (!paused) {
            scrollPos += speed;
            const halfW = getHalfWidth();
            if (scrollPos >= halfW) {
                scrollPos -= halfW;
            }
            track.style.transform = `translateX(-${scrollPos}px)`;
        }
        requestAnimationFrame(animate);
    }
    animate();

    track.addEventListener('mouseenter', () => paused = true);
    track.addEventListener('mouseleave', () => paused = false);
})();

/* ===== PROCESS TIMELINE LINE DRAW ===== */
(function () {
    const processLine = document.querySelector('.process-line');
    const processTimeline = document.querySelector('.process-timeline-new');
    if (!processLine || !processTimeline) return;

    gsap.to(processLine, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: processTimeline,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1
        }
    });
})();

/* ===== ANIME JS STAGGERED GRID ANIMATIONS ===== */
(function () {
    // Ensure anime is loaded
    if (typeof anime === 'undefined') {
        console.warn('Anime.js not loaded, skipping staggered animations');
        // Fallback: show cards immediately
        document.querySelectorAll('.anime-card').forEach(function (el) {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }

    function animateCards(sectionId) {
        var section = document.getElementById(sectionId);
        if (!section) return;

        var cards = section.querySelectorAll('.anime-card');
        if (!cards.length) return;

        // Use IntersectionObserver for reliable scroll detection
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    observer.unobserve(entry.target);

                    anime({
                        targets: Array.from(cards),
                        opacity: [0, 1],
                        translateY: [60, 0],
                        scale: [0.95, 1],
                        delay: anime.stagger(180, { start: 200 }),
                        duration: 900,
                        easing: 'spring(1, 80, 10, 0)'
                    });
                }
            });
        }, { threshold: 0.15 });

        observer.observe(section);
    }

    // Initialize for all 3 sections
    animateCards('pricing');
    animateCards('high-performance');
    animateCards('maintenance');
})();

/* ===== TEXT REVEAL — WORD SPLIT MASKING ===== */
(function () {
    const selectors = [
        '.problem-title',
        '.cases-title',
        '.testimonials-title',
        '.process-header__title',
        '.hp-title-main',
        '.compare-title',
        '.pricing-title',
        '.maintenance-title',
        '.ng-title',
        '.fc-title'
    ];

    const targets = document.querySelectorAll(selectors.join(','));
    if (!targets.length) return;

    function splitTextNodes(element) {
        // Walk only TEXT_NODE children, preserve all HTML tags intact
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
        const textNodes = [];
        while (walker.nextNode()) textNodes.push(walker.currentNode);

        textNodes.forEach(node => {
            const text = node.textContent;
            if (!text.trim()) return; // skip whitespace-only nodes

            const frag = document.createDocumentFragment();
            const words = text.split(/(\s+)/); // split but keep whitespace

            words.forEach(word => {
                if (!word.length) return;
                if (/^\s+$/.test(word)) {
                    // Preserve whitespace as-is
                    frag.appendChild(document.createTextNode(word));
                } else {
                    const outer = document.createElement('span');
                    outer.className = 'text-reveal-word';
                    const inner = document.createElement('span');
                    inner.className = 'word-inner';
                    inner.textContent = word;
                    outer.appendChild(inner);
                    frag.appendChild(outer);
                }
            });

            node.parentNode.replaceChild(frag, node);
        });
    }

    targets.forEach(el => {
        if (el.classList.contains('text-split-done')) return;

        splitTextNodes(el);
        el.classList.add('text-split-done');

        // Remove reveal-up if present
        el.classList.remove('reveal-up');
        el.style.opacity = '1';
        el.style.transform = 'none';

        const words = el.querySelectorAll('.word-inner');
        gsap.to(words, {
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.06,
            scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                once: true
            }
        });
    });
})();

/* ===== SVG LINE DRAWING — ANIME.JS ===== */
(function () {
    if (typeof anime === 'undefined') return;

    // All icon containers across the site
    const iconContainers = document.querySelectorAll(
        '.problem-card__icon, .process-icon, .segment-icon, ' +
        '.ng-card__icon, .fc-option__icon, .fc-card__icon, .footer__icon, ' +
        '.compare-table__criteria'
    );
    if (!iconContainers.length) return;

    iconContainers.forEach(container => {
        const paths = container.querySelectorAll('svg path, svg line, svg polyline, svg rect, svg circle');
        if (!paths.length) return;

        // Set initial state: strokes hidden via dashoffset
        paths.forEach(path => {
            const length = path.getTotalLength ? path.getTotalLength() : 100;
            path.setAttribute('stroke-dasharray', length);
            path.setAttribute('stroke-dashoffset', length);
        });

        // Trigger on scroll
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.unobserve(entry.target);

                    anime({
                        targets: Array.from(paths),
                        strokeDashoffset: [anime.setDashoffset, 0],
                        easing: 'easeInOutCubic',
                        duration: 1200,
                        delay: anime.stagger(150, { start: 200 })
                    });
                }
            });
        }, { threshold: 0.3 });

        observer.observe(container);
    });
})();

/* ===== CARD GLOW BORDER TRAIL + ICON STAGGER BOUNCE ===== */
(function () {
    if (typeof anime === 'undefined') return;

    // All cards that get the glow + bounce effect
    const cards = document.querySelectorAll(
        '.p-card, .hp-card, .m-card, .ng-card, .fc-card, .fc-option, .segment-card, .cta-banner__btn'
    );

    cards.forEach(card => {
        // Add glow class
        card.classList.add('glow-card');

        // Track mouse for glow position
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--glow-x', x + '%');
            card.style.setProperty('--glow-y', y + '%');
        });

        // Stagger bounce on feature list checkmark SVGs
        const featureSvgs = card.querySelectorAll('li svg');
        if (featureSvgs.length) {
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: Array.from(featureSvgs),
                    translateY: [
                        { value: -4, duration: 200 },
                        { value: 0, duration: 400 }
                    ],
                    scale: [
                        { value: 1.3, duration: 200 },
                        { value: 1, duration: 400 }
                    ],
                    delay: anime.stagger(40, { start: 0 }),
                    easing: 'easeOutElastic(1, .6)'
                });
            });
        }
    });
})();

/* ===== PRICE SLOT MACHINE — ANIME.JS ===== */
(function () {
    if (typeof anime === 'undefined') return;

    const priceEls = document.querySelectorAll('.p-card__price, .hp-card__price, .m-card__price');
    if (!priceEls.length) return;

    priceEls.forEach(el => {
        // Parse the original text, preserving HTML children (span, br)
        const originalHTML = el.innerHTML;

        // Extract numeric value from text content
        const fullText = el.textContent;
        const numMatch = fullText.match(/([\d.]+)/);
        if (!numMatch) return;

        const numStr = numMatch[1]; // e.g. "1.500.000" or "30" or "2"
        const isFormatted = numStr.includes('.'); // has dot separators
        const targetNum = parseFloat(numStr.replace(/\./g, '')); // raw number

        // Find the text node that contains the number
        function findNumNode(node) {
            if (node.nodeType === 3 && /\d/.test(node.textContent)) return node;
            for (let child of node.childNodes) {
                const found = findNumNode(child);
                if (found) return found;
            }
            return null;
        }

        const numNode = findNumNode(el);
        if (!numNode) return;

        // Store original text of that node
        const nodeOriginal = numNode.textContent;
        // Find the prefix/suffix around the number in this text node
        const nodeMatch = nodeOriginal.match(/^(.*?)([\d.]+)(.*)$/);
        if (!nodeMatch) return;

        const prefix = nodeMatch[1]; // e.g. "Rp " or ""
        const suffix = nodeMatch[3]; // e.g. "jt" or ""
        const numPart = nodeMatch[2]; // e.g. "1.500.000" or "30"

        // Format number with dots (Indonesian style)
        function formatNum(n) {
            if (isFormatted) {
                return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            }
            return Math.round(n).toString();
        }

        // Set initial display to 0
        numNode.textContent = prefix + formatNum(0) + suffix;

        // Observe and animate
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.unobserve(entry.target);

                    const counter = { val: 0 };
                    anime({
                        targets: counter,
                        val: targetNum,
                        round: 1,
                        duration: 1500,
                        easing: 'easeOutExpo',
                        update: () => {
                            numNode.textContent = prefix + formatNum(counter.val) + suffix;
                        }
                    });
                }
            });
        }, { threshold: 0.2 });

        observer.observe(el);
    });
})();

/* ===== NAV LINK STAGGERED ANIMATION ===== */
(function() {
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        const topSpan = link.querySelector('.nav__link-top');
        if (!topSpan) return;
        
        const text = topSpan.textContent.trim();
        topSpan.innerHTML = '';
        topSpan.setAttribute('data-text', text); 
        
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.setProperty('--delay', `${i * 0.025}s`);
            topSpan.appendChild(span);
        });

        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
})();

/* ===== TITLE HOVER COLOR ANIMATION ===== */
(function() {
    const titles = document.querySelectorAll('.cta-banner__title, .fc-actions__title, .ng-bottom__title, .fc-title');
    
    titles.forEach(title => {
        title.addEventListener('mouseenter', () => {
            gsap.to(title, { scale: 1.02, duration: 0.4, ease: 'power2.out' });
        });

        title.addEventListener('mouseleave', () => {
            gsap.to(title, { scale: 1, duration: 0.4, ease: 'power2.out' });
        });
    });
})();

/* ===== PROBLEM CARD TOGGLE ===== */
document.querySelectorAll('.problem-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('is-active');
    });
});

document.querySelectorAll('.ng-card, .fc-card, .segment-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('is-active');
    });
});
