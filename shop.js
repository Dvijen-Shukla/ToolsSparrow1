
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
        { id: "netflix_premium", name: "Netflix", category: "Entertainment", price: 3799, original: 4999, image: "img/netflix2.png" },
        { id: "canva_pro", name: "Canva Pro", category: "Productivity", price: 1499, original: 2999, image: "img/p5.png" },
        { id: "chatgpt_plus", name: "Chatgpt Plus", category: "Artificial Intelligence", price: 1999, original: 2499, image: "img/chatgpt2.png" },
        { id: "autodesk", name: "Autodesk", category: "Design and Graphics", price: 1299, original: 1599, image: "img/autodesk.png" },
        { id: "spotify_premium", name: "Spotify", category: "Entertainment", price: 2499, original: 2999, image: "img/spotify.jpg" },
        { id: "prime_premium", name: "Prime Video", category: "Entertainment", price: 899, original: 1299, image: "img/prime.png" },
        { id: "coursera_plus", name: "Coursera Plus", category: "Skill Development", price: 1999, original: 3999, image: "img/coursera.jpeg" },
        { id: "capcut_pro", name: "Capcut Pro", category: "Design and Graphics", price: 1499, original: 1999, image: "img/p4.png" },
        { id: "elevenlabs_private", name: "Eleven Labs Private", category: "Artificial Intelligence", price: 799, original: 999, image: "img/elevenlabs.jpeg" },
        { id: "figma_edu_private", name: "Figma Edu Private", category: "Productivity", price: 1299, original: 1699, image: "img/p6.png" },
        { id: "adobe_creative_cloud", name: "Adobe Creative Cloud", category: "Design and Graphics", price: 1099, original: 1399, image: "img/p1.png" },
        { id: "microsoft_365", name: "Microsoft 365", category: "Productivity", price: 1799, original: 2999, image: "img/microsoft365.png" },
        { id: "sonyliv_premium", name: "SonyLiv", category: "Entertainment", price: 499, original: 999, image: "img/sonyliv.png" },
        { id: "jio_hotstar", name: "Jio Hotstar", category: "Entertainment", price: 2799, original: 3999, image: "img/jiohotstar.jpeg" },
        { id: "zee5_premium", name: "Zee5", category: "Entertainment", price: 3499, original: 4999, image: "img/zee5-2.png" },
        { id: "youtube_premium", name: "YouTube Premium", category: "Entertainment", price: 3599, original: 4500, image: "img/youtube.jpeg" }
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
                <a href="product.html?id=${p.id}">
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

    // ========== CHECK FOR PRESELECTED CATEGORY FROM INDEX PAGE ==========
    function applyPreselectedCategory() {
        const preselectedCategory = sessionStorage.getItem('preselectedCategory');
        if (preselectedCategory) {
            // Find and check the checkbox for this category
            const categoryItems = document.querySelectorAll('#categoryList .filter-item');
            let categoryFound = false;

            categoryItems.forEach(item => {
                const catName = item.getAttribute('data-cat');
                if (catName === preselectedCategory) {
                    const checkbox = item.querySelector('input[type="checkbox"]');
                    if (checkbox) {
                        checkbox.checked = true;
                        categoryFound = true;
                    }
                }
            });

            // Clear the storage so it doesn't apply again on refresh
            sessionStorage.removeItem('preselectedCategory');

            if (categoryFound) {
                // Apply the filters to show products
                applyFilters();

                // Smooth scroll to products section with delay to ensure DOM is ready
                setTimeout(() => {
                    const productsSection = document.querySelector('.products-section');
                    if (productsSection) {
                        // Use Lenis smooth scroll if available
                        if (window.lenis) {
                            window.lenis.scrollTo(productsSection, { offset: 80, duration: 1.2 });
                        } else {
                            productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }
                }, 200);
            }
        }
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

    // Apply preselected category from index page (after everything is loaded)
    setTimeout(() => {
        applyPreselectedCategory();
    }, 150);
})();
