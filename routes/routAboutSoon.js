/*jshint esversion: 8 */

const { Router } = require("Express");
const routAboutSoon = Router();
const mysql = require("mysql2/promise");
routAboutSoon.get("/soon:idFilm", async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "cinema",
      password: "ostap_serg_SQL",
    });
    const [rows, fields] = await connection.query(`select idFilm,filmname, img_name, video_name, form, rik, zhanr, rezhiser, studia, kraina, trivalist, obmezhennya, opis, roli from film
    where idFilm=${req.params.idFilm};`);
    console.log(rows);
    connection.end();
      res.render("aboutSoon", {
      title: "Опис",
      soon: true,
      cont: rows[0]
    });
  } catch (error) {
    res.status(500).json({
      message: " Server error: " + error.message,
    });
  }
});
module.exports = routAboutSoon;
