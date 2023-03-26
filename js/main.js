
//import { getMockPhotosArray } from './mock-data.js';
import { setValidationEventListeners } from './form-validation-helper.js';
import { setImgScaleEventListeners } from './img-scale-evt-helper.js';
import { setEffectFieldsetEvt } from './nouislider-evt-helper.js';
import {sendData, fetchPhotos } from './fetch-helper.js';

fetchPhotos();
setValidationEventListeners(sendData);
setImgScaleEventListeners();
setEffectFieldsetEvt();
