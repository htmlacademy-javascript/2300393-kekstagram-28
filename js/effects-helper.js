const EFFECTS_PARAMS = [
  {
    effect: 'none',
    filter: null,
    minValue: null,
    maxValue: null,
    dimension: null,
    step: null,
  },
  {
    effect: 'chrome',
    filter: 'grayscale',
    minValue: 0,
    maxValue: 1,
    dimension: '',
    step: 0.1
  },
  {
    effect: 'sepia',
    filter: 'sepia',
    minValue: 0,
    maxValue: 1,
    dimension: '',
    step: 0.1
  },
  {
    effect: 'marvin',
    filter: 'invert',
    minValue: 0,
    maxValue: 100,
    dimension: '%',
    step: 1
  },
  {
    effect: 'phobos',
    filter: 'blur',
    minValue: 0,
    maxValue: 3,
    dimension: 'px',
    step: 0.1
  },
  {
    effect: 'heat',
    filter: 'brightness',
    minValue: 0,
    maxValue: 3,
    dimension: '',
    step: 0.1
  }
];

const effectUlElement = document.querySelector('.effects__list');
const previewElement = document.querySelector('.img-upload__preview > img');
const effectFieldsetElement = document.querySelector('.img-upload__effects');
const getActiveEffectElementByName = (effect) => EFFECTS_PARAMS.find((e) => (e.effect === effect));

const getActiveEffectFromImage = () => EFFECTS_PARAMS.find((e) => (e.effect === effectFieldsetElement.value));

const sliderElement = document.querySelector('.effect-level__slider');
const sliderValueElement = document.querySelector('.effect-level__value');
const sliderElementParent = document.querySelector('.img-upload__effect-level');

const hideSlider = () => sliderElementParent.classList.add('hidden');

const updateSliderParams = () => {
  const thisEffect = getActiveEffectFromImage();
  if (effectFieldsetElement.value === 'none') {
    hideSlider();
    sliderValueElement.value = null;
    return;
  }
  sliderElementParent.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: thisEffect.minValue,
      max: thisEffect.maxValue
    },
    start: thisEffect.maxValue,
    step: thisEffect.step
  });
};

const setVisibleImageStyle = () => {
  const thisEffect = getActiveEffectFromImage();
  if (!thisEffect?.filter) {
    previewElement.style.filter = '';
    return;
  }
  previewElement.style.filter = `${thisEffect.filter}(${sliderValueElement.value}${thisEffect.dimension})`;
};

const setTargetEffect = (effect) => {
  const targetEffect = getActiveEffectElementByName(effect);

  effectFieldsetElement.value = targetEffect.effect;
  updateSliderParams();
  setVisibleImageStyle();
};

const setEffectFieldsetEvt = () => {
  sliderElement.visiblity = 'hidden';
  effectUlElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('effects__radio')) {
      setTargetEffect(evt.target.value);
    }
  });
  sliderElement.noUiSlider.on('update', () => {
    sliderValueElement.value = sliderElement.noUiSlider.get();
    setVisibleImageStyle();
  });
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower'
});

export { setEffectFieldsetEvt, hideSlider, setVisibleImageStyle };
