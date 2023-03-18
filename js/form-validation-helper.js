import { isEscapeKey } from './full-size-evt-helper.js';

const uploadFileControl = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');

const pristine = new Pristine(form);

const validateHashtag = (thisTags) => {
  if (!thisTags || /\s+/.test()) {
    return true;
  }
  const tagRegex = /^#[а-яёa-z0-9]{1,20}$/i;
  const existTags = [];
  const tags = thisTags.split(/\s+/);
  if (tags.length > 5) {
    return false;
  }
  for (const tag of tags) {

    if (!tagRegex.test(tag)) {
      return false;
    }

    existTags.push(tag.toUpperCase());
    if (existTags.filter((e) => e === tag.toUpperCase()).length > 1) {
      return false;
    }
  }
  return true;
};

const getHashtagErrorMessage = () => 'Хештеги не удовлетворяют правилам!';


pristine.addValidator(hashtagInput, validateHashtag, getHashtagErrorMessage);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (!pristine.validate(hashtagInput)) {
    console.log('неа');
  }
  else{
    console.log('угу');
  }
});

const closeValidationForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFileControl.value = null;
  document.querySelector('.scale__control--value').value = '55%';
  document.querySelector('.effect-level__value').value = '';
  document.querySelectorAll('.effects__radio').forEach((e) => {
    e.value = 'none';
  });
  hashtagInput.value = '';
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
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeValidationForm();
      evt.stopPropagation();
    }
  });
};

export { setValidationEventListeners };
