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

