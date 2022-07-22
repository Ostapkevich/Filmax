/*jshint esversion:8 */

const { Router } = require("Express");
const routAboutNow = Router();
const mysql = require("mysql2/promise");
routAboutNow.get("/now:idFilm", async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "cinema",
      password: "ostap_serg_SQL",
    });
    const [zapAbouFilm] = await connection.query(
      `select idFilm,filmname, img_name, video_name, form, rik, zhanr, rezhiser, studia, kraina, trivalist, obmezhennya, opis, roli from film where idFilm=${req.params.idFilm};`
    );
    const [zapRaspisanie] = await connection.query(
      `select idRasp, seans from seans where idFm=${req.params.idFilm} order by seans;`
    );
    connection.end();
    console.log(zapAbouFilm);
    let formRaspisanieCount = 0;
    let formRaspisanie = [];
    let seans = {};
    let tm = [];
    let obgFortm = {};
    let monCurrent = zapRaspisanie[0].seans.getMonth();
    let dateCurrent = zapRaspisanie[0].seans.getDate();
    for (let i = 0; i < zapRaspisanie.length; i++) {
      if (
        zapRaspisanie[i].seans.getMonth() == monCurrent &&
        zapRaspisanie[i].seans.getDate() == dateCurrent
      ) {
        obgFortm.idr = zapRaspisanie[i].idRasp;
        obgFortm.sns =
          zapRaspisanie[i].seans.getHours() +
          ":" +
          zapRaspisanie[i].seans.getMinutes();
        tm.push(obgFortm);
        obgFortm = new Object();
        if (i == zapRaspisanie.length - 1) {
          seans.date = zapRaspisanie[i].seans.getDate();
          seans.month = new Intl.DateTimeFormat("uk-UK", {
            month: "long",
          }).format(zapRaspisanie[i].seans);
          seans.weekday = new Intl.DateTimeFormat("uk-UK", {
            weekday: "long",
          }).format(zapRaspisanie[i].seans);
          seans.rsp = tm;
          seans.img=zapAbouFilm[0].img_name;
          formRaspisanie[formRaspisanieCount] = seans;
        }
      } else {
        seans.date = zapRaspisanie[i - 1].seans.getDate();
        seans.month = new Intl.DateTimeFormat("uk-UK", {
          month: "long",
        }).format(zapRaspisanie[i - 1].seans);
        seans.weekday = new Intl.DateTimeFormat("uk-UK", {
          weekday: "long",
        }).format(zapRaspisanie[i - 1].seans);
        seans.rsp = tm;
        seans.img=zapAbouFilm[0].img_name;
        formRaspisanie[formRaspisanieCount] = seans;
        monCurrent = zapRaspisanie[i].seans.getMonth();
        dateCurrent = zapRaspisanie[i].seans.getDate();
        seans = {};
        tm = null;
        tm = new Array();
        i = i - 1;
        formRaspisanieCount++;
      }
    }
    
    res.render("aboutNow", {
      title: "Опис",
      now: true,
      cont: {
        film: zapAbouFilm[0],
        rasp: formRaspisanie,
        img: zapAbouFilm[0].img_name,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: " Server error: " + error.message,
    });
  }
});
module.exports = routAboutNow;
