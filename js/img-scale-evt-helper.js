const ScaleSettings = {
  STEP: 25,
  MIN_VALUE: 25,
  MAX_VALUE: 100
};

const scaleInput = document.querySelector('.scale__control--value');
const imgContainer = document.querySelector('.img-upload__preview');

const getScaleValue = () => parseInt(scaleInput.value, 10);

const setImgScale = () => {
  const needScale = getScaleValue() / ScaleSettings.MAX_VALUE;
  imgContainer.style.transform = `scale(${needScale})`;
};

const biggerEvt = () => {
  const biggerButton = document.querySelector('.scale__control--bigger');
  biggerButton.addEventListener('click', () => {
    let needValue = getScaleValue() + ScaleSettings.STEP;
    if (needValue > ScaleSettings.MAX_VALUE) {
      needValue = ScaleSettings.MAX_VALUE;
    }
    scaleInput.value = `${needValue}%`;
    setImgScale();
  });
};

const smallerEvt = () => {
  const biggerButton = document.querySelector('.scale__control--smaller');
  biggerButton.addEventListener('click', () => {
    let needValue = getScaleValue() - ScaleSettings.STEP;
    if (needValue < ScaleSettings.MIN_VALUE) {
      needValue = ScaleSettings.MIN_VALUE;
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
