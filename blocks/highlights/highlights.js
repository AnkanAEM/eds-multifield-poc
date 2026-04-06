import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const highlightItemsContainer = document.createElement('div');
  highlightItemsContainer.classList.add('highlight-items-container');

  // Skip the first row which is the container field label
  const itemRows = [...block.children].slice(1);

  itemRows.forEach((row, index) => {
    const highlightCard = document.createElement('div');
    moveInstrumentation(row, highlightCard);
    highlightCard.classList.add('highlight__card', `gradient${(index % 5) + 1}`); // Cycle through gradient1 to gradient5

    const highlightContent = document.createElement('div');
    highlightContent.classList.add('highlight__content');
    highlightCard.append(highlightContent);

    const highlightInfo = document.createElement('div');
    highlightInfo.classList.add('highlight__info');
    highlightContent.append(highlightInfo);

    const highlightContainer = document.createElement('div');
    highlightContainer.classList.add('highlight-container');
    highlightInfo.append(highlightContainer);

    const highlightTop = document.createElement('div');
    highlightTop.classList.add('highlight__top');
    highlightContainer.append(highlightTop);

    const highlightIcon = document.createElement('span');
    highlightIcon.classList.add('highlightIcon'); // Class name corrected to match original HTML
    highlightTop.append(highlightIcon);

    const highlightTopDescription = document.createElement('div');
    highlightTopDescription.classList.add('highlight__top__description');
    highlightTop.append(highlightTopDescription);

    const bottomSectionLink = document.createElement('a');
    bottomSectionLink.classList.add('bottom-section');
    bottomSectionLink.setAttribute('target', '_blank'); // From original HTML
    bottomSectionLink.setAttribute('rel', 'noopener noreferrer'); // From original HTML
    highlightContainer.append(bottomSectionLink);

    const separator = document.createElement('span');
    separator.classList.add('separator');
    bottomSectionLink.append(separator);

    const bottomContent = document.createElement('div');
    bottomContent.classList.add('bottom__content');
    bottomSectionLink.append(bottomContent);

    const btmTitle = document.createElement('div');
    btmTitle.classList.add('btm-title');
    bottomContent.append(btmTitle);

    const hTitle = document.createElement('h4');
    hTitle.classList.add('h-title');
    btmTitle.append(hTitle);

    const arrowLink = document.createElement('span');
    arrowLink.classList.add('arrow-link');
    btmTitle.append(arrowLink);

    const highlightBottomDescription = document.createElement('div');
    highlightBottomDescription.classList.add('highlight__bottom__description', 'g-xl-2');
    bottomContent.append(highlightBottomDescription);

    const backgroundOverlay = document.createElement('div');
    backgroundOverlay.classList.add('background-overlay');
    bottomSectionLink.append(backgroundOverlay);


    // Distribute cells into the created structure
    const [topDescCell, linkCell, titleCell, bottomDescCell] = [...row.children];

    // Top Description
    while (topDescCell.firstChild) {
      highlightTopDescription.append(topDescCell.firstChild);
    }

    // Link
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      bottomSectionLink.href = foundLink.href;
      // Copy other attributes if needed, e.g., data-href, data-modal, data-redirect
      if (foundLink.hasAttribute('data-href')) bottomSectionLink.setAttribute('data-href', foundLink.getAttribute('data-href'));
      if (foundLink.hasAttribute('data-modal')) bottomSectionLink.setAttribute('data-modal', foundLink.getAttribute('data-modal'));
      if (foundLink.hasAttribute('data-redirect')) bottomSectionLink.setAttribute('data-redirect', foundLink.getAttribute('data-redirect'));
    }

    // Title
    while (titleCell.firstChild) {
      hTitle.append(titleCell.firstChild);
    }

    // Bottom Description
    while (bottomDescCell.firstChild) {
      highlightBottomDescription.append(bottomDescCell.firstChild);
    }

    highlightItemsContainer.append(highlightCard);
  });

  block.textContent = '';
  block.append(highlightItemsContainer);
}
