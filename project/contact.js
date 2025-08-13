// Particle Animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 2-6px
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random horizontal position
        particle.style.left = `${Math.random() * 100}%`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 8}s`;
        
        // Random animation duration
        particle.style.animationDuration = `${Math.random() * 6 + 4}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Form Validation
class FormValidator {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.querySelector('.submit-btn');
        this.successMessage = document.getElementById('successMessage');
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.addInputListeners();
    }
    
    addInputListeners() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(fieldName)} is required.`;
        }
        
        // Specific field validations
        switch (fieldName) {
            case 'name':
                if (value && value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long.';
                }
                break;
                
            case 'email':
                if (value && !this.isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address.';
                }
                break;
                
            case 'phone':
                if (value && !this.isValidPhone(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number.';
                }
                break;
                
            case 'message':
                if (value && value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long.';
                }
                break;
        }
        
        this.showFieldError(field, isValid, errorMessage);
        return isValid;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }
    
    showFieldError(field, isValid, errorMessage) {
        const errorElement = document.getElementById(`${field.name}Error`);
        
        if (isValid) {
            field.classList.remove('error');
            field.classList.add('success');
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        } else {
            field.classList.remove('success');
            field.classList.add('error');
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
        }
    }
    
    clearError(field) {
        const errorElement = document.getElementById(`${field.name}Error`);
        field.classList.remove('error');
        errorElement.classList.remove('show');
        
        // Add success class if field has value and is valid
        if (field.value.trim() && this.validateField(field)) {
            field.classList.add('success');
        } else {
            field.classList.remove('success');
        }
    }
    
    getFieldLabel(fieldName) {
        const labels = {
            'name': 'Full Name',
            'email': 'Email Address',
            'phone': 'Phone Number',
            'company': 'Company',
            'subject': 'Subject',
            'message': 'Message'
        };
        return labels[fieldName] || fieldName;
    }
    
    validateForm() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isFormValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });
        
        return isFormValid;
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            this.showFormError('Please fix the errors above before submitting.');
            return;
        }
        
        this.setLoading(true);
        
        try {
            // Simulate API call
            await this.submitForm();
            this.showSuccess();
        } catch (error) {
            this.showFormError('Something went wrong. Please try again.');
        } finally {
            this.setLoading(false);
        }
    }
    
    async submitForm() {
        // Simulate API call delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });
    }
    
    setLoading(isLoading) {
        if (isLoading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    }
    
    showSuccess() {
        this.form.style.display = 'none';
        this.successMessage.classList.add('show');
        
        // Reset form after 5 seconds
        setTimeout(() => {
            this.resetForm();
        }, 5000);
    }
    
    resetForm() {
        this.form.reset();
        this.form.style.display = 'flex';
        this.successMessage.classList.remove('show');
        
        // Clear all validation states
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.classList.remove('error', 'success');
        });
        
        const errorMessages = this.form.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.classList.remove('show');
        });
    }
    
    showFormError(message) {
        // Create a temporary error message at the top of the form
        const existingError = this.form.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.style.cssText = `
            background: rgba(255, 107, 107, 0.1);
            border: 2px solid #ff6b6b;
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1rem;
            color: #ff6b6b;
            text-align: center;
            animation: fadeInUp 0.3s ease;
        `;
        errorDiv.textContent = message;
        
        this.form.insertBefore(errorDiv, this.form.firstChild);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

// Smooth Scrolling Animation Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe animated elements
    const animatedElements = document.querySelectorAll('.info-card, .contact-form');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Enhanced Hover Effects
function initHoverEffects() {
    const infoCards = document.querySelectorAll('.info-card');
    
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Typewriter Effect for Title
function initTypewriterEffect() {
    const title = document.querySelector('.main-title');
    const text = title.textContent;
    title.textContent = '';
    
    let index = 0;
    const typewriter = () => {
        if (index < text.length) {
            title.textContent += text.charAt(index);
            index++;
            setTimeout(typewriter, 100);
        }
    };
    
    setTimeout(typewriter, 500);
}

// Background Color Shifter
function initColorShifter() {
    const bgElement = document.querySelector('.bg-animation');
    let hue = 0;
    
    setInterval(() => {
        hue = (hue + 1) % 360;
        bgElement.style.filter = `hue-rotate(${hue}deg)`;
    }, 100);
}

// Form Field Focus Effects
function initFormEffects() {
    const formFields = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

// Parallax Effect for Floating Shapes
function initParallaxEffect() {
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            const xPos = (x - 0.5) * speed * 50;
            const yPos = (y - 0.5) * speed * 50;
            
            shape.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Core functionality
    createParticles();
    new FormValidator();
    
    // Enhanced effects
    initScrollAnimations();
    initHoverEffects();
    initTypewriterEffect();
    initColorShifter();
    initFormEffects();
    initParallaxEffect();
    
    // Add page load animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization: Debounce resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Recalculate particle positions if needed
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        particle.style.left = `${Math.random() * 100}%`;
    });
}, 250));

/* swap header style after hero passes */
const hero = document.querySelector('.hero');
const obs  = new IntersectionObserver(
  entries => {
     if(!entries[0].isIntersecting){
        document.body.classList.add('has-scrolled');
     }else{
        document.body.classList.remove('has-scrolled');
     }
  },
  {rootMargin:'-80px 0px 0px 0px'}   // tweak if your header height differs
);
if(hero) obs.observe(hero);
