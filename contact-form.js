// Contact Form Handler
(function() {
    'use strict';
    
    // Wait for DOM to be ready
    function initContactForm() {
        const form = document.querySelector('.contact-form');
        
        if (!form) return;
        
        form.addEventListener('submit', async function(e) {
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Check if using FormSpree placeholder
            const formAction = form.getAttribute('action');
            if (formAction.includes('YOUR_FORM_ID')) {
                e.preventDefault();
                alert('Please set up your Formspree form ID first!\n\nInstructions:\n1. Go to https://formspree.io\n2. Sign up for a free account\n3. Create a new form\n4. Replace YOUR_FORM_ID in index.html with your actual form ID');
                return;
            }
            
            // Disable button during submission
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            submitBtn.style.opacity = '0.7';
            
            // If using FormSpree, let it handle naturally
            // The form will submit and FormSpree will redirect or show a message
            
            // Re-enable after a delay (in case of error)
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                submitBtn.style.opacity = '1';
            }, 3000);
        });
        
        // Add animation to form inputs
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateX(5px)';
                this.parentElement.style.transition = 'transform 0.3s ease';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateX(0)';
            });
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContactForm);
    } else {
        initContactForm();
    }
})();
