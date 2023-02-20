const checkStringLessOrGivenLength = (sourceString = '', needLength = 0) => sourceString.length <= needLength;
checkStringLessOrGivenLength('', 0);

const checkStringIsPalindrome = (sourceString = '') => {
  const spacelessString = sourceString.replace(/\s/g, '');
  const srcArray = spacelessString.split('');
  const reverseString = srcArray.reverse().join('');
  return reverseString.toLowerCase() === spacelessString.toLowerCase();
};
checkStringIsPalindrome('');

const extractIntegerFromString = (sourceValue = '') => {
  const integerCharsString = sourceValue.replace(/[^0-9]/g, '');
  if (integerCharsString.length === 0) {
    return NaN;
  }
  return parseInt(integerCharsString, 10);
};
extractIntegerFromString('');

const getStringWithBeginningCharacters = (sourceString = '', needLength = 0, characters = '') => {
  const needPrefixlength = needLength - sourceString.length;

  if (needPrefixlength <= 0 || characters.length === 0) {
    return sourceString;
  }

  const numberOfPrefixes = Math.floor(needPrefixlength / characters.length);
  const pieceLength = needPrefixlength % characters.length;

  let prefix = '';
  for (let i = 0; i < numberOfPrefixes; i++) {
    prefix += characters;
  }

  const piece = characters.substring(0, pieceLength);

  return piece + prefix + sourceString;
};
getStringWithBeginningCharacters('', 0, '');
