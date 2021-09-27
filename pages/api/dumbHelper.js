export function collectionsRank(prev, next) {
    // hi my limit is 65,536 or 2^16 the number of characters in the original Unicode
    var p, n, pos, str;
    for (pos = 0; p == n; pos++) {
      // find leftmost non-matching character
      p = pos < prev.length ? prev.charCodeAt(pos) : 96;
      n = pos < next.length ? next.charCodeAt(pos) : 123;
    }
    str = prev.slice(0, pos - 1); // copy identical part of string
    if (p == 96) {
      // prev string equals beginning of next
      while (n == 97) {
        // next character is 'a'
        n = pos < next.length ? next.charCodeAt(pos++) : 123; // get char from next
        str += "a"; // insert an 'a' to match the 'a'
      }
      if (n == 98) {
        // next character is 'b'
        str += "a"; // insert an 'a' to match the 'b'
        n = 123; // set to end of alphabet
      }
    } else if (p + 1 == n) {
      // found consecutive characters
      str += String.fromCharCode(p); // insert character from prev
      n = 123; // set to end of alphabet
      while ((p = pos < prev.length ? prev.charCodeAt(pos++) : 96) == 122) {
        // p='z'
        str += "z"; // insert 'z' to match 'z'
      }
    }
    console.log(Math.ceil((p + n) / 2));
    return str + String.fromCharCode(Math.ceil((p + n) / 2)); // append middle character
  }
  
  export function makeid() {
    let length = 4;
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}