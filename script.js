document.addEventListener('DOMContentLoaded', () => {
    // 1. Light/Dark Theme Toggle Logic
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check saved theme or preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }

    // Toggle click handler
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });

    // 2. Animated Stats Counter Logic
    const statsNumbers = document.querySelectorAll('.stat-number');
    const animationDuration = 2000; // 2 seconds

    const animateCounters = () => {
        statsNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            const start = 0;
            let current = start;
            const increment = target / (animationDuration / 16); // ~60fps

            const updateCounter = () => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
                    // For specific ones that need '+' suffix
                    if (stat.getAttribute('data-target') === '3' || stat.getAttribute('data-target') === '10' || stat.getAttribute('data-target') === '5') {
                        stat.textContent = Math.round(target) + '+';
                    } else {
                        stat.textContent = Math.round(target);
                    }
                } else {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                }
            };
            updateCounter();
        });
    };

    // Observer for statistics counting
    const statsSection = document.querySelector('.stats-row');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }

    // 3. Reveal Elements on Scroll
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is visible
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Subtle Mouse Movement / Parallax on Hero Name
    const hero = document.getElementById('hero');
    const heroName = document.getElementById('heroName');

    if (hero && heroName) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            // Calculate offset ratios (-0.5 to 0.5)
            const xOffset = (clientX / innerWidth) - 0.5;
            const yOffset = (clientY / innerHeight) - 0.5;

            // Apply transform to span elements in hero title for asymmetrical movement
            const spans = heroName.querySelectorAll('span');
            if (spans.length >= 2) {
                spans[0].style.transform = `translate3d(${xOffset * 25}px, ${yOffset * 15}px, 0)`;
                spans[1].style.transform = `translate3d(${xOffset * -15}px, ${yOffset * 25}px, 0)`;
            }
        });

        // Reset transforms on mouse leave
        hero.addEventListener('mouseleave', () => {
            const spans = heroName.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'translate3d(0, 0, 0)';
                span.style.transition = 'transform 0.5s ease';
            });
        });

        // Re-enable hover transitions when entering hero
        hero.addEventListener('mouseenter', () => {
            const spans = heroName.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transition = 'none';
            });
        });
    }

    // 5. Bento Cards Interactive Glow & Mouse Follower
    const cards = document.querySelectorAll('.bento-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            // Calculate tilt angle based on hover position (subtle, max 4deg)
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            const dx = x - xc;
            const dy = y - yc;
            
            // Set properties for styling (e.g. radial border lighting)
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            card.style.transform = `perspective(1000px) rotateY(${dx / xc * 2}deg) rotateX(${-dy / yc * 2}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s, box-shadow 0.3s';
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'border-color 0.3s, box-shadow 0.3s';
        });
    });
});
