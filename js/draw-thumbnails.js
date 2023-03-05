import {getMockPhotosArray} from './mock-data.js';

const setPhotoData = (templateClone, photo) => {
  const img = templateClone.querySelector('.picture__img');
  img.src = photo.url;

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

const drawThumbnails = () => {
  const photosArray = getMockPhotosArray();

  const fragment = document.createDocumentFragment();

  for(const photo of photosArray){
    fragment.appendChild(getCloneWithPhotoData(photo));
  }

  const picturesBlock = document.querySelector('.pictures');
  picturesBlock.appendChild(fragment);
};

export {drawThumbnails};
