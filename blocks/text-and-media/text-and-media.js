import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [imageRow, titleRow, descriptionRow, ctaLinkRow, ctaLabelRow] = [...block.children];

  const wrapper = document.createElement('div');
  wrapper.classList.add('cmp-text-and-media-wrapper');

  // Add the scarp image from the original HTML
  const scarpImg = document.createElement('img');
  scarpImg.classList.add('cmp-text-and-media__scarp', 'fade-in');
  scarpImg.setAttribute('data-fade-in', '');
  scarpImg.src = '/content/dam/aemigrate/uploaded-folder/image/frame21472233754-homepage-scarp-en.png'; // This should ideally come from a block field if dynamic
  scarpImg.alt = 'Combining play with a Prosperous Future'; // This should ideally come from a block field if dynamic
  scarpImg.loading = 'lazy';
  scarpImg.setAttribute('aria-label', 'Combining play with a Prosperous Future'); // This should ideally come from a block field if dynamic
  scarpImg.setAttribute('is-animated', 'true');
  scarpImg.setAttribute('data-is-reverse', 'true');
  wrapper.append(scarpImg);

  const cmpTextAndMedia = document.createElement('div');
  cmpTextAndMedia.classList.add('cmp-text-and-media');
  cmpTextAndMedia.setAttribute('data-cmp-is', 'text-and-media');
  cmpTextAndMedia.setAttribute('aria-labelledby', 'text-and-media-title');
  cmpTextAndMedia.style.overflow = 'hidden';
  cmpTextAndMedia.setAttribute('is-animated', 'true');
  cmpTextAndMedia.setAttribute('data-is-reverse', 'true');

  // Image Container
  const imageContainer = document.createElement('div');
  imageContainer.classList.add(
    'cmp-text-and-media--image-container',
    'animate-image-container-up-fade',
    'in-viewport',
    'slide-up',
  );
  imageContainer.setAttribute('data-slide-type', 'slide-up');
  imageContainer.setAttribute('data-slide-no-wrap', '');

  const pictureEl = imageRow.querySelector('picture');
  if (pictureEl) {
    // Use the existing picture element and apply classes
    pictureEl.classList.add('cmp-text-and-media--image-container__picture');
    const img = pictureEl.querySelector('img');
    if (img) {
      img.classList.add('cmp-text-and-media--image-container__image', 'layout-portrait', 'animate-image-zoom-out', 'in-viewport');
      img.setAttribute('role', 'img');
      // Optimize picture using createOptimizedPicture, replacing the original img
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      pictureEl.replaceWith(optimizedPic); // Replace the original picture with the optimized one
    }
    imageContainer.append(optimizedPic || pictureEl); // Append the optimized picture or the original if optimization failed
  }
  cmpTextAndMedia.append(imageContainer);

  // Content
  const content = document.createElement('div');
  content.classList.add('cmp-text-and-media--content', 'in-viewport');

  const slideWrap = document.createElement('div');
  slideWrap.classList.add('slide-wrap');

  const slideUp = document.createElement('div');
  slideUp.classList.add('slide-up');
  slideUp.setAttribute('data-slide-type', 'slide-up');

  // Title
  const titleDiv = document.createElement('div');
  titleDiv.id = 'text-and-media-title';
  titleDiv.classList.add('cmp-text-and-media--content__title');
  moveInstrumentation(titleRow.firstElementChild, titleDiv); // Target the inner div/p for instrumentation
  while (titleRow.firstElementChild.firstChild) titleDiv.append(titleRow.firstElementChild.firstChild);
  slideUp.append(titleDiv);

  // Description
  const descriptionDiv = document.createElement('div');
  descriptionDiv.classList.add('cmp-text-and-media--content__description');
  moveInstrumentation(descriptionRow.firstElementChild, descriptionDiv); // Target the inner div/p for instrumentation
  while (descriptionRow.firstElementChild.firstChild) descriptionDiv.append(descriptionRow.firstElementChild.firstChild);
  slideUp.append(descriptionDiv);

  // CTA Link
  const ctaLink = ctaLinkRow.querySelector('a');
  const ctaLabel = ctaLabelRow.textContent.trim();

  if (ctaLink) {
    const newCta = document.createElement('a');
    newCta.href = ctaLink.href;
    newCta.classList.add('cta', 'cta__primary', 'cmp-text-and-media--content__cta');
    newCta.setAttribute('target', '_self');
    newCta.setAttribute('aria-label', ctaLabel);
    moveInstrumentation(ctaLinkRow.firstElementChild, newCta); // Target the inner div/a for instrumentation

    const iconSpan = document.createElement('span');
    iconSpan.classList.add('cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
    iconSpan.setAttribute('aria-hidden', 'true');
    newCta.append(iconSpan);

    const labelSpan = document.createElement('span');
    labelSpan.classList.add('cta__label');
    labelSpan.textContent = ctaLabel;
    newCta.append(labelSpan);

    slideUp.append(newCta);
  }

  slideWrap.append(slideUp);
  content.append(slideWrap);
  cmpTextAndMedia.append(content);

  const overflowFix = document.createElement('div');
  overflowFix.classList.add('cmp-text-and-media-overflow-fix');
  cmpTextAndMedia.append(overflowFix);

  wrapper.append(cmpTextAndMedia);

  block.textContent = '';
  block.append(wrapper);
}
