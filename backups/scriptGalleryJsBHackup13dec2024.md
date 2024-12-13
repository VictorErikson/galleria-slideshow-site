import { art } from "./art.js";

document.addEventListener('DOMContentLoaded', function() {

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

    const { currentArt, prevArt, nextArt } = findArtForPage();

    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function() {
            clearTimeout(timeout);
            timeout = setTimeout(func, wait);
        };
    }

    // Function to update the image based on viewport width
    function updateImage() {
        const imgPainting = document.querySelector('.imgPainting');
        if (window.innerWidth > 481) {
            imgPainting.src = currentArt.imgHeroLarge;
        } else {
            imgPainting.src = currentArt.img;
        }
        imgPainting.alt = currentArt.painting;
    }

    function updatePainterImagePosition() {
        const artistContainer = document.querySelector('.artistContainer');
        const artistPic = document.querySelector('.artistPic');
        if (!artistContainer || !artistPic) return;

        if (window.innerWidth > 481) {
            const containerHeight = artistContainer.offsetHeight;
            artistPic.style.top = containerHeight + 'px';
            artistPic.style.bottom = '';
        } else {
            artistPic.style.bottom = '-113px';
            artistPic.style.top = '';
        }

    }


    // Function to set the top position of .artistPic to be just below .artistContainer
    // window.addEventListener('load', function() {
    //     const artistContainer = document.querySelector('.artistContainer');
    //     const artistPic = document.querySelector('.artistPic');
    //     const containerHeight = artistContainer.offsetHeight;
    //     const containerTop = parseFloat(getComputedStyle(artistContainer).top);

    //     // Set the top position of .artistPic to be just below .artistContainer
    //     artistPic.style.top = (containerTop + containerHeight) + 'px';
    //   });



    if (currentArt) {

        updateImage();
        setTimeout(updatePainterImagePosition, 0);
        window.addEventListener('resize', debounce(updateImage, 5));
        window.addEventListener('resize', debounce(updatePainterImagePosition, 5));


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
        })


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

        })

        // Update the rest of the content
        document.querySelector(".painting").textContent = currentArt.painting;
        const painterFull = currentArt.fullName || currentArt.painter;
        document.querySelector(".painterFull").textContent = painterFull;
        document.querySelector(".artistPic").src = currentArt.imgPainter;
        document.querySelector(".artistPic").alt = painterFull;
        document.querySelector(".year").textContent = currentArt.year;
        document.querySelector(".infoText").textContent = currentArt.text;
        document.querySelector(".source").href = currentArt.wiki;
        document.querySelector(".paintingFooter").textContent = currentArt.painting;
        document.querySelector(".painterFooter").textContent = painterFull;
            //Update the content of the page with the currentArt object

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

    }

});
