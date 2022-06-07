
function CustomError(code, message) {

  this.code = code;
  this.message = message;

}

const ERROR_KRUBID_ALREADY_EXISTS = new CustomError(1001, "Krub ID already exists")

module.exports = {
  ERROR_KRUBID_ALREADY_EXISTS
}