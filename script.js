document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const emailLink = document.getElementById('emailLink');
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');

    // Hamburger Menu Toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile nav on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Copy Email Button
    if (copyEmailBtn && emailLink) {
        copyEmailBtn.addEventListener('click', () => {
            const email = emailLink.textContent;
            navigator.clipboard.writeText(email)
                .then(() => {
                    const originalText = copyEmailBtn.innerHTML;
                    copyEmailBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    setTimeout(() => {
                        copyEmailBtn.innerHTML = originalText;
                    }, 2000); // Change back after 2 seconds
                })
                .catch(err => {
                    console.error('Failed to copy email: ', err);
                });
        });
    }

    // Intersection Observer for Section Animations (e.g., heading underlines)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Trigger when 30% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // Add 'active' class to visible sections
                // Optional: Remove observer after activation if animation only plays once
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove 'active' class when section is not visible
                // entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Add sticky header shadow on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});