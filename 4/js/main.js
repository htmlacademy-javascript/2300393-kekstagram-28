const messageExamples = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

//функция рандома в указанном диапазоне
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getNextId = () => {
  let privateId = 1;
  return () => privateId++;
};

const createCommentId = getNextId();

const generateRandomNickname = () => {
  const needLength = getRandomInteger(5,10);
  let nick = '';
  for (let i = 0; i < needLength; i++) {
    nick += String.fromCharCode(getRandomInteger(1040,1103));
  }
  return nick;
};

const getNewComment = () => ({
  id: createCommentId(),
  avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
  message: messageExamples[getRandomInteger(0,messageExamples.length - 1)],
  name: generateRandomNickname()
});

const createPhotoId = getNextId();

const getNewPhoto = () => {
  const thisId = createPhotoId();
  const comments = [];
  for (let i = 1; i <= getRandomInteger(1,5); i++){
    comments.push(getNewComment());
  }

  return{
    id: thisId,
    url: `photos/${thisId}.jpg`,
    description: `Фото ${thisId}`,
    likes: getRandomInteger(15,200),
    comments: comments
  };
};

// eslint-disable-next-line no-unused-vars
const getPhotosArray = (count = 25) =>{
  const result = [];
  for (let i = 0; i < count; i++){
    result.push(getNewPhoto());
  }
  return result;
};

