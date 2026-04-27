
// ==================== PRODUCT DATABASE (15 Products from Shop) ====================
const PRODUCTS_DB = [
    {
        id: "netflix_premium", name: "Netflix", category: "Entertainment", price: 3799, originalPrice: 4999,
        tagline: "4K UHD, Spatial Audio, and four screens — guaranteed for 12 months.",
        img: "img/netflix2.png",
        detailsTitle: "Immersive cinema.<br>On every screen.",
        specs: { "Resolution": "4K Ultra HD + HDR10+", "Simultaneous streams": "4 Screens", "Audio": "Dolby Atmos", "Warranty": "12 months full", "Downloads": "Up to 6 devices" },
        features: ["4K Ultra HD", "Dolby Atmos Audio", "4 Screens at Once", "Download for Offline", "No Ads", "Global Content Library"]
    },
    {
        id: "canva_pro", name: "Canva Pro", category: "Design and Graphics", price: 1499, originalPrice: 2999,
        tagline: "Professional design tools, millions of templates, and brand kit features.",
        img: "img/p5.png",
        detailsTitle: "Design like a pro.<br>Unlimited creativity.",
        specs: { "Templates": "1M+ Premium", "Storage": "1TB Cloud", "AI Features": "Magic Design", "Background Remover": "One-click", "Brand Kit": "Unlimited" },
        features: ["Magic Resize", "Background Remover", "Brand Kit", "Content Planner", "Stock Photos & Videos", "Team Collaboration"]
    },
    {
        id: "chatgpt_plus", name: "ChatGPT Plus", category: "Artificial Intelligence", price: 1999, originalPrice: 2499,
        tagline: "GPT-4 access, faster responses, priority during peak hours.",
        img: "img/chatgpt2.png",
        detailsTitle: "Superior AI.<br>Faster, smarter, better.",
        specs: { "Model": "GPT-4 Turbo", "Context": "128K tokens", "Speed": "2x faster", "Availability": "Always priority", "Features": "Web browsing, DALL-E 3" },
        features: ["GPT-4 Access", "Faster Responses", "Image Generation", "Web Browsing", "Code Interpreter", "Plugin Support"]
    },
    {
        id: "autodesk", name: "Autodesk", category: "Design and Graphics", price: 1299, originalPrice: 1599,
        tagline: "Professional 3D design, engineering, and architectural software.",
        img: "img/autodesk.png",
        detailsTitle: "Create anything.<br>3D mastery.",
        specs: { "Software": "AutoCAD, Maya, 3ds Max", "License": "1 Year", "Devices": "2 Devices", "Updates": "Latest Version", "Support": "24/7 Priority" },
        features: ["AutoCAD Full Access", "3D Modeling", "Rendering Tools", "Cloud Collaboration", "Industry Templates", "Professional Output"]
    },
    {
        id: "spotify_premium", name: "Spotify", category: "Entertainment", price: 2499, originalPrice: 2999,
        tagline: "Ad-free music, offline listening, and unlimited skips.",
        img: "img/spotify.jpg",
        detailsTitle: "Your music.<br>No interruptions.",
        specs: { "Audio Quality": "Very High (320kbps)", "Offline": "10k songs/device", "Skips": "Unlimited", "Podcasts": "Ad-free", "Devices": "5" },
        features: ["No Ads", "Offline Download", "Unlimited Skips", "High Quality Audio", "Podcasts Included", "Cross-device Playback"]
    },
    {
        id: "prime_premium", name: "Prime Video", category: "Entertainment", price: 899, originalPrice: 1299,
        tagline: "Prime Originals, blockbuster movies, and exclusive series.",
        img: "img/prime.png",
        detailsTitle: "Endless entertainment.<br>Watch anywhere.",
        specs: { "Resolution": "4K + HDR", "Streams": "3 Screens", "Audio": "Dolby Digital Plus", "Downloads": "Yes", "Content": "Prime Originals" },
        features: ["Prime Originals", "Movies & Shows", "Offline Viewing", "Family Sharing", "X-Ray Feature", "Rent or Buy Options"]
    },
    {
        id: "coursera_plus", name: "Coursera Plus", category: "Skill Development", price: 1999, originalPrice: 3999,
        tagline: "Unlimited access to 7,000+ courses and professional certificates.",
        img: "img/coursera.jpeg",
        detailsTitle: "Learn from top universities.<br>Advance your career.",
        specs: { "Courses": "7,000+", "Certificates": "Professional", "Universities": "Stanford, Yale, Google", "Projects": "Hands-on", "Self-paced": "Yes" },
        features: ["Unlimited Access", "Professional Certs", "Project Portfolio", "Mobile Learning", "Offline Courses", "Graded Assignments"]
    },
    {
        id: "capcut_pro", name: "Capcut Pro", category: "Marketing", price: 1499, originalPrice: 1999,
        tagline: "Professional video editing with premium effects and templates.",
        img: "img/p4.png",
        detailsTitle: "Edit like a pro.<br>Go viral.",
        specs: { "Templates": "Premium Access", "Effects": "All Pro Effects", "Export": "4K No Watermark", "Storage": "100GB Cloud", "Team": "Collaboration" },
        features: ["No Watermark", "Pro Effects", "Motion Tracking", "Keyframe Animation", "Text Animation", "Royalty-free Music"]
    },
    {
        id: "elevenlabs_private", name: "Eleven Labs Private", category: "Artificial Intelligence", price: 799, originalPrice: 999,
        tagline: "Ultra-realistic AI voice generation and voice cloning.",
        img: "img/elevenlabs.jpeg",
        detailsTitle: "Lifelike voices.<br>Instant generation.",
        specs: { "Voices": "100+ Premium", "Cloning": "Professional", "Languages": "29+", "API": "Full Access", "Quality": "Studio Grade" },
        features: ["Voice Cloning", "Emotion Control", "Multi-language", "API Access", "Studio Quality", "Custom Pronunciations"]
    },
    {
        id: "figma_edu_private", name: "Figma Edu Private", category: "Design and Graphics", price: 1299, originalPrice: 1699,
        tagline: "Professional UI/UX design tool with team collaboration.",
        img: "img/p6.png",
        detailsTitle: "Design systems.<br>Team collaboration.",
        specs: { "Projects": "Unlimited", "Team Libraries": "Full Access", "Plugins": "All Premium", "Devices": "Unlimited", "Storage": "Unlimited" },
        features: ["Team Libraries", "Dev Mode", "Prototyping", "Plugins Access", "Version History", "Whiteboard"]
    },
    {
        id: "adobe_creative_cloud", name: "Adobe Creative Cloud", category: "Design and Graphics", price: 1099, originalPrice: 1399,
        tagline: "Full suite: Photoshop, Illustrator, Premiere Pro, After Effects.",
        img: "img/p1.png",
        detailsTitle: "Creative suite.<br>20+ apps included.",
        specs: { "Apps": "20+ Apps", "Storage": "100GB", "Fonts": "Adobe Fonts", "Portfolio": "Personal Site", "Tutorials": "Premium" },
        features: ["Photoshop Full", "Illustrator", "Premiere Pro", "After Effects", "Cloud Storage", "Adobe Fonts"]
    },
    {
        id: "microsoft_365", name: "Microsoft 365", category: "Productivity", price: 1799, originalPrice: 2999,
        tagline: "Word, Excel, PowerPoint, OneDrive, and Teams — full family access for 12 months.",
        img: "img/microsoft365.png",
        detailsTitle: "Office everywhere.<br>Work smarter.",
        specs: { "Apps": "Word, Excel, PowerPoint, Outlook", "Cloud Storage": "1TB OneDrive", "Users": "6 family members", "License": "12 months", "Devices": "PC, Mac, Mobile, Tablet" },
        features: ["Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint", "OneDrive Cloud", "Microsoft Teams", "Outlook Email"]
    },
    {
        id: "sonyliv_premium", name: "SonyLiv", category: "Entertainment", price: 499, originalPrice: 999,
        tagline: "Live sports, original series, and blockbuster movies.",
        img: "img/sonyliv.png",
        detailsTitle: "Sports & drama.<br>All in one.",
        specs: { "Resolution": "Full HD", "Streams": "2 Screens", "Live Sports": "Cricket, Football", "Originals": "Exclusive", "Device Limit": "5" },
        features: ["Live Sports", "Sony Originals", "Movies Library", "Kids Content", "Download Option", "Multi-language"]
    },
    {
        id: "jio_hotstar", name: "Jio Hotstar", category: "Entertainment", price: 2799, originalPrice: 3999,
        tagline: "Disney+ Marvel, Star Wars, HBO, and live IPL cricket.",
        img: "img/jiohotstar.jpeg",
        detailsTitle: "Magic of Disney.<br>Thrill of sports.",
        specs: { "Content": "Disney+, Marvel, Star Wars", "Live Sports": "IPL, Cricket", "Streams": "4 Screens", "Quality": "4K", "HBO": "Full Access" },
        features: ["Disney+ Library", "Marvel & Star Wars", "HBO Originals", "Live IPL", "4K Streaming", "Download & Watch"]
    },
    {
        id: "zee5_premium", name: "Zee5", category: "Entertainment", price: 3499, originalPrice: 4999,
        tagline: "ZEE Originals, movies, and live TV channels.",
        img: "img/zee5-2.png",
        detailsTitle: "Binge-worthy.<br>Live TV included.",
        specs: { "Live TV": "90+ Channels", "Originals": "ZEE5 Exclusives", "Streams": "4 Screens", "Languages": "12+", "Downloads": "Yes" },
        features: ["Live TV Channels", "ZEE Originals", "Movies Library", "Multi-language", "Offline Download", "Kid's Zone"]
    },
    {
        id: "youtube_premium", name: "YouTube Premium", category: "Entertainment", price: 3599, originalPrice: 4500,
        tagline: "No ads, background play, and YouTube Music included.",
        img: "img/youtube.jpeg",
        detailsTitle: "Watch & listen ad‑free.<br>Anywhere, anytime.",
        specs: { "Video": "Ad-free 4K", "Background": "Picture-in-Picture", "YouTube Music": "Included", "Downloads": "Unlimited", "Originals": "YouTube Originals" },
        features: ["No Ads", "Background Play", "YouTube Music", "Offline Downloads", "YouTube Originals", "PiP Mode"]
    }
];

// Category display names
const CATEGORY_NAMES = {
    "Entertainment": "Entertainment",
    "Design and Graphics": "Design & Graphics",
    "Artificial Intelligence": "AI & Tech",
    "Skill Development": "Learning",
    "Productivity": "Productivity"  
};

const WHATSAPP_NUMBER = "9023992728";

function getProductFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) return PRODUCTS_DB[0];
    return PRODUCTS_DB.find(p => p.id === id) || null;
}

function getRelatedProducts(product) {
    let related = PRODUCTS_DB.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    if (related.length < 4) {
        const others = PRODUCTS_DB.filter(p => p.id !== product.id && !related.includes(p));
        related = [...related, ...others.slice(0, 4 - related.length)];
    }
    return related;
}

function renderSpecs(specs) {
    if (!specs) return '<div class="spec-row-minimal"><span class="spec-label">Premium Access</span><span class="spec-value">Full Features</span></div>';
    return Object.entries(specs).map(([label, val]) => `
                <div class="spec-row-minimal">
                    <span class="spec-label">${label}</span>
                    <span class="spec-value">${val}</span>
                </div>
            `).join('');
}

function renderFeatures(features) {
    const featureList = features || ["Premium Quality", "12-Month Warranty", "24/7 Support", "Instant Delivery", "Secure Access", "Best Price"];
    return featureList.slice(0, 6).map((feat, idx) => `
                <div class="feature-tile">
                    <div class="tile-icon"><i class="fas ${['fa-star', 'fa-bolt', 'fa-shield-alt', 'fa-rocket', 'fa-crown', 'fa-infinity'][idx % 6]}"></i></div>
                    <h4>${feat}</h4>
                    <p>${feat} with full support and warranty.</p>
                </div>
            `).join('');
}

function renderProductPage(product) {
    if (!product) {
        document.getElementById('productContainer').innerHTML = `
                    <div class="error-state">
                        <i class="fas fa-exclamation-triangle" style="font-size:3rem; margin-bottom:1rem;"></i>
                        <h2>Product not found</h2>
                        <p>The product you are looking for does not exist.</p>
                        <a href="shop.html" style="color:#a78bfa;">Browse shop →</a>
                    </div>`;
        return;
    }

    const relatedProducts = getRelatedProducts(product);
    const categoryDisplay = CATEGORY_NAMES[product.category] || product.category;

    const html = `
                <div class="hero-minimal">
                    <h1>${product.name}</h1>
                    <p>${product.tagline}</p>
                    <div class="price-minimal">
                        <span class="current">₹${product.price.toLocaleString('en-IN')}</span>
                        <span class="original">₹${product.originalPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div class="actions-minimal">
                        <button class="btn-buy" id="whatsappBtn"><i class="fab fa-whatsapp"></i> Buy Now</button>
                        <button class="btn-wish-minimal" id="wishlistBtn" data-id="${product.id}"><i class="far fa-heart"></i> Wishlist</button>
                    </div>
                </div>
                <div class="product-duo">
                    <div class="image-soft">
                        <img src="${product.img}" alt="${product.name}" onerror="this.src='https://placehold.co/1000x1000/080808/ffffff?text=${product.name}'">
                    </div>
                    <div class="right-details">
                        <div class="details-title">${product.detailsTitle}</div>
                        <div class="spec-list">${renderSpecs(product.specs)}</div>
                        <div class="trust-inline">
                            <span><i class="fas fa-circle"></i> 5,000+ active members</span>
                            <span><i class="fas fa-circle"></i> Instant delivery</span>
                            <span><i class="fas fa-circle"></i> 24/7 support</span>
                        </div>
                    </div>
                </div>
                <div class="feature-wall">${renderFeatures(product.features)}</div>
                <div class="value-section">
                    <div class="value-title">Why choose ToolsSparrow</div>
                    <div class="value-grid">
                        <div class="value-card"><i class="fas fa-bolt"></i><h4>Instant delivery</h4><p>Credentials in your WhatsApp within minutes.</p></div>
                        <div class="value-card"><i class="fas fa-medal"></i><h4>12-month warranty</h4><p>Replacement within 2 hours or full refund.</p></div>
                        <div class="value-card"><i class="fas fa-headset"></i><h4>24/7 human support</h4><p>Real people, real help. Always available.</p></div>
                    </div>
                </div>
                <div class="steps-panel">
                    <h3>How to start</h3>
                    <div class="steps-row">
                        <div class="step-item"><div class="step-num">1</div><h5>Order via WhatsApp</h5><p>Click & complete payment</p></div>
                        <div class="step-item"><div class="step-num">2</div><h5>Receive login</h5><p>5–10 min delivery</p></div>
                        <div class="step-item"><div class="step-num">3</div><h5>Activate & enjoy</h5><p>Works on all devices</p></div>
                        <div class="step-item"><div class="step-num">4</div><h5>Warranty active</h5><p>12 months protection</p></div>
                    </div>
                </div>
                <div class="faq-module">
                    <h2>Questions. Answered.</h2>
                    <div class="faq-list">
                        <div class="faq-entry active"><div class="faq-q"><span>Is this a genuine premium account?</span><i class="fas fa-plus faq-arrow"></i></div><div class="faq-a">Yes, full premium access with 12-month warranty.</div></div>
                        <div class="faq-entry"><div class="faq-q"><span>How do you ensure trust and security?</span><i class="fas fa-plus faq-arrow"></i></div><div class="faq-a">We never ask for your password. 5000+ verified customers.</div></div>
                        <div class="faq-entry"><div class="faq-q"><span>Which devices are compatible?</span><i class="fas fa-plus faq-arrow"></i></div><div class="faq-a">All modern devices: Smart TVs, phones, tablets, web, game consoles.</div></div>
                    </div>
                </div>
                <div class="warranty-banner">
                    <i class="fas fa-award" style="font-size: 2rem; color: #ff4d4d; margin-bottom: 16px; display: inline-block;"></i>
                    <h3 style="font-weight: 500; font-size: 1.2rem;">12-month peace of mind warranty</h3>
                    <p style="color: var(--text-dim); max-width: 480px; margin: 12px auto 0;">Any issue? We replace within 2 hours or refund fully.</p>
                </div>
                <div class="related-section">
                    <h3>Explore more in ${categoryDisplay}</h3>
                    <div class="related-grid" id="relatedGrid">
                        ${relatedProducts.map(rel => `
                            <div class="rel-item" data-id="${rel.id}">
                                <div class="rel-img"><img src="${rel.img}" alt="${rel.name}" onerror="this.src='https://placehold.co/400x400/111/888?text=${rel.name}'" loading="lazy"></div>
                                <div class="rel-detail">
                                    <span class="rel-name">${rel.name}</span>
                                    <div><span class="rel-prices">₹${rel.price.toLocaleString('en-IN')}</span></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

    document.getElementById('productContainer').innerHTML = html;
    attachInteractions(product);
}

function attachInteractions(product) {
    // WhatsApp Buy Button
    const waBtn = document.getElementById('whatsappBtn');
    if (waBtn) {
        waBtn.addEventListener('click', () => {
            const msg = encodeURIComponent(`Hello ToolsSparrow! I want to order ${product.name} (₹${product.price}).`);
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
        });
    }

    // Wishlist Button
    const wishBtn = document.getElementById('wishlistBtn');
    if (wishBtn) {
        let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        if (wishlist.includes(product.id)) {
            wishBtn.classList.add('active');
            wishBtn.innerHTML = '<i class="fas fa-heart"></i> Wishlisted';
        }
        wishBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let w = JSON.parse(localStorage.getItem('wishlist') || '[]');
            if (wishBtn.classList.contains('active')) {
                wishBtn.classList.remove('active');
                wishBtn.innerHTML = '<i class="far fa-heart"></i> Wishlist';
                w = w.filter(id => id !== product.id);
            } else {
                wishBtn.classList.add('active');
                wishBtn.innerHTML = '<i class="fas fa-heart"></i> Wishlisted';
                if (!w.includes(product.id)) w.push(product.id);
            }
            localStorage.setItem('wishlist', JSON.stringify(w));
        });
    }

    // Related Products Navigation
    document.querySelectorAll('.rel-item').forEach(el => {
        el.addEventListener('click', () => {
            const id = el.getAttribute('data-id');
            if (id) window.location.href = `product.html?id=${id}`;
        });
    });

    // FAQ Toggle
    document.querySelectorAll('.faq-entry').forEach(f => {
        f.addEventListener('click', () => {
            const active = f.classList.contains('active');
            document.querySelectorAll('.faq-entry').forEach(i => i.classList.remove('active'));
            if (!active) f.classList.add('active');
        });
    });

    // GSAP Animations
    if (typeof gsap !== 'undefined') {
        gsap.set(['.hero-minimal h1', '.hero-minimal p', '.price-minimal', '.actions-minimal', '.product-duo', '.feature-tile', '.value-card', '.steps-panel', '.faq-module', '.warranty-banner', '.related-section'], { opacity: 0, y: 20 });
        gsap.timeline({ defaults: { duration: 0.5, ease: "power1.out", opacity: 1, y: 0 } })
            .to('.hero-minimal h1', {})
            .to('.hero-minimal p', {}, "-=0.35")
            .to('.price-minimal', {}, "-=0.3")
            .to('.actions-minimal', {}, "-=0.25")
            .to('.product-duo', {}, "-=0.2");

        ['.feature-tile', '.value-card', '.steps-panel', '.faq-module', '.warranty-banner', '.related-section'].forEach(sel => {
            gsap.to(sel, { scrollTrigger: { trigger: sel, start: 'top 90%', toggleActions: 'play none none reverse' }, opacity: 1, y: 0, duration: 0.45 });
        });
    }
}

function init() {
    // Smooth Scroll
    const lenis = new Lenis({ duration: 0.8, smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    const product = getProductFromUrl();
    renderProductPage(product);

    // Active Nav Link
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === 'product.html') link.classList.add('active');
    });
}

init();