/*jshint esversion: 8 */
function getPlace() {
  let elHtml = event.currentTarget;
  if (elHtml.getAttribute("data-seat") == 1) {
    elHtml.style.background = "#5d4037   ";
    elHtml.setAttribute("data-seat", 0);
  } else {
    elHtml.style.background = "#8d6e63  ";
    elHtml.setAttribute("data-seat", 1);
  }
}
   