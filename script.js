// EmailJS Initialization
(function () {
    emailjs.init("XlFoEFbUUr2clNY0I"); // Replace with your EmailJS Public Key
})();

// Enhanced Send Email Function
function sendEmail(event) {
    event.preventDefault();

    const serviceID = "service_q3a9wju"; // Replace with your EmailJS Service ID
    const templateID = "template_ui3tftu"; // Replace with your EmailJS Template ID
    const submitButton = document.querySelector('.contact-form button');
    const formMessage = document.getElementById('form-message');

    // Input Validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        displayErrorMessage("Please fill all fields");
        return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        displayErrorMessage("Please enter a valid email");
        return;
    }

    // Disable button during submission
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    const templateParams = { name, email, message };

    emailjs.send(serviceID, templateID, templateParams)
        .then(response => {
            displaySuccessMessage();
            document.querySelector(".contact-form").reset();
        })
        .catch(error => {
            displayErrorMessage("Failed to send message. Please try again!");
            console.error("EmailJS Error:", error);
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        });
}

// Display Success Message with Lottie
function displaySuccessMessage() {
    const formMessage = document.getElementById('form-message');
    formMessage.innerHTML = `
        <div class="message-container success">
            <dotlottie-player
                src="https://lottie.host/7c8f1646-178a-49dc-a0c0-1d32d8a1a856/DwPTMCMVkw.lottie"
                background="transparent"
                speed="1"
                style="width: 200px; height: 200px; margin: 0 auto;"
                loop
                autoplay
            ></dotlottie-player>
            <p>Message sent successfully!</p>
        </div>
    `;
    setTimeout(() => formMessage.innerHTML = '', 5000); // Clear after 5 seconds
}

// Display Error Message
function displayErrorMessage(message) {
    const formMessage = document.getElementById('form-message');
    formMessage.innerHTML = `
        <div class="message-container error">
            <p>${message}</p>
        </div>
    `;
    setTimeout(() => formMessage.innerHTML = '', 5000);
}

// GSAP Initialization
gsap.registerPlugin(ScrollTrigger);

// Theme Toggle Functionality
function initializeThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.textContent = '🌙';
    themeToggle.className = 'theme-toggle';
    document.body.appendChild(themeToggle);

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // Load saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }
}

// Animation Setup
function initializeAnimations() {
    // Splash Screen Animation
    const splashScreen = document.getElementById("splash-screen");
    const hLetter = document.querySelector(".h-letter");

    gsap.from(hLetter, {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)",
    });

    gsap.to(splashScreen, {
        opacity: 0,
        duration: 1,
        delay: 2,
        ease: "power2.in",
        onComplete: () => {
            splashScreen.style.display = "none";
            document.getElementById("main-content").style.display = "block";
            gsap.from("#main-content > *", {
                opacity: 0,
                y: 20,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out"
            });
        }
    });

    // Section Animations
    gsap.from(".header", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".header",
            start: "top 90%",
        }
    });

    gsap.utils.toArray('.section').forEach((section) => {
        gsap.from(section.children, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
            }
        });
    });
}

// Navigation Highlighting
function initializeNavHighlight() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('.section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Modal Functionality
function initializeModal() {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('fullCertImg');

    window.openModal = (imgSrc) => {
        modalImg.src = imgSrc;
        gsap.fromTo(modal, 
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)", display: 'flex' }
        );
    };

    window.closeModal = () => {
        gsap.to(modal, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => modal.style.display = 'none'
        });
    };

    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
    });
}

// Initialize Everything on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    initializeThemeToggle();
    initializeAnimations();
    initializeNavHighlight();
    initializeModal();

    // Lazy loading for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
});