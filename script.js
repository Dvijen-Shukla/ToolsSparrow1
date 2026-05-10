/* ============================================================
   TOOLSPARROW — FINAL PRODUCTION SCRIPT
   Single Lenis, no mobile pin conflicts, zero snap-back
   ============================================================ */

/* ============================================================
   LENIS — ONE INSTANCE, CORRECT CONFIG
   Desktop: smooth + slow feel
   Mobile: native scroll (smoothTouch: false) — DO NOT smooth touch
   ============================================================ */
const lenis = new Lenis({
  smoothTouch: false,      // NEVER smooth touch on mobile — causes all pin conflicts
  lerp: 0.08,
  wheelMultiplier: 0.55,
});

function lenisRAF(time) {
  lenis.raf(time);
  requestAnimationFrame(lenisRAF);
}
requestAnimationFrame(lenisRAF);

// Sync Lenis with ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

/* ============================================================
   GSAP PLUGINS
   ============================================================ */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


/* ============================================================
   NAV ACTIVE
   ============================================================ */
(function () {
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
    link.addEventListener('click', function () {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
})();


/* ============================================================
   SEARCH + HAMBURGER
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const searchToggle = document.getElementById('searchToggle');
  const searchWrapper = document.getElementById('searchWrapper');
  const searchInput = document.getElementById('searchInput');
  const hamburger = document.getElementById('hamburgerBtn');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuClose = document.getElementById('menuClose');

  searchToggle.addEventListener('click', (e) => {
    if (window.innerWidth <= 992) {
      e.stopPropagation();
      searchWrapper.classList.toggle('active');
      if (searchWrapper.classList.contains('active')) searchInput.focus();
    }
  });

  const toggleMenu = () => {
    const isActive = menuOverlay.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.style.overflow = isActive ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggleMenu);
  if (menuClose) menuClose.addEventListener('click', toggleMenu);
  document.querySelectorAll('.overlay-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (menuOverlay.classList.contains('active')) toggleMenu();
    });
  });
  document.addEventListener('click', (e) => {
    if (!searchWrapper.contains(e.target)) searchWrapper.classList.remove('active');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchWrapper.classList.remove('active');
      if (menuOverlay.classList.contains('active')) toggleMenu();
    }
  });
});


/* ============================================================
   PHONE SLIDER
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const slides = gsap.utils.toArray('.app-slide');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const indicator = document.querySelector('.indicator-progress');

  if (!slides.length) return;

  let currentSlide = 0;
  const totalSlides = slides.length;
  let intervalId = null;

  slides.forEach((slide, i) => {
    gsap.set(slide, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 0.95, zIndex: i === 0 ? 2 : 1 });
    if (i === 0) slide.classList.add('active');
  });

  function showSlide(index) {
    const prev = slides[currentSlide];
    const next = slides[index];
    prev.classList.remove('active');
    gsap.to(prev, { opacity: 0, scale: 0.95, duration: 0.35, ease: 'power2.out', zIndex: 1 });
    currentSlide = index;
    next.classList.add('active');
    gsap.fromTo(next,
      { opacity: 0, scale: 0.95, y: 16, zIndex: 2 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)' }
    );
    gsap.fromTo(next.querySelectorAll('.app-benefit'),
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: 'power2.out', delay: 0.15 }
    );
    const pct = (index / Math.max(1, totalSlides - 1)) * 100;
    gsap.to(indicator, { width: `${pct}%`, duration: 0.5, ease: 'power2.out' });
  }

  function nextSlide() {
    clearInterval(intervalId);
    showSlide((currentSlide + 1) % totalSlides);
    intervalId = setInterval(nextSlide, 6000);
  }
  function prevSlide() {
    clearInterval(intervalId);
    showSlide((currentSlide - 1 + totalSlides) % totalSlides);
    intervalId = setInterval(nextSlide, 6000);
  }

  if (nextButton) nextButton.addEventListener('click', nextSlide);
  if (prevButton) prevButton.addEventListener('click', prevSlide);
  intervalId = setInterval(nextSlide, 6000);


  const heroContainer = document.querySelector('.hero-container');
  const phoneContainer = document.querySelector('.phone-parallax-container');
  const lineLefts = gsap.utils.toArray('.line-left');
  const lineRights = gsap.utils.toArray('.line-right');
  const textContent = document.querySelector('.text-content');

  if (!heroContainer || !phoneContainer) return;

  let desktopST = null;
  let mobileRAFId = null;
  const isMobile = () => window.innerWidth < 768;

  /* ---- DESKTOP: normal ScrollTrigger pin ---- */
  function initDesktop() {
    const w = window.innerWidth;
    const moveX = w < 1024 ? 80 : 90;
    const startY = w < 1024 ? 60 : 55;
    const endSize = w < 1024 ? '2.4rem' : 'clamp(3rem, 5vw, 5.5rem)';
    const lines = gsap.utils.toArray('.line, .cta-line');

    gsap.set(phoneContainer, { y: `${startY}vh`, scale: 0.9, opacity: 1 });
    gsap.set([...lineLefts, ...lineRights, textContent], { clearProps: 'xPercent,opacity,x' });
    // Reset font-size to original so it animates from the right start
    gsap.set(lines, { clearProps: 'fontSize' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroContainer,
        start: 'top top',
        end: '+=110%',
        scrub: 2,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
      }
    });

    tl.to(phoneContainer, { y: 0, scale: 1, ease: 'power3.out', force3D: true }, 0)
      .to(lineLefts, { xPercent: -moveX, ease: 'power2.out' }, 0)
      .to(lineRights, { xPercent: moveX, ease: 'power2.out' }, 0)
      .to(lines, { fontSize: endSize, ease: 'power2.out' }, 0);

    desktopST = tl.scrollTrigger;
  }

  /* ---- MOBILE: NO PIN, pure scroll-driven via rAF ---- *//* ---- MOBILE: NO PIN, pure scroll-driven via rAF ---- */
  function initMobile() {
    // Remove any pinning CSS that might be leftover
    heroContainer.style.height = '';
    heroContainer.style.minHeight = '200vh';
    heroContainer.style.position = 'relative';

    gsap.set(phoneContainer, {
      y: '55vh',        // HALF PHONE VISIBLE AT BOTTOM (55vh = bottom edge)
      scale: 0.85,      // Slightly smaller to fit half-view
      opacity: 1,
      force3D: true
    });
    gsap.set([...lineLefts, ...lineRights], { xPercent: 0, opacity: 1 });
    gsap.set(textContent, { opacity: 1 });

    const heroTop = heroContainer.offsetTop;
    const heroHeight = heroContainer.offsetHeight;

    function onScroll() {
      const scrollY = window.scrollY;
      const start = heroTop;
      const end = heroTop + heroHeight - window.innerHeight;
      const raw = (scrollY - start) / Math.max(1, end - start);
      const progress = Math.min(1, Math.max(0, raw));

      // PERFECT: Starts half-visible → moves up to full visible at bottom
      const phoneY = 55 - progress * 45;     // 55vh → 20vh (half → full visible)
      const scale = 0.85 + progress * 0.15; // 0.85 → 1
      const flyDist = window.innerWidth < 400 ? 55 : window.innerWidth < 550 ? 65 : 75;
      const textOpacity = 1 - progress * 1;

      gsap.set(phoneContainer, { y: `${phoneY}vh`, scale, force3D: true });
      gsap.set(lineLefts, { xPercent: -flyDist * progress, opacity: textOpacity });
      gsap.set(lineRights, { xPercent: flyDist * progress, opacity: textOpacity });
      gsap.set(textContent, { opacity: textOpacity });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    mobileRAFId = onScroll;
  }
  
  /* ---- CLEANUP ---- */
  function killAll() {
    if (desktopST) {
      desktopST.kill();
      desktopST = null;
    }
    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === heroContainer) st.kill();
    });
    if (mobileRAFId) {
      window.removeEventListener('scroll', mobileRAFId, { passive: true });
      mobileRAFId = null;
    }
    // Reset hero container styles set by mobile
    heroContainer.style.minHeight = '';
    const allLines = gsap.utils.toArray('.line, .cta-line');
    gsap.set([phoneContainer, textContent, ...lineLefts, ...lineRights, ...allLines], {
      clearProps: 'all'
    });
  }

  /* ---- INIT ---- */
  function init() {
    killAll();
    if (isMobile()) {
      initMobile();
    } else {
      initDesktop();
      gsap.delayedCall(0.1, () => ScrollTrigger.refresh());
    }
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(init, 200);
  }, { passive: true });

  // Wait for fonts/images to load before measuring heights
  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init);
  }


  /* ---- PRICE PULSE ---- */
  gsap.to('.price-toolsparrow', {
    opacity: 0.75, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: 0.4
  });


  /* ============================================================
     CATEGORY SLIDER
     ============================================================ */
  const slider = document.getElementById('slider');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const cards = document.querySelectorAll('.card');

  if (slider && cards.length) {
    const cardW = (cards[0]?.offsetWidth || 300) + 20;
    prevBtn?.addEventListener('click', () => {
      gsap.to(slider, { scrollTo: { x: slider.scrollLeft - cardW }, duration: 1.1, ease: 'power3.out' });
    });
    nextBtn?.addEventListener('click', () => {
      gsap.to(slider, { scrollTo: { x: slider.scrollLeft + cardW }, duration: 1.1, ease: 'power3.out' });
    });

    const categoryMapping = {
      'Artificial Intelligence': 'Artificial Intelligence',
      'Entertainment': 'Entertainment',
      'Design and Graphics': 'Design and Graphics',
      'Skill Development': 'Skill Development',
      'Cloud Storage': 'Cloud Storage',
      'Productivity': 'Productivity',
    };
    cards.forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        const title = card.querySelector('h3')?.innerText.trim();
        const category = title && categoryMapping[title];
        if (category) {
          sessionStorage.setItem('preselectedCategory', category);
          document.body.style.opacity = '0.7';
          document.body.style.transition = 'opacity 0.3s ease';
          setTimeout(() => { window.location.href = 'shop.html'; }, 150);
        }
      });
    });
  }


  /* ============================================================
     PRODUCTS SLIDER + DISCOUNT BADGES
     ============================================================ */
  const toolsSlider = document.getElementById('tools-slider');
  const ottSlider = document.getElementById('ott-slider');
  const pPrev = document.getElementById('products-prev');
  const pNext = document.getElementById('products-next');

  document.querySelectorAll('.product-card').forEach(card => {
    if (card.classList.contains('explore-card')) return;
    const cur = card.querySelector('.current-price');
    const orig = card.querySelector('.original-price');
    const badge = card.querySelector('.discount-badge');
    if (cur && orig && badge) {
      const cp = parseFloat(cur.dataset.price);
      const op = parseFloat(orig.dataset.price);
      badge.textContent = op > cp ? `-${Math.round(((op - cp) / op) * 100)}%` : '';
      if (op <= cp) badge.style.display = 'none';
    }
  });

  pPrev?.addEventListener('click', () => {
    [toolsSlider, ottSlider].forEach(sl => {
      if (sl) gsap.to(sl, { scrollTo: { x: sl.scrollLeft - 340 }, duration: 1, ease: 'power3.out' });
    });
  });
  pNext?.addEventListener('click', () => {
    [toolsSlider, ottSlider].forEach(sl => {
      if (sl) gsap.to(sl, { scrollTo: { x: sl.scrollLeft + 340 }, duration: 1, ease: 'power3.out' });
    });
  });
});
