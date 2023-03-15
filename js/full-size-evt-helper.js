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
    if (targetSet.hideComments[0] !== undefined) {
      targetSet.visibleComments.push(targetSet.hideComments[0]);
      targetSet.lastCommentsPack.push(targetSet.hideComments[0]);
      targetSet.hideComments.splice(0, 1);
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
      hideComments: photo.comments,
      lastCommentsPack: []
    };
    commentsSet.push(comments);
    pushCommentsToVisible(photo.id);
  });
};

const isEscapeKey = (evt) => evt.key === 'Escape';

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

const setLoadButtonVisibleByHideComments = () => {
  const targetSet = commentsSet.find((e) => e.idPhoto.toString() === bigPictureImg.id.toString());
  if (targetSet.hideComments.length > 0) {
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
  commentsCount.textContent = ` из ${targetCommentsSet.visibleComments.length + targetCommentsSet.hideComments.length} комментариев`;
  socialCommentCount.appendChild(commentsCount);
};

const setHiddenToBigPicture = () => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
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

    const photoData = photos.find((e) => e.id.toString() === evt.target.id.toString());
    bigPictureImg.alt = photoData.description;
    bigPictureImg.id = photoData.id;
    socialCaption.textContent = photoData.description;
    const targetCommentsSet = commentsSet.find((e) => e.idPhoto.toString() === evt.target.id.toString());

    commentsContainer.innerHTML = '';
    pushCommentsToContainer(targetCommentsSet.visibleComments);

    const likesCount = document.querySelector('.likes-count');
    likesCount.textContent = pictureContainer.querySelector('.picture__likes').textContent;

    initialCommentCounters(targetCommentsSet);
    setLoadButtonVisibleByHideComments();
  });
};

const setEscEvt = () => {
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      setHiddenToBigPicture();
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
    const targetSet = pushCommentsToVisible(bigPictureImg.id);

    initialCommentCounters(targetSet);
    pushCommentsToContainer(targetSet.lastCommentsPack);
    setLoadButtonVisibleByHideComments();
  });
};

const setFullSizeEventListeners = (photos) => {
  initCommentsSet(photos);
  setPictureClickEvt(photos);
  setCloseButtonEvt();
  setEscEvt();
  setCommentsLoaderEvt();
};

export { setFullSizeEventListeners };
