import { previewShowImg } from './full-size-evt-helper.js';
import { setImgScale } from './img-scale-evt-helper.js';
import { hideSlider, setVisibleImageStyle } from './effects-helper.js';
import { isEscapeKey } from './util.js';
const ValidationParameters = {
  MAX_COMMENT_LENGTH: 140,
  TAG_REGEX: /^#[а-яёa-z0-9]{1,19}$/i,
  MAX_TAGS_LENGTH: 5
};

const DEFAULT_SCALE = '100%';
const uploadFileControl = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

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
  if (thisComment.length > ValidationParameters.MAX_COMMENT_LENGTH) {
    return false;
  }
  return true;
};
const validateHashtag = (thisTags) => {
  if (!thisTags) {
    return true;
  }

  const existTags = [];
  const tags = thisTags.split(/\s+/);
  if (tags.length > ValidationParameters.MAX_TAGS_LENGTH) {
    return false;
  }
  for (const tag of tags) {
    if (!ValidationParameters.TAG_REGEX.test(tag)) {
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
  document.querySelector('.scale__control--value').value = DEFAULT_SCALE;
  document.querySelector('.effect-level__value').value = '';
  document.querySelector('.img-upload__effects').value = '';
  hashtagInput.value = '';
  commentInput.value = '';
};

pristine.addValidator(hashtagInput, validateHashtag, 'Хештеги не удовлетворяют правилам!');
pristine.addValidator(commentInput, validateComment, 'Комментарий не удовлетворяет правилам!');

const getErrorSendTemplateClone = () => {
  const errorTemplate = document.querySelector('#send-error').content;
  return errorTemplate.cloneNode(true);
};
const getErrorMessage = () => document.querySelector('.send-error');
const hideErrorMessage = () => {
  getErrorMessage().classList.add('hidden');
};
const initErrorMessage = () => {
  const sendTemplate = getErrorSendTemplateClone();
  document.querySelector('body').appendChild(sendTemplate);

  const errorMessage = getErrorMessage();
  hideErrorMessage();

  errorMessage.querySelector('.error__button').addEventListener('click', () => {
    hideErrorMessage();
  });
};

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

  successMessage.addEventListener('click', (evt) => {
    const targetClassList = evt.target.classList;
    if (targetClassList.contains('success') || targetClassList.contains('success__button')) {
      hideSuccessMessage();
    }
  });
};

const getEscapeEvt = (evt) => {
  if (!isEscapeKey(evt) || document.activeElement === hashtagInput || document.activeElement === commentInput) {
    return;
  }
  if (getErrorMessage().classList.contains('hidden')) {
    evt.preventDefault();
    closeValidationForm();

    hideSuccessMessage();
    evt.stopPropagation();
  } else {
    hideErrorMessage();
  }
};

function closeValidationForm() {
  if (!uploadOverlay.classList.contains('hidden')) {
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    returnDefaultValues();
    document.removeEventListener('keydown', getEscapeEvt);
  }
}

const setSubmitListener = (submit) => (
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (!pristine.validate(hashtagInput) || !pristine.validate(commentInput)) {
      return;
    }
    if (!submitButton.disabled) {
      submitButton.disabled = true;
      submit(new FormData(evt.target)).then((result) => {
        if (result) {
          closeValidationForm();
        } else {
          getErrorMessage().classList.remove('hidden');
        }
        submitButton.disabled = false;
      });
    }
  })
);

const setValidationEvt = (submit) => {
  initSubmitMessage();
  initErrorMessage();
  setSubmitListener(submit);
  uploadFileControl.addEventListener('change', () => {
    previewShowImg();
    setImgScale();
    hideSlider();
    setVisibleImageStyle();
    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', getEscapeEvt);
  });

  imgUploadCancel.addEventListener('click', () => {
    closeValidationForm();
  });
};

export { setValidationEvt, getSuccessMessage, getErrorMessage };
