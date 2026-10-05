document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    window.addEventListener('load', () => {
        setTimeout(() => {
            body.classList.remove('loading');
            body.classList.add('loaded');
        }, 1500);
    });

    const customCursor = document.getElementById('custom-cursor');
    const targetElements = document.querySelectorAll('.custom-cursor-target');

    let mouseX = 0, mouseY = 0;

    if (customCursor) {
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            customCursor.style.transform =
                `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        });

        targetElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                customCursor.classList.add('expanded');
            });

            el.addEventListener('mouseleave', () => {
                customCursor.classList.remove('expanded');
            });
        });
    }

    const themeToggle = document.getElementById('theme-toggle');

    function setTheme(theme) {
        if (!themeToggle) return;

        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '🌙';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            themeToggle.innerHTML = '☀️️';
            localStorage.setItem('theme', 'light');
        }
    }

    const savedTheme = localStorage.getItem('theme');
    const prefersDark =
        window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme =
                body.classList.contains('dark-mode')
                    ? 'dark'
                    : 'light';

            const newTheme =
                currentTheme === 'light'
                    ? 'dark'
                    : 'light';

            setTheme(newTheme);
        });
    }

    const revealElements =
        document.querySelectorAll('.reveal, .reveal-item');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });

    const scrollProgress =
        document.querySelector('.scroll-progress');

    window.addEventListener('scroll', () => {
        if (!scrollProgress) return;

        const scrollTop =
            window.pageYOffset ||
            document.documentElement.scrollTop;

        const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const scrollPercent =
            scrollHeight > 0
                ? (scrollTop / scrollHeight) * 100
                : 0;

        scrollProgress.style.width =
            scrollPercent + '%';
    });

    const header =
        document.querySelector('.main-header');

    window.addEventListener('scroll', () => {
        if (!header) return;

        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const isMobile =
        window.matchMedia("(max-width: 768px)").matches;

    if (!isMobile) {
        const projectCards =
            document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect =
                    card.getBoundingClientRect();

                const x =
                    e.clientX - rect.left;

                const y =
                    e.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    (y - centerY) / 10;

                const rotateY =
                    (centerX - x) / 10;

                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-10px)
                     scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform =
                    'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
            });
        });
    }
});