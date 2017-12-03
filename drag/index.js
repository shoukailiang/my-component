var oDiv = null;
var disX = 0;
var disY = 0;
window.onload = function () {
  oDiv = document.getElementById('box1');
  oDiv.onmousedown = fnDown;
}
function fnDown(ev) {
  var ev = ev || event;
  disX = ev.clientX - oDiv.offsetLeft;
  disY = ev.clientY - oDiv.offsetTop;

  document.onmousemove = fnMove;
  document.onmouseup = fnUp;
}
function fnMove(ev) {
  var ev = ev || event;
  oDiv.style.left = ev.clientX - disX + 'px';
  oDiv.style.top = ev.clientY - disY + 'px';
}
function fnUp() {
  document.onmousemove = null;
  document.onmouseup = null;
}