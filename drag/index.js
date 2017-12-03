window.onload = function () {
  var div1 = new Drag('box1')
  div1.init();
}
function Drag(id) {
  this.disX = 0;
  this.disY = 0;
  this.oDiv = document.getElementById(id);
}

Drag.prototype.init = function () {
  var _this = this;
  document.onmousedown = function () {
    _this.fnDown();
  }
}

Drag.prototype.fnDown = function () {
  var _this = this;
  var ev = ev || window.event;
  this.disX = ev.clientX - this.oDiv.offsetLeft;
  this.disY = ev.clientY - this.oDiv.offsetTop;
  document.onmousemove = function () {
    _this.fnMove();
  }
  document.onmouseup =this.fnUp
  return false;
}
Drag.prototype.fnMove = function (ev) {
  var ev = ev || window.event;
  this.oDiv.style.left = ev.clientX - this.disX + 'px';
  this.oDiv.style.top = ev.clientY - this.disY + 'px';
}
Drag.prototype.fnUp = function () {
  document.onmousemove = null;
  document.onmouseup = null;
}