// Lenis - SAME (production optimized)
(function () {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        smooth: true,
        smoothTouch: false,
        lerp: 0.1,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    window.addEventListener('resize', () => lenis.resize());
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) lenis.resize();
    });

    window.lenis = lenis;
})();

// Navigation Active State
(function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });
})();

// Navbar & Search Mobile Logic
document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const searchToggle = document.getElementById('searchToggle');
    const searchWrapper = document.getElementById('searchWrapper');
    const searchInput = document.getElementById('searchInput');
    const hamburger = document.getElementById('hamburgerBtn');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuClose = document.getElementById('menuClose');
    const filters = document.getElementById('filtersSidebar');
    const filterToggleMobile = document.getElementById('filterToggleMobile');
    const filterToggleDesktop = document.getElementById('filterToggleDesktop');

    // Search Toggle (Mobile)
    searchToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 1023) {
            e.stopPropagation();
            searchWrapper.classList.toggle('active');
            if (searchWrapper.classList.contains('active')) {
                setTimeout(() => searchInput.focus(), 150);
            }
        }
    });

    // Mobile Menu Toggle
    const toggleMenu = () => {
        const isActive = menuOverlay.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : '';
    };

    hamburger.addEventListener('click', toggleMenu);
    menuClose.addEventListener('click', toggleMenu);
    
    document.querySelectorAll('.overlay-links a').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Filter Toggle (Mobile/Tablet)
    const toggleFilters = () => {
        filters.classList.toggle('active');
        document.body.style.overflow = filters.classList.contains('active') ? 'hidden' : '';
    };

    if (filterToggleMobile) filterToggleMobile.addEventListener('click', toggleFilters);
    if (filterToggleDesktop) filterToggleDesktop.addEventListener('click', toggleFilters);

    // Close filters on overlay click
    filters.addEventListener('click', (e) => {
        if (e.target === filters) toggleFilters();
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!searchWrapper.contains(e.target) && window.innerWidth <= 1023) {
            searchWrapper.classList.remove('active');
        }
    });

    // ESC Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchWrapper.classList.remove('active');
            if (menuOverlay.classList.contains('active')) toggleMenu();
            if (filters.classList.contains('active')) toggleFilters();
        }
    });

    // Resize handler for responsive behavior
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Reset mobile states on resize
            if (window.innerWidth > 991) {
                filters.classList.remove('active');
                searchWrapper.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, 250);
    });
});

// SHOP FUNCTIONALITY - SAME + MOBILE ENHANCEMENTS
(function () {
    const products = [
        { id: "netflix_premium", name: "Netflix Premium", category: "Entertainment", price: 3799, original: 4999, image: "img/netflix2.png" },
        { id: "canva_pro", name: "Canva Pro", category: "Productivity", price: 1499, original: 2999, image: "img/p5.png" },
        { id: "chatgpt_plus", name: "ChatGPT Plus", category: "Artificial Intelligence", price: 1999, original: 2499, image: "img/chatgpt2.png" },
        { id: "autodesk", name: "Autodesk", category: "Design and Graphics", price: 1299, original: 1599, image: "img/autodesk.png" },
        { id: "spotify_premium", name: "Spotify Premium", category: "Entertainment", price: 2499, original: 2999, image: "img/spotify.jpg" },
        { id: "prime_premium", name: "Prime Video", category: "Entertainment", price: 899, original: 1299, image: "img/prime.png" },
        { id: "coursera_plus", name: "Coursera Plus", category: "Skill Development", price: 1999, original: 3999, image: "img/coursera.jpeg" },
        { id: "capcut_pro", name: "CapCut Pro", category: "Design and Graphics", price: 1499, original: 1999, image: "img/p4.png" },
        { id: "elevenlabs_private", name: "ElevenLabs Private", category: "Artificial Intelligence", price: 799, original: 999, image: "img/elevenlabs.jpeg" },
        { id: "figma_edu_private", name: "Figma Edu Private", category: "Productivity", price: 1299, original: 1699, image: "img/p6.png" },
        { id: "adobe_creative_cloud", name: "Adobe Creative Cloud", category: "Design and Graphics", price: 1099, original: 1399, image: "img/p1.png" },
        { id: "microsoft_365", name: "Microsoft 365", category: "Productivity", price: 1799, original: 2999, image: "img/microsoft365.png" },
        { id: "sonyliv_premium", name: "SonyLiv Premium", category: "Entertainment", price: 499, original: 999, image: "img/sonyliv.png" },
        { id: "jio_hotstar", name: "Jio Hotstar", category: "Entertainment", price: 2799, original: 3999, image: "img/jiohotstar.jpeg" },
        { id: "zee5_premium", name: "Zee5 Premium", category: "Entertainment", price: 3499, original: 4999, image: "img/zee5-2.png" },
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
            productGrid.innerHTML = '<div class="empty-state">No products found matching your filters.<br><small>Try adjusting your filters or search terms.</small></div>';
            resultsCount.textContent = 'Showing 0 results';
            return;
        }

        productGrid.innerHTML = list.map(p => `
            <article class="card">
                <a href="product.html?id=${p.id}" aria-label="${p.name}">
                    <div class="card-thumb">
                        <img loading="lazy" src="${p.image}" alt="${p.name}" 
                             width="300" height="300">
                        ${discountPercent(p) > 0 ? `<div class="discount">-${discountPercent(p)}%</div>` : ''}
                    </div>
                    <div class="card-body">
                        <h3 class="product-title">${p.name}</h3>
                        <div class="price-area">
                            <div class="price-now">₹${formatPrice(p.price)}</div>
                            ${p.original > p.price ? `<div class="price-old">₹${formatPrice(p.original)}</div>` : ''}
                        </div>
                    </div>
                </a>
            </article>
        `).join('');

        resultsCount.textContent = `Showing ${list.length} of ${products.length} results`;
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
            chip.innerHTML = `${cat}<span class="x" title="Remove filter">×</span>`;
            chip.querySelector('.x').onclick = (e) => {
                e.stopPropagation();
                const cb = Array.from(document.querySelectorAll('#categoryList input'))
                    .find(input => input.closest('.filter-item')?.dataset.cat === cat);
                if (cb) {
                    cb.checked = false;
                    cb.dispatchEvent(new Event('change', { bubbles: true }));
                }
            };
            activeChips.appendChild(chip);
        });

        if (price !== 'all') {
            const chip = document.createElement('div');
            chip.className = 'chip';
            const label = price.includes('+') ? `₹${formatPrice(parseInt(price))}+` : `₹${price.split('-').map(v => formatPrice(Number(v))).join(' – ')}`;
            chip.innerHTML = `${label}<span class="x" title="Remove filter">×</span>`;
            chip.querySelector('.x').onclick = (e) => {
                e.stopPropagation();
                document.querySelector('#price_all').checked = true;
                document.querySelector('#price_all').dispatchEvent(new Event('change', { bubbles: true }));
            };
            activeChips.appendChild(chip);
        }
    }

    // Reset Filters
    function resetFilters() {
        document.querySelectorAll('#categoryList input, #priceList input').forEach(i => i.checked = false);
        document.querySelector('#price_all').checked = true;
        document.querySelector('#price_all').dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Preselected Category
    function applyPreselectedCategory() {
        const preselectedCategory = sessionStorage.getItem('preselectedCategory');
        if (preselectedCategory) {
            const categoryItems = document.querySelectorAll('#categoryList .filter-item');
            let categoryFound = false;

            categoryItems.forEach(item => {
                if (item.dataset.cat === preselectedCategory) {
                    const checkbox = item.querySelector('input[type="checkbox"]');
                    if (checkbox) {
                        checkbox.checked = true;
                        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
                        categoryFound = true;
                    }
                }
            });

            sessionStorage.removeItem('preselectedCategory');
        }
    }

    // Event Listeners
    function initEvents() {
        // Filter changes
        categoryList.addEventListener('change', applyFilters);
        priceList.addEventListener('change', applyFilters);
        clearBtn.addEventListener('click', resetFilters);

        // Click on filter items
        document.addEventListener('click', (e) => {
            const filterItem = e.target.closest('.filter-item');
            if (filterItem && !e.target.matches('input, .x')) {
                const input = filterItem.querySelector('input');
                if (input) {
                    input.checked = !input.checked;
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        });
    }

    // Initialize
    buildCategories();
    renderProducts(products);
    initEvents();
    
    // Apply preselected category after short delay
    setTimeout(applyPreselectedCategory, 100);
})();
