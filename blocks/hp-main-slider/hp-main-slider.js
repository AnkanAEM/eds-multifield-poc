import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const slickList = document.createElement('div');
  slickList.classList.add('slick-list', 'draggable');

  const slickTrack = document.createElement('div');
  slickTrack.classList.add('slick-track');
  slickTrack.setAttribute('role', 'listbox');

  const slides = [...block.children];
  const totalSlides = slides.length;
  let currentIndex = 0;

  slides.forEach((row, index) => {
    const slide = document.createElement('div');
    moveInstrumentation(row, slide);
    slide.classList.add('hp-main-slider-list', 'slick-slide');
    slide.setAttribute('data-slick-index', index);
    slide.setAttribute('aria-hidden', 'true');
    slide.setAttribute('role', 'option');
    slide.setAttribute('aria-describedby', `slick-slide0${index}`);
    slide.style.width = '100%'; // Ensure slides take full width for manual control

    const cells = [...row.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const linkCell = cells.find(cell => cell.querySelector('a'));

    const link = document.createElement('a');
    if (linkCell && linkCell.querySelector('a')) {
      const foundLink = linkCell.querySelector('a');
      link.href = foundLink.href;
      if (foundLink.target) {
        link.target = foundLink.target;
      }
    } else {
      link.href = 'javascript:void(0)'; // Default if no link found
    }
    link.setAttribute('tabindex', '-1');

    if (imageCell && imageCell.querySelector('picture')) {
      const picture = imageCell.querySelector('picture');
      const img = picture.querySelector('img');
      if (img) {
        img.classList.add('img-responsive', 'w-100');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        link.append(optimizedPic);
      }
    }

    slide.append(link);
    slickTrack.append(slide);
  });

  slickList.append(slickTrack);
  block.textContent = '';
  block.classList.add('slick-initialized', 'slick-slider');
  block.setAttribute('role', 'toolbar');
  block.append(slickList);

  // Manual Carousel Implementation
  const updateSlidePosition = () => {
    slickTrack.style.transform = `translate3d(-${currentIndex * 100}%, 0px, 0px)`;
    [...slickTrack.children].forEach((slide, idx) => {
      if (idx === currentIndex) {
        slide.classList.add('slick-current', 'slick-active');
        slide.setAttribute('aria-hidden', 'false');
        slide.setAttribute('tabindex', '0');
      } else {
        slide.classList.remove('slick-current', 'slick-active');
        slide.setAttribute('aria-hidden', 'true');
        slide.setAttribute('tabindex', '-1');
      }
    });
    updateDots();
  };

  const goToSlide = (index) => {
    currentIndex = (index + totalSlides) % totalSlides;
    updateSlidePosition();
  };

  // Add navigation dots
  const slickDots = document.createElement('ul');
  slickDots.classList.add('slick-dots');
  slickDots.setAttribute('role', 'tablist');
  for (let i = 0; i < totalSlides; i += 1) {
    const dotItem = document.createElement('li');
    dotItem.setAttribute('role', 'presentation');
    dotItem.setAttribute('id', `slick-slide0${i}`);
    const dotButton = document.createElement('button');
    dotButton.setAttribute('type', 'button');
    dotButton.setAttribute('data-role', 'none');
    dotButton.setAttribute('role', 'button');
    dotButton.setAttribute('aria-required', 'false');
    dotButton.setAttribute('tabindex', '0');
    dotButton.textContent = i + 1;
    dotButton.addEventListener('click', () => goToSlide(i));
    dotItem.append(dotButton);
    slickDots.append(dotItem);
  }
  block.append(slickDots);

  const updateDots = () => {
    [...slickDots.children].forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('slick-active');
        dot.setAttribute('aria-hidden', 'false');
        dot.setAttribute('aria-selected', 'true');
        dot.querySelector('button').setAttribute('tabindex', '0');
      } else {
        dot.classList.remove('slick-active');
        dot.setAttribute('aria-hidden', 'true');
        dot.setAttribute('aria-selected', 'false');
        dot.querySelector('button').setAttribute('tabindex', '-1');
      }
    });
  };

  // Initial setup
  updateSlidePosition();

  // Optional: Add auto-play or navigation arrows if needed
  // For example, to add next/prev buttons:
  // const prevButton = document.createElement('button');
  // prevButton.textContent = 'Prev';
  // prevButton.addEventListener('click', () => goToSlide(currentIndex - 1));
  // block.prepend(prevButton);

  // const nextButton = document.createElement('button');
  // nextButton.textContent = 'Next';
  // nextButton.addEventListener('click', () => goToSlide(currentIndex + 1));
  // block.append(nextButton);
}
