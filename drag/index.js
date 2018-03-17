(function () {
  // Drag 类
  class Drag {
    constructor(id) {
      this.disX = 0;
      this.disY = 0;
      this.oDiv = document.getElementById(id);
      // 默认设置
      this.config = {
        'width': '200px',
        'height': '200px',
        'backgroundColor': 'red',
        'position': 'absolute'
      };
      // 若有自定义属性，那就合并
      if (this.getConfig()) {
        Object.assign(this.config, this.getConfig());
      }
      console.log(this.config);
      this.init();
    }
    getConfig() {
      var config = this.oDiv.getAttribute('data-config');
      if (config && config !== '') {
        return JSON.parse(config);
      } else {
        return null;
      }
    }
    init() {
      var _this = this;
      // pc端
      this.oDiv.onmousedown = function (ev) {
        /* 传入_this,为了下面不在重复写 */
        _this.fnDown(ev, _this);
      };
      // 移动端
      this.oDiv.ontouchstart=function(ev){
        _this.fnDown(ev, _this);
      }
      // 改变设置的属性
      for (const i in this.config) {
        this.oDiv.style[i] = this.config[i];
      }
    }
    /* 拖拽本体 */
    fnDown(ev, _this) {
      // 判断是否为手机端
      var touch;
      if (ev.touches) {
        touch = ev.touches[0];
      } else {
        touch = ev;
      }
      this.disX = touch.clientX - this.oDiv.offsetLeft;
      this.disY = touch.clientY - this.oDiv.offsetTop;
      // pc
      document.onmousemove = function (ev) {
        _this.fnMove(ev);
      };
      // 移动端
      document.ontouchmove = function (ev) {
        _this.fnMove(ev);
      };
      document.onmouseup = this.fnUp;
      document.ontouchend = this.fnUp;
      /* 阻止默认事件 */
      return false;
    }
    fnMove(ev) {
      var touch;
      if (ev.touches) {
        touch = ev.touches[0];
      } else {
        touch = ev;
      }
      this.oDiv.style.left = touch.clientX - this.disX + 'px';
      this.oDiv.style.top = touch.clientY - this.disY + 'px';
    };
    fnUp() {
      document.onmousemove = null;
      document.ontouchmove = null;
      document.onmouseup = null;
      document.ontouchend = null;
    }
  }
  window.Drag = Drag;
})();
