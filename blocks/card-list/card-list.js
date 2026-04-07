import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure block.children based on BlockJson and EDS Block Structure
  // [headingRow, ctaRow, cardsContainerRow, ...cardItemRows]
  // The 'cards' field is a container, its content is not directly rendered,
  // so we skip the third row from direct processing and only iterate over subsequent cardItemRows.
  const [headingRow, ctaRow, , ...cardItemRows] = [...block.children];

  const cmpCardList = document.createElement('div');
  cmpCardList.classList.add('cmp-card-list', 'parallax-child');

  const cmpCardListContent = document.createElement('div');
  cmpCardListContent.classList.add('cmp-card-list__content');
  cmpCardList.append(cmpCardListContent);

  // Top section (Heading and CTA)
  const slideWrap = document.createElement('div');
  slideWrap.classList.add('slide-wrap');
  cmpCardListContent.append(slideWrap);

  const contentTop = document.createElement('div');
  contentTop.classList.add('cmp-card-list__content__top', 'slide-up');
  contentTop.setAttribute('data-slide-type', 'slide-up');
  slideWrap.append(contentTop);

  // Heading
  if (headingRow) {
    const headingWrapper = document.createElement('div');
    headingWrapper.classList.add('cmp-card-list__content__heading', 'is-visible');
    contentTop.append(headingWrapper);

    const headingTitle = document.createElement('div');
    headingTitle.id = 'card-list-heading';
    headingTitle.classList.add('cmp-card-list__content__heading__title');
    moveInstrumentation(headingRow.firstElementChild, headingTitle);
    while (headingRow.firstElementChild.firstChild) {
      headingTitle.append(headingRow.firstElementChild.firstChild);
    }
    headingWrapper.append(headingTitle);
  }

  // CTA
  if (ctaRow) {
    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('cmp-card-list__content__cta-wrapper', 'is-visible');
    contentTop.append(ctaWrapper);

    const ctaLink = ctaRow.querySelector('a');
    if (ctaLink) {
      const newCta = document.createElement('a');
      newCta.href = ctaLink.href;
      newCta.classList.add('cta', 'cta__primary');
      newCta.target = '_self'; // Default target
      newCta.setAttribute('aria-label', ctaLink.textContent);
      newCta.setAttribute('data-palette', 'palette-1');

      const ctaIcon = document.createElement('span');
      ctaIcon.classList.add('cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
      ctaIcon.setAttribute('aria-hidden', 'true');
      newCta.append(ctaIcon);

      const ctaLabel = document.createElement('span');
      ctaLabel.classList.add('cta__label');
      moveInstrumentation(ctaRow.firstElementChild, ctaLabel);
      while (ctaRow.firstElementChild.firstChild) {
        ctaLabel.append(ctaRow.firstElementChild.firstChild);
      }
      newCta.append(ctaLabel);
      ctaWrapper.append(newCta);
    }
  }

  // Cards
  const cardsItems = document.createElement('div');
  cardsItems.classList.add('cmp-card-list__content__items');
  cmpCardListContent.append(cardsItems);

  cardItemRows.forEach((row, index) => {
    const cardItem = document.createElement('div');
    cardItem.classList.add('cmp-card-list__content__card-item', 'is-visible', 'slide-up');
    cardItem.setAttribute('data-animation', 'card');
    cardItem.setAttribute('data-slide-type', 'slide-up');
    cardItem.setAttribute('data-slide-no-wrap', '');
    cardItem.setAttribute('data-slide-delay', `${index * 100}`.padStart(3, '0'));
    cardItem.style.transitionDelay = `${index * 0.2}s`;
    moveInstrumentation(row, cardItem);

    // Each card item row has 3 cells: image, title, description
    const [imageCell, titleCell, descriptionCell] = [...row.children];

    // Image
    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          optimizedPic.querySelector('img').classList.add('cmp-card-list__content__card-item__image');
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          cardItem.append(optimizedPic);
        }
      }
    }

    const cardItemContent = document.createElement('div');
    cardItemContent.classList.add('cmp-card-list__content__card-item-content');
    cardItem.append(cardItemContent);

    // Title
    if (titleCell) {
      const headingWrapper = document.createElement('div');
      headingWrapper.classList.add('cmp-card-list__content__card-item-content__heading-wrapper');
      cardItemContent.append(headingWrapper);

      const titleDiv = document.createElement('div');
      titleDiv.classList.add('cmp-card-list__content__card-item-content__title');
      titleDiv.setAttribute('aria-hidden', 'false');
      moveInstrumentation(titleCell, titleDiv);
      while (titleCell.firstChild) {
        titleDiv.append(titleCell.firstChild);
      }
      headingWrapper.append(titleDiv);
    }

    // Description
    if (descriptionCell) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('cmp-card-list__content__card-item-content__description');
      descriptionDiv.setAttribute('aria-hidden', 'false');
      moveInstrumentation(descriptionCell, descriptionDiv);
      while (descriptionCell.firstChild) {
        descriptionDiv.append(descriptionCell.firstChild);
      }
      cardItemContent.append(descriptionDiv);
    }
    cardsItems.append(cardItem);
  });

  block.textContent = '';
  block.append(cmpCardList);
}
