/*jshint esversion:8 */
const { Router } = require("Express");
const routAuth = Router();
const mysql = require("mysql2/promise");

routAuth.get("/auth", async (req, res) => {
  try {
    
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "cinema",
      password: "ostap_serg_SQL",
    });
    /*
    const [zapAboutSeans] = await connection.query(
      `select seat1, seat2, seat3, seat4, seat5, seat6, seat7, seat8, seat9, seat10, seat11, seat12, seat13, seat14, seat15, seat16, seat17, seat18, seat19, seat20, seat21, seat22, seat23, seat24, seat25, seat26 from seans where idRasp=${req.params.idRasp};`
    );
    */
    connection.end();
    
      res.render("auth/login", {
      title: "Опис",
      
      
      auth:true
      //layout:null
      
      });
  } catch (error) {
    res.status(500).json({
      message: " Server error: " + error.message,
    });
  }
});
module.exports = routAuth;