const effectsByRadio = [
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
    dimension: null,
    step: 0.1
  },
  {
    effect: 'sepia',
    filter: 'sepia',
    minValue: 0,
    maxValue: 1,
    dimension: null,
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
    dimension: null,
    step: 0.1
  }
];

const effectUl = document.querySelector('.effects__list');
const preview = document.querySelector('.img-upload__preview > img');

const getActiveEffect = (effect) => effectsByRadio.find((e)=>(e.effect === effect));

const setEffectFieldsetEvt = () => {
  effectUl.addEventListener('click', (evt) => {
    //console.log(evt.target)
    if (evt.target.classList.contains('effects__radio')) {
      console.log(getActiveEffect(evt.target.value))
      //preview.style.filter = "grayscale(0.5)"
      //console.log(evt.target)
      //console.log(preview)
      //console.log(document.querySelector('.effects__radio'))
    }
  })
}

export { setEffectFieldsetEvt };
