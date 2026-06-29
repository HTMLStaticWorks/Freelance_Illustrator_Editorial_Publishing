/* 
    FREELANCE ILLUSTRATION STUDIO PLATFORM
    Core JavaScript Interactions
*/

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initDirection();
    initNavbar();
    initSidebarMenu();
    initAntiGravity();
    initParticles();
    initBackToTop();
    initScrollAnimations();
});

// Theme Management (Dark/Light)
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    window.toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };
}

// Direction Management (RTL/LTR)
function initDirection() {
    const savedDir = localStorage.getItem('dir') || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);

    window.toggleDirection = () => {
        const currentDir = document.documentElement.getAttribute('dir');
        const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
        document.documentElement.setAttribute('dir', newDir);
        localStorage.setItem('dir', newDir);
        location.reload(); // Reload to apply mirror effects properly if needed
    };
}

// Navbar Scroll Effect
function initNavbar() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    const navCollapse = nav.querySelector('.navbar-collapse');
    if (!navCollapse) return;

    const navbarOverlay = document.createElement('div');
    navbarOverlay.className = 'navbar-overlay';
    document.body.appendChild(navbarOverlay);

    const isResponsiveViewport = () => window.innerWidth <= 1024;

    const hideNavbarDrawer = () => {
        navbarOverlay.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
    };

    const showNavbarDrawer = () => {
        if (!isResponsiveViewport()) return;
        navbarOverlay.classList.add('active');
        document.body.classList.add('overflow-hidden');
    };

    navCollapse.addEventListener('shown.bs.collapse', showNavbarDrawer);
    navCollapse.addEventListener('hidden.bs.collapse', hideNavbarDrawer);

    const closeNavbarDrawer = () => {
        if (!window.bootstrap || !isResponsiveViewport()) return;
        const instance = window.bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false });
        instance.hide();
    };

    navbarOverlay.addEventListener('click', () => {
        closeNavbarDrawer();
    });

    const closeButton = navCollapse.querySelector('.navbar-close-btn');
    if (closeButton) {
        closeButton.addEventListener('click', closeNavbarDrawer);
    }

    navCollapse.querySelectorAll('.nav-link, .btn').forEach(link => {
        link.addEventListener('click', () => {
            closeNavbarDrawer();
        });
    });

    window.addEventListener('resize', () => {
        if (!isResponsiveViewport()) {
            hideNavbarDrawer();
            navCollapse.classList.remove('show');
        }
    });
}

function initSidebarMenu() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    if (!sidebar || !mainContent) return;

    const firstHeader = mainContent.querySelector('header');

    const triggerWrap = document.createElement('div');
    triggerWrap.className = 'sidebar-mobile-trigger';
    triggerWrap.innerHTML = '<button class="sidebar-hamburger-btn" type="button" aria-label="Open Menu"><i class="bi bi-list"></i></button>';

    if (firstHeader) {
        firstHeader.prepend(triggerWrap);
    } else {
        mainContent.prepend(triggerWrap);
    }

    const hamburgerBtn = triggerWrap.querySelector('.sidebar-hamburger-btn');
    const sidebarOverlay = document.createElement('div');
    sidebarOverlay.className = 'sidebar-overlay';
    document.body.appendChild(sidebarOverlay);

    const isResponsiveViewport = () => window.innerWidth <= 1024;

    const openSidebar = () => {
        if (!isResponsiveViewport()) return;
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.classList.add('overflow-hidden');
    };

    const closeSidebar = () => {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
    };

    const toggleSidebarState = () => {
        if (sidebar.classList.contains('active')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    };

    hamburgerBtn.addEventListener('click', toggleSidebarState);
    sidebarOverlay.addEventListener('click', closeSidebar);

    sidebar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeSidebar);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSidebar();
        }
    });

    window.addEventListener('resize', () => {
        if (!isResponsiveViewport()) {
            closeSidebar();
        }
    });

    window.toggleSidebar = toggleSidebarState;
}

// Anti-Gravity Layout Polish
function initAntiGravity() {
    const floatElements = document.querySelectorAll('.antigravity-float');

    // Add random floating delay to each element if not set
    floatElements.forEach((el, index) => {
        if (!el.style.animationDelay) {
            el.style.animationDelay = `${index * 0.5}s`;
        }
    });

    // Magnetic Cursor Effect (Subtle)
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        // This can be used for custom cursor or flare effects
    });
}

// Simple Waveform Generator for Preview
window.createWaveform = (containerId, bars = 20) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    for (let i = 0; i < bars; i++) {
        const bar = document.createElement('div');
        bar.className = 'waveform-bar';
        bar.style.animationDelay = `${i * 0.08}s`;
        container.appendChild(bar);
    }
};

// Cinematic Particle System
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particles = [];
    const particleCount = 50;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(79, 70, 229, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        resize();
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    init();
    animate();
}

// Sidebar Toggle for Mobile (fallback if sidebar init does not run)
window.toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
};

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (!backToTopBtn) return;

    const toggleBackToTopButton = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        backToTopBtn.style.display = scrollTop > 200 ? 'flex' : 'none';
    };

    window.addEventListener('scroll', toggleBackToTopButton);
    toggleBackToTopButton();
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Intersection Observer for Unique Scroll Entrance Animations
function initScrollAnimations() {
    const animClasses = [
        'scroll-anim-hero',
        'scroll-anim-slide-left',
        'scroll-anim-slide-right',
        'scroll-anim-canvas-reveal',
        'scroll-anim-fade-up',
        'scroll-anim-rotate-in',
        'scroll-anim-draw-in'
    ];

    const targetSelectors = 'section, header.about-section, header.services-hero, header.pricing-hero, header.blog-hero, header.contact-hero, .error-page';
    const sections = document.querySelectorAll(targetSelectors);
    
    sections.forEach((sec, idx) => {
        const animClass = animClasses[idx % animClasses.length];
        sec.classList.add('scroll-animate', animClass);
    });

    const observerOptions = {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(sec => {
        observer.observe(sec);
    });
}

// Recursive text node wrapping to preserve formatting/gradient spans
function wrapWordsRecursive(node, alternate = false, wordIndexRef = { count: 0 }) {
    if (node.nodeType === Node.TEXT_NODE) {
        const text = node.nodeValue;
        // Split by words but preserve spacing
        const parts = text.split(/(\s+)/);
        const fragment = document.createDocumentFragment();
        
        parts.forEach(part => {
            if (part.trim() === '') {
                fragment.appendChild(document.createTextNode(part));
            } else {
                const outer = document.createElement('span');
                outer.style.display = 'inline-block';
                outer.style.overflow = 'hidden';
                outer.style.verticalAlign = 'bottom';
                
                const inner = document.createElement('span');
                inner.textContent = part;
                inner.style.display = 'inline-block';
                inner.classList.add('font-anim-word');
                inner.style.animationDelay = `${wordIndexRef.count * 0.08}s`;
                
                if (alternate) {
                    if (wordIndexRef.count % 2 === 0) {
                        inner.style.animationName = 'titleWordSlideLeft';
                    } else {
                        inner.style.animationName = 'titleWordSlideRight';
                    }
                }
                
                wordIndexRef.count++;
                outer.appendChild(inner);
                fragment.appendChild(outer);
            }
        });
        
        node.parentNode.replaceChild(fragment, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Skip script, style and non-text wrappers if any
        if (node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
            const children = Array.from(node.childNodes);
            children.forEach(child => wrapWordsRecursive(child, alternate, wordIndexRef));
        }
    }
}

// Unique Typography Animations for all Hero headers
function initHeroFontAnimations() {
    const h1 = document.querySelector('.hero-section h1, .hero-section-2 h1, header.about-section h1, header.services-hero h1, header.pricing-hero h1, header.blog-hero h1, header.contact-hero h1');
    if (!h1) return;

    const path = window.location.pathname.toLowerCase();
    
    if (path.includes('index.html') || path.endsWith('/') || (!path.includes('.html') && path.length <= 1)) {
        // Index: Word-by-word reveal
        wrapWordsRecursive(h1, false);
    } else if (path.includes('home2.html')) {
        // Home 2: Letter spacing track-in
        h1.classList.add('font-anim-track-in');
    } else if (path.includes('about.html')) {
        // About: Blur and scale-in glow
        h1.classList.add('font-anim-blur-glow');
    } else if (path.includes('services.html')) {
        // Services: Ink-bleed slide-up
        h1.classList.add('font-anim-ink-reveal');
    } else if (path.includes('pricing.html')) {
        // Pricing: Alternating left/right slide-in words
        wrapWordsRecursive(h1, true);
    } else if (path.includes('blog.html')) {
        // Blog: Clip reveal
        h1.classList.add('font-anim-clip-reveal');
    } else if (path.includes('contact.html')) {
        // Contact: Shimmer glowing gradient
        h1.classList.add('font-anim-shimmer');
    }
}
