import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const slideshowContainer = document.createElement('div');
  slideshowContainer.classList.add('slideshow-container');
  slideshowContainer.style.position = 'relative';
  slideshowContainer.id = 'carousel-main';

  const dotContainer = document.createElement('div');
  dotContainer.style.textAlign = 'center';

  // Skip the first row which is just the container label "Slides"
  const slideRows = [...block.children].slice(1);

  slideRows.forEach((row, index) => {
    const mySlide = document.createElement('div');
    mySlide.classList.add('mySlides');
    mySlide.style.display = index === 0 ? 'block' : 'none'; // Show first slide by default

    const linkCell = row.children[0];
    const imageMobileCell = row.children[1];
    const imageDesktopCell = row.children[2];
    const altTextMobileCell = row.children[3];
    const altTextDesktopCell = row.children[4];

    const linkEl = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.target = foundLink.target; // Preserve target attribute if present
    }
    moveInstrumentation(linkCell, linkEl);

    const mobilePicture = imageMobileCell.querySelector('picture');
    const desktopPicture = imageDesktopCell.querySelector('picture');

    if (mobilePicture) {
      const mobileImg = mobilePicture.querySelector('img');
      const mobileOptimizedPic = createOptimizedPicture(
        mobileImg.src,
        altTextMobileCell.textContent.trim() || mobileImg.alt,
        false,
        [{ width: '750' }]
      );
      const newMobileImg = mobileOptimizedPic.querySelector('img');
      newMobileImg.classList.add('generic-mobile');
      moveInstrumentation(mobileImg, newMobileImg);
      linkEl.append(mobileOptimizedPic);
    }

    if (desktopPicture) {
      const desktopImg = desktopPicture.querySelector('img');
      const desktopOptimizedPic = createOptimizedPicture(
        desktopImg.src,
        altTextDesktopCell.textContent.trim() || desktopImg.alt,
        false,
        [{ width: '2000' }]
      );
      const newDesktopImg = desktopOptimizedPic.querySelector('img');
      newDesktopImg.classList.add('generic-desktop');
      moveInstrumentation(desktopImg, newDesktopImg);
      linkEl.append(desktopOptimizedPic);
    }

    mySlide.append(linkEl);
    slideshowContainer.append(mySlide);

    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) {
      dot.classList.add('active');
    }
    dot.addEventListener('click', () => currentSlide(index + 1));
    dotContainer.append(dot);
  });

  const prevButton = document.createElement('a');
  prevButton.classList.add('prev');
  prevButton.innerHTML = '&#10094;'; // Left arrow character
  prevButton.addEventListener('click', () => plusSlides(-1));
  slideshowContainer.append(prevButton);

  const nextButton = document.createElement('a');
  nextButton.classList.add('next');
  nextButton.innerHTML = '&#10095;'; // Right arrow character
  nextButton.addEventListener('click', () => plusSlides(1));
  slideshowContainer.append(nextButton);

  block.textContent = '';
  block.append(slideshowContainer, dotContainer);

  let slideIndex = 1;
  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  function currentSlide(n) {
    showSlides((slideIndex = n));
  }

  function showSlides(n) {
    let i;
    const slides = block.querySelectorAll('.mySlides');
    const dots = block.querySelectorAll('.dot');
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].classList.remove('active');
    }
    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('active');
  }
}
