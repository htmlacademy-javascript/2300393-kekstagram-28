import { receivedPhotos } from './fetch-helper.js';
import { drawThumbnails} from './draw-thumbnails.js';
const RANDOM_COUNT = 10;
const MAX_RANDOM_FUSE = 10;
const ACTIVE_BTN_CLASS = 'img-filters__button--active';
const imgFilters = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');


const inactivateButtons = () => {
  filterButtons.forEach((button) => {
    button.classList.remove(ACTIVE_BTN_CLASS);
  });
};
const activateButton = (button) => {
  button.classList.add(ACTIVE_BTN_CLASS);
};

const changeToButton = (button) => {
  inactivateButtons();
  activateButton(button);
};

const getRandomKey = (arrayLength) => Math.floor(Math.random() * arrayLength);

const getRandomKeys = (maxLength) => {
  const randomKeys = [];
  if (!maxLength || maxLength === 0) {
    return randomKeys;
  }
  for (let i = 0; i < RANDOM_COUNT; i++) {
    let randKey = getRandomKey(maxLength);
    let attempt = 1;
    while (randomKeys.includes(randKey) && attempt < MAX_RANDOM_FUSE) {
      randKey = Math.floor(Math.random() * maxLength);
      attempt++;
    }
    randomKeys.push(randKey);
  }
  return randomKeys;
};

const getRandomPhotos = (photos) => {
  const randomPhotos = [];
  const randomKeys = getRandomKeys(photos?.length);
  randomKeys.forEach((e) => randomPhotos.push(photos[e]));
  return randomPhotos;
};

const getPopularPhotos = (photos) => photos.slice().sort((a, b) =>
  (b.comments?.length ?? 0) - (a.comments?.length ?? 0));

const setFilterButtonsEvt = () => {
  imgFilters.addEventListener('click', (evt) => {
    const targetClasses = evt.target.classList;
    if (targetClasses.contains('img-filters__button') && !targetClasses.contains(ACTIVE_BTN_CLASS)) {
      changeToButton(evt.target);

      const filterId = evt.target.id;
      //TODO: добавить обработку debounce
      if (filterId === 'filter-random') {
        drawThumbnails(getRandomPhotos(receivedPhotos));
      } else if (filterId === 'filter-discussed') {
        drawThumbnails(getPopularPhotos(receivedPhotos));
      } else {
        drawThumbnails(receivedPhotos);
      }
    }
  });
};

export { setFilterButtonsEvt };
