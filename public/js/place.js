/*jshint esversion: 8 */
function getPlace() {
  let elHtml = event.currentTarget;
  if (elHtml.getAttribute("data-seat") == 1) {
    elHtml.style.background = "#009688";
    elHtml.setAttribute("data-seat", 0);
  } else {
    elHtml.style.background = "#4db6ac  ";
    elHtml.setAttribute("data-seat", 1);
  }
}
   