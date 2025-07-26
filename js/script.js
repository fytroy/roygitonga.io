document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Update active class for navigation
            document.querySelectorAll('#navbar ul li a').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Section fade-in on scroll (Intersection Observer)
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null, // relative to the viewport
        threshold: 0.1, // trigger when 10% of the section is visible
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it's visible if you only want it to animate once
                // observer.unobserve(entry.target);
            } else {
                // Optional: remove 'visible' class if you want it to re-animate on scroll back
                // entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Highlight active nav link on scroll
    const navLinks = document.querySelectorAll('#navbar ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) { // Adjust as needed
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Initial check for active link on load
    const initialSection = document.querySelector('section.visible');
    if (initialSection) {
        const initialLinkId = initialSection.getAttribute('id');
        const initialLink = document.querySelector(`#navbar ul li a[href="#${initialLinkId}"]`);
        if (initialLink) {
            initialLink.classList.add('active');
        }
    }
});