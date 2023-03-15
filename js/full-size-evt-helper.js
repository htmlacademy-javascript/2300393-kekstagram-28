const picturesBlock = document.querySelector('.pictures');
const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img img');
const socialCaption = document.querySelector('.social__caption');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

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

const initComments = (photoData) => {
  const commentsContainer = document.querySelector('.social__comments');
  commentsContainer.innerHTML = '';
  photoData.comments.forEach((comment) => {
    const commentClone = getCommentCloneWithData(comment);
    commentsContainer.appendChild(commentClone);
  });
};

const initialSocialCounters = (pictureContainer) => {
  const likesCount = document.querySelector('.likes-count');
  const commentsCount = document.querySelector('.comments-count');
  likesCount.textContent = pictureContainer.querySelector('.picture__likes').textContent;
  commentsCount.textContent = pictureContainer.querySelector('.picture__comments').textContent;
};

const setHiddenToBigPicture = () => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const setPictureClickEvt = (photos) => {
  picturesBlock.addEventListener('click', (evt) => {
    const pictureImg = evt.target;
    if (!evt.target.classList.contains('picture__img')) {
      return;
    }
    bigPictureContainer.classList.remove('hidden');
    document.body.classList.add('modal-open');

    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');

    bigPictureImg.src = pictureImg.src;

    const pictureContainer = pictureImg.parentElement;
    initialSocialCounters(pictureContainer);
    const photoData = photos.find((e) => e.id.toString() === evt.target.id.toString());
    socialCaption.textContent = photoData.description;
    initComments(photoData);
  });
};

const setEscEvt = () =>{
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      setHiddenToBigPicture();
    }
  });
};

const setCloseButtonEvt = () =>{
  const closeButton = document.querySelector('.big-picture__cancel');
  closeButton.addEventListener('click', () => {
    setHiddenToBigPicture();
  });
};

const setFullSizeEventListeners = (photos) => {
  setPictureClickEvt(photos);
  setCloseButtonEvt();
  setEscEvt();
};

export { setFullSizeEventListeners };
