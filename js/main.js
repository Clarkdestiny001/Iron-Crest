/* ============================================
   IRONCREST CONSTRUCTION - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // --- Loading Screen ---
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 800);
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Animated Counters ---
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // --- Back to Top Button ---
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others
            faqItems.forEach(other => other.classList.remove('active'));
            
            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // --- Projects Filter ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // If a project photo fails to load, keep the card readable
    projectCards.forEach(card => {
        const img = card.querySelector('img');
        if (img) img.addEventListener('error', () => card.classList.add('img-failed'));
    });

    // --- Project Modal ---
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const modalImage = document.querySelector('.modal-image');
    const modalTitle = document.querySelector('.modal-body h2');
    const modalLocation = document.querySelector('.modal-location');
    const modalYear = document.querySelector('.modal-year');
    const modalDesc = document.querySelector('.modal-description');

    const projectData = {
        'meridian-tower': {
            title: 'Meridian Tower',
            location: 'New York, NY',
            year: '2024',
            description: 'A 45-story mixed-use commercial tower featuring state-of-the-art glass facade technology, LEED Platinum certification, and 2.1 million square feet of premium office and retail space. The project incorporated innovative seismic design and smart building systems.'
        },
        'azure-residences': {
            title: 'Azure Residences',
            location: 'Miami, FL',
            year: '2023',
            description: 'A luxury waterfront residential complex comprising 120 exclusive units with private terraces, infinity pools, and panoramic ocean views. Features include a private marina, spa, and concierge services.'
        },
        'nexus-industrial': {
            title: 'Nexus Industrial Park',
            location: 'Houston, TX',
            year: '2024',
            description: 'A 500,000 sq ft advanced manufacturing facility with automated logistics systems, clean room environments, and sustainable energy solutions including 2MW of rooftop solar generation.'
        },
        'horizon-bridge': {
            title: 'Horizon Bridge',
            location: 'Seattle, WA',
            year: '2023',
            description: 'A 1.2-mile cable-stayed bridge connecting downtown to the waterfront district. Designed to withstand 9.0 magnitude earthquakes and features integrated LED lighting and pedestrian walkways.'
        },
        'plaza-central': {
            title: 'Plaza Central',
            location: 'Chicago, IL',
            year: '2022',
            description: 'A 30-story Class A office building in the heart of the Loop with floor-to-ceiling windows, rooftop gardens, and underground parking for 800 vehicles. Winner of the AIA Honor Award.'
        },
        'pacific-logistics-hub': {
            title: 'Pacific Logistics Hub',
            location: 'Los Angeles, CA',
            year: '2023',
            description: 'A 700,000 sq ft distribution center with high-bay racking, 90 loading docks and a rooftop solar array, built for fast turnaround of regional freight.'
        },
        'metro-line-extension': {
            title: 'Metro Line Extension',
            location: 'Washington, DC',
            year: '2024',
            description: 'A 4-mile extension of the metro line with three new underground stations, step-free access and upgraded ventilation and signaling.'
        },
        'the-summit': {
            title: 'The Summit',
            location: 'Denver, CO',
            year: '2023',
            description: 'A 22-story office tower with a glass curtain wall, a public plaza at street level and views of the Rocky Mountains.'
        },
        'oakwood-estates': {
            title: 'Oakwood Estates',
            location: 'Austin, TX',
            year: '2024',
            description: 'An exclusive gated community of 45 custom-built luxury homes on 200 acres of rolling hills. Each residence features smart home technology, geothermal heating, and private acreage.'
        }
    };

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const data = projectData[projectId];
            
            if (data && modalOverlay) {
                const cardImg = card.querySelector('img');
                modalImage.src = cardImg ? cardImg.src.replace(/w=\d+/, 'w=1400') : '';
                modalImage.alt = data.title;
                modalTitle.textContent = data.title;
                modalLocation.textContent = data.location;
                modalYear.textContent = data.year;
                modalDesc.textContent = data.description;
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay) {
            closeModal();
        }
    });

    // --- Toast Notification ---
    function showToast(message) {
        const existingToast = document.querySelector('.toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fas fa-info-circle"></i><span>${message}</span>`;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }

    // Social icons toast
    document.querySelectorAll('.social-toast').forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Official social channels coming soon.');
        });
    });

    // --- Cookie Consent ---
    const cookieBanner = document.querySelector('.cookie-banner');
    const cookieAccept = document.querySelector('.cookie-accept');
    
    if (cookieBanner && !localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 2000);
    }

    if (cookieAccept) {
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.remove('show');
        });
    }

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Parallax Effect ---
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(el => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            el.style.backgroundPositionY = `${rate}px`;
        });
    });

    // --- Lazy Loading Images ---
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // --- Active Navigation Link ---
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // --- Form Success Handler (for Netlify) ---
    const contactForm = document.querySelector('.contact-form form');
    const formSuccess = document.querySelector('.form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Netlify handles the actual submission
            // This is for visual feedback
            setTimeout(() => {
                if (formSuccess) {
                    formSuccess.classList.add('show');
                    contactForm.reset();
                }
            }, 500);
        });
    }

    // --- Newsletter Form ---
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }

    console.log('IronCrest Construction - Website Loaded Successfully');
});
