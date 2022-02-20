const CryptoJS = require("crypto-js");
const AES = require("crypto-js/aes");
const randomText = require("./randomText");

const createTokken = (email, pass, cafeId, tableAmount, lastDate) => {
  let cafeJson = {
    email: email,
    pass: pass,
    cafeId: cafeId,
    tableAmount: tableAmount,
    lastDate: lastDate,
    tokenCreate: new Date().toISOString(),
    randomString: randomText(10),
  };
  let cripted = CryptoJS.AES.encrypt(
    JSON.stringify(cafeJson),
    "**fsmymtf6d**"
  ).toString();
  //   console.log(string);
  //   console.log(cripted);
  //   console.log(
  //     CryptoJS.AES.decrypt(cripted, "**fsmymtf6d**").toString(CryptoJS.enc.Utf8)
  //   );
  return encodeURIComponent(cripted);
};

const getDetailToken = (token) => {
  try {
    let string = CryptoJS.AES.decrypt(
      decodeURIComponent(token),
      "**fsmymtf6d**"
    ).toString(CryptoJS.enc.Utf8);
    if (string) {
      return JSON.parse(string);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

const validateToken = (token) => {
  try {
    let string = CryptoJS.AES.decrypt(
      decodeURIComponent(token),
      "**fsmymtf6d**"
    ).toString(CryptoJS.enc.Utf8);
    if (string) {
      let tokenData = JSON.parse(string);
      return (
        new Date(
          new Date(tokenData.tokenCreate).setDate(
            new Date(tokenData.tokenCreate).getDate() + 1
          )
        ) > new Date()
      );
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const tokenService = {
  createTokken: createTokken,
  getDetailToken: getDetailToken,
  validateToken: validateToken,
};

module.exports = tokenService;
