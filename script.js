// ================= NAV ACTIVE =================
const navLinks = document.querySelectorAll('.nav-link');
const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

navLinks.forEach(link => {
  link.addEventListener("click", function () {
    navLinks.forEach(l => l.classList.remove("active"));
    this.classList.add("active");
  });
});


document.addEventListener('DOMContentLoaded', () => {
  // Select elements
  const searchToggle = document.getElementById('searchToggle');
  const searchWrapper = document.getElementById('searchWrapper');
  const searchInput = document.getElementById('searchInput');
  const hamburger = document.getElementById('hamburgerBtn');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuClose = document.getElementById('menuClose');

  searchToggle.addEventListener('click', (e) => {
    if (window.innerWidth <= 992) {
      e.stopPropagation(); // Prevents document click from closing it immediately
      searchWrapper.classList.toggle('active');

      if (searchWrapper.classList.contains('active')) {
        searchInput.focus();
      }
    }
  });
  const toggleMenu = () => {
    const isActive = menuOverlay.classList.toggle('active');
    hamburger.classList.toggle('active');

    // Prevent body from scrolling when menu is open
    document.body.style.overflow = isActive ? 'hidden' : '';
  };

  // Attach listeners to Hamburger and the internal Close button
  hamburger.addEventListener('click', toggleMenu);
  if (menuClose) menuClose.addEventListener('click', toggleMenu);

  document.querySelectorAll('.overlay-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (menuOverlay.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
  document.addEventListener('click', (e) => {
    if (!searchWrapper.contains(e.target)) {
      searchWrapper.classList.remove('active');
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchWrapper.classList.remove('active');
      if (menuOverlay.classList.contains('active')) {
        toggleMenu();
      }
    }
  });
});





document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  // ========== PHONE SLIDER LOGIC — YOUR ORIGINAL, UNCHANGED ==========
  const slides = document.querySelectorAll('.app-slide');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const indicator = document.querySelector('.indicator-progress');

  let currentSlide = 0;
  const totalSlides = slides.length;
  const slideInterval = 6000;
  let interval = setInterval(nextSlide, slideInterval);

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    gsap.to(slides[currentSlide], { opacity: 0, x: 30, scale: 0.98, duration: 0.5 });

    currentSlide = index;
    slides[currentSlide].classList.add('active');

    gsap.fromTo(slides[currentSlide],
      { opacity: 0, x: 30, scale: 0.98 },
      { opacity: 1, x: 0, scale: 1, duration: 0.7 }
    );

    const benefits = slides[currentSlide].querySelectorAll('.app-benefit');
    benefits.forEach((b, i) => {
      gsap.fromTo(b, { opacity: 0, y: 10 }, { opacity: 1, y: 0, delay: 0.1 * i });
    });

    updateIndicator(index);
  }

  function updateIndicator(index) {
    const percent = (index / (totalSlides - 1)) * 100;
    gsap.to(indicator, { width: `${percent}%`, duration: 0.5 });
  }

  function nextSlide() { showSlide((currentSlide + 1) % totalSlides); }
  function prevSlide() { showSlide((currentSlide - 1 + totalSlides) % totalSlides); }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      clearInterval(interval);
      nextSlide();
      interval = setInterval(nextSlide, slideInterval);
    });
  }
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      clearInterval(interval);
      prevSlide();
      interval = setInterval(nextSlide, slideInterval);
    });
  }
  showSlide(currentSlide);

  // ========== SMOOTH, PERFECTLY CENTRED PARALLAX (NO LAG) ==========
  const heroContainer  = document.querySelector(".hero-container");
  const phoneContainer = document.querySelector(".phone-parallax-container");
  const lineLefts      = document.querySelectorAll(".line-left");
  const lineRights     = document.querySelectorAll(".line-right");
  const lines          = document.querySelectorAll(".line, .cta-line");
  const ctaBtn         = document.querySelector(".cta-btn");
  const textContent    = document.querySelector(".text-content");

  const isMobile = () => window.innerWidth < 768;
  let activeTimeline = null;

  // ---- Kill old animations cleanly ----
  function killScrollTriggers() {
    if (activeTimeline) {
      if (activeTimeline.scrollTrigger) activeTimeline.scrollTrigger.kill();
      activeTimeline.kill();
      activeTimeline = null;
    }
    ScrollTrigger.getAll().forEach(st => {
      if (st.vars.trigger === heroContainer) st.kill();
    });
    // Remove only inline transforms – never touch CSS layout
    gsap.set([phoneContainer, textContent, ...lineLefts, ...lineRights, ...lines], {
      clearProps: "transform,opacity,filter"
    });
  }

  // ========== DESKTOP ANIMATION (≥768px) – YOUR ORIGINAL LOGIC, UNCHANGED ==========
  function buildDesktopAnimation() {
    const width = window.innerWidth;

    let moveLeft       = -80;
    let moveRight      = 80;
    let fontSizeTarget = "clamp(3rem, 5vw, 5.5rem)";
    let phoneStartY    = 60;
    let phoneEndY      = 0;
    let scrollEnd      = "+=120%";
    let scrubValue     = 2;

    if (width < 550) {
      moveLeft       = -15;
      moveRight      = 15;
      fontSizeTarget = "1.4rem";
      phoneStartY    = 40;
      scrollEnd      = "+=70%";
      scrubValue     = 1.5;
    } else if (width < 1024) {
      moveLeft       = -40;
      moveRight      = 40;
      fontSizeTarget = "clamp(2rem, 4vw, 4rem)";
      phoneStartY    = 50;
      scrollEnd      = "+=100%";
      scrubValue     = 1.8;
    }

    gsap.set(phoneContainer, { yPercent: phoneStartY, scale: 0.9 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroContainer,
        start: "top top",
        end: scrollEnd,
        scrub: scrubValue,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true      // reduces lag on fast scroll
      }
    });

    tl.to(phoneContainer, { yPercent: phoneEndY, scale: 1, ease: "power3.out" }, 0)
      .to(lineLefts,  { xPercent: moveLeft,      ease: "power2.out" }, 0)
      .to(lineRights, { xPercent: moveRight,     ease: "power2.out" }, 0)
      .to(lines,      { fontSize: fontSizeTarget, ease: "power2.out" }, 0);

    activeTimeline = tl;
  }

  // ========== MOBILE ANIMATION (<768px) – BUTTER SMOOTH & PERFECT CENTRE ==========
  function buildMobileAnimation() {
    const w = window.innerWidth;

    // Phone starts at bottom, ends at TRUE vertical centre
    // (bottom:-40px is removed by CSS media query for mobile)
    const phoneStartY = 75;
    const phoneEndY   = 0;          // now ends at exact centre because bottom offset is gone

    const flyX       = w < 400 ? 150 : w < 550 ? 135 : 120;
    const blurAmount = "12px";

    // Set initial states – phone at bottom, text fully visible
    gsap.set(phoneContainer, { yPercent: phoneStartY, scale: 0.88 });
    gsap.set([...lineLefts, ...lineRights], { xPercent: 0, opacity: 1, filter: "blur(0px)" });
    gsap.set(textContent, { opacity: 1 });

    // ---- ONE SINGLE TIMELINE – NO EXTRA HOLD PHASE TO AVOID JITTER ----
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroContainer,
        start: "top top",
        end: "+=200%",
        scrub: 2.2,               // slightly higher = smoother, less jumpy
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true       // kills micro‑jitter on fast flicks
      }
    });

    tl
      .to(phoneContainer, { yPercent: phoneEndY, scale: 1, ease: "power2.out" }, 0)
      .to(lineLefts,      { xPercent: -flyX, opacity: 0, filter: `blur(${blurAmount})`, ease: "power2.inOut" }, 0)
      .to(lineRights,     { xPercent:  flyX, opacity: 0, filter: `blur(${blurAmount})`, ease: "power2.inOut" }, 0)
      .to(textContent,    { opacity: 0, ease: "power2.inOut" }, 0);

    activeTimeline = tl;
  }

  // ========== INIT + RESIZE (DEBOUNCED & SMOOTH) ==========
  function initParallax() {
    killScrollTriggers();
    if (isMobile()) {
      buildMobileAnimation();
    } else {
      buildDesktopAnimation();
    }
    ScrollTrigger.refresh();
  }

  initParallax();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initParallax, 150);
  });

  // ========== CTA HOVER – UNCHANGED ==========
  if (ctaBtn) {
    ctaBtn.addEventListener("mouseenter", () => gsap.to(ctaBtn, { scale: 1.03, duration: 0.2 }));
    ctaBtn.addEventListener("mouseleave", () => gsap.to(ctaBtn, { scale: 1, duration: 0.2 }));
  }

  // ========== PRICE GLOW – UNCHANGED ==========
  gsap.to(".price-toolsparrow", {
    boxShadow: "0 0 15px rgba(139, 92, 246, 0.4)",
    duration: 2,
    repeat: -1,
    yoyo: true
  });
});






// ================= CATEGORY SLIDER WITH SHOP NAVIGATION =================
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('slider');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const cards = document.querySelectorAll('.card');

  if (!slider || cards.length === 0) return;

  const cardGap = 20;
  const cardWidth = cards[0]?.offsetWidth + cardGap || 300;
  let scrollAmount = 0;

  if (window.gsap && window.ScrollToPlugin) {
    gsap.registerPlugin(ScrollToPlugin);
  }

  function scrollTo(direction) {
    scrollAmount = slider.scrollLeft + direction * cardWidth;
    if (window.gsap) {
      gsap.to(slider, {
        scrollTo: { x: scrollAmount },
        duration: 1.2,
        ease: 'power3.out'
      });
    } else {
      slider.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  prevBtn?.addEventListener('click', () => scrollTo(-1));
  nextBtn?.addEventListener('click', () => scrollTo(1));

  // ========== CATEGORY CARD CLICK HANDLER ==========
  const categoryMapping = {
    "Artificial Intelligence": "Artificial Intelligence",
    "Entertainment": "Entertainment",
    "Design and Graphics": "Design and Graphics",
    "Skill Development": "Skill Development",
    "Cloud Storage": "Cloud Storage",
    "Productivity": "Productivity"
  };

  cards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const titleElement = card.querySelector('h3');
      if (!titleElement) return;

      const cardTitle = titleElement.innerText.trim();
      const category = categoryMapping[cardTitle];

      if (category) {
        // Add a loading/transition class for smooth effect
        document.body.style.opacity = '0.7';
        document.body.style.transition = 'opacity 0.3s ease';

        // Store the selected category in sessionStorage
        sessionStorage.setItem('preselectedCategory', category);

        // Redirect to shop page
        setTimeout(() => {
          window.location.href = 'shop.html';
        }, 150);
      }
    });
  });
});

// ================= PRODUCTS SLIDER =================
document.addEventListener('DOMContentLoaded', () => {
  const toolsSlider = document.getElementById('tools-slider');
  const ottSlider = document.getElementById('ott-slider');
  const prevBtn = document.getElementById('products-prev');
  const nextBtn = document.getElementById('products-next');

  const cardWidth = 340;

  function calcDiscount(card) {
    if (card.classList.contains('explore-card')) return;

    const cur = card.querySelector('.current-price');
    const orig = card.querySelector('.original-price');
    const badge = card.querySelector('.discount-badge');

    if (cur && orig && badge) {
      const cp = parseFloat(cur.dataset.price);
      const op = parseFloat(orig.dataset.price);

      if (op > cp) {
        const disc = Math.round(((op - cp) / op) * 100);
        badge.textContent = `-${disc}%`;
      } else {
        badge.style.display = 'none';
      }
    }
  }

  document.querySelectorAll('.product-card').forEach(calcDiscount);

  function scrollSliders(direction) {
    [toolsSlider, ottSlider].forEach(slider => {
      if (!slider) return;

      gsap.to(slider, {
        scrollTo: { x: slider.scrollLeft + direction * cardWidth },
        duration: 1,
        ease: 'power3.out'
      });
    });
  }

  prevBtn?.addEventListener('click', () => scrollSliders(-1));
  nextBtn?.addEventListener('click', () => scrollSliders(1));
});


// ================= LENIS + GSAP PERFECT SYNC =================
const lenis = new Lenis({
  duration: 4.5,
  smooth: true,
  lerp: 0.05,
  wheelMultiplier: 0.45
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

























