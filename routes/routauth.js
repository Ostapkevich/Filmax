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
    connection.end();
    res.render("auth/login", {
      title: "Опис",
      auth: true,
    });
  } catch (error) {
    res.status(500).json({
      message: " Server error: " + error.message,
    });
  }
});
routAuth.post("/login", async (req, res) => {
  try {
    req.session.isAuthenticated = true;
    res.redirect("/");
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "cinema",
      password: "ostap_serg_SQL",
    });
    connection.end();
    res.render("auth/login", {
      title: "Опис",
      auth: true,
    });
  } catch (error) {
    res.status(500).json({
      message: " Server error: " + error.message,
    });
  }
});
module.exports = routAuth;
