// document.addEventListener('DOMContentLoaded', function() {
//     // Cache DOM elements for better performance
//     const elements = {
//         hamburger: document.querySelector('.hamburger'),
//         navMenu: document.querySelector('nav ul'),
//         header: document.querySelector('header'),
//         filterButtons: document.querySelectorAll('.filter-btn'),
//         projectCards: document.querySelectorAll('.project-card'),
//         contactForm: document.querySelector('.contact-form'),
//         skillBars: document.querySelectorAll('.skill-level'),
//         skillsSection: document.querySelector('.skills'),
//         resumeSection: document.querySelector('.resume')
//     };

//     // Initialize all components
//     initMobileNavigation();
//     initHeaderScrollEffect();
//     initProjectsFilter();
//     initSmoothScrolling();
//     initContactForm();
//     initSkillBarsAnimation();
//     initBubbleAnimation();

//     // Mobile Navigation Toggle
//     function initMobileNavigation() {
//         if (!elements.hamburger || !elements.navMenu) return;

//         elements.hamburger.addEventListener('click', function() {
//             // Toggle active class for both hamburger and navigation menu
//             this.classList.toggle('active');
//             elements.navMenu.classList.toggle('active');
//         });

//         // Close mobile menu when clicking a link
//         document.querySelectorAll('nav ul li a').forEach(link => {
//             link.addEventListener('click', () => {
//                 elements.hamburger.classList.remove('active');
//                 elements.navMenu.classList.remove('active');
//             });
//         });

//         // Close menu when clicking outside
//         document.addEventListener('click', function(event) {
//             const isClickInsideNav = elements.navMenu.contains(event.target);
//             const isClickOnHamburger = elements.hamburger.contains(event.target);

//             if (!isClickInsideNav && !isClickOnHamburger && elements.navMenu.classList.contains('active')) {
//                 elements.hamburger.classList.remove('active');
//                 elements.navMenu.classList.remove('active');
//             }
//         });
//     }

//     // Header scroll effect
//     function initHeaderScrollEffect() {
//         if (!elements.header) return;

//         // Throttle scroll event for better performance
//         let lastScrollY = 0;
//         let ticking = false;

//         window.addEventListener('scroll', function() {
//             lastScrollY = window.scrollY;

//             if (!ticking) {
//                 window.requestAnimationFrame(function() {
//                     elements.header.classList.toggle('scrolled', lastScrollY > 50);
//                     ticking = false;
//                 });

//                 ticking = true;
//             }
//         });
//     }

//     // Projects filter
//     function initProjectsFilter() {
//         if (!elements.filterButtons.length || !elements.projectCards.length) return;

//         elements.filterButtons.forEach(button => {
//             button.addEventListener('click', function() {
//                 // Remove active class from all buttons
//                 elements.filterButtons.forEach(btn => btn.classList.remove('active'));
//                 // Add active class to clicked button
//                 this.classList.add('active');

//                 const filterValue = this.getAttribute('data-filter');

//                 elements.projectCards.forEach(card => {
//                     if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
//                         card.style.display = 'block';
//                     } else {
//                         card.style.display = 'none';
//                     }
//                 });
//             });
//         });
//     }

//     // Smooth scrolling for anchor links
//     function initSmoothScrolling() {
//         document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//             anchor.addEventListener('click', function(e) {
//                 e.preventDefault();

//                 const targetId = this.getAttribute('href');
//                 if (targetId === '#') return;

//                 const targetElement = document.querySelector(targetId);

//                 if (targetElement) {
//                     // Get header height dynamically for more accurate scrolling
//                     const headerHeight = elements.header ? elements.header.offsetHeight : 80;

//                     window.scrollTo({
//                         top: targetElement.offsetTop - headerHeight,
//                         behavior: 'smooth'
//                     });
//                 }
//             });
//         });
//     }

//     // Form submission with validation
//     function initContactForm() {
//         if (!elements.contactForm) return;

//         elements.contactForm.addEventListener('submit', function(e) {
//             e.preventDefault();

//             // Simple validation
//             let isValid = true;
//             const requiredFields = this.querySelectorAll('[required]');

//             requiredFields.forEach(field => {
//                 if (!field.value.trim()) {
//                     isValid = false;
//                     field.classList.add('error');
//                 } else {
//                     field.classList.remove('error');
//                 }
//             });

//             if (!isValid) {
//                 showFormMessage('Please fill out all required fields', 'error');
//                 return;
//             }

//             // Get form values
//             const formData = new FormData(this);
//             const formValues = Object.fromEntries(formData.entries());

//             // Here you would typically send the form data to a server
//             console.log('Form submitted:', formValues);

//             // Show success message
//             showFormMessage('Thank you for your message! I will get back to you soon.', 'success');

//             // Reset form
//             this.reset();
//         });

//         function showFormMessage(message, type) {
//             // Create or update message element
//             let messageEl = elements.contactForm.querySelector('.form-message');

//             if (!messageEl) {
//                 messageEl = document.createElement('div');
//                 messageEl.className = 'form-message';
//                 elements.contactForm.appendChild(messageEl);
//             }

//             messageEl.textContent = message;
//             messageEl.className = `form-message ${type}`;

//             // Remove message after 5 seconds
//             setTimeout(() => {
//                 messageEl.remove();
//             }, 5000);
//         }
//     }

//     // Animate skill bars on scroll using Intersection Observer
//     function initSkillBarsAnimation() {
//         if (!elements.skillsSection || !elements.skillBars.length) return;

//         const observer = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     animateSkillBars();
//                     observer.unobserve(entry.target);
//                 }
//             });
//         }, { threshold: 0.2 });

//         observer.observe(elements.skillsSection);

//         function animateSkillBars() {
//             elements.skillBars.forEach(bar => {
//                 const width = bar.getAttribute('data-level');
//                 bar.style.width = '0';

//                 // Use requestAnimationFrame for smoother animation
//                 requestAnimationFrame(() => {
//                     bar.style.transition = 'width 1s ease-in-out';
//                     bar.style.width = width;
//                 });
//             });
//         }
//     }

//     // Create bubbles dynamically with improved performance
//     function initBubbleAnimation() {
//         if (!elements.resumeSection) return;

//         const bubbleCount = 15;
//         const fragment = document.createDocumentFragment();

//         for (let i = 0; i < bubbleCount; i++) {
//             const bubble = document.createElement('div');
//             bubble.classList.add('bubble');

//             // Random size between 5px and 30px
//             const size = Math.random() * 25 + 5;

//             // Set styles
//             Object.assign(bubble.style, {
//                 width: `${size}px`,
//                 height: `${size}px`,
//                 left: `${Math.random() * 100}%`,
//                 bottom: `-${size}px`,
//                 animationDuration: `${Math.random() * 10 + 10}s`,
//                 animationDelay: `${Math.random() * 5}s`,
//                 opacity: Math.random() * 0.7 + 0.3 // Add variable opacity for better effect
//             });

//             fragment.appendChild(bubble);
//         }

//         // Append all bubbles at once for better performance
//         elements.resumeSection.appendChild(fragment);
//     }
// });
