import {getRandomInteger} from './util.js';
import {messageExamples} from './message-examples.js';

const MOCK_PHOTOS_COUNT = 25;

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

const getNewRandomComment = () => ({
  id: createCommentId(),
  avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
  message: messageExamples[getRandomInteger(0,messageExamples.length - 1)],
  name: generateRandomNickname()
});

const createPhotoId = getNextId();

const getNewMockPhoto = () => {
  const thisId = createPhotoId();
  const comments = [];
  for (let i = 1; i <= getRandomInteger(1,10); i++){
    comments.push(getNewRandomComment());
  }

  return{
    id: thisId,
    url: `photos/${thisId}.jpg`,
    description: `Фото ${thisId}`,
    likes: getRandomInteger(15,200),
    comments: comments
  };
};

const getMockPhotosArray = (count = MOCK_PHOTOS_COUNT) =>{
  const result = [];
  for (let i = 0; i < count; i++){
    result.push(getNewMockPhoto());
  }
  return result;
};

export {getMockPhotosArray};
