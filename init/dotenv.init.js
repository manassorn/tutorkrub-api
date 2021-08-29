const dotenv = require("dotenv");
const path = require("path");
// get config vars
dotenv.config({ path: path.resolve(process.cwd(), 'conf/.env') });
