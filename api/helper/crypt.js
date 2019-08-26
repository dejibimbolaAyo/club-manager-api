const  {hash, compare, genSaltSync} = require("bcrypt");

const saltRounds = 10;
/**
 * Generate crypt and decrypt
 * @param plainString
 */

exports.getHash = (plainString) => {
  return hash(plainString, saltRounds).then((hash) => hash).catch((e) => console.log(e.message));
}

exports.getSalt = (length) => {
  return genSaltSync(length)
}

exports.compareHash = async (salted, hash) => {
    const result = await compare(salted, hash)
  
    if (result) {
      return {status: result, message: "Password is valid"}
    }
    return {status: result, message: "Password is invalid"}
}