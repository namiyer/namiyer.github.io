// Theme Switcher Functionality
(function() {
    'use strict';
    
    // Check for saved theme preference or default to theme 1
    const currentTheme = localStorage.getItem('theme') || 'theme-1';
    
    // Apply the theme on page load
    if (currentTheme === 'theme-2') {
        document.body.classList.add('theme-2');
    }
    
    // Create and insert theme switcher button
    function createThemeSwitcher() {
        const button = document.createElement('button');
        button.className = 'theme-switcher';
        button.textContent = currentTheme === 'theme-2' ? 'Theme 1' : 'Theme 2';
        button.setAttribute('aria-label', 'Switch color theme');
        
        button.addEventListener('click', toggleTheme);
        
        // Insert at the beginning of body
        document.body.insertBefore(button, document.body.firstChild);
        
        return button;
    }
    
    // Toggle between themes
    function toggleTheme() {
        const body = document.body;
        const button = document.querySelector('.theme-switcher');
        
        // Add layout transition class for smoother animation
        body.style.transition = 'all 0.5s ease';
        const mainContent = document.querySelector('.main-content');
        const sidebar = document.querySelector('.sidebar');
        
        if (mainContent) mainContent.style.transition = 'all 0.5s ease';
        if (sidebar) sidebar.style.transition = 'all 0.5s ease';
        
        if (body.classList.contains('theme-2')) {
            body.classList.remove('theme-2');
            localStorage.setItem('theme', 'theme-1');
            button.textContent = 'Theme 2';
            
            // Add transition animation
            animateThemeChange('theme-1');
        } else {
            body.classList.add('theme-2');
            localStorage.setItem('theme', 'theme-2');
            button.textContent = 'Theme 1';
            
            // Add transition animation
            animateThemeChange('theme-2');
        }
        
        // Remove transition after animation completes
        setTimeout(() => {
            body.style.transition = '';
            if (mainContent) mainContent.style.transition = '';
            if (sidebar) sidebar.style.transition = '';
        }, 500);
    }
    
    // Add smooth transition animation
    function animateThemeChange(theme) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${theme === 'theme-2' ? '#e8f4f8' : '#b0a3d4'};
            opacity: 0;
            pointer-events: none;
            z-index: 9999;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(overlay);
        
        // Trigger animation
        setTimeout(() => {
            overlay.style.opacity = '0.7';
        }, 10);
        
        setTimeout(() => {
            overlay.style.opacity = '0';
        }, 200);
        
        setTimeout(() => {
            overlay.remove();
        }, 500);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createThemeSwitcher);
    } else {
        createThemeSwitcher();
    }
    
    // Add smooth scroll for internal links
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
    
    // Add active class to current page nav link
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.sidebar-nav a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Initialize active nav link
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setActiveNavLink);
    } else {
        setActiveNavLink();
    }
    
    // Add entrance animations
    function addEntranceAnimations() {
        const animatedElements = document.querySelectorAll('.section, .project-item, .hero-section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => observer.observe(el));
    }
    
    // Initialize animations
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addEntranceAnimations);
    } else {
        addEntranceAnimations();
    }
})();