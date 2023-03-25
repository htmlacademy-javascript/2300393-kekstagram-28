import { drawThumbnails } from './draw-thumbnails.js';
import { setFullSizeEventListeners } from './full-size-evt-helper.js';
//import { getMockPhotosArray } from './mock-data.js';
import { setValidationEventListeners } from './form-validation-helper.js';
import { setImgScaleEventListeners } from './img-scale-evt-helper.js';
import { setEffectFieldsetEvt } from './nouislider-evt-helper.js';
import { getData, sendData } from './fetch-helper.js';

//const photos = getMockPhotosArray();

getData().then((photos) => {
  drawThumbnails(photos);
  setFullSizeEventListeners(photos);
});

//drawThumbnails(photos);
//setFullSizeEventListeners(photos);
setValidationEventListeners();
setImgScaleEventListeners();
setEffectFieldsetEvt();
