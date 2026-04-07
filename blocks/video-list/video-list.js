import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...videoRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section-5', 'yellow-bg');

  const container = document.createElement('div');
  container.classList.add('container', 'video-container');
  section.append(container);

  if (headingRow) {
    const heading = headingRow.querySelector('div');
    if (heading) {
      const h1 = document.createElement('h1');
      h1.classList.add('hd1');
      moveInstrumentation(headingRow, h1);
      h1.textContent = heading.textContent;
      container.append(h1);
    }
  }

  const videoBox = document.createElement('div');
  videoBox.classList.add('video-box', 'flex-center');
  container.append(videoBox);

  // Modal structure for video playback
  const videoModal = document.createElement('div');
  videoModal.id = 'videoModal';
  videoModal.classList.add('modal-video-playback'); // Using a unique class for custom modal
  videoModal.setAttribute('tabindex', '-1');
  videoModal.setAttribute('aria-labelledby', 'videoModalLabel');
  videoModal.setAttribute('aria-hidden', 'true');
  videoModal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="videoModalLabel">Video Playback</h5>
          <button type="button" class="btn-close" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="ratio ratio-16x9">
            <iframe id="videoPlayer" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-m_edia; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </div>
  `;
  block.closest('main').append(videoModal);

  const videoPlayer = videoModal.querySelector('#videoPlayer');
  const modalCloseBtn = videoModal.querySelector('.btn-close');

  const openModal = (videoUrl) => {
    videoPlayer.src = videoUrl;
    videoModal.classList.add('show-modal'); // Custom class for showing modal
    videoModal.style.display = 'block';
    videoModal.removeAttribute('aria-hidden');
    videoModal.setAttribute('aria-modal', 'true');
  };

  const closeModal = () => {
    videoPlayer.src = ''; // Stop video playback
    videoModal.classList.remove('show-modal'); // Custom class for hiding modal
    videoModal.style.display = 'none';
    videoModal.setAttribute('aria-hidden', 'true');
    videoModal.removeAttribute('aria-modal');
  };

  modalCloseBtn.addEventListener('click', closeModal);
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      closeModal();
    }
  });

  const slickList = document.createElement('div');
  slickList.classList.add('slick-list', 'draggable');
  const slickTrack = document.createElement('div');
  slickTrack.classList.add('slick-track');
  slickList.append(slickTrack);
  videoBox.append(slickList);

  videoRows.forEach((row, index) => {
    const videoItem = document.createElement('div');
    videoItem.classList.add('video-list', 'slick-slide');
    if (index === 0) {
      videoItem.classList.add('slick-current', 'slick-active');
    }
    videoItem.setAttribute('data-slick-index', index);
    videoItem.setAttribute('aria-hidden', index !== 0);
    videoItem.setAttribute('tabindex', index === 0 ? '0' : '-1');
    videoItem.setAttribute('role', 'option');
    videoItem.setAttribute('aria-describedby', `slick-slide4${index}`);

    const cells = [...row.children];
    let thumbnailCell;
    let videoUrlCell;
    let descriptionCell;

    cells.forEach((cell) => {
      if (cell.querySelector('picture')) {
        thumbnailCell = cell;
      } else if (cell.querySelector('a')) {
        videoUrlCell = cell;
      } else {
        descriptionCell = cell;
      }
    });

    if (thumbnailCell && videoUrlCell && descriptionCell) {
      const videoHeader = document.createElement('div');
      videoHeader.classList.add('video-header');

      const playButton = document.createElement('span');
      playButton.classList.add('play-button');
      videoHeader.append(playButton);

      const picture = thumbnailCell.querySelector('picture');
      const img = picture ? picture.querySelector('img') : null;
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        videoHeader.append(optimizedPic);
      }

      const videoLink = videoUrlCell.querySelector('a');
      const videoSrc = videoLink ? videoLink.href.replace('watch?v=', 'embed/').split('&')[0] : '';

      // Add event listener to the video header to open the modal
      videoHeader.addEventListener('click', () => {
        openModal(`${videoSrc}?enablejsapi=1&rel=0&autoplay=1&mute=1`);
      });

      const videoBody = document.createElement('div');
      videoBody.classList.add('video-body');

      const descriptionP = document.createElement('p');
      moveInstrumentation(descriptionCell, descriptionP);
      descriptionP.innerHTML = descriptionCell.innerHTML;
      videoBody.append(descriptionP);

      const btnContainer = document.createElement('div');
      btnContainer.classList.add('btn-conatiner', 'spacing-btn');

      const watchNowBtn = document.createElement('button');
      watchNowBtn.classList.add('common-button');
      watchNowBtn.setAttribute('type', 'button');
      watchNowBtn.textContent = 'Watch Now';
      watchNowBtn.addEventListener('click', () => {
        openModal(`${videoSrc}?enablejsapi=1&rel=0&autoplay=1&mute=1`);
      });
      btnContainer.append(watchNowBtn);
      videoBody.append(btnContainer);

      videoItem.append(videoHeader, videoBody);
      slickTrack.append(videoItem);
    }
  });

  // Placeholder for slick arrows - actual functionality would be handled by a JS library
  const slickPrev = document.createElement('button');
  slickPrev.classList.add('slick-prev', 'slick-arrow');
  slickPrev.setAttribute('type', 'button');
  slickPrev.setAttribute('aria-label', 'Previous');
  slickPrev.setAttribute('role', 'button');
  slickPrev.textContent = 'Previous';
  videoBox.prepend(slickPrev);

  const slickNext = document.createElement('button');
  slickNext.classList.add('slick-next', 'slick-arrow');
  slickNext.setAttribute('type', 'button');
  slickNext.setAttribute('aria-label', 'Next');
  slickNext.setAttribute('role', 'button');
  slickNext.textContent = 'Next';
  videoBox.append(slickNext);

  block.textContent = '';
  block.append(section);
}
