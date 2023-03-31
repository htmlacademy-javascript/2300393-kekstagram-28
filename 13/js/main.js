
import { setValidationEvt } from './form-validation-helper.js';
import { setImgScaleEvt } from './img-scale-evt-helper.js';
import { setEffectFieldsetEvt } from './effects-helper.js';
import {sendData, receivedPhotos } from './fetch-helper.js';
import {setFilterButtonsEvt} from './filters-evt-helper.js';
import {renderPhotos} from './draw-thumbnails.js';
renderPhotos(receivedPhotos);
setValidationEvt(sendData);
setImgScaleEvt();
setEffectFieldsetEvt();
setFilterButtonsEvt();
