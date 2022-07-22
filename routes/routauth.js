/*jshint esversion:8 */
const { Router } = require("Express");
const routAuth = Router();
const mysql = require("mysql2/promise");
routAuth.get("/auth", async (req, res) => {
  try {
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
routAuth.get("/logout", async (req, res) => {
  try {
    req.session.destroy(() => {
      res.redirect("/");
    });
  } catch (error) {
    res.status(500).json({
      message: " Server error: " + error.message,
    });
  }
});
routAuth.post("/login", async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "cinema",
      password: "ostap_serg_SQL",
    });
    const { mail, pass } = req.body;
    
    const user = await connection.query(
      `SELECT idUser, Nick, mail FROM user WHERE mail='${mail}' AND Password= '${pass }'`
    );
    connection.end();
    res.type("text/plain");
    if (user[0].length==0) {
      res.send("0");
    } else {
      req.session.isAuthenticated = true;
      req.session.mail = mail;
      req.session.idUser = user[0].insertId;
      req.session.Nick = user[0].Nick;
      req.session.save(() => {
      res.send("1");
      });
    }
  } catch (error) {
    res.status(500).json({
      message: " Server error: " + error.message,
    });
  }
});
routAuth.post("/registr", async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "cinema",
      password: "ostap_serg_SQL",
    });
    const { login, mail, pass } = req.body;
    const user = await connection.query(
      `INSERT IGNORE INTO user (Nick, mail, Password) VALUES ('${login}', '${mail}', '${pass }')`
    );
    connection.end();
    res.type("text/plain");
    if (user[0].insertId ===0) {
      res.send("0");
    } else {
      req.session.isAuthenticated = true;
      req.session.mail = mail;
      req.session.idUser = user[0].insertId;
      req.session.Nick = login;
      req.session.save(() => {
      res.send("1");
      });
    }
  } catch (error) {
    res.status(500).json({
      message: " Server error: " + error.message,
    });
  }
});
module.exports = routAuth;
