
import { art } from "./art.js";

// Iterate over the art and create the HTML

const slideshow = document.querySelector(".slideshow");

art.forEach((art) => { 
    const slide = document.createElement("section");
    slide.classList.add("slide");

    const link = document.createElement("a");
    link.href = art.href;
    link.classList.add("link");

    const imgWrapperIndex = document.createElement("div");
    imgWrapperIndex.classList.add("imgWrapperIndex");

    const img = document.createElement("img");
    img.src = art.imgFullScreen;
    img.alt = art.painting;
    img.classList.add("slideImg");



    const gradient = document.createElement("div");
    gradient.classList.add("gradient");

    const slideText = document.createElement("div");
    slideText.classList.add("slideText");

    const paintingNameContainer = document.createElement("div");
    paintingNameContainer.classList.add("paintingNameContainer");

    const painting = document.createElement("h2");
    painting.textContent = art.painting;
    painting.classList.add("painting");

    const painterContainer = document.createElement("div");
    painterContainer.classList.add("painterContainer");

    const painter = document.createElement("h3");
    painter.textContent = art.painter;

    painterContainer.append(painter);
    paintingNameContainer.append(painting);
    slideText.append(paintingNameContainer, painterContainer);
    imgWrapperIndex.append(img, gradient, slideText);
    link.append(imgWrapperIndex);
    slide.append(link);
    slideshow.append(slide);
});



//find the smallest width of all images
function findSmallestImageWidth() {
    const images = document.querySelectorAll(".slideImg"); // Select all loaded images
    let smallestWidth = Infinity;

    // Iterate through all the images
    images.forEach((img) => {
        // If the image is already loaded, handle it immediately
        if (img.complete) {
            if (img.naturalWidth < smallestWidth) {
                smallestWidth = img.naturalWidth;
            }
        } else {
            img.addEventListener('load', () => {
                if (img.naturalWidth < smallestWidth) {
                    smallestWidth = img.naturalWidth;
                }
                if (Array.from(images).every((img) => img.complete)) {
                    setSmallestImageWidth(smallestWidth);
                }
            });
        }
    });

    // If all images are already loaded when the function is called
    if (Array.from(images).every((img) => img.complete)) {
        setSmallestImageWidth(smallestWidth);
    }
}

function setSmallestImageWidth(smallestWidth) {
    const wrappers = document.querySelectorAll(".imgWrapperIndex");
    wrappers.forEach((wrapper) => {
        wrapper.style.width = `${smallestWidth}px`; // Set wrapper width to smallest image width
    });

    const images = document.querySelectorAll(".slideImg");
    images.forEach((img) => {
        img.style.width = "100%";  // Set each image to the smallest width
    });

}

window.onload = () => {
    findSmallestImageWidth();
};


// making gradients width same as image width
// const images = document.querySelectorAll(".slideImg");

// images.forEach((img) => {
//     img.addEventListener('load', () => {
//         const gradient = img.closest('.slide').querySelector('.gradient');
//         gradient.style.width = `${img.offsetWidth}px`;
//         gradient.style.left = `${img.offsetLeft}px`;
//     });
// });