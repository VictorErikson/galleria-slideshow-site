import { art } from "./art.js";

document.addEventListener('DOMContentLoaded', function() {
    let btnViewImg = document.querySelector('.viewImg');
    let btnCloseImg = document.querySelector('.closeImg');
    let fullscreen = document.querySelector('.fullscreen');

    // Fullscreen
    btnViewImg.addEventListener('click', function() {
        fullscreen.style.display = 'flex';
        document.body.classList.add('noscroll');
    });

    btnCloseImg.addEventListener('click', function() {
        fullscreen.style.display = 'none';
        document.body.classList.remove('noscroll');
    });
    
    attachNavigationListeners(fullscreen); // Ensure navigation listeners are attached after the DOM is loaded
});

// Define findArtForPage function here
function findArtForPage() {
    const currentPage = window.location.pathname.split("/").pop(); // E.g., "starry-night.html"
    const currentIndex = art.findIndex(artPiece => artPiece.href === currentPage);

    if (currentIndex === -1) {
        return null;
    }
    const currentArt = art[currentIndex];
    const nextArt = art[currentIndex + 1] || null; 
    const prevArt = art[currentIndex - 1] || null; 

    return { currentArt, prevArt, nextArt };
}

// Function to load a new page via fetch and update the main content
function fetchPage(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.querySelector('main'); // Assuming you're updating <main> content

            if (newContent) {
                document.querySelector('main').innerHTML = newContent.innerHTML;
                const fullscreen = document.querySelector('.fullscreen'); // Re-select fullscreen for the new page
                attachNavigationListeners(fullscreen); // Pass fullscreen again for the new page
            }
        })
        .catch(err => {
            console.error('Failed to load new page:', err);
        });
}

function handleNavigation(link, triggerFullscreen, fullscreen) {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const url = this.getAttribute('href');
        fetchPage(url); // Load the new page via fetch

        // Set fullscreen mode if required
        if (triggerFullscreen) {
            fullscreen.style.display = 'flex';
            document.body.classList.add('noscroll');
        }
    });
}

// Function to attach navigation listeners to the page
function attachNavigationListeners(fullscreen) {
    const { currentArt, prevArt, nextArt } = findArtForPage();

    if (currentArt) {
        document.querySelector(".galleryImg").src = currentArt.imgFullScreen;
        document.querySelector(".galleryImg").alt = currentArt.painting;

        // Handle fullscreen prev/next buttons
        const fullscreenNextLinks = document.querySelectorAll(".fullscreenBtn.next");
        const fullscreenPrevLinks = document.querySelectorAll(".fullscreenBtn.prev");

        fullscreenNextLinks.forEach((nextLink) => {
            if (nextArt) {
                nextLink.href = nextArt.href;
                nextLink.classList.remove("disabled");
                nextLink.classList.add("enabled");
                handleNavigation(nextLink, true, fullscreen); // Pass fullscreen
            } else {
                nextLink.href = "#";
                nextLink.classList.remove("enabled");
                nextLink.classList.add("disabled");
            }
        });

        fullscreenPrevLinks.forEach((prevLink) => {
            if (prevArt) {
                prevLink.href = prevArt.href;
                prevLink.classList.remove("disabled");
                prevLink.classList.add("enabled");
                handleNavigation(prevLink, true, fullscreen); // Pass fullscreen
            } else {
                prevLink.href = "#";
                prevLink.classList.remove("enabled");
                prevLink.classList.add("disabled");
            }
        });

        // Handle regular prev/next buttons (non-fullscreen)
        const nextLinks = document.querySelectorAll(".next:not(.fullscreenBtn)");
        const prevLinks = document.querySelectorAll(".prev:not(.fullscreenBtn)");

        nextLinks.forEach((nextLink) => { 
            if (nextArt) {
                nextLink.href = nextArt.href;
                nextLink.classList.remove("disabled");
                nextLink.classList.add("enabled");
                handleNavigation(nextLink, false, fullscreen); // Pass fullscreen
            } else {
                nextLink.href = "#"; 
                nextLink.classList.remove("enabled");
                nextLink.classList.add("disabled");
            }
        });

        prevLinks.forEach((prevLink) => {
            if (prevArt) {
                prevLink.href = prevArt.href;
                prevLink.classList.remove("disabled");
                prevLink.classList.add("enabled");
                handleNavigation(prevLink, false, fullscreen); // Pass fullscreen
            } else {
                prevLink.href = "#";
                prevLink.classList.remove("enabled");
                prevLink.classList.add("disabled");
            }
        });

        // Update the content of the page with the currentArt object
        document.querySelector(".imgPainting").src = currentArt.img;
        document.querySelector(".imgPainting").alt = currentArt.painting;

        document.querySelector(".painting").textContent = currentArt.painting;
        if (currentArt.fullName) {
            document.querySelector(".painterFull").textContent = currentArt.fullName;
            document.querySelector(".artistPic").alt = currentArt.fullName;
        } else {
            document.querySelector(".painterFull").textContent = currentArt.painter;
            document.querySelector(".artistPic").alt = currentArt.painter;
        }

        document.querySelector(".artistPic").src = currentArt.imgPainter;
        document.querySelector(".year").textContent = currentArt.year;
        document.querySelector(".infoText").textContent = currentArt.text;
        document.querySelector(".source").href = currentArt.wiki;
        
        document.querySelector(".paintingFooter").textContent = currentArt.painting;
        document.querySelector(".painterFooter").textContent = currentArt.painter;
    }
}
