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
  let privateId = 0;

  return function () {
    return privateId++;
  };
};

const createId = getNextId();

const generateRandomNickname = () => {
  const needLength = getRandomInteger(5,10);
  let nick = '';
  for (let i = 0; i < needLength; i++) {
    nick += String.fromCharCode(getRandomInteger(1040,1103));
  }
  return nick;
};

const getNewPhoto = () => ({
  id: createId(),
  avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
  message: messageExamples[getRandomInteger(0,messageExamples.length - 1)],
  name: generateRandomNickname()
});


//console.log(getNewPhoto())
//console.log(getNewPhoto())
