document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle (Mobile)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(5, 5, 7, 0.95)';
                navLinks.style.padding = '2rem';
                navLinks.style.backdropFilter = 'blur(10px)';
            } else {
                navLinks.removeAttribute('style');
            }
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.removeAttribute('style');
                }
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .project-card, .contact-container, .about').forEach(el => {
        if (el) {
            el.style.opacity = '0'; // Initial state for animation
            observer.observe(el);
        }
    });

    // Contact Form Handling (Mailto Wrapper)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;

            // Construct Mailto Link
            // Replace 'shibinks@gmail.com' with the founder's actual email if different
            const subject = encodeURIComponent(`New Project Inquiry from ${name}`);
            const body = encodeURIComponent(
                `Name: ${name}\n` +
                `Email: ${email}\n\n` +
                `Project Details:\n${message}`
            );

            // Try to open email client
            window.location.href = `mailto:Shibinkurishingal@gmail.com?subject=${subject}&body=${body}`;

            // Optional: Show feedback
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Opening Email Client...';
            setTimeout(() => {
                btn.textContent = originalText;
                contactForm.reset();
            }, 3000);
        });
    }
});
