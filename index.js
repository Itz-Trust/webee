document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        document.body.setAttribute('data-theme', 
            document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
        
        // Change icon
        if (document.body.getAttribute('data-theme') === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });
    
    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }
    
    // Animate skill bars
    function animateSkills() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }
    
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        formMessage.textContent = 'Message sent successfully!';
        formMessage.classList.add('success');
        formMessage.style.display = 'block';
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Initialize animations when elements come into view
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('about-stats')) {
                    animateStats();
                } else if (entry.target.classList.contains('skills-container')) {
                    animateSkills();
                }
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sectionsToObserve = document.querySelectorAll('.about-stats, .skills-container');
    sectionsToObserve.forEach(section => {
        observer.observe(section);
    });
    
    // Initialize animations on page load for elements already in view
    if (window.innerHeight > document.querySelector('.about-stats').getBoundingClientRect().top) {
        animateStats();
    }
    
    if (window.innerHeight > document.querySelector('.skills-container').getBoundingClientRect().top) {
        animateSkills();
    }
});
// Initialize floating labels
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    // Add placeholder with space to trigger label movement when filled
    input.setAttribute('placeholder', ' ');
    
    // Check if input has value on page load (for form refreshes)
    if (input.value) {
        input.parentNode.querySelector('label').classList.add('active');
    }
});
 // Mobile click functionality
 document.addEventListener('DOMContentLoaded', function() {
    const contents = document.querySelectorAll('.content');
    
    function handleContentClick() {
        // On mobile, we use click instead of hover
        if (window.innerWidth <= 768) {
            // Close all other open boxes
            contents.forEach(content => {
                if (content !== this) {
                    content.classList.remove('active');
                }
            });
            // Toggle current box
            this.classList.toggle('active');
        }
    }
    
    // Add click event for mobile
    contents.forEach(content => {
        content.addEventListener('click', handleContentClick);
    });
    
    // Reset on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            contents.forEach(content => {
                content.classList.remove('active');
            });
        }
    });
});