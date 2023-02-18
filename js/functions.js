function checkStringMatchesLength(sourceString, needLenth){
  return sourceString.length === needLenth;
}

function checkStringIsPalindrome(sourceString){
  sourceString = (sourceString ?? '').replace(/\s/g, '');
  const srcArray = sourceString.split('');
  const reverseString = srcArray.reverse().join('');
  return reverseString.toLowerCase() === sourceString.toLowerCase();
}
