let web3_utils = require('web3-utils');

let hexToDec = function(hexStr) {
  let numberString = web3_utils.hexToNumberString(hexStr);
  let numberInDecimal = web3_utils.fromWei(numberString);
  return numberInDecimal;
}

let hexToNumber = function(hexStr) {
  let numberString = web3_utils.hexToNumberString(hexStr);
  return numberString;
}

let convertToWeiNumberOrDecimal = function(hexStr, kind){
  if(kind === 'dec') {
    return hexToDec(hexStr);
  } else {
    return hexToNumber(hexStr);
  }
};

module.exports = {
  convertToWeiNumberOrDecimal
}
