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

// PDF state variables
let currentPdf = null;
let currentPage = 1;
let totalPages = 0;

// Create navigation controls
const navControls = document.createElement('div');
navControls.className = 'pdf-nav-controls';
navControls.innerHTML = `
    <button id="prevPage" class="nav-btn">Previous</button>
    <span id="pageInfo">Page 1 of 1</span>
    <button id="nextPage" class="nav-btn">Next</button>
    <a href="jsrk_cv.pdf" download class="nav-btn download-btn">
        <i class="fas fa-download"></i> Download
    </a>
`;
pdfViewer.insertBefore(navControls, pdfCanvas);

// When the user clicks the button, open the modal and load PDF
cvButton.addEventListener('click', async function(e) {
    e.preventDefault();
    modal.style.display = "block";
    try {
        // Use a direct PDF URL instead of Google Drive
        const loadingTask = pdfjsLib.getDocument('jsrk_cv.pdf');
        currentPdf = await loadingTask.promise;
        totalPages = currentPdf.numPages;
        currentPage = 1;
        updatePageInfo();
        await renderPage(currentPage);
    } catch (error) {
        console.error('Error loading PDF:', error);
        pdfViewer.innerHTML = '<p>Error loading PDF. Please try again later.</p>';
    }
});

// Navigation button event listeners
document.getElementById('prevPage').addEventListener('click', async function() {
    if (currentPage > 1) {
        currentPage--;
        await renderPage(currentPage);
        updatePageInfo();
    }
});

document.getElementById('nextPage').addEventListener('click', async function() {
    if (currentPage < totalPages) {
        currentPage++;
        await renderPage(currentPage);
        updatePageInfo();
    }
});

// Function to render a specific page
async function renderPage(pageNumber) {
    try {
        const page = await currentPdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1.5 });
        const context = pdfCanvas.getContext('2d');
        pdfCanvas.height = viewport.height;
        pdfCanvas.width = viewport.width;
        
        await page.render({
            canvasContext: context,
            viewport: viewport
        }).promise;
    } catch (error) {
        console.error('Error rendering page:', error);
    }
}

// Function to update page information
function updatePageInfo() {
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    // Clear the canvas
    const context = pdfCanvas.getContext('2d');
    context.clearRect(0, 0, pdfCanvas.width, pdfCanvas.height);
    currentPdf = null;
    currentPage = 1;
    totalPages = 0;
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        // Clear the canvas
        const context = pdfCanvas.getContext('2d');
        context.clearRect(0, 0, pdfCanvas.width, pdfCanvas.height);
        currentPdf = null;
        currentPage = 1;
        totalPages = 0;
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

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            mobileMenuBtn.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
  
    if (mobileMenuBtn && navLinks) {
      mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('show');
        mobileMenuBtn.classList.toggle('active');
      });
  
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('show');
          mobileMenuBtn.classList.remove('active');
        });
      });
    }
  });