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

let commentSets = [];

const pushCommentsToVisible = (photoId, needCount = 5) => {
  const targetSet = commentSets.find((e) => e.idPhoto.toString() === photoId.toString());
  targetSet.lastAddedPackOfComments = [];
  for (let i = 0; i < needCount; i++) {
    if (targetSet.hiddenComments[0] !== undefined) {
      targetSet.visibleComments.push(targetSet.hiddenComments[0]);
      targetSet.lastAddedPackOfComments.push(targetSet.hiddenComments[0]);
      targetSet.hiddenComments.splice(0, 1);
    }
  }
  return targetSet;
};

const initCommentSets = (photos) => {
  commentSets = [];
  photos.forEach((photo) => {
    const comments = {
      idPhoto: photo.id,
      visibleComments: [],
      hiddenComments: photo.comments.slice(0),
      lastAddedPackOfComments: []
    };
    commentSets.push(comments);
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
  const targetSet = commentSets.find((e) => e.idPhoto.toString() === bigPictureImg.dataset.id.toString());
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

const initialCommentCounters = (targetCommentSet) => {
  const commentsCount = document.querySelector('.comments-count');
  socialCommentCount.textContent = targetCommentSet.visibleComments.length;
  commentsCount.textContent = ` из ${targetCommentSet.visibleComments.length + targetCommentSet.hiddenComments.length} комментариев`;
  socialCommentCount.appendChild(commentsCount);
};

const hideActiveCommentSet = () => {
  const targetSet = commentSets.find((e) => e.idPhoto.toString() === bigPictureImg.dataset.id.toString());
  targetSet.lastAddedPackOfComments = [];
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
    const targetCommentSet = commentSets.find((e) => e.idPhoto.toString() === evt.target.dataset.id.toString());

    commentsContainer.innerHTML = '';
    pushCommentsToContainer(targetCommentSet.visibleComments);

    const likesCount = document.querySelector('.likes-count');
    likesCount.textContent = pictureContainer.querySelector('.picture__likes').textContent;

    initialCommentCounters(targetCommentSet);
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
    pushCommentsToContainer(targetSet.lastAddedPackOfComments);
    setLoadButtonVisibleByHiddenComments();
  });
};

const setFullSizeEventListeners = (photos) => {
  initCommentSets(photos);
  setPictureClickEvt(photos);
  setCloseButtonEvt();
  setEscEvt();
  setCommentsLoaderEvt();
};

export { setFullSizeEventListeners, previewShowImg };
