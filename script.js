document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    // Theme toggle button
    themeToggle.addEventListener('click', function() {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Scroll effect for navbar
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (isElementInViewport(bar)) {
                bar.style.width = width;
            }
        });
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Run once on load
    
    // Terminal typing animation
    const terminalTyping = document.querySelector('.terminal .typing');
    if (terminalTyping) {
        const commands = [
            'npm install danielmoshood',
            'cd danielmoshood',
            'start project'
        ];
        let commandIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentCommand = commands[commandIndex];
            
            if (isDeleting) {
                terminalTyping.textContent = currentCommand.substring(0, charIndex - 1);
                charIndex--;
            } else {
                terminalTyping.textContent = currentCommand.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentCommand.length) {
                isDeleting = true;
                setTimeout(type, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                commandIndex = (commandIndex + 1) % commands.length;
                setTimeout(type, 500);
            } else {
                const typingSpeed = isDeleting ? 50 : 100;
                setTimeout(type, typingSpeed);
            }
        }
        
        setTimeout(type, 1000);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button
    document.querySelector('.back-to-top').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Initialize particles.js if available
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
  "particles": {
    "number": {
      "value": 120,  // Increased from 80
      "density": {
        "enable": true,
        "value_area": 800  // More densely packed
      }
    },
    "size": {
      "value": 5,  // Larger particles (default was 3)
      "random": true,
      "anim": {
        "enable": true,
        "speed": 5,  // Bounce animation
        "size_min": 3,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 120,  // Reduced from 150 for more connections
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1.5  // Thicker lines
    },
    "move": {
      "enable": true,
      "speed": 3,  // Faster movement
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "bounce",  // Particles bounce at edges
      "bounce": true,
      "attract": {
        "enable": true,
        "rotateX": 1000,
        "rotateY": 1000
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"  // Particles attract to cursor
      },
      "onclick": {
        "enable": true,
        "mode": "push"  // Click pushes particles away
      }
    }
  }
        });
    }
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
});