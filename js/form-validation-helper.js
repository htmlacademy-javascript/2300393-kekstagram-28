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
    errorTextClass: 'form__error'
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
  uploadFileControl.value = null;
  document.querySelector('.scale__control--value').value = '55%';
  document.querySelector('.effect-level__value').value = '';
  document.querySelector('.img-upload__effects').value = '';
  hashtagInput.value = '';
  commentInput.value = '';
};

const closeValidationForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  returnDefaultValues();
};

pristine.addValidator(hashtagInput, validateHashtag, 'Хештеги не удовлетворяют правилам!');
pristine.addValidator(commentInput, validateComment, 'Комментарий не удовлетворяет правилам!');
const setSubmitListener = (submit) => (
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (!pristine.validate(hashtagInput) || !pristine.validate(commentInput)) {
      return;
    }
    submit(new FormData(evt.target)).then(
      closeValidationForm()
    //TODO: показывать ответ..
    );
  })
);

const setValidationEventListeners = (submit) => {
  uploadFileControl.addEventListener('change', (/*evt*/) => {
    setSubmitListener(submit);
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
    if (isEscapeKey(evt) &&
      !uploadOverlay.classList.contains('hidden') &&
      document.activeElement === document.body
    ) {
      evt.preventDefault();
      closeValidationForm();
      evt.stopPropagation();
    }
  });
};

export { setValidationEventListeners };
