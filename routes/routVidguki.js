/*jshint esversion: 8 */
const { Router } = require("Express");
const routVidguki = Router();
const mysql = require("mysql2/promise");
routVidguki.get("/vidguki", async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "cinema",
      password: "ostap_serg_SQL",
    });
    const [rows, fields] = await connection.query(`CALL aboutfilm()`);
    connection.end();
      res.render("vidguki", {
      title: "Відгуки",
      vidguki: true,
      cont: rows[0]
    });
  } catch (error) {
    res.status(500).json({
      message: " Server error: " + error.message,
    });
  }
});
module.exports = routVidguki;
