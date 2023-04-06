import { imgContainer } from './img-scale-evt-helper.js';
import { isEscapeKey } from './util.js';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const picturesBlock = document.querySelector('.pictures');
const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img img');
const socialCaption = document.querySelector('.social__caption');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsContainer = document.querySelector('.social__comments');
const loadButton = document.querySelector('.social__comments-loader');

let commentsSet = [];

const pushCommentsToVisible = (photoId, needCount = 5) => {
  const targetSet = commentsSet.find((e) => e.idPhoto.toString() === photoId.toString());
  targetSet.lastCommentsPack = [];
  for (let i = 0; i < needCount; i++) {
    if (targetSet.hiddenComments[0] !== undefined) {
      targetSet.visibleComments.push(targetSet.hiddenComments[0]);
      targetSet.lastCommentsPack.push(targetSet.hiddenComments[0]);
      targetSet.hiddenComments.splice(0, 1);
    }
  }
  return targetSet;
};

const initCommentsSet = (photos) => {
  commentsSet = [];
  photos.forEach((photo) => {
    const comments = {
      idPhoto: photo.id,
      visibleComments: [],
      hiddenComments: photo.comments.slice(0),
      lastCommentsPack: []
    };
    commentsSet.push(comments);
    pushCommentsToVisible(photo.id);
  });
};

const getCommentTemplateClone = () => {
  const thumbnailsTemplate = document.querySelector('#comment-template').content;
  return thumbnailsTemplate.cloneNode(true);
};

const getCommentCloneWithData = (comment) => {
  const commentClone = getCommentTemplateClone();
  const commentImg = commentClone.querySelector('.social__picture');
  commentImg.src = comment.avatar;
  commentImg.alt = comment.name;
  commentClone.querySelector('.social__text').textContent = comment.message;
  return commentClone;
};

const setLoadButtonVisibleByHiddenComments = () => {
  const targetSet = commentsSet.find((e) => e.idPhoto.toString() === bigPictureImg.dataset.id.toString());
  if (targetSet.hiddenComments.length > 0) {
    loadButton.classList.remove('hidden');
  } else {
    loadButton.classList.add('hidden');
  }
};

const pushCommentsToContainer = (commentSet) => {
  commentSet.forEach((comment) => {
    const commentClone = getCommentCloneWithData(comment);
    commentsContainer.appendChild(commentClone);
  });
};

const initialCommentCounters = (targetCommentsSet) => {
  const commentsCount = document.querySelector('.comments-count');
  socialCommentCount.textContent = targetCommentsSet.visibleComments.length;
  commentsCount.textContent = ` из ${targetCommentsSet.visibleComments.length + targetCommentsSet.hiddenComments.length} комментариев`;
  socialCommentCount.appendChild(commentsCount);
};

const hideActiveCommentSet = () => {
  const targetSet = commentsSet.find((e) => e.idPhoto.toString() === bigPictureImg.dataset.id.toString());
  targetSet.lastCommentsPack = [];
  targetSet.hiddenComments.unshift(...targetSet.visibleComments);
  targetSet.visibleComments = [];
};

const resetTargetCommentSetVisible = () => {
  hideActiveCommentSet();
  pushCommentsToVisible(bigPictureImg.dataset.id);
};

const setHiddenToBigPicture = () => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetTargetCommentSetVisible();
};

const previewShowImg = () => {
  const file = document.querySelector('#upload-file').files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imgContainer.querySelector('img').src = URL.createObjectURL(file);
  }
};

const setPictureClickEvt = (photos) => {
  picturesBlock.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('picture__img')) {
      return;
    }
    bigPictureContainer.classList.remove('hidden');
    document.body.classList.add('modal-open');

    const pictureImg = evt.target;
    bigPictureImg.src = pictureImg.src;
    const pictureContainer = pictureImg.parentElement;

    const photoData = photos.find((e) => e.id.toString() === evt.target.dataset.id.toString());
    bigPictureImg.alt = photoData.description;
    bigPictureImg.dataset.id = photoData.id;
    socialCaption.textContent = photoData.description;
    const targetCommentsSet = commentsSet.find((e) => e.idPhoto.toString() === evt.target.dataset.id.toString());

    commentsContainer.innerHTML = '';
    pushCommentsToContainer(targetCommentsSet.visibleComments);

    const likesCount = document.querySelector('.likes-count');
    likesCount.textContent = pictureContainer.querySelector('.picture__likes').textContent;

    initialCommentCounters(targetCommentsSet);
    setLoadButtonVisibleByHiddenComments();
  });
};

const setEscEvt = () => {
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt) && !bigPictureContainer.classList.contains('hidden')) {
      evt.preventDefault();
      setHiddenToBigPicture();
      evt.stopPropagation();
    }
  });
};

const setCloseButtonEvt = () => {
  const closeButton = document.querySelector('.big-picture__cancel');
  closeButton.addEventListener('click', () => {
    setHiddenToBigPicture();
  });
};

const setCommentsLoaderEvt = () => {
  loadButton.addEventListener('click', () => {
    const targetSet = pushCommentsToVisible(bigPictureImg.dataset.id);

    initialCommentCounters(targetSet);
    pushCommentsToContainer(targetSet.lastCommentsPack);
    setLoadButtonVisibleByHiddenComments();
  });
};

const setFullSizeEventListeners = (photos) => {
  initCommentsSet(photos);
  setPictureClickEvt(photos);
  setCloseButtonEvt();
  setEscEvt();
  setCommentsLoaderEvt();
};

export { setFullSizeEventListeners, previewShowImg };
