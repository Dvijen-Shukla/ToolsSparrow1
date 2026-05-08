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

  // ========== PERFECT PHONE SLIDER (UNCHANGED LOGIC) ==========
  const slides = gsap.utils.toArray('.app-slide');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const indicator = document.querySelector('.indicator-progress');

  let currentSlide = 0;
  const totalSlides = slides.length;
  const slideInterval = 6000;
  let intervalId = null;

  function showSlide(index) {
    gsap.to(slides[currentSlide], { 
      opacity: 0, 
      scale: 0.95, 
      duration: 0.4, 
      ease: "power2.out" 
    });

    currentSlide = index;
    const targetSlide = slides[currentSlide];
    targetSlide.classList.add('active');

    gsap.fromTo(targetSlide, 
      { opacity: 0, scale: 0.95, y: 20 },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "back.out(1.7)" 
      }
    );

    gsap.fromTo(targetSlide.querySelectorAll('.app-benefit'),
      { opacity: 0, y: 15 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5, 
        stagger: 0.08,
        ease: "power2.out"
      }
    );

    const percent = Math.max(0, (index / Math.max(1, totalSlides - 1)) * 100);
    gsap.to(indicator, { width: `${percent}%`, duration: 0.6, ease: "power2.out" });
  }

  function nextSlide() { 
    clearInterval(intervalId);
    showSlide((currentSlide + 1) % totalSlides);
    intervalId = setInterval(nextSlide, slideInterval);
  }

  function prevSlide() { 
    clearInterval(intervalId);
    showSlide((currentSlide - 1 + totalSlides) % totalSlides);
    intervalId = setInterval(nextSlide, slideInterval);
  }

  if (nextButton) nextButton.addEventListener('click', nextSlide);
  if (prevButton) prevButton.addEventListener('click', prevSlide);
  
  showSlide(0);
  intervalId = setInterval(nextSlide, slideInterval);

  // ========== ULTRA-SMOOTH PARALLAX (PHONE CENTERED) ==========
  const heroContainer = document.querySelector(".hero-container");
  const phoneContainer = document.querySelector(".phone-parallax-container");
  const lineLefts = gsap.utils.toArray(".line-left");
  const lineRights = gsap.utils.toArray(".line-right");
  const lines = gsap.utils.toArray(".line, .cta-line");
  const textContent = document.querySelector(".text-content");

  let activeTimeline = null;
  const isMobile = () => window.innerWidth < 768;

  // PERFECT CLEANUP
  function killAnimations() {
    if (activeTimeline?.scrollTrigger) activeTimeline.scrollTrigger.kill();
    if (activeTimeline) activeTimeline.kill();
    
    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === heroContainer) st.kill();
    });
    
    gsap.set([phoneContainer, textContent, ...lineLefts, ...lineRights, ...lines], {
      clearProps: "transform,opacity,scale,yPercent,xPercent,filter"
    });
  }

  // ========== DESKTOP: PHONE PERFECTLY CENTERED ==========
  function createDesktopTimeline() {
    const width = window.innerWidth;
    
    // PERFECT responsive values
    const config = width < 1024 && width >= 768 
      ? { moveX: 90, fontSize: "2.4rem", phoneY: 65, scrollEnd: "+=110%", scrub: 1.8 }
      : { moveX: 90, fontSize: "clamp(3rem, 5vw, 5.5rem)", phoneY: 60, scrollEnd: "+=120%", scrub: 2 };

    // PHONE STARTS CENTERED (yPercent: 0) - MOVES UP PERFECTLY
    gsap.set(phoneContainer, { 
      yPercent: config.phoneY, 
      scale: 0.92,
      force3D: true,
      transformOrigin: "center center"
    });
    
    gsap.set([lineLefts, lineRights, lines, textContent], { force3D: true });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroContainer,
        start: "top top",
        end: config.scrollEnd,
        scrub: config.scrub,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        onUpdate: self => self.isActive && gsap.ticker.lagSmoothing(0, 1)
      }
    });

    // SIMULTANEOUS PERFECT MOVEMENT (Phone stays horizontally centered)
    tl.to(phoneContainer, { 
        yPercent: 0,           // Ends perfectly centered vertically
        scale: 1, 
        ease: "power3.out",
        force3D: true 
      }, 0)
     .to(lineLefts, { 
        xPercent: -config.moveX, 
        ease: "power2.out" 
      }, 0)
     .to(lineRights, { 
        xPercent: config.moveX, 
        ease: "power2.out" 
      }, 0)
     .to(lines, { 
        fontSize: config.fontSize, 
        ease: "power2.out" 
      }, 0);

    activeTimeline = tl;
  }

  // ========== MOBILE: PERFECT FLY-IN ==========
  function createMobileTimeline() {
    const width = window.innerWidth;
    const flyDistance = width < 400 ? 140 : width < 550 ? 130 : 120;

    gsap.set(phoneContainer, { 
      yPercent: 80, 
      scale: 0.88,
      force3D: true 
    });
    gsap.set([lineLefts, lineRights, textContent], { 
      opacity: 1, 
      xPercent: 0,
      force3D: true 
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroContainer,
        start: "top top",
        end: "+=180%",
        scrub: 2.1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true
      }
    });

    tl.to(phoneContainer, { 
        yPercent: 0, 
        scale: 1, 
        ease: "power2.out",
        force3D: true 
      }, 0)
     .to(lineLefts, { 
        xPercent: -flyDistance, 
        opacity: 0, 
        ease: "power2.inOut" 
      }, 0)
     .to(lineRights, { 
        xPercent: flyDistance, 
        opacity: 0, 
        ease: "power2.inOut" 
      }, 0)
     .to(textContent, { 
        opacity: 0, 
        ease: "power2.inOut" 
      }, 0);

    activeTimeline = tl;
  }

  // ========== ULTRA-SMOOTH INIT ==========
  function initParallax() {
    killAnimations();
    
    if (isMobile()) {
      createMobileTimeline();
    } else {
      createDesktopTimeline();
    }
    
    // PERFECT REFRESH
    gsap.delayedCall(0.1, () => ScrollTrigger.refresh());
  }

  // SMOOTH RESIZE HANDLING
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initParallax, 120);
  });

  // START PERFECTLY
  requestAnimationFrame(initParallax);

  // ========== SMOOTH INTERACTIONS ==========
  const ctaBtn = document.querySelector(".cta-btn");
  if (ctaBtn) {
    ["mouseenter", "mouseleave"].forEach(event => {
      ctaBtn.addEventListener(event, (e) => {
        const scale = e.type === "mouseenter" ? 1.02 : 1;
        gsap.to(ctaBtn, { scale, duration: 0.15, ease: "power2.out" });
      });
    });
  }

  // PRICE GLOW
  gsap.to(".price-toolsparrow", {
    boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut"
  });

  // PERFECT PERFORMANCE BOOST
  gsap.ticker.lagSmoothing(1000, 16);
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

























