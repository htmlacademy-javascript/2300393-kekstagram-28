const SETTINGS = {
  STEP: 25,
  MIN_VALUE: 25,
  MAX_VALUE: 100
};

const scaleInput = document.querySelector('.scale__control--value');
const imgContainer = document.querySelector('.img-upload__preview');

const getScaleValue = () => parseInt(scaleInput.value, 10);

const setImgScale = () => {
  const needScale = getScaleValue() / 100;
  imgContainer.style.transform = `scale(${needScale})`;
};

const biggerEvt = () => {
  const biggerButton = document.querySelector('.scale__control--bigger');
  biggerButton.addEventListener('click', () => {
    let needValue = getScaleValue() + SETTINGS.STEP;
    if (needValue > SETTINGS.MAX_VALUE) {
      needValue = SETTINGS.MAX_VALUE;
    }
    scaleInput.value = `${needValue}%`;
    setImgScale();
  });
};

const smallerEvt = () => {
  const biggerButton = document.querySelector('.scale__control--smaller');
  biggerButton.addEventListener('click', () => {
    let needValue = getScaleValue() - SETTINGS.STEP;
    if (needValue < SETTINGS.MIN_VALUE) {
      needValue = SETTINGS.MIN_VALUE;
    }
    scaleInput.value = `${needValue}%`;
    setImgScale();
  });
};

const setImgScaleEvt = () => {
  biggerEvt();
  smallerEvt();
};

export { setImgScale, setImgScaleEvt, imgContainer };
