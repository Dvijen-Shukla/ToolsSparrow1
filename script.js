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


// ================= HERO SLIDER (PHONE UI) =================
document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const slides = document.querySelectorAll('.app-slide');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const indicator = document.querySelector('.indicator-progress');

  let currentSlide = 0;
  const totalSlides = slides.length;
  const slideInterval = 6000;
  let interval = setInterval(nextSlide, slideInterval);

  function showSlide(index) {
    gsap.to(slides[currentSlide], {
      opacity: 0,
      x: 30,
      scale: 0.98,
      duration: 0.5
    });

    currentSlide = index;

    gsap.fromTo(slides[currentSlide],
      { opacity: 0, x: 30, scale: 0.98 },
      { opacity: 1, x: 0, scale: 1, duration: 0.7 }
    );

    const benefits = slides[currentSlide].querySelectorAll('.app-benefit');
    benefits.forEach((b, i) => {
      gsap.fromTo(b,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, delay: 0.1 * i }
      );
    });

    updateIndicator(index);
  }

  function updateIndicator(index) {
    const percent = (index / (totalSlides - 1)) * 100;
    gsap.to(indicator, { width: `${percent}%`, duration: 0.5 });
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % totalSlides);
  }

  function prevSlide() {
    showSlide((currentSlide - 1 + totalSlides) % totalSlides);
  }

  nextButton?.addEventListener('click', () => {
    clearInterval(interval);
    nextSlide();
    interval = setInterval(nextSlide, slideInterval);
  });

  prevButton?.addEventListener('click', () => {
    clearInterval(interval);
    prevSlide();
    interval = setInterval(nextSlide, slideInterval);
  });

  showSlide(currentSlide);


  // ================= 🔥 PERFECT PHONE SCROLL (FIXED) =================
  const heroContainer = document.querySelector(".hero-container");
  const phoneContainer = document.querySelector(".phone-parallax-container");
  const phoneShowcase = document.querySelector(".phone-showcase");
  const lines = document.querySelectorAll(".line, .cta-line");
  const lineLefts = document.querySelectorAll(".line-left");
  const lineRights = document.querySelectorAll(".line-right");

  gsap.set(phoneContainer, {
    yPercent: 60,
    scale: 0.9
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heroContainer,
      start: "top top",
      end: "+=120%",
      scrub: 2,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });

  tl.to(phoneContainer, {
    yPercent: 0,
    scale: 1,
    ease: "power3.out"
  }, 0)

  .to(lineLefts, {
    xPercent: -80
  }, 0)

  .to(lineRights, {
    xPercent: 80
  }, 0)

  .to(lines, {
    fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)"
  }, 0);


  // ================= BUTTON HOVER =================
  const ctaBtn = document.querySelector(".cta-btn");
  if (ctaBtn) {
    ctaBtn.addEventListener("mouseenter", () => {
      gsap.to(ctaBtn, { scale: 1.03 });
    });
    ctaBtn.addEventListener("mouseleave", () => {
      gsap.to(ctaBtn, { scale: 1 });
    });
  }

  // ================= PRICE GLOW =================
  gsap.to(".price-toolsparrow", {
    boxShadow: "0 0 15px #333",
    duration: 2,
    repeat: -1,
    yoyo: true
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
