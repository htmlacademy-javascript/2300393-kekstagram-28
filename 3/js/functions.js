function checkStringMatchesLength(sourceString, needLenth){
  return sourceString.length === needLenth;
}

function checkStringIsPalindrome(sourceString){
  sourceString = (sourceString ?? '').replace(/\s/g, '');
  const srcArray = sourceString.split('');
  const reverseString = srcArray.reverse().join('');
  return reverseString.toLowerCase() === sourceString.toLowerCase();
}

function extractIntegerFromString(sourceValue){
  const srcString = `${sourceValue ?? ''}`;
  const integerCharsString = srcString.replace(/[^0-9]/g, '');
  if (integerCharsString.length === 0) {
    return NaN;
  }
  return parseFloat(integerCharsString);
}

function stringWithBeginningCharacters(sourceString, needLength, characters){
  sourceString = sourceString ?? '';
  characters = characters ?? '';

  const needPrefixlength = (needLength ?? 0) - sourceString.length;

  if (needPrefixlength <= 0 || characters.length === 0){
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
}
