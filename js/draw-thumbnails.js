import { setFullSizeEventListeners } from './full-size-evt-helper.js';

const setPhotoData = (templateClone, photo) => {
  const img = templateClone.querySelector('.picture__img');
  img.src = photo.url;
  img.dataset.id = photo.id;
  const likesCounter = templateClone.querySelector('.picture__likes');
  likesCounter.textContent = photo.likes;

  const commentsCounter = templateClone.querySelector('.picture__comments');
  commentsCounter.textContent = photo.comments.length;
};

const getTemplateClone = () => {
  const thumbnailsTemplate = document.querySelector('#picture').content;
  return thumbnailsTemplate.cloneNode(true);
};

const getCloneWithPhotoData = (photo) => {
  const templateClone = getTemplateClone();
  setPhotoData(templateClone, photo);
  return templateClone;
};

const clearExistRenders = () => {
  const renders = document.querySelectorAll('.pictures .picture');
  renders.forEach((render) => render.remove());
};

const drawThumbnails = (dataArray) => {
  clearExistRenders();
  const fragment = document.createDocumentFragment();

  for (const photo of dataArray) {
    fragment.appendChild(getCloneWithPhotoData(photo));
  }

  const picturesBlock = document.querySelector('.pictures');
  picturesBlock.appendChild(fragment);
};

const renderPhotos = (photos) => {
  drawThumbnails(photos);
  setFullSizeEventListeners(photos);
};

export { drawThumbnails, renderPhotos };
