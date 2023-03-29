
//import { getMockPhotosArray } from './mock-data.js';
import { setValidationEventListeners } from './form-validation-helper.js';
import { setImgScaleEventListeners } from './img-scale-evt-helper.js';
import { setEffectFieldsetEvt } from './nouislider-evt-helper.js';
import {sendData, renderPhotos, receivedPhotos } from './fetch-helper.js';
import {setFilterButtonsEvt} from './filters-evt-helper.js';

renderPhotos(receivedPhotos);
setValidationEventListeners(sendData);
setImgScaleEventListeners();
setEffectFieldsetEvt();
setFilterButtonsEvt();
