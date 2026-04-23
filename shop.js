
(function () {

  // ✅ PRODUCTION SAFE LENIS SETTINGS (NO LAG / NO BUG)
  const lenis = new Lenis({
    duration: 1.2,              // smooth but responsive
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smooth: true,
    smoothTouch: false,         // IMPORTANT: prevents mobile glitches
    lerp: 0.1,                  // stable for sticky elements
    wheelMultiplier: 1,         // natural scroll feel
  });

  // ✅ SINGLE RAF LOOP (IMPORTANT - no duplicates)
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // ✅ OPTIONAL: GSAP SYNC (SAFE VERSION)
  if (window.gsap) {
    gsap.ticker.lagSmoothing(0);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
  }

  // ✅ FIX: Refresh on resize (prevents jump/glitch)
  window.addEventListener('resize', () => {
    lenis.resize();
  });

  // ✅ FIX: Prevent scroll freeze on tab switch
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      lenis.resize();
    }
  });

  window.lenis = lenis;

})();










        (function () {
            // PRODUCT DATA
            const products = [
                { id: 1, name: "AI Assistant Pro", category: "Artificial Intelligence", price: 1499, original: 2999, image: "img/p3.png" },
                { id: 2, name: "CloudBox 1TB", category: "Cloud Storage", price: 1999, original: 2499, image: "img/p4.png" },
                { id: 3, name: "VectorCraft", category: "Design and Graphics", price: 1299, original: 1599, image: "img/p5.png" },
                { id: 4, name: "PixelFlow", category: "Design and Graphics", price: 2499, original: 2999, image: "img/p6.png" },
                { id: 5, name: "StreamPlay", category: "Entertainment", price: 899, original: 1299, image: "img/p7.png" },
                { id: 6, name: "CinemaX Pack", category: "Entertainment", price: 1999, original: 3999, image: "img/p9.png" },
                { id: 7, name: "MarketMind", category: "Marketing", price: 1499, original: 1999, image: "img/p1.png" },
                { id: 8, name: "TaskMaster", category: "Productivity", price: 799, original: 999, image: "img/p2.png" },
                { id: 9, name: "SkillBoost", category: "Skill Development", price: 1299, original: 1699, image: "img/p1.png" },
                { id: 10, name: "SkillStudio", category: "Skill Development", price: 1099, original: 1399, image: "img/p2.png" },
                { id: 11, name: "FunBox Lite", category: "Entertainment", price: 499, original: 999, image: "img/p1.png" },
                { id: 12, name: "AI Vision Pack", category: "Artificial Intelligence", price: 2799, original: 3999, image: "img/p2.png" },
                { id: 13, name: "CloudSync Pro", category: "Cloud Storage", price: 3499, original: 4999, image: "img/p1.png" },
                { id: 14, name: "Design Kit X", category: "Design and Graphics", price: 3599, original: 4500, image: "img/p2.png" },
                { id: 15, name: "AdSuite", category: "Marketing", price: 3799, original: 4999, image: "img/p1.png" },
                { id: 16, name: "FocusFlow", category: "Productivity", price: 2199, original: 2999, image: "img/p2.png" },
                { id: 17, name: "LearnHub Annual", category: "Skill Development", price: 4999, original: 6999, image: "img/p1.png" },
                { id: 18, name: "AI Ops Toolkit", category: "Artificial Intelligence", price: 6899, original: 8999, image: "img/p2.png" }
            ];

            // DOM Elements
            const productGrid = document.getElementById('productGrid');
            const resultsCount = document.getElementById('resultsCount');
            const categoryList = document.getElementById('categoryList');
            const priceList = document.getElementById('priceList');
            const activeChips = document.getElementById('activeChips');
            const clearBtn = document.getElementById('clearBtn');

            // Helper Functions
            const formatPrice = (num) => num.toLocaleString('en-IN');
            const discountPercent = (p) => p.original > p.price ? Math.round(((p.original - p.price) / p.original) * 100) : 0;

            // Build Categories
            function buildCategories() {
                const counts = {};
                products.forEach(p => counts[p.category] = (counts[p.category] || 0) + 1);
                const cats = Object.keys(counts).sort();

                categoryList.innerHTML = cats.map(cat => `
        <li class="filter-item" data-cat="${cat}">
          <input type="checkbox" id="cat_${cat.replace(/\s/g, '_')}">
          <label for="cat_${cat.replace(/\s/g, '_')}" class="filter-row">
            <span class="filter-name">${cat}</span>
            <span class="filter-count">(${counts[cat]})</span>
          </label>
        </li>
      `).join('');
            }

            // Render Products
            function renderProducts(list) {
                if (!list.length) {
                    productGrid.innerHTML = '<div class="empty-state">No products found.</div>';
                    resultsCount.textContent = 'Showing 0 results';
                    return;
                }

                productGrid.innerHTML = list.map(p => `
        <article class="card">
          <a href="#">
            <div class="card-thumb">
              <img loading="lazy" src="${p.image}" alt="${p.name}">
              ${discountPercent(p) > 0 ? `<div class="discount">${discountPercent(p)}%</div>` : ''}
            </div>
            <div class="card-body">
              <div class="product-title">${p.name}</div>
              <div class="price-area">
                <div class="price-now">₹${formatPrice(p.price)}</div>
                ${p.original > p.price ? `<div class="price-old">₹${formatPrice(p.original)}</div>` : ''}
              </div>
            </div>
          </a>
        </article>
      `).join('');

                resultsCount.textContent = `Showing ${list.length} result${list.length !== 1 ? 's' : ''}`;
            }

            // Get Active Filters
            function getActiveFilters() {
                const categories = Array.from(document.querySelectorAll('#categoryList input:checked'))
                    .map(cb => cb.closest('.filter-item')?.dataset.cat)
                    .filter(Boolean);

                const priceRadio = document.querySelector('#priceList input[type="radio"]:checked');
                const price = priceRadio?.closest('.filter-item')?.dataset?.value || 'all';

                return { categories, price };
            }

            // Apply Filters
            function applyFilters() {
                const { categories, price } = getActiveFilters();

                let filtered = [...products];

                if (categories.length) {
                    filtered = filtered.filter(p => categories.includes(p.category));
                }

                if (price !== 'all') {
                    if (price.endsWith('+')) {
                        const min = parseInt(price, 10);
                        filtered = filtered.filter(p => p.price >= min);
                    } else {
                        const [min, max] = price.split('-').map(Number);
                        filtered = filtered.filter(p => p.price >= min && p.price <= max);
                    }
                }

                updateActiveChips(categories, price);
                renderProducts(filtered);
            }

            // Update Active Chips
            function updateActiveChips(categories, price) {
                activeChips.innerHTML = '';

                categories.forEach(cat => {
                    const chip = document.createElement('div');
                    chip.className = 'chip';
                    chip.innerHTML = `${cat}<span class="x">✕</span>`;
                    chip.querySelector('.x').onclick = () => {
                        const cb = Array.from(document.querySelectorAll('#categoryList input'))
                            .find(input => input.closest('.filter-item')?.dataset.cat === cat);
                        if (cb) { cb.checked = false; applyFilters(); }
                    };
                    activeChips.appendChild(chip);
                });

                if (price !== 'all') {
                    const chip = document.createElement('div');
                    chip.className = 'chip';
                    const label = price.includes('+') ? `₹${formatPrice(parseInt(price))}+` : `₹${price.split('-').map(v => formatPrice(Number(v))).join(' – ')}`;
                    chip.innerHTML = `${label}<span class="x">✕</span>`;
                    chip.querySelector('.x').onclick = () => {
                        document.querySelector('#price_all').checked = true;
                        applyFilters();
                    };
                    activeChips.appendChild(chip);
                }
            }

            // Reset Filters
            function resetFilters() {
                document.querySelectorAll('#categoryList input').forEach(i => i.checked = false);
                document.querySelector('#price_all').checked = true;
                applyFilters();
            }

            // Event Listeners
            function initEvents() {
                categoryList.addEventListener('change', applyFilters);
                priceList.addEventListener('change', applyFilters);
                clearBtn.addEventListener('click', resetFilters);

                // Click on filter item toggles input
                document.querySelectorAll('#categoryList .filter-item').forEach(item => {
                    item.addEventListener('click', (e) => {
                        if (!e.target.matches('input, label')) {
                            const cb = item.querySelector('input');
                            cb.checked = !cb.checked;
                            applyFilters();
                        }
                    });
                });

                document.querySelectorAll('#priceList .filter-item').forEach(item => {
                    item.addEventListener('click', (e) => {
                        if (!e.target.matches('input, label')) {
                            const radio = item.querySelector('input');
                            radio.checked = true;
                            applyFilters();
                        }
                    });
                });
            }

            // Nav Active State
            function setActiveNav() {
                const currentPage = window.location.pathname.split('/').pop() || 'shop.html';
                document.querySelectorAll('.nav-link').forEach(link => {
                    if (link.getAttribute('href') === currentPage) {
                        link.classList.add('active');
                    }
                });
            }

            // Initialize
            buildCategories();
            renderProducts(products);
            initEvents();
            setActiveNav();
        })();