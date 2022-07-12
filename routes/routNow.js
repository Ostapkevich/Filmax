/*jshint esversion: 8 */

const { Router } = require("Express");
const routNow = Router();
const mysql = require("mysql2/promise");
routNow.get("/", async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "cinema",
      password: "ostap_serg_SQL",
    });
    const [rows, fields] = await connection.query("CALL zaraz_u_procati();");
    connection.end();
    rows.length = rows.length - 1;
    res.render("now", {
      title: "Зараз у прокаті",
      now: true,
      cont: rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: " Server error: " + error.message,
    });
  }
});
module.exports = routNow;
