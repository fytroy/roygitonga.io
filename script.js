document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    const sections = document.querySelectorAll('section');
    const allNavLinks = document.querySelectorAll('.navbar a'); // Select all navigation links

    // Smooth scrolling for navigation links and mobile menu toggle
    allNavLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) { // Only process internal links
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                }

                // Update active class immediately
                allNavLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Intersection Observer for highlighting active section in navbar
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Adjust this value as needed
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                allNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Hamburger Menu Toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Close mobile menu when clicking outside (optional, but good UX)
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
        }
    });

    // Optional: Scroll-to-top button
    const scrollToTopBtn = document.createElement('div');
    scrollToTopBtn.classList.add('scroll-to-top');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Blog Post Read More / Back to Blog Functionality
    const blogPostsGrid = document.querySelector('.blog-posts-grid');
    const fullBlogPosts = document.querySelectorAll('.full-blog-post');
    const blogSection = document.getElementById('blog'); // Get the main blog section


    // Add event listeners for "Read More" buttons
    document.querySelectorAll('.read-more-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPostId = this.getAttribute('href').substring(1); // Get ID from href
            const targetPost = document.getElementById(targetPostId);

            if (targetPost) {
                blogPostsGrid.style.display = 'none'; // Hide the grid of cards
                fullBlogPosts.forEach(post => post.style.display = 'none'); // Hide all full posts
                targetPost.style.display = 'block'; // Show the specific full post

                // Scroll to the top of the blog section or the post itself
                blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Add event listeners for "Back to Blog Posts" buttons
    document.querySelectorAll('.back-to-blog-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            fullBlogPosts.forEach(post => post.style.display = 'none'); // Hide all full posts
            blogPostsGrid.style.display = 'grid'; // Show the grid of cards

            // Scroll back to the top of the blog section
            blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

});