import {drawThumbnails} from './draw-thumbnails.js';
import {setFullSizeEventListeners} from './full-size-evt-helper.js';
import {getMockPhotosArray} from './mock-data.js';
import {setValidationEventListeners} from './form-validation-helper.js';
import {setImgScaleEventListeners} from './img-scale-evt-helper.js';

const photos = getMockPhotosArray();
drawThumbnails(photos);
setFullSizeEventListeners(photos);
setValidationEventListeners();
setImgScaleEventListeners();
