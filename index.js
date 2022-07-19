/*jshint esversion: 8 */

const path = require('path');
const expr = require('Express');
const app = expr();
const session=require('express-session');
const varMiddleware=require('./middleware/variables');
const exprhbs = require("express-handlebars");
const ehbs = exprhbs.create({//создание движка для рендеринга страниц
  defaultLayout: "scheme",//основной файл -схема, которая описывает макет страницы
  extname: "hbs", // расширения для всех файлов кроме index, который указывается в req.render('index'), имена расширений любіе, можно одинаковіе для всех файлов
  helpers: {
		seat: function(from,to,places) {
      let i=1;
      let str="";
      for (let key in places) {
        if (i>=from && i<=to){
          if (places[key]===1){
           str= str+ `<a onclick="getPlace()" class="btn waves-effect waves-light " style="background-color:#4db6ac;" data-seat="${places[key]}"><i class="material-icons left">airline_seat_recline_extra</i>${addZero(i)}</a>`;
          }
           else {
           str=str+ `<a class=" btn disabled" data-seat="${places[key]}" ><i class="material-icons left">airline_seat_recline_extra</i>${addZero(i)}</a>`;
          }
        }
        i++;
      }
      return str;
    }
    
	} 
});             
function addZero(n) {
  return n > 9 ? n :"0" + n ;
}
app.engine('hbs', ehbs.engine); //регистрация движка ehbs для рендеринга старнц, hbsi-расширение файла который указывается в req.render('index')
app.set('view engine', 'hbs');// указываем в параметре view engine какой engine будем испоьзовать
app.set('views', 'pages');//указываем в параметре views, где будут хранится все шаблоны, папка partials системная фреймворка
app.use(expr.static(path.join(__dirname, "public")));
app.use(expr.urlencoded({extended:true}));
app.use(session({
  secret: 'some secret value',
  resave: false,
  saveUninitialized: false
}));
app.use(varMiddleware);
const rtNow=require('./routes/routNow.js');
app.use(rtNow);
const rtSoon=require('./routes/routSoon.js');
app.use(rtSoon);
const rtAboutNow=require('./routes/routAboutNow');
app.use(rtAboutNow);
const rtAboutSoon=require('./routes/routAboutSoon.js');
app.use(rtAboutSoon);
const rtMovie=require('./routes/routMovie.js');
app.use(rtMovie);
const rtTicket=require('./routes/routTicket');
app.use(rtTicket);
const rtAuth=require('./routes/routauth');
app.use(rtAuth);
/*const rtVidguki=require('./routes/routVidguki.js');
app.use(rtVidguki);*/
app.use('/vidguki', function(req, res){
   
 
});
const rtKabinet=require('./routes/routKabinet.js');
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



