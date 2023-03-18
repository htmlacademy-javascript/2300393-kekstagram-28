import { isEscapeKey } from './full-size-evt-helper.js';

const uploadFileControl = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');

const closeValidationForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFileControl.value = null;
  document.querySelector('.scale__control--value').value = '55%';
  document.querySelector('.effect-level__value').value = '';
  document.querySelectorAll('.effects__radio').forEach((e) => {
    e.value = 'none';
  });
  document.querySelector('.text__hashtags').value = '';
};

const setValidationEventListeners = () => {
  uploadFileControl.addEventListener('change', (/*evt*/) => {
    //console.log(evt)
    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
  });

  imgUploadCancel.addEventListener('click', () => {
    closeValidationForm();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt) && !uploadOverlay.classList.contains('hidden')) {
      evt.preventDefault();
      closeValidationForm();
    }
  });
};

export { setValidationEventListeners };
