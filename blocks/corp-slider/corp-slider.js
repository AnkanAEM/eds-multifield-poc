import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // block.children[0]: headingRow
  // block.children[1]: sliderTitleRow
  // block.children[2]: carsContainerRow (contains "Cars value" text, not a car item itself)
  // block.children[3...N]: carRows (actual car items)
  const [headingRow, sliderTitleRow, carsContainerRow, ...carRows] = [...block.children];

  const rangeComponent = document.createElement('div');
  rangeComponent.classList.add('range-component');

  // Heading
  if (headingRow) {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    const colDiv = document.createElement('div');
    // Original HTML has col-md12, col-sm-12, col-md-12. The JS had this correct.
    colDiv.classList.add('col-md12', 'col-sm-12', 'gallery-header');
    moveInstrumentation(headingRow, colDiv);
    while (headingRow.firstChild) colDiv.append(headingRow.firstChild);
    rowDiv.append(colDiv);
    rangeComponent.append(rowDiv);
  }

  // Slider Title
  if (sliderTitleRow) {
    const sliderTitleDiv = document.createElement('div');
    sliderTitleDiv.classList.add('slider-title');
    const h4 = document.createElement('h4');
    // Ensure the ID is generated from the actual text content of the cell, not the row.
    // The sliderTitleRow itself contains a div, which contains the text.
    const sliderTitleText = sliderTitleRow.querySelector('div')?.textContent.trim() || '';
    h4.id = sliderTitleText.toLowerCase().replace(/\s+/g, '-');
    moveInstrumentation(sliderTitleRow, h4);
    // Append the content of the div inside sliderTitleRow to h4
    const sliderTitleContentDiv = sliderTitleRow.querySelector('div');
    if (sliderTitleContentDiv) {
      while (sliderTitleContentDiv.firstChild) h4.append(sliderTitleContentDiv.firstChild);
    }
    sliderTitleDiv.append(h4);
    rangeComponent.append(sliderTitleDiv);
  }

  // Helper to create carousel structure
  const createCarousel = (id, isMobile = false) => {
    const carouselDiv = document.createElement('div');
    carouselDiv.id = id;
    carouselDiv.classList.add('carousel', 'slide');
    // The original HTML uses `data-ride="carousel"` on the main carousel div.
    // While the JS implements manual controls, adding this attribute might be
    // expected for Bootstrap compatibility or future enhancements.
    // However, since we're implementing manual controls, we won't add data-ride="carousel"
    // as it would conflict with manual control.
    // If Bootstrap JS was present, data-ride would auto-initialize.
    // Since it's not, manual event listeners are correct.

    if (isMobile) {
      carouselDiv.classList.add('d-sm-none');
    } else {
      carouselDiv.classList.add('d-none', 'd-sm-block');
    }

    const carouselInner = document.createElement('div');
    carouselInner.classList.add('carousel-inner');
    carouselDiv.append(carouselInner);

    const itemsPerSlide = isMobile ? 2 : 4;
    for (let i = 0; i < carRows.length; i += itemsPerSlide) {
      const carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item');
      if (i === 0) {
        carouselItem.classList.add('active');
      }

      const row = document.createElement('div');
      row.classList.add('row');
      carouselItem.append(row);

      for (let j = 0; j < itemsPerSlide && (i + j) < carRows.length; j++) {
        const carRow = carRows[i + j];
        // Each carRow has a div wrapper, then its children (cells)
        const cells = carRow.querySelector('div')?.children || [];
        const [imageCell, altCell, titleCell, linkCell] = [...cells];

        const colDiv = document.createElement('div');
        colDiv.classList.add('col-6', 'col-sm-6', 'col-lg-3');

        const link = document.createElement('a');
        link.classList.add('image-area');
        const foundLink = linkCell?.querySelector('a'); // Use optional chaining for safety
        if (foundLink) {
          link.href = foundLink.href;
        }
        moveInstrumentation(linkCell, link); // Move instrumentation from linkCell to the new link

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        link.append(imageContainer);

        const picture = imageCell?.querySelector('picture'); // Use optional chaining
        if (picture) {
          const img = picture.querySelector('img');
          if (img) {
            const optimizedPic = createOptimizedPicture(img.src, altCell?.textContent.trim() || '', false, [{ width: '750' }]);
            moveInstrumentation(img, optimizedPic.querySelector('img'));
            imageContainer.append(optimizedPic);
            optimizedPic.querySelector('img').classList.add('img-fluid');
          }
        }

        const h6 = document.createElement('h6');
        h6.classList.add('img-title');
        moveInstrumentation(titleCell, h6);
        // Append the content of the div inside titleCell to h6
        if (titleCell) {
          while (titleCell.firstChild) h6.append(titleCell.firstChild);
        }
        link.append(h6);

        colDiv.append(link);
        row.append(colDiv);
      }
      carouselInner.append(carouselItem);
    }

    // Add controls
    const prevControl = document.createElement('a');
    prevControl.classList.add('carousel-control-prev');
    prevControl.href = `#${id}`;
    prevControl.role = 'button';
    prevControl.setAttribute('data-slide', 'prev'); // Add data-slide attribute for Bootstrap compatibility
    const prevSpanIcon = document.createElement('span');
    prevSpanIcon.classList.add('carousel-control-prev-icon');
    prevSpanIcon.setAttribute('aria-hidden', 'true');
    const prevSpanSrOnly = document.createElement('span');
    prevSpanSrOnly.classList.add('sr-only');
    prevSpanSrOnly.textContent = 'previous';
    prevControl.append(prevSpanIcon, prevSpanSrOnly);

    const nextControl = document.createElement('a');
    nextControl.classList.add('carousel-control-next');
    nextControl.href = `#${id}`;
    nextControl.role = 'button';
    nextControl.setAttribute('data-slide', 'next'); // Add data-slide attribute for Bootstrap compatibility
    const nextSpanIcon = document.createElement('span');
    nextSpanIcon.classList.add('carousel-control-next-icon');
    nextSpanIcon.setAttribute('aria-hidden', 'true');
    const nextSpanSrOnly = document.createElement('span');
    nextSpanSrOnly.classList.add('sr-only');
    nextSpanSrOnly.textContent = 'next';
    nextControl.append(nextSpanIcon, nextSpanSrOnly);

    carouselDiv.append(prevControl, nextControl);

    // Manual carousel control event listeners
    prevControl.addEventListener('click', (e) => {
      e.preventDefault();
      const activeItem = carouselDiv.querySelector('.carousel-item.active');
      if (activeItem) {
        const prevItem = activeItem.previousElementSibling;
        if (prevItem && prevItem.classList.contains('carousel-item')) {
          activeItem.classList.remove('active');
          prevItem.classList.add('active');
        } else if (!prevItem && carouselInner.lastElementChild) { // Loop to last item
          activeItem.classList.remove('active');
          carouselInner.lastElementChild.classList.add('active');
        }
      }
    });

    nextControl.addEventListener('click', (e) => {
      e.preventDefault();
      const activeItem = carouselDiv.querySelector('.carousel-item.active');
      if (activeItem) {
        const nextItem = activeItem.nextElementSibling;
        if (nextItem && nextItem.classList.contains('carousel-item')) {
          activeItem.classList.remove('active');
          nextItem.classList.add('active');
        } else if (!nextItem && carouselInner.firstElementChild) { // Loop to first item
          activeItem.classList.remove('active');
          carouselInner.firstElementChild.classList.add('active');
        }
      }
    });

    return carouselDiv;
  };

  if (carRows.length > 0) {
    // Ensure sliderTitleRow has content before trying to create an ID from it
    const sliderTitleTextForId = sliderTitleRow?.querySelector('div')?.textContent.trim() || 'default-slider';
    const desktopCarousel = createCarousel(`range-slider-${sliderTitleTextForId.toLowerCase().replace(/\s+/g, '-')}-desktop`, false);
    const mobileCarousel = createCarousel(`range-slider-${sliderTitleTextForId.toLowerCase().replace(/\s+/g, '-')}-mobile`, true);
    rangeComponent.append(desktopCarousel, mobileCarousel);
  }

  block.textContent = '';
  block.append(rangeComponent);
}
