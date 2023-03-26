import { isEscapeKey } from './full-size-evt-helper.js';
import { setImgScale } from './img-scale-evt-helper.js';
import { hideSlider, setVisibleImageStyle } from './nouislider-evt-helper.js';
const uploadFileControl = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const MAX_COMMENT_LENGTH = 140;

const pristine = new Pristine(form,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'form__error errors'
  });

const validateComment = (thisComment) => {
  if (!thisComment) {
    return true;
  }
  if (thisComment.length > MAX_COMMENT_LENGTH) {
    return false;
  }
  return true;
};
const validateHashtag = (thisTags) => {
  if (!thisTags) {
    return true;
  }
  const tagRegex = /^#[а-яёa-z0-9]{1,19}$/i;
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

const returnDefaultValues = () => {
  uploadFileControl.value = '';
  document.querySelector('.scale__control--value').value = '55%';
  document.querySelector('.effect-level__value').value = '';
  document.querySelector('.img-upload__effects').value = '';
  hashtagInput.value = '';
  commentInput.value = '';
};

const closeValidationForm = () => {
  if (!uploadOverlay.classList.contains('hidden')) {
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    returnDefaultValues();
  }
};

pristine.addValidator(hashtagInput, validateHashtag, 'Хештеги не удовлетворяют правилам!');
pristine.addValidator(commentInput, validateComment, 'Комментарий не удовлетворяет правилам!');

const getOkSendTemplateClone = () => {
  const successTemplate = document.querySelector('#success').content;
  return successTemplate.cloneNode(true);
};

const getSuccessMessage = () => document.querySelector('.success');

const submitButton = () => document.querySelector('#upload-submit');

const hideSuccessMessage = () => {
  getSuccessMessage().classList.add('hidden');
};


const initSubmitMessage = () => {
  const sendTemplate = getOkSendTemplateClone();
  document.querySelector('body').appendChild(sendTemplate);

  const successMessage = getSuccessMessage();
  hideSuccessMessage();

  successMessage.querySelector('.success__button').addEventListener('click', () => {
    hideSuccessMessage();
  });
};

const setSubmitListener = (submit) => (
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (!pristine.validate(hashtagInput) || !pristine.validate(commentInput)) {
      return;
    }
    submitButton.disabled = true;
    submit(new FormData(evt.target)).then(() => {
      closeValidationForm();
      submitButton.disabled = false;
    });
  })
);

const setValidationEventListeners = (submit) => {
  initSubmitMessage();
  setSubmitListener(submit);
  uploadFileControl.addEventListener('change', (/*evt*/) => {
    setImgScale();
    hideSlider();
    setVisibleImageStyle();
    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
  });

  imgUploadCancel.addEventListener('click', () => {
    closeValidationForm();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt) && document.activeElement === document.body) {
      evt.preventDefault();
      closeValidationForm();

      hideSuccessMessage();
      evt.stopPropagation();
    }
  });
};

export { setValidationEventListeners, getSuccessMessage };
