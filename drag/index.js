(function () {
  // Drag 类
  class Drag {
    constructor (id) {
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
    getConfig () {
      var config = this.oDiv.getAttribute('data-config');
      if (config && config !== '') {
        return JSON.parse(config);
      } else {
        return null;
      }
    }
    init () {
      var _this = this;
      this.oDiv.onmousedown = function (ev) {
        /* 传入_this,为了下面不在重复写 */
        _this.fnDown(ev, _this);
      };
      // 改变设置的属性
      for (const i in this.config) {
        this.oDiv.style[i] = this.config[i];
      }
    }
    /* 拖拽本体 */
    fnDown (ev, _this) {
      this.disX = ev.clientX - this.oDiv.offsetLeft;
      this.disY = ev.clientY - this.oDiv.offsetTop;
      document.onmousemove = function (ev) {
        _this.fnMove(ev);
      };
      document.onmouseup = this.fnUp;
      /* 阻止默认事件 */
      return false;
    }
    fnMove (ev) {
      this.oDiv.style.left = ev.clientX - this.disX + 'px';
      this.oDiv.style.top = ev.clientY - this.disY + 'px';
    };
    fnUp () {
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }
  window.Drag = Drag;
})();
