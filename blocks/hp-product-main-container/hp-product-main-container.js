import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const productListContainer = document.createElement('div');
  productListContainer.classList.add('hp-product-list-container');

  const videoSection = document.createElement('section');
  videoSection.classList.add('section-5', 'yellow-bg');
  const videoContainer = document.createElement('div');
  videoContainer.classList.add('container', 'video-container');
  const videoTitle = document.createElement('h1');
  videoTitle.classList.add('hd1');
  videoTitle.textContent = 'Step into the world of Fortune';
  const videoBox = document.createElement('div');
  videoBox.classList.add('video-box', 'flex-center'); // slick-initialized, slick-slider added by JS

  let productCount = 0;
  [...block.children].forEach((row) => {
    const cells = [...row.children];

    // Detect item type based on content
    // hp-product-container has 4 cells: heading, subheading, button-link, main-image (picture)
    // video-list has 3 cells: thumbnail (picture), video-url (a), description
    const isHpProductContainer = cells.length === 4 && cells[3].querySelector('picture');
    const isVideoList = cells.length === 3 && cells[0].querySelector('picture') && cells[1].querySelector('a');

    if (isHpProductContainer) {
      const section = document.createElement('section');
      section.classList.add('hp-product-container');
      if (productCount % 2 === 0) {
        section.classList.add('reverse');
      } else {
        section.classList.add('noreverse');
      }
      moveInstrumentation(row, section);

      const rightDiv = document.createElement('div');
      rightDiv.classList.add('hp-product-right');
      const rightDataDiv = document.createElement('div');
      rightDataDiv.classList.add('hp-product-right-data');

      // Find cells by content type
      const headingCell = cells.find(cell => cell.querySelector('p') && !cell.querySelector('a'));
      const subheadingCell = cells.find(cell => cell !== headingCell && cell.querySelector('p') && !cell.querySelector('a'));
      const buttonLinkCell = cells.find(cell => cell.querySelector('a'));
      const mainImageCell = cells.find(cell => cell.querySelector('picture'));

      const heading = document.createElement('h2');
      heading.classList.add('hd1', 'bgtext', 'mb-3');
      if (headingCell) {
        moveInstrumentation(headingCell, heading);
        while (headingCell.firstChild) heading.append(headingCell.firstChild);
      }

      const subheading = document.createElement('h4');
      subheading.classList.add('hd4', 'mb-4');
      if (subheadingCell) {
        moveInstrumentation(subheadingCell, subheading);
        while (subheadingCell.firstChild) subheading.append(subheadingCell.firstChild);
      }

      const buttonLink = document.createElement('a');
      buttonLink.classList.add('common-button');
      if (buttonLinkCell) {
        const foundButtonLink = buttonLinkCell.querySelector('a');
        if (foundButtonLink) {
          buttonLink.href = foundButtonLink.href;
          buttonLink.textContent = foundButtonLink.textContent;
        }
        moveInstrumentation(buttonLinkCell, buttonLink);
      }

      rightDataDiv.append(heading, subheading, buttonLink);
      rightDiv.append(rightDataDiv);

      const leftDiv = document.createElement('div');
      leftDiv.classList.add('hp-product-left');
      const leftBloomDiv = document.createElement('div');
      leftBloomDiv.classList.add('hp-product-left-bloom');
      const productBloomDiv = document.createElement('div');
      productBloomDiv.classList.add('hp-product-bloom', `topImageBloom${productCount + 1}`);

      if (mainImageCell) {
        const picture = mainImageCell.querySelector('picture');
        if (picture) {
          const img = picture.querySelector('img');
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          productBloomDiv.append(optimizedPic);
        }
        moveInstrumentation(mainImageCell, productBloomDiv);
      }

      leftBloomDiv.append(productBloomDiv);
      leftDiv.append(leftBloomDiv);

      section.append(rightDiv, leftDiv);
      productListContainer.append(section);
      productCount += 1;
    } else if (isVideoList) {
      const videoListItem = document.createElement('div');
      videoListItem.classList.add('video-list');
      moveInstrumentation(row, videoListItem);

      // Find cells by content type
      const thumbnailCell = cells.find(cell => cell.querySelector('picture'));
      const videoUrlCell = cells.find(cell => cell.querySelector('a') && !cell.querySelector('picture'));
      const descriptionCell = cells.find(cell => cell.querySelector('p') && !cell.querySelector('a'));

      const videoHeader = document.createElement('div');
      videoHeader.classList.add('video-header');
      const playButton = document.createElement('span');
      playButton.classList.add('play-button');

      const foundVideoLink = videoUrlCell ? videoUrlCell.querySelector('a') : null;
      const videoSrc = foundVideoLink ? foundVideoLink.href : '#';

      if (thumbnailCell) {
        const thumbnailPicture = thumbnailCell.querySelector('picture');
        if (thumbnailPicture) {
          const img = thumbnailPicture.querySelector('img');
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          const optimizedImg = optimizedPic.querySelector('img');
          optimizedImg.alt = 'Fortune Foods'; // Original HTML had this alt
          videoHeader.append(optimizedPic);

          // Add event listener for video modal
          videoHeader.addEventListener('click', () => {
            // Implement modal logic here.
            // A more complete implementation would involve creating a modal element
            // and embedding an iframe with the videoSrc.
            console.log(`Playing video: ${videoSrc}`);
            // Example: dispatch a custom event for a global modal handler
            const videoModalEvent = new CustomEvent('open-video-modal', {
              detail: { videoSrc },
            });
            document.dispatchEvent(videoModalEvent);
          });
        }
        videoHeader.prepend(playButton); // Play button on top of image
        moveInstrumentation(thumbnailCell, videoHeader);
      }

      const videoBody = document.createElement('div');
      videoBody.classList.add('video-body');
      const descriptionP = document.createElement('p');
      if (descriptionCell) {
        moveInstrumentation(descriptionCell, descriptionP);
        while (descriptionCell.firstChild) descriptionP.append(descriptionCell.firstChild);
      }

      const btnContainer = document.createElement('div');
      btnContainer.classList.add('btn-conatiner', 'spacing-btn');
      const watchNowButton = document.createElement('button');
      watchNowButton.classList.add('common-button');
      watchNowButton.textContent = 'Watch Now';
      watchNowButton.type = 'button';
      watchNowButton.addEventListener('click', () => {
        console.log(`Playing video: ${videoSrc}`);
        const videoModalEvent = new CustomEvent('open-video-modal', {
          detail: { videoSrc },
        });
        document.dispatchEvent(videoModalEvent);
      });
      btnContainer.append(watchNowButton);

      videoBody.append(descriptionP, btnContainer);
      videoListItem.append(videoHeader, videoBody);
      videoBox.append(videoListItem);
    }
  });

  videoContainer.append(videoTitle, videoBox);
  videoSection.append(videoContainer);

  block.textContent = '';
  block.append(productListContainer, videoSection);

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
