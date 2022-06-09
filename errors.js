
function CustomError(code, message) {

  this.code = code;
  this.message = message;

}

const ERROR_EMAIL_ALREADY_EXISTS = new CustomError(1001, "Email already exists")
const ERROR_KRUBID_ALREADY_EXISTS = new CustomError(1002, "Krub ID already exists")

module.exports = {
  ERROR_KRUBID_ALREADY_EXISTS
}