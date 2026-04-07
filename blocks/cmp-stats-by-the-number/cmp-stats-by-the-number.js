import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('animate-ready', 'animate-in');
  block.setAttribute('role', 'region');
  block.setAttribute('aria-label', 'Statistics by the numbers');

  const blockChildren = [...block.children];
  const titleRow = blockChildren[0];
  const tabsContainerRow = blockChildren[1];

  const tabs = [];
  const allCards = []; // Store all card rows here

  // Separate tabs and cards
  blockChildren.slice(2).forEach((row) => {
    if (row.children.length === 6) { // Tab item
      tabs.push(row);
    } else if (row.children.length === 4) { // Card item
      allCards.push(row);
    }
  });

  const container = document.createElement('div');
  container.classList.add('cmp-stats-by-the-number__container');

  // Title Section
  const titleDiv = document.createElement('div');
  titleDiv.classList.add('cmp-stats-by-the-number__title');
  moveInstrumentation(titleRow, titleDiv);
  while (titleRow.firstChild) {
    titleDiv.append(titleRow.firstChild);
  }
  container.append(titleDiv);

  // Tabs Section
  const tabsSection = document.createElement('div');
  tabsSection.classList.add('cmp-stats-by-the-number__tabs');
  moveInstrumentation(tabsContainerRow, tabsSection);
  tabsContainerRow.remove(); // Remove the empty tabs container row

  const mainContent = document.createElement('div');
  mainContent.classList.add('cmp-stats-by-the-number__main-content');

  const imageSection = document.createElement('div');
  imageSection.classList.add('cmp-stats-by-the-number__image-section');

  const contentSection = document.createElement('div');
  contentSection.classList.add('cmp-stats-by-the-number__content-section');

  const allTabContents = [];
  const allImageContainers = [];

  let cardIndex = 0; // To keep track of which cards belong to which tab

  tabs.forEach((tabRow, index) => {
    const [tabLabelCell, mainImageCell, descriptionCell, cardsContainerCell, ctaLinkCell, ctaLabelCell] = [...tabRow.children];

    // Tab button
    const tabButton = document.createElement('button');
    tabButton.classList.add('cmp-stats-by-the-number__tab');
    if (index === 0) {
      tabButton.classList.add('cmp-stats-by-the-number__tab--active');
    }
    tabButton.setAttribute('data-tab', tabLabelCell.textContent.trim());
    tabButton.setAttribute('data-tab-index', index);
    moveInstrumentation(tabLabelCell, tabButton);
    tabButton.textContent = tabLabelCell.textContent.trim();
    tabsSection.append(tabButton);

    // Main Image Container
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('cmp-stats-by-the-number__image-container');
    if (index === 0) {
      imageContainer.classList.add('cmp-stats-by-the-number__image-container--active');
    }
    imageContainer.setAttribute('data-tab-content', index);
    const picture = mainImageCell.querySelector('picture');
    const img = picture ? picture.querySelector('img') : null;
    if (img) {
      imageContainer.setAttribute('data-image-path', img.src);
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('cmp-stats-by-the-number__main-image');
      optimizedPic.querySelector('img').setAttribute('data-tab-image', index);
      imageContainer.append(optimizedPic);
    }
    allImageContainers.push(imageContainer);

    // Tab Content Container
    const tabContent = document.createElement('div');
    tabContent.classList.add('cmp-stats-by-the-number__tab-content');
    if (index === 0) {
      tabContent.classList.add('cmp-stats-by-the-number__tab-content--active');
    }
    tabContent.setAttribute('data-tab-content', index);

    // Description
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('cmp-stats-by-the-number__description');
    moveInstrumentation(descriptionCell, descriptionDiv);
    while (descriptionCell.firstChild) {
      descriptionDiv.append(descriptionCell.firstChild);
    }
    tabContent.append(descriptionDiv);

    // Stats Cards Grid
    const cardsGrid = document.createElement('div');
    cardsGrid.classList.add('cmp-stats-by-the-number__cards');
    cardsGrid.setAttribute('role', 'list');
    moveInstrumentation(cardsContainerCell, cardsGrid);
    cardsContainerCell.remove(); // Remove the empty cards container cell

    // Filter cards for this tab based on the number of cards referenced in cardsContainerCell
    const numCardsForTab = cardsContainerCell.children.length;
    for (let i = 0; i < numCardsForTab; i += 1) {
      const cardRow = allCards[cardIndex];
      if (cardRow) {
        const [hoverImageCell, hoverDetailsCell, numberCell, cardDescriptionCell] = [...cardRow.children];

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('cmp-stats-by-the-number__card');
        cardDiv.setAttribute('role', 'img');
        moveInstrumentation(cardRow, cardDiv);

        const hoverPicture = hoverImageCell.querySelector('picture');
        const hoverImg = hoverPicture ? hoverPicture.querySelector('img') : null;
        if (hoverImg) {
          cardDiv.setAttribute('data-hover-image', hoverImg.src);
        }

        const hoverDetailsP = hoverDetailsCell.querySelector('p');
        if (hoverDetailsP) {
          cardDiv.setAttribute('data-hover-details', hoverDetailsP.innerHTML);
        }

        const numberDiv = document.createElement('div');
        numberDiv.classList.add('cmp-stats-by-the-number__card__number');
        moveInstrumentation(numberCell, numberDiv);
        const numberP = numberCell.querySelector('p');
        if (numberP) {
          numberDiv.setAttribute('data-count', numberP.innerHTML);
        }
        while (numberCell.firstChild) {
          numberDiv.append(numberCell.firstChild);
        }
        cardDiv.append(numberDiv);

        const cardDescriptionDiv = document.createElement('div');
        cardDescriptionDiv.classList.add('cmp-stats-by-the-number__card__description');
        moveInstrumentation(cardDescriptionCell, cardDescriptionDiv);
        while (cardDescriptionCell.firstChild) {
          cardDescriptionDiv.append(cardDescriptionCell.firstChild);
        }
        cardDiv.append(cardDescriptionDiv);

        // Set aria-label for card
        const numberText = numberDiv.textContent.trim();
        const descriptionText = cardDescriptionDiv.textContent.trim();
        cardDiv.setAttribute('aria-label', `${numberText}: ${descriptionText}`);

        cardsGrid.append(cardDiv);
      }
      cardIndex += 1;
    }
    tabContent.append(cardsGrid);

    // Call to Action Button
    const ctaDiv = document.createElement('div');
    ctaDiv.classList.add('cmp-stats-by-the-number__cta');
    const ctaLink = ctaLinkCell.querySelector('a');
    const ctaLabel = ctaLabelCell.textContent.trim();

    if (ctaLink) {
      const newCtaLink = document.createElement('a');
      newCtaLink.classList.add('cta', 'cta__primary');
      newCtaLink.href = ctaLink.href;
      if (ctaLink.target) {
        newCtaLink.target = ctaLink.target;
      }
      newCtaLink.setAttribute('aria-label', ctaLabel);
      newCtaLink.setAttribute('data-palette', 'palette-1'); // Assuming default palette

      const ctaIcon = document.createElement('span');
      ctaIcon.classList.add('cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
      ctaIcon.setAttribute('aria-hidden', 'true');
      newCtaLink.append(ctaIcon);

      const ctaLabelSpan = document.createElement('span');
      ctaLabelSpan.classList.add('cta__label');
      ctaLabelSpan.textContent = ctaLabel;
      newCtaLink.append(ctaLabelSpan);

      moveInstrumentation(ctaLinkCell, newCtaLink);
      moveInstrumentation(ctaLabelCell, ctaLabelSpan);
      ctaDiv.append(newCtaLink);
    }
    tabContent.append(ctaDiv);

    allTabContents.push(tabContent);
    tabRow.remove(); // Remove original tab row
  });

  imageSection.append(...allImageContainers);
  contentSection.append(...allTabContents);

  mainContent.append(imageSection, contentSection);

  container.append(tabsSection, mainContent);

  block.textContent = '';
  block.append(container);

  // Add event listeners for tab switching
  const tabButtons = block.querySelectorAll('.cmp-stats-by-the-number__tab');
  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const tabIndex = button.getAttribute('data-tab-index');

      // Deactivate all tabs and content
      block.querySelectorAll('.cmp-stats-by-the-number__tab').forEach((btn) => {
        btn.classList.remove('cmp-stats-by-the-number__tab--active');
      });
      block.querySelectorAll('.cmp-stats-by-the-number__image-container').forEach((imgContainer) => {
        imgContainer.classList.remove('cmp-stats-by-the-number__image-container--active');
      });
      block.querySelectorAll('.cmp-stats-by-the-number__tab-content').forEach((tabContent) => {
        tabContent.classList.remove('cmp-stats-by-the-number__tab-content--active');
      });

      // Activate clicked tab and corresponding content
      button.classList.add('cmp-stats-by-the-number__tab--active');
      block.querySelector(`.cmp-stats-by-the-number__image-container[data-tab-content="${tabIndex}"]`).classList.add('cmp-stats-by-the-number__image-container--active');
      block.querySelector(`.cmp-stats-by-the-number__tab-content[data-tab-content="${tabIndex}"]`).classList.add('cmp-stats-by-the-number__tab-content--active');
    });
  });

  // Add event listeners for card hover effects
  const cards = block.querySelectorAll('.cmp-stats-by-the-number__card');
  const imageSectionElement = block.querySelector('.cmp-stats-by-the-number__image-section');
  const descriptionSectionElement = block.querySelector('.cmp-stats-by-the-number__content-section');

  cards.forEach((card) => {
    const originalCardDescription = card.querySelector('.cmp-stats-by-the-number__card__description').innerHTML;
    const originalCardNumber = card.querySelector('.cmp-stats-by-the-number__card__number').innerHTML;

    card.addEventListener('mouseenter', () => {
      const hoverImage = card.getAttribute('data-hover-image');
      const hoverDetails = card.getAttribute('data-hover-details');
      const cardNumber = card.querySelector('.cmp-stats-by-the-number__card__number');
      const cardDescription = card.querySelector('.cmp-stats-by-the-number__card__description');

      // Update image section with hover image
      if (hoverImage && imageSectionElement) {
        const activeImageContainer = imageSectionElement.querySelector('.cmp-stats-by-the-number__image-container--active');
        if (activeImageContainer) {
          const imgElement = activeImageContainer.querySelector('img');
          if (imgElement) {
            imgElement.src = hoverImage;
            imgElement.srcset = hoverImage; // Update srcset as well for optimized picture
          }
        }
      }

      // Update card description with hover details
      if (hoverDetails && cardDescription) {
        cardDescription.innerHTML = hoverDetails;
      }
      if (cardNumber) {
        cardNumber.innerHTML = ''; // Clear number on hover
      }
    });

    card.addEventListener('mouseleave', () => {
      const activeImageContainer = imageSectionElement.querySelector('.cmp-stats-by-the-number__image-container--active');
      const activeTabContentIndex = activeImageContainer ? activeImageContainer.getAttribute('data-tab-content') : null;
      const originalImagePath = activeImageContainer ? activeImageContainer.getAttribute('data-image-path') : null;

      // Revert image section to original tab image
      if (originalImagePath && activeImageContainer) {
        const imgElement = activeImageContainer.querySelector('img');
        if (imgElement) {
          imgElement.src = originalImagePath;
          imgElement.srcset = originalImagePath; // Revert srcset
        }
      }

      // Revert card description and number
      const cardNumber = card.querySelector('.cmp-stats-by-the-number__card__number');
      const cardDescription = card.querySelector('.cmp-stats-by-the-number__card__description');
      if (cardDescription) {
        cardDescription.innerHTML = originalCardDescription;
      }
      if (cardNumber) {
        cardNumber.innerHTML = originalCardNumber;
      }
    });
  });
}
