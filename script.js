// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.backgroundColor = '#ffffff';
    }
});

// Add animation to research items on scroll
const researchItems = document.querySelectorAll('.research-item');
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

researchItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(item);
});

// PDF.js configuration
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js';

// Get the modal
const modal = document.getElementById('cvModal');
const pdfViewer = document.getElementById('pdfViewer');
const pdfCanvas = document.getElementById('pdfCanvas');

// Get the button that opens the modal
const cvButton = document.querySelector('.cv-button');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal and load PDF
cvButton.onclick = async function() {
    modal.style.display = "block";
    try {
        const loadingTask = pdfjsLib.getDocument('https://drive.google.com/uc?export=view&id=15NXupx79tnCxfh8eSAP9NSijxARKP1YF');
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        
        const viewport = page.getViewport({ scale: 1.5 });
        const context = pdfCanvas.getContext('2d');
        pdfCanvas.height = viewport.height;
        pdfCanvas.width = viewport.width;
        
        await page.render({
            canvasContext: context,
            viewport: viewport
        }).promise;
    } catch (error) {
        console.error('Error loading PDF:', error);
        pdfViewer.innerHTML = '<p>Error loading PDF. Please try again later.</p>';
    }
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    // Clear the canvas
    const context = pdfCanvas.getContext('2d');
    context.clearRect(0, 0, pdfCanvas.width, pdfCanvas.height);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        // Clear the canvas
        const context = pdfCanvas.getContext('2d');
        context.clearRect(0, 0, pdfCanvas.width, pdfCanvas.height);
    }
}

// CV Preview Modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('cvModal');
    const btn = document.getElementById('cvPreviewButton');
    const span = document.getElementsByClassName('close')[0];

    // Open modal
    btn.onclick = function(e) {
        e.preventDefault();
        modal.style.display = 'block';
    }

    // Close modal with X button
    span.onclick = function() {
        modal.style.display = 'none';
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });

    // Hamburger menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('show');
        // Toggle icon between bars and times
        if (navLinks.classList.contains('show')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });

    // Optional: Hide menu when a link is clicked (for better UX)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        });
    });
}); 