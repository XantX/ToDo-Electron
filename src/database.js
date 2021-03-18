const mysql = require("promise-mysql");
const connection = mysql.createConnection({
  host: "bwniezkterryymzwdtrf-mysql.services.clever-cloud.com",
  user: "uvjnu4talmk11ysc",
  password: "nOF0mdtG9QOmP8y3L1De",
  database: "bwniezkterryymzwdtrf",
});

function getConnection() {
  return connection;
}
module.exports = { getConnection };
