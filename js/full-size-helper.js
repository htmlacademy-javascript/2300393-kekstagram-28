const setFullSizeEventListener = () => {

  const picturesBlock = document.querySelector('.pictures');
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureImg = document.querySelector('.big-picture__img img');
  const likesCount = document.querySelector('.likes-count');
  picturesBlock.addEventListener('click', (evt) => {
    const picture = evt.target;
    if (!evt.target.classList.contains('picture__img')){
      return;
    }

    bigPicture.classList.remove('hidden');

    bigPictureImg.src = picture.src;
    likesCount.textContent = picture.querySelector(':scope > .picture__likes').textContent;
  });
};

export {setFullSizeEventListener};
