import { art } from "./art.js";

document.addEventListener('DOMContentLoaded', function() {
   
    let btnViewImg = document.querySelector('.viewImg');
    let btnCloseImg = document.querySelector('.closeImg');
    let fullscreen = document.querySelector('.fullscreen');

    btnViewImg.addEventListener('click', function() {
        fullscreen.style.display = 'flex';
        document.body.classList.add('noscroll');
        localStorage.setItem("fullscreen", true);
    });

    btnCloseImg.addEventListener('click', function() {
        fullscreen.style.display = 'none';
        document.body.classList.remove('noscroll');
        localStorage.removeItem("fullscreen");
    });


    function findArtForPage() {
        const currentPage = window.location.pathname.split("/").pop(); 
        const currentIndex = art.findIndex(artPiece => artPiece.href === currentPage);


        if (currentIndex === -1) {
            return null;
        }
        const currentArt = art[currentIndex];
        const nextArt = art[currentIndex + 1] || null; 
        const prevArt = art[currentIndex - 1] || null; 

        return { currentArt, prevArt, nextArt };
    }

    const { currentArt, prevArt, nextArt } = findArtForPage();

    function debounce(func, wait) {
        let timeout;
        return function() {
            clearTimeout(timeout);
            timeout = setTimeout(func, wait);
        };
    }

    function updateImage() {
        const imgPainting = document.querySelector('.imgPainting');
        if (window.innerWidth > 481) {
            imgPainting.src = currentArt.imgHeroLarge;
        } else {
            imgPainting.src = currentArt.img;
        }
        imgPainting.alt = currentArt.painting;
    }



    if (currentArt) {

        updateImage();

        document.querySelector(".galleryImg").src = currentArt.imgFullScreen;
        document.querySelector(".galleryImg").alt = currentArt.painting;

        const storedFullscreenValue = localStorage.getItem("fullscreen");
        if (storedFullscreenValue === "true"){
            fullscreen.style.display = 'flex';
            document.body.classList.add('noscroll');
        } 


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



        const prevLinks = document.querySelectorAll(".prev");

        prevLinks.forEach((prevLink) => {
        if (prevArt) {
            prevLink.href = prevArt.href; 
            prevLink.classList.remove("disabled");
            prevLink.classList.add("enabled");
        } else {
            prevLink.href = "#"; 
            prevLink.classList.remove("enabled");
            prevLink.classList.add("disabled");
        }

        })

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
    }

});




