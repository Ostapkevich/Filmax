/*jshint esversion:8 */
async function insertUser() {
  var params = new URLSearchParams();
  params.set("login", document.getElementById("rename").value);
  params.set("mail", document.getElementById("remail").value);
  params.set("pass", document.getElementById("rpassword").value);
  let result = await fetch("/registr", {
    method: "POST",
    body: params,
  });
  let data = await result.text();
  if (data === "0") {
    alert("Користувач із зазначеною електронною поштою вже існує. Спрбуйте ще раз");
  }
  else {
    window.location.replace('http://localhost:3000/');
  }
}
async function selectUser() {
  var params = new URLSearchParams();
  params.set("mail", document.getElementById("email").value);
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
    
  }
}
