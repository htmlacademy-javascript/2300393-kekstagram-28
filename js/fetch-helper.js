import { getSuccessMessage } from './form-validation-helper.js';
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
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу. ',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз, или обновите страницу. ',
};

const imgFilters = document.querySelector('.img-filters');

const load = (errorText, method = Method.GET, body = null) =>
  fetch(method === Method.GET ? Route.GET_DATA : Route.SEND_DATA,
    { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error(errorText);
      }
      imgFilters.classList.remove('img-filters--inactive');
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const showError = (error) => {
  const errorsDiv = document.querySelector('.errors');
  const errorsContainer = document.querySelector('.errors-container');
  errorsContainer.classList.remove('hidden');
  errorsDiv.textContent += error;
};

const getData = async () => await load(ErrorText.GET_DATA).catch((e) => showError(e));

const sendData = (body) => load(ErrorText.SEND_DATA, Method.POST, body).then(
  () => {
    getSuccessMessage().classList.remove('hidden');
    return true;
  }
).catch((e) => {
  showError(e);
  return false;
});

const receivedPhotos = await getData().catch((e) => showError(e));

export { sendData, receivedPhotos };
