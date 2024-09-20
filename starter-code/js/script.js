
import { art } from "./art.js";


// Iterate over the art and create the HTML

const slideshow = document.querySelector(".slideshow");

art.forEach((art) => { 
    const slide = document.createElement("section");
    slide.classList.add("slide");

    const link = document.createElement("a");
    link.href = art.href;

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
    link.append(img, gradient, slideText);
    slide.append(link);
    slideshow.append(slide);
});


