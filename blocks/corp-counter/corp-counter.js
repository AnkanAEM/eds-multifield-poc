import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    bgImageMobileRow,
    bgImageDesktopRow,
    countersContainerRow, // This row is a container for counters, but its content is not directly used.
    buttonsContainerRow,  // This row is a container for buttons, but its content is not directly used.
    ...itemRows
  ] = [...block.children];

  const genericWrapper = document.createElement('div');
  genericWrapper.classList.add('genericWrapper');

  // Background Image Mobile
  const mobilePicture = bgImageMobileRow.querySelector('picture');
  if (mobilePicture) {
    const mobileImg = mobilePicture.querySelector('img');
    if (mobileImg) {
      const optimizedPic = createOptimizedPicture(mobileImg.src, mobileImg.alt, false, [{ width: '750' }]);
      const newImg = optimizedPic.querySelector('img');
      newImg.classList.add('generic-mobile');
      newImg.removeAttribute('width');
      newImg.removeAttribute('height');
      moveInstrumentation(mobileImg, newImg);
      genericWrapper.append(newImg);
    }
  }

  // Background Image Desktop
  const desktopPicture = bgImageDesktopRow.querySelector('picture');
  if (desktopPicture) {
    const desktopImg = desktopPicture.querySelector('img');
    if (desktopImg) {
      const optimizedPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '2000' }]);
      const newImg = optimizedPic.querySelector('img');
      newImg.classList.add('generic-desktop');
      newImg.removeAttribute('width');
      newImg.removeAttribute('height');
      moveInstrumentation(desktopImg, newImg);
      genericWrapper.append(newImg);
    }
  }

  const innerCounterContainer = document.createElement('div');
  innerCounterContainer.classList.add('inner-counter-container');

  const gRow = document.createElement('div');
  gRow.classList.add('g-row');

  // Filter itemRows into counters and buttons based on structure
  const counters = itemRows.filter((row) => row.children.length === 3 && row.querySelector('picture'));
  const buttons = itemRows.filter((row) => row.children.length === 2 && row.querySelector('a'));

  counters.forEach((row, index) => {
    const colDiv = document.createElement('div');
    colDiv.classList.add('col-6', 'col-sm-6', 'col-md-6', 'col-lg-3', 'col-xl-3', 'text-center');

    const bgImageCell = row.children[0];
    const valueCell = row.children[1];
    const labelCell = row.children[2];

    if (index === 0) {
      colDiv.classList.remove('col-6', 'col-sm-6', 'col-md-6', 'col-lg-3', 'col-xl-3');
      colDiv.classList.add('col-12', 'col-sm-12', 'col-md-12', 'col-lg-6', 'col-xl-6'); // Removed duplicate col-lg-12, col-xl-12 from original JS
      
      const customerCountDiv = document.createElement('div');
      customerCountDiv.classList.add('customer-count', 'clearfix');

      const numscrollerDiv = document.createElement('div');
      numscrollerDiv.classList.add('numscroller');

      const bgImageWrapper = document.createElement('div');
      bgImageWrapper.classList.add('bg-image-wrapper');

      const counterPicture = bgImageCell.querySelector('picture');
      if (counterPicture) {
        const counterImg = counterPicture.querySelector('img');
        if (counterImg) {
          const optimizedPic = createOptimizedPicture(counterImg.src, counterImg.alt, false, [{ width: '750' }]);
          moveInstrumentation(counterImg, optimizedPic.querySelector('img'));
          bgImageWrapper.append(optimizedPic);
        }
      }

      const valueSpan = document.createElement('span');
      moveInstrumentation(valueCell, valueSpan);
      valueSpan.textContent = valueCell.textContent;
      valueSpan.setAttribute('data-delay', '20000');
      valueSpan.setAttribute('data-increment', '111111');
      valueSpan.setAttribute('data-min', '0');
      valueSpan.setAttribute('data-max', valueCell.textContent.replace(/[^0-9]/g, ''));

      numscrollerDiv.append(bgImageWrapper, valueSpan);
      customerCountDiv.append(numscrollerDiv);

      const labelSpan = document.createElement('span');
      labelSpan.classList.add('count-label');
      moveInstrumentation(labelCell, labelSpan);
      labelSpan.textContent = labelCell.textContent;

      colDiv.append(customerCountDiv, labelSpan);
    } else {
      if (index === 1) {
        colDiv.classList.add('middle-component', 'col-divider');
      }
      const h2 = document.createElement('h2');
      h2.classList.add('count-number');
      moveInstrumentation(valueCell, h2); // Instrumentation for value cell
      h2.textContent = valueCell.textContent;

      const labelSpan = document.createElement('span');
      labelSpan.classList.add('count-label');
      moveInstrumentation(labelCell, labelSpan); // Instrumentation for label cell
      labelSpan.textContent = labelCell.textContent;

      colDiv.append(h2, labelSpan);
    }
    moveInstrumentation(row, colDiv);
    gRow.append(colDiv);
  });

  innerCounterContainer.append(gRow);

  const buttonGutter = document.createElement('div');
  buttonGutter.classList.add('button-gutter', 'text-center');

  buttons.forEach((row) => {
    const buttonLink = document.createElement('a');
    buttonLink.classList.add('button', 'button-red', 'button-180');

    const textCell = row.children[0];
    const hrefCell = row.children[1];

    const foundLink = hrefCell.querySelector('a');
    if (foundLink) {
      buttonLink.href = foundLink.href;
      buttonLink.textContent = textCell.textContent;
      moveInstrumentation(row, buttonLink);
      buttonGutter.append(buttonLink);
    }
  });

  innerCounterContainer.append(buttonGutter);
  genericWrapper.append(innerCounterContainer);

  block.textContent = '';
  block.append(genericWrapper);

  // This part of the original JS seems to be a generic image optimization that might be redundant
  // if createOptimizedPicture is already used for specific images.
  // Keeping it for now as it was in the original, but it might be worth reviewing if it's truly needed.
  genericWrapper.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
