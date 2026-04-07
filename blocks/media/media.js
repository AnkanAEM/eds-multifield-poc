import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [videoPosterRow, videoSrcRow] = [...block.children];

  const videoPosterPicture = videoPosterRow.querySelector('picture');
  const videoSrcPicture = videoSrcRow.querySelector('picture');

  const videoPosterImg = videoPosterPicture ? videoPosterPicture.querySelector('img') : null;
  const videoSrcImg = videoSrcPicture ? videoSrcPicture.querySelector('img') : null;

  const videoPosterUrl = videoPosterImg ? videoPosterImg.src : '';
  const videoSrcUrl = videoSrcImg ? videoSrcImg.src : '';

  block.classList.add('inner-video');

  const cmpMedia = document.createElement('div');
  cmpMedia.classList.add('cmp-media');

  const viewportVideoHidden = document.createElement('div');
  viewportVideoHidden.classList.add('viewport-video');
  viewportVideoHidden.setAttribute('hidden', '');
  viewportVideoHidden.setAttribute('aria-hidden', 'true');
  cmpMedia.append(viewportVideoHidden);

  const cmpMediaBackground = document.createElement('div');
  cmpMediaBackground.classList.add('cmp-media__background');
  cmpMedia.append(cmpMediaBackground);

  const cmpMediaWrapper = document.createElement('div');
  cmpMediaWrapper.classList.add('cmp-media__wrapper', 'cmp-media__wrapper--no-title');
  cmpMedia.append(cmpMediaWrapper);

  const cmpMediaHeader = document.createElement('div');
  cmpMediaHeader.classList.add('cmp-media__header');
  cmpMediaWrapper.append(cmpMediaHeader);

  const cmpMediaHeading = document.createElement('div');
  cmpMediaHeading.classList.add('cmp-media__heading');
  cmpMediaHeader.append(cmpMediaHeading);

  const cmpMediaTitle = document.createElement('div');
  cmpMediaTitle.classList.add('cmp-media__title');
  cmpMediaHeading.append(cmpMediaTitle);

  const videoDiv = document.createElement('div');
  videoDiv.classList.add('video', 'apps.qiddiya__002d__commons.components.content.commons.video__002d__v1.v1.video__002d__v1.video__002d__v1__002e__html@1c33028a');
  cmpMediaWrapper.append(videoDiv);

  const videoPosterDiv = document.createElement('div');
  videoPosterDiv.classList.add('video-poster');
  videoDiv.append(videoPosterDiv);

  const playButton = document.createElement('button');
  playButton.classList.add('video-poster__play-button');
  videoPosterDiv.append(playButton);

  const playIcon = document.createElement('span');
  playIcon.classList.add('qd-icon', 'qd-icon--play', 'video-poster__play-button__icon');
  playButton.append(playIcon);

  const playButtonText = document.createElement('span');
  playButtonText.classList.add('video-poster__play-button__text');
  playButtonText.setAttribute('visually-hidden', ''); // Corrected from 'visually-hidden'
  playButtonText.textContent = 'Watch Video';
  playButton.append(playButtonText);

  const posterVideo = document.createElement('video');
  posterVideo.classList.add('video-poster__video');
  posterVideo.setAttribute('muted', '');
  posterVideo.setAttribute('loop', '');
  posterVideo.setAttribute('playsinline', '');
  posterVideo.setAttribute('webkit-playsinline', '');
  posterVideo.setAttribute('x-webkit-airplay', 'allow');
  posterVideo.setAttribute('autoplay', '');
  posterVideo.src = videoPosterUrl;
  posterVideo.poster = videoPosterUrl;
  videoPosterDiv.append(posterVideo);

  const videoContainer = document.createElement('div');
  videoContainer.classList.add('video-container', 'show-controls', 'video-hide');
  videoDiv.append(videoContainer);

  const viewportVideoContainer = document.createElement('div');
  viewportVideoContainer.classList.add('viewport-video');
  viewportVideoContainer.setAttribute('hidden', '');
  viewportVideoContainer.setAttribute('aria-hidden', 'true');
  videoContainer.append(viewportVideoContainer);

  const videoControls = document.createElement('div');
  videoControls.classList.add('video-container__controls');
  videoContainer.append(videoControls);

  const videoTimer = document.createElement('div');
  videoTimer.classList.add('video-container__controls__timer');
  videoControls.append(videoTimer);

  const progressArea = document.createElement('div');
  progressArea.classList.add('video-container__controls__timer__progress-area');
  videoTimer.append(progressArea);

  const progressBar = document.createElement('span');
  progressBar.classList.add('video-container__controls__timer__progress-area__progress-bar');
  progressArea.append(progressBar);

  const pointer = document.createElement('span');
  pointer.classList.add('video-container__controls__timer__progress-area__pointer');
  progressArea.append(pointer);

  const progressPending = document.createElement('span');
  progressPending.classList.add('video-container__controls__timer__progress-area__progress-pending');
  progressArea.append(progressPending);

  const currentTime = document.createElement('p');
  currentTime.classList.add('video-container__controls__timer__current-time');
  currentTime.textContent = '00:00';
  videoTimer.append(currentTime);

  const duration = document.createElement('p');
  duration.classList.add('video-container__controls__timer__duration');
  duration.textContent = '00:00';
  videoTimer.append(duration);

  const controlsButtons = document.createElement('div');
  controlsButtons.classList.add('video-container__controls__buttons');
  videoControls.append(controlsButtons);

  const playControlButton = document.createElement('button');
  playControlButton.classList.add('video-container__controls__buttons__play-button', 'video-container__controls__buttons--button');
  controlsButtons.append(playControlButton);

  const playControlIcon = document.createElement('span');
  playControlIcon.classList.add('video-container__controls__buttons__icon', 'qd-icon', 'qd-icon--play');
  playControlButton.append(playControlIcon);

  const muteButton = document.createElement('button');
  muteButton.classList.add('video-container__controls__buttons__mute-button', 'video-container__controls__buttons--button');
  controlsButtons.append(muteButton);

  const muteIcon = document.createElement('span');
  muteIcon.classList.add('video-container__controls__buttons__icon', 'qd-icon', 'qd-icon--volume');
  muteButton.append(muteIcon);

  const fullscreenButton = document.createElement('button');
  fullscreenButton.classList.add('video-container__controls__buttons__fullscreen-button', 'video-container__controls__buttons--button');
  controlsButtons.append(fullscreenButton);

  const fullscreenIcon = document.createElement('span');
  fullscreenIcon.classList.add('video-container__controls__buttons__icon', 'qd-icon', 'qd-icon--fullscreen');
  fullscreenButton.append(fullscreenIcon);

  const mainVideo = document.createElement('video');
  mainVideo.classList.add('video-container__video');
  mainVideo.setAttribute('playsinline', '');
  mainVideo.setAttribute('webkit-playsinline', '');
  mainVideo.setAttribute('x-webkit-airplay', 'allow');
  mainVideo.setAttribute('data-video-src', videoSrcUrl);
  mainVideo.src = videoSrcUrl;
  mainVideo.poster = videoPosterUrl; // Added poster attribute for main video
  videoContainer.append(mainVideo);

  // Event Listeners for video controls
  playButton.addEventListener('click', () => {
    videoPosterDiv.setAttribute('hidden', '');
    videoPosterDiv.setAttribute('aria-hidden', 'true');
    videoContainer.classList.remove('video-hide');
    mainVideo.play();
    posterVideo.pause();
    playControlIcon.classList.remove('qd-icon--play');
    playControlIcon.classList.add('qd-icon--pause');
  });

  playControlButton.addEventListener('click', () => {
    if (mainVideo.paused) {
      mainVideo.play();
      playControlIcon.classList.remove('qd-icon--play');
      playControlIcon.classList.add('qd-icon--pause');
    } else {
      mainVideo.pause();
      playControlIcon.classList.remove('qd-icon--pause');
      playControlIcon.classList.add('qd-icon--play');
    }
  });

  muteButton.addEventListener('click', () => {
    mainVideo.muted = !mainVideo.muted;
    if (mainVideo.muted) {
      muteIcon.classList.remove('qd-icon--volume');
      muteIcon.classList.add('qd-icon--volume-mute');
    } else {
      muteIcon.classList.remove('qd-icon--volume-mute');
      muteIcon.classList.add('qd-icon--volume');
    }
  });

  fullscreenButton.addEventListener('click', () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      fullscreenIcon.classList.remove('qd-icon--exit-fullscreen');
      fullscreenIcon.classList.add('qd-icon--fullscreen');
    } else {
      mainVideo.requestFullscreen();
      fullscreenIcon.classList.remove('qd-icon--fullscreen');
      fullscreenIcon.classList.add('qd-icon--exit-fullscreen');
    }
  });

  mainVideo.addEventListener('timeupdate', () => {
    const progress = (mainVideo.currentTime / mainVideo.duration) * 100;
    progressBar.style.width = `${progress}%`;

    const currentMinutes = Math.floor(mainVideo.currentTime / 60);
    const currentSeconds = Math.floor(mainVideo.currentTime % 60);
    currentTime.textContent = `${currentMinutes.toString().padStart(2, '0')}:${currentSeconds.toString().padStart(2, '0')}`;
  });

  mainVideo.addEventListener('loadedmetadata', () => {
    const durationMinutes = Math.floor(mainVideo.duration / 60);
    const durationSeconds = Math.floor(mainVideo.duration % 60);
    duration.textContent = `${durationMinutes.toString().padStart(2, '0')}:${durationSeconds.toString().padStart(2, '0')}`;
  });

  progressArea.addEventListener('click', (e) => {
    const progressWidth = progressArea.clientWidth;
    const clickedOffsetX = e.offsetX;
    const newTime = (clickedOffsetX / progressWidth) * mainVideo.duration;
    mainVideo.currentTime = newTime;
  });

  // Optimize images
  cmpMedia.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(cmpMedia);
}
