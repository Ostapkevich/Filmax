/*jshint esversion: 8 */

const { Router } = require("Express");
const routSoon = Router();
const mysql = require("mysql2/promise");
routSoon.get("/soon", async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "cinema",
      password: "ostap_serg_SQL"
    });
    const [rows, fields] = await connection.query("CALL scoro_u_prokati()");
    connection.end();
      res.render("soon", {
      title: "Скоро у прокаті",
      soon: true,
      cont: rows[0]
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = routSoon;
