import { drawThumbnails } from './draw-thumbnails.js';
import { setFullSizeEventListeners } from './full-size-evt-helper.js';

const PHOTOS_URL = 'https://28.javascript.pages.academy/kekstagram/data';
const SEND_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: PHOTOS_URL,
  SEND_DATA: SEND_URL,
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(Route.GET_DATA, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error(errorText);
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

const fetchPhotos = () => {

  getData().then((photos) => {
    drawThumbnails(photos);
    setFullSizeEventListeners(photos);
  }).catch((error) => {
    const errorsDiv = document.querySelector('.errors');
    const errorsContainer = document.querySelector('.errors-container');
    errorsContainer.classList.remove('hidden');
    errorsDiv.textContent += error;
  });

};

export { getData, sendData, fetchPhotos };
