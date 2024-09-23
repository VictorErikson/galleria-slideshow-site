import { art } from "./art.js";

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



if (currentArt) {
    // Now you have the currentArt object which corresponds to the page

    document.querySelector(".galleryImg").src = currentArt.imgFullScreen;
    document.querySelector(".galleryImg").alt = currentArt.painting;


 // Handle nextArt

 const nextLink = document.querySelector(".footerRight .next");
 if (nextArt) {
    nextLink.href = nextArt.href;
    nextLink.classList.remove("disabled");
    nextLink.classList.add("enabled");
} else {
    nextLink.href = "#"; 
    nextLink.classList.remove("enabled");
    nextLink.classList.add("disabled");
}

// // Handle prevArt
const prevLink = document.querySelector(".footerRight .prev");
if (prevArt) {
    prevLink.href = prevArt.href; // Assign previous art's href
    prevLink.classList.remove("disabled");
    prevLink.classList.add("enabled");
} else {
    prevLink.href = "#"; // Hide or disable previous link if no previous art
    prevLink.classList.remove("enabled");
    prevLink.classList.add("disabled");
}



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






