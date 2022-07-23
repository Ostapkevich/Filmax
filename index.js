/*jshint esversion: 8 */
var mysql2 = require("mysql2/promise");
const path = require("path");
const expr = require("Express");
const app = expr();
app.use(expr.static(path.join(__dirname, "public")));
console.log(path.join(__dirname, "public"));
const session = require("express-session");
const varMiddleware = require("./middleware/variables");
const exprhbs = require("express-handlebars");
const ehbs = exprhbs.create({
  //создание движка для рендеринга страниц
  defaultLayout: "scheme", //основной файл -схема, которая описывает макет страницы
  extname: "hbs", // расширения для всех файлов кроме index, который указывается в req.render('index'), имена расширений любіе, можно одинаковіе для всех файлов
  helpers: {
    seat: function (from, to, places) {
     
      let i = 1;
      let str = "";
      for (let key in places) {
        if (i >= from && i <= to) {
          if (places[key] === 1) {
            str =
              str +`<a onclick="getPlace()" class="btn waves-effect waves-light " style="background-color:#80cbc4;" data-free="${places[key]}"; data-seat="${i}"><i class="material-icons left">airline_seat_recline_extra</i>${addZero(i)}</a>`;
          } else {
            str =str +`<a class=" btn disabled" data-free="3"  ><i class="material-icons left">airline_seat_recline_extra</i>${addZero(i)}</a>`;
          }
        }
        i++;
      }
      return str;
    },
  },
});
function addZero(n) {
  return n > 9 ? n : "0" + n;
}
app.engine("hbs", ehbs.engine); //регистрация движка ehbs для рендеринга старнц, hbsi-расширение файла который указывается в req.render('index')
app.set("view engine", "hbs"); // указываем в параметре view engine какой engine будем испоьзовать
app.set("views", "pages"); //указываем в параметре views, где будут хранится все шаблоны, папка partials системная фреймворка

app.use(expr.urlencoded({ extended: true }));

var MySQLStore = require("express-mysql-session")(session);
var options = {
  host: "localhost",
  //port: 3000,
  user: "root",
  password: "ostap_serg_SQL",
  database: "cinema",
};
var connection = mysql2.createPool(options);
var sessionStore = new MySQLStore({}, connection);
app.use(
  session({
    secret: "some secret value",
    resave: false,
    saveUninitialized: false,
    key: "session_cookie_name",
    store: sessionStore,
    expiration: 30000,
  })
);
app.use(varMiddleware);
const rtNow = require("./routes/routNow.js");
app.use(rtNow);
const rtSoon = require("./routes/routSoon.js");
app.use(rtSoon);
const rtAboutNow = require("./routes/routAboutNow");
app.use(rtAboutNow);
const rtAboutSoon = require("./routes/routAboutSoon.js");
app.use(rtAboutSoon);
const rtMovie = require("./routes/routMovie.js");
app.use(rtMovie);
const rtPlaces = require("./routes/routPlaces");
app.use(rtPlaces);
const rtAuth = require("./routes/routauth");
app.use(rtAuth);
/*const rtVidguki=require('./routes/routVidguki.js');
app.use(rtVidguki);*/
app.use("/vidguki", function (req, res) {});
const rtKabinet = require("./routes/routKabinet.js");
app.use(rtKabinet);
const PORT = process.env.PORT || 3000;
function start() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e.message);
  }
}

start();
