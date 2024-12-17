import { art } from "./art.js";


// Smooth Transition
document.addEventListener("DOMContentLoaded", () => {
    console.log('DOM fully loaded and parsed');
    const links = document.querySelectorAll('a.prev, a.next');
    const contentContainer = document.getElementById('contentContainer');
    let currentPage = window.location.pathname.split("/").pop(); // Get current page

    console.log('DOM fully loaded and parsed');
    
    let btnViewImg = document.querySelector('.viewImg');
    let btnCloseImg = document.querySelector('.closeImg');
    let fullscreen = document.querySelector('.fullscreen');

    //Fullscreen
    btnViewImg.addEventListener('click', function() {
        fullscreen.style.display = 'flex';
        document.body.classList.add('noscroll');
    });

    btnCloseImg.addEventListener('click', function() {
        fullscreen.style.display = 'none';
        document.body.classList.remove('noscroll');
    });

    // Add event listeners to all prev and next links

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const url = this.getAttribute('href');

            // Animate current content out to the left
            contentContainer.classList.add('slide-out-left');

            setTimeout(() => {
                fetchPage(url);
            }, 500); // Wait for animation to finish before fetching the new page
        });
    });

    function fetchPage(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                const parser = new DOMParser();
                const newDocument = parser.parseFromString(data, 'text/html');
                const newContent = newDocument.querySelector('main').innerHTML;
                console.log('New content fetched:', newContent);
    
                if (newContent) {
                    // Update content with new page's content
                    document.querySelector('main').innerHTML = newContent;
    
                    // Slide-in the new content from the right
                    contentContainer.classList.remove('slide-out-left');
                    contentContainer.classList.add('slide-in-right');
    
                    // Remove the slide-in-right class after the animation ends
                    setTimeout(() => {
                        contentContainer.classList.remove('slide-in-right');
                    }, 500); // Match the animation duration
    
                    // Re-attach event listeners for dynamic content
                    reattachEventListeners();
    
                    // Re-run the art update logic to load new page's art content
                    updateGalleryContent();
                } else {
                    console.error('Main content not found in fetched page.');
                }
            })
            .catch(error => {
                console.error('Failed to fetch page:', error);
            });
    }
    
    function reattachEventListeners() {
        const newLinks = document.querySelectorAll('a.prev, a.next');
        newLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const url = this.getAttribute('href');
                contentContainer.classList.add('slide-out-left');
                setTimeout(() => {
                    fetchPage(url);
                }, 500);
            });
        });
    
        // Re-attach fullscreen event listeners
        let btnViewImg = document.querySelector('.viewImg');
        let btnCloseImg = document.querySelector('.closeImg');
        let fullscreen = document.querySelector('.fullscreen');
    
        if (btnViewImg && btnCloseImg && fullscreen) {
            btnViewImg.addEventListener('click', function() {
                fullscreen.style.display = 'flex';
                document.body.classList.add('noscroll');
            });
    
            btnCloseImg.addEventListener('click', function() {
                fullscreen.style.display = 'none';
                document.body.classList.remove('noscroll');
            });
        }
    }

 // Function to update the page content dynamically
 function updateGalleryContent() {
    const { currentArt, prevArt, nextArt } = findArtForPage();

    if (currentArt) {
        // Now you have the currentArt object which corresponds to the page
        document.querySelector(".galleryImg").src = currentArt.imgFullScreen;
        document.querySelector(".galleryImg").alt = currentArt.painting;

        // Handle nextArt
        const nextLinks = document.querySelectorAll(".next");
        nextLinks.forEach((nextLink) => { 
            if (nextArt) {
                nextLink.href = nextArt.href;
                nextLink.classList.remove("disabled");
                nextLink.classList.add("enabled");
            } else {
                nextLink.href = "#"; 
                nextLink.classList.remove("enabled");
                nextLink.classList.add("disabled");
            }
        });

            // // Handle prevArt
            const prevLinks = document.querySelectorAll(".prev");
            prevLinks.forEach((prevLink) => {
                if (prevArt) {
                    prevLink.href = prevArt.href; // Assign previous art's href
                    prevLink.classList.remove("disabled");
                    prevLink.classList.add("enabled");
                } else {
                    prevLink.href = "#"; // Hide or disable previous link if no previous art
                    prevLink.classList.remove("enabled");
                    prevLink.classList.add("disabled");
                }
            });

            // Update page content with new currentArt object
            document.querySelector(".imgPainting").src = currentArt.img;
            document.querySelector(".imgPainting").alt = currentArt.painting;
            document.querySelector(".painting").textContent = currentArt.painting;
            document.querySelector(".painterFull").textContent = currentArt.fullName || currentArt.painter;
            document.querySelector(".artistPic").src = currentArt.imgPainter;
            document.querySelector(".artistPic").alt = currentArt.fullName || currentArt.painter;
            document.querySelector(".year").textContent = currentArt.year;
            document.querySelector(".infoText").textContent = currentArt.text;
            document.querySelector(".source").href = currentArt.wiki;
            document.querySelector(".paintingFooter").textContent = currentArt.painting;
            document.querySelector(".painterFooter").textContent = currentArt.painter;
    }
}
    // Initial run to set up gallery content on page load
    updateGalleryContent();
});

// Function to find and return the correct art object based on the current page's filename
function findArtForPage() {
    // Get the current page's filename
    const currentPage = window.location.pathname.split("/").pop(); // E.g., "starry-night.html"
    // Find the index of the current art piece in the array
    const currentIndex = art.findIndex(artPiece => artPiece.href === currentPage);

    // If currentIndex is -1, the page doesn't match any art piece
    if (currentIndex === -1) {
        return null;
    }
    const currentArt = art[currentIndex];
    const nextArt = art[currentIndex + 1] || null; 
    const prevArt = art[currentIndex - 1] || null; 

    return { currentArt, prevArt, nextArt };
}

//         //Update the content of the page with the currentArt object

//     document.querySelector(".imgPainting").src = currentArt.img;
//     document.querySelector(".imgPainting").alt = currentArt.painting;

//     document.querySelector(".painting").textContent = currentArt.painting;
//     if (currentArt.fullName) {
//         document.querySelector(".painterFull").textContent = currentArt.fullName;
//         document.querySelector(".artistPic").alt = currentArt.fullName;
//     } else {
//         document.querySelector(".painterFull").textContent = currentArt.painter;
//         document.querySelector(".artistPic").alt = currentArt.painter;
//     }

//     document.querySelector(".artistPic").src = currentArt.imgPainter;
//     document.querySelector(".year").textContent = currentArt.year;
//     document.querySelector(".infoText").textContent = currentArt.text;
//     document.querySelector(".source").href = currentArt.wiki;
    
//     document.querySelector(".paintingFooter").textContent = currentArt.painting;
//     document.querySelector(".painterFooter").textContent = currentArt.painter;

// }






