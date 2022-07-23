/*jshint esversion: 8 */
function getPlace() {
  let elem = event.currentTarget;
  if (elem.getAttribute("data-free") == 1) {
    elem.style.background = "#009688";
    elem.setAttribute("data-free", 0);
  } else {
    elem.style.background = "#80cbc4  ";
    elem.setAttribute("data-free", 1);
  }
}

async function ticket() {
  let seats = [];
  const collection = fm.getElementsByTagName("a");
  for (let elem of collection) {
    if (elem.dataset.free == 0) {
      seats.push(elem.dataset.seat);
    }
  }
  
  var params = new URLSearchParams();
  params.set("places", );
  params.set("pass", document.getElementById("password").value);
  alert("скрипт selectUser params "+params);
  let result = await fetch("/login", {
    method: "POST",
    body: params,
  });
   let data = await result.text();
   alert("скрипт selectUser data= " + data);
  if (data === "0") {
    alert("Невірний Email або пароль.");
  }
  else {
       window.location.replace('http://localhost:3000/');
  }*/
}
