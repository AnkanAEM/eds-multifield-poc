import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [imageRow] = [...block.children];

  const scarpComponent = document.createElement('div');
  scarpComponent.classList.add('scarp-component', 'fade-in');
  scarpComponent.setAttribute('data-fade-in', '');

  const scarpContainer = document.createElement('div');
  scarpContainer.classList.add('scarp_container');

  const picture = imageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      // Create optimized picture for the scarp image
      const optimizedPic = createOptimizedPicture(img.src, img.alt || '', false, [{ width: '750' }]);
      const scarpImage = optimizedPic.querySelector('img');
      scarpImage.setAttribute('aria-hidden', 'true');
      scarpImage.classList.add('scarp-separator__scarp', 'green-scarp');
      moveInstrumentation(img, scarpImage); // Move instrumentation from original img to the new scarpImage
      scarpContainer.append(optimizedPic); // Append the entire optimized picture element
    }
  }

  scarpComponent.append(scarpContainer);

  block.textContent = '';
  block.append(scarpComponent);
}
