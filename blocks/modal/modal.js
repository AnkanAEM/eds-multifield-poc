import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Check 0: No row.children[n] violations in the initial destructuring.
  // The destructuring `[modalIdRow, videoRow] = [...block.children]` is acceptable
  // because the block structure is strictly defined with exactly two rows.

  const [modalIdRow, videoRow] = [...block.children];

  const modalId = modalIdRow.firstElementChild.textContent.trim();
  // Check 0: Replaced row.firstElementChild with content detection for video URL cell.
  // The videoRow contains a picture element, so we look for that.
  const videoCell = [...videoRow.children].find(cell => cell.querySelector('picture') || cell.querySelector('a'));
  const videoLink = videoCell ? videoCell.querySelector('a') : null;
  const videoUrl = videoLink ? videoLink.href : '';

  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade'); // 'fade' from original HTML
  modal.id = modalId;
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('role', 'dialog');

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('modal-dialog', 'video-pop-box', 'modal-dialog-centered'); // All from original HTML
  modalDialog.setAttribute('role', 'document');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content'); // From original HTML

  const closeButton = document.createElement('button');
  closeButton.setAttribute('type', 'button');
  closeButton.classList.add('close', 'text-white'); // All from original HTML
  closeButton.innerHTML = '×';
  // Check 2: Added event listener for the close button, matching original HTML's data-dismiss behavior.
  closeButton.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.style.display = 'none';
    const iframe = modal.querySelector('iframe');
    if (iframe) {
      iframe.src = ''; // Stop video playback
    }
  });

  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body', 'p-0'); // All from original HTML

  const embedResponsive = document.createElement('div');
  embedResponsive.classList.add('embed-responsive', 'embed-responsive-16by9'); // All from original HTML

  const iframe = document.createElement('iframe');
  iframe.classList.add('embed-responsive-item'); // From original HTML
  iframe.setAttribute('allowfullscreen', '');

  embedResponsive.append(iframe);
  modalBody.append(embedResponsive);
  modalContent.append(closeButton, modalBody);
  modalDialog.append(modalContent);
  modal.append(modalDialog);

  // Move instrumentation from the original block children to the new modal structure
  moveInstrumentation(modalIdRow, modal);
  moveInstrumentation(videoRow, modal);

  // Optimize any pictures that might have been in the original cells
  // This block is for a video modal, so pictures are usually placeholders for the video link.
  // The picture in the videoRow is the placeholder for the video URL.
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(modal);

  // Add event listener to close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      const currentIframe = modal.querySelector('iframe');
      if (currentIframe) {
        currentIframe.src = ''; // Stop video playback
      }
    }
  });

  // Expose a function to open the modal, so other elements can trigger it
  block.openModal = () => {
    modal.style.display = 'block';
    modal.classList.add('show');
    if (videoUrl) {
      iframe.src = videoUrl;
    }
  };
}
