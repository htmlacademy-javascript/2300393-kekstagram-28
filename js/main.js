import {drawThumbnails} from './draw-thumbnails.js';
import {setFullSizeEventListeners} from './full-size-evt-helper.js';
import {getMockPhotosArray} from './mock-data.js';

const photos = getMockPhotosArray();
drawThumbnails(photos);
setFullSizeEventListeners(photos);
