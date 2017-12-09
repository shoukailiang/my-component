window.onload = function () {
  var div1 = new Drag('box1');
}
class Drag {
  constructor(id) {
    this.disX = 0;
    this.disY = 0;
    this.oDiv = document.getElementById(id);
    this.init()
  }
  init() {
    var _this = this;
    this.oDiv.onmousedown = function (ev) {
      var ev = ev || window.event;
      /* 传入_this,为了下面不在重复写 */
      _this.fnDown(ev, _this)
    };
    /* 默认 */
    this.changeSth({
      'width': '200px',
      'height': '200px',
      'backgroundColor': 'red',
      'position': 'absolute'
    })
  }
  /* 拖拽本体 */
  fnDown(ev, _this) {
    this.disX = ev.clientX - this.oDiv.offsetLeft;
    this.disY = ev.clientY - this.oDiv.offsetTop;
    document.onmousemove = function (ev) {
      _this.fnMove(ev);
    }
    document.onmouseup = this.fnUp;
    /* 阻止默认事件 */
    return false;
  }
  fnMove(ev) {
    this.oDiv.style.left = ev.clientX - this.disX + 'px';
    this.oDiv.style.top = ev.clientY - this.disY + 'px';

  }
  fnUp() {
    document.onmousemove = null;
    document.onmouseup = null;
  }
  /* 改变一些样式 */
  changeSth(json) {
    for (var attr in json) {
      /* 判断是否css样式表中已经定义了css */
      if (json[attr] != getStyle(this.oDiv, attr)) {
        this.oDiv.style[attr] = json[attr]
      }
    }
  }
}
/*获取最终的css */
function getStyle(obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr];
  }
  else {
    return getComputedStyle(obj, false)[attr];
  }
}

