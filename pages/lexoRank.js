const getByte = (char) => {
    return char.charCodeAt(0); // from CHAR to an ASCII code
  };
  
  const getStringFromByte = (byte) => {
    return String.fromCharCode(byte); // return a string from a utf code
  };
  
  const getCharFromIndex = (str, index, defaultChar) => {
    if (index >= str.length) {
      return defaultChar;
    }
    return getByte(str.charAt(index));
  };
  
  const getMidChar = (prev, next) => {
    return Math.ceil((prev + next) / 2);
  };
  
  const MIN_CHAR = getByte("a");
  const MAX_CHAR = getByte("{");
  
  const insertRank = (prev, next) => {
    if (prev === "" || !prev) {
      prev = getStringFromByte(MIN_CHAR);
    }
    if (next === "" || !next) {
      next = getStringFromByte(MAX_CHAR);
    }
  
    let rank = "";
    let index = 0;

  let a = true;
    while (a) {
      let prevChar = getCharFromIndex(prev, index, MIN_CHAR);
      let nextChar = getCharFromIndex(next, index, MAX_CHAR);
  
      if (prevChar === nextChar) {
        rank += getStringFromByte(prevChar);
        index+=1;
        continue;
        a = true;
      }
  
      let midChar = getMidChar(prevChar, nextChar);
      if (midChar === prevChar || midChar === nextChar) {
        rank += getStringFromByte(prevChar);
        index+=1;
        a = true;
        continue;
      }
  
      rank += getStringFromByte(midChar);
      a =false;
      break;
    }
  
    if (rank >= next) {
      return undefined;
    }
    return rank;
  };
  
  export { insertRank };