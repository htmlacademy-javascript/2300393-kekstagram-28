import {getMockPhotosArray} from './mock-data.js';

const drawThumbnails = () => {
  const photosArray = getMockPhotosArray();
  const thumbnailsTemplate = document.querySelector('#picture').content;

  const picturesBlock = document.querySelector('.pictures');

  const fragment = document.createDocumentFragment();

  for(const photo of photosArray){
    const templateClone = thumbnailsTemplate.cloneNode(true);

    const cloneImg = templateClone.querySelector('.picture__img');
    cloneImg.src = photo.url;


    //console.log(photo);
    fragment.appendChild(templateClone);
  }
  //console.log(photosArray);
  picturesBlock.appendChild(fragment);
};


export {drawThumbnails};
