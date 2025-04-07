// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Loading screen animation
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const loadingBar = document.getElementById('loading-bar');
    
    // Apply hero image floating animation
    const heroImage = document.querySelector('.hero-airplane');
    if (heroImage) {
        heroImage.classList.add('hero-airplane');
    }
    
    // Function to simulate loading progress
    function simulateLoading() {
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                // After loading is complete, show main content
                setTimeout(() => {
                    loadingScreen.classList.add('loading-fade-out');
                    mainContent.classList.remove('hidden');
                    mainContent.style.animation = 'fadeIn 1s ease-out forwards';
                    
                    // Initialize scroll animations after main content is shown
                    initScrollAnimations();
                }, 500);
            } else {
                width += 5;
                loadingBar.style.width = width + '%';
            }
        }, 100); // Total load time: ~5 seconds (20 intervals * 100ms)
    }
    
    // Start loading simulation
    simulateLoading();
    
    // Scroll animations
    function initScrollAnimations() {
        // Add fade-in-section class to sections we want to animate
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.classList.add('fade-in-section');
        });
        
        // Add hover effects to destination cards
        const destinationCards = document.querySelectorAll('.rounded-xl.overflow-hidden.shadow-md');
        destinationCards.forEach(card => {
            card.classList.add('destination-card');
        });
        
        // Add scale effect to buttons
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.classList.add('hover-scale');
        });
        
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.fade-in-section').forEach(section => {
            observer.observe(section);
        });
    }
    
    // Mobile menu toggle (for responsive design)
    const menuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Implement sliding functionality for testimonials (basic carousel)
    const testimonialContainer = document.querySelector('.testimonial-wrapper');
    if (testimonialContainer) {
        let startX, moveX;
        let currentSlide = 0;
        const slides = testimonialContainer.querySelectorAll('.testimonial-slide');
        const totalSlides = slides.length;
        
        testimonialContainer.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
        });
        
        testimonialContainer.addEventListener('touchmove', e => {
            moveX = e.touches[0].clientX;
        });
        
        testimonialContainer.addEventListener('touchend', () => {
            if (startX - moveX > 50 && currentSlide < totalSlides - 1) {
                // Swipe left - next slide
                currentSlide++;
                updateSlidePosition();
            } else if (moveX - startX > 50 && currentSlide > 0) {
                // Swipe right - previous slide
                currentSlide--;
                updateSlidePosition();
            }
        });
        
        function updateSlidePosition() {
            const offset = -currentSlide * 100;
            testimonialContainer.style.transform = `translateX(${offset}%)`;
        }
    }
}); 