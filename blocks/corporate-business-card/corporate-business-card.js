import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, ...itemRows] = [...block.children];

  const gContainer = document.createElement('div');
  gContainer.classList.add('g-container');

  // Title
  if (titleRow) {
    const titleP = document.createElement('p');
    // The title content is directly in the first child's first child div
    const titleContentDiv = titleRow.firstElementChild;
    moveInstrumentation(titleContentDiv, titleP);
    titleP.classList.add('business-card-title');
    titleP.append(titleContentDiv.textContent.trim()); // Trim to remove potential whitespace
    gContainer.append(titleP);

    const hr = document.createElement('hr');
    hr.classList.add('business-card-title-hr');
    gContainer.append(hr);
  }

  const businessCardContainer = document.createElement('div');
  businessCardContainer.classList.add('business-card-container');

  itemRows.forEach((row) => {
    const businessCardItem = document.createElement('div');
    moveInstrumentation(row, businessCardItem);
    businessCardItem.classList.add('business-card-item');

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    businessCardItem.append(overlay);

    // Add event listener to toggle 'active' class on businessCardItem when overlay is clicked
    overlay.addEventListener('click', () => {
      businessCardItem.classList.toggle('active');
    });

    const businessCardItemAssets = document.createElement('div');
    businessCardItemAssets.classList.add('business-card-item-assets');

    const businessCardItemInfo = document.createElement('div');
    businessCardItemInfo.classList.add('business-card-item-info');

    const businessCardItemLogo = document.createElement('div');
    businessCardItemLogo.classList.add('business-card-item-logo');

    const businessCardItemDesc = document.createElement('div');
    businessCardItemDesc.classList.add('business-card-item-desc');

    [...row.children].forEach((cell, index) => {
      if (index === 0) { // video-poster
        const picture = cell.querySelector('picture');
        if (picture) {
          businessCardItemAssets.append(picture);
        }
      } else if (index === 1) { // logo
        const picture = cell.querySelector('picture');
        if (picture) {
          businessCardItemLogo.append(picture);
        }
      } else if (index === 2) { // heading
        const headingDiv = document.createElement('div');
        headingDiv.classList.add('business-card-item-title');
        const h3 = document.createElement('h3');
        moveInstrumentation(cell.firstElementChild, h3); // Move instrumentation from the actual content element
        h3.textContent = cell.textContent.trim();
        headingDiv.append(h3);
        businessCardItemDesc.append(headingDiv);
      } else if (index === 3) { // subtitle
        const subtitleP = document.createElement('p');
        moveInstrumentation(cell.firstElementChild, subtitleP); // Move instrumentation from the actual content element
        subtitleP.classList.add('business-card-item-subtitle');
        subtitleP.textContent = cell.textContent.trim();
        businessCardItemDesc.append(subtitleP);
      } else if (index === 4) { // cta-link
        const link = cell.querySelector('a');
        if (link) {
          const ctaButton = document.createElement('a');
          moveInstrumentation(link, ctaButton);
          ctaButton.classList.add('button', 'button-primary-white');
          ctaButton.href = link.href;
          ctaButton.textContent = link.textContent.trim();
          // Add target and rel if they exist in the original link
          if (link.target) ctaButton.target = link.target;
          if (link.rel) ctaButton.rel = link.rel;
          businessCardItemDesc.append(ctaButton);
        }
      }
    });

    businessCardItem.append(businessCardItemAssets);
    businessCardItemInfo.append(businessCardItemLogo, businessCardItemDesc);
    businessCardItem.append(businessCardItemInfo);
    businessCardContainer.append(businessCardItem);
  });

  gContainer.append(businessCardContainer);
  block.textContent = '';
  block.append(gContainer);

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
