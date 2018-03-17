(function () {
  var Tab = function (tab) {
    this.tab = tab;
    this.num = 11;
    var _this = this;
    // 默认配置参数
    this.config = {
      // 用来定义鼠标的触发类型
      'triggerType': 'mouseover',
      // 用来定义内容切换效果，默认还是淡入淡出
      'effect': 'default',
      // 默认显示第几个tab
      'sequence': 1,
      // tab是否自定切换,给定时间就是切换的时间
      'auto': false
    };
    if (this.getConfig()) {
      Object.assign(this.config, this.getConfig());
    }
    // console.log(this.config);
    // 保存tab标签 和 下面的内容
    this.tabItems = this.tab.querySelectorAll('.tab-nav li');
    this.contentItems = this.tab.querySelectorAll('.content-wrap div');
    // 保存配置参数，减少查找次数
    var config = this.config;
    if (config.triggerType === 'click') {
      this.tabItems.forEach((element, index) => {
        element.index = index;
        element.addEventListener(config.triggerType, function () {
          _this.sequence(this);
        });
      });
    } else if (config.triggerType === 'mouseover' || config.triggerType !== 'click') {
      this.tabItems.forEach((element, index) => {
        element.index = index;
        // 模拟js事件
        this.event = new Event('Mouseover');
        element.addEventListener('Mouseover', function () {
          _this.sequence(this);
        });
        element.addEventListener('mouseover', function () {
          _this.sequence(this);
        });
      });
    }
    // 用来解决第一个透明度的问题，方便fadeIn和fadeOut
    if (this.num === 11) {
      this.contentItems[this.tab.querySelector('.tab-nav').querySelector('.actived').index].style.opacity = 1;
      this.num++;
    }
    // 自动切换
    if (config.auto) {
      // 定义全局定时器
      this.timer = null;
      // 定义计数器
      this.loop = 0;
      this.autoPlay();
      // 移入清除定时器，移除打开定时器
      this.tab.addEventListener('mouseover', function () {
        clearInterval(_this.timer);
      }, false);
      this.tab.addEventListener('mouseout', function () {
        _this.autoPlay();
      }, false);
    }
    // 配置第几个tab为active
    if (this.config.sequence > 1) {
      this.sequence(this.tabItems[config.sequence - 1]);
    }
  };
  Tab.prototype = {
    // 获取配置参数
    getConfig: function () {
      // 获取tab 元素上的自定义属性
      var config = this.tab.getAttribute('data-config');
      if (config && config !== '') {
        return JSON.parse(config);
      } else {
        return null;
      }
    },
    // 事件函数
    sequence: function (currentTab) {
      this.tabNav = this.tab.querySelector('.tab-nav');
      this.lastActived = this.tabNav.querySelector('.actived');
      this.tabItems.forEach((element, index) => {
        element.index = index;
      });
      // 判断点击的是否是当前这个
      if (this.lastActived.index !== currentTab.index) {
        this.lastActived.classList.remove('actived');
        if (this.config.effect === 'default' || this.config.effect !== 'fade') {
          this.contentItems[this.lastActived.index].style.opacity = 0;
        } else if (this.config.effect === 'fade') {
          this.fadeOut(this.contentItems[this.lastActived.index]);
        }
      }
      // 变成当前的
      // 改变显示的item
      // 判断点击的是否是当前这个元素
      if (this.lastActived.index !== currentTab.index) {
        currentTab.classList.add('actived');
        if (this.config.effect === 'default') {
          this.contentItems[currentTab.index].style.opacity = 1;
        } else if (this.config.effect === 'fade') {
          this.fadeIn(this.contentItems[currentTab.index]);
        }
      }
      // 点击或者mouseover后，改变indexs
      if (this.config.auto) {
        this.loop = currentTab.index;
      }
    },
    // 淡入淡出函数
    fadeOut: function (ele, endFn) {
      if (ele) {
        var v = parseFloat(window.getComputedStyle(ele)['opacity']);
        var timer = null;
        timer = setInterval(function () {
          if (v > 0) {
            v -= 0.2;
            if (v < 0) {
              v = 0;
            }
            ele.style.opacity = v;
          } else {
            clearInterval(timer);
            endFn && endFn();
          }
        }, 60);
      }
    },
    fadeIn: function (ele, endFn) {
      if (ele) {
        var v = parseFloat(window.getComputedStyle(ele)['opacity']);
        var timer2 = null;
        timer2 = setInterval(function () {
          if (v < 1) {
            v += 0.2;
            if (v > 1) {
              v = 1;
            }
            ele.style.opacity = v;
            console.log(v);
          } else {
            clearInterval(timer2);
            endFn && endFn();
          }
        }, 60);
      }
    },
    // 自动播放
    autoPlay: function () {
      var _this = this;
      var config = this.config;
      var tabItems = this.tabItems;
      var tabLen = tabItems.length;
      var tabNavLi = this.tab.querySelector('.tab-nav').querySelectorAll('li');
      this.timer = setInterval(function () {
        _this.loop++;
        if (_this.loop === tabLen) {
          _this.loop = 0;
        }
        // 判断是点击事件还是mouseover事件
        config.triggerType === 'click' ? tabNavLi[_this.loop].click() : tabNavLi[_this.loop].dispatchEvent(_this.event);
      }, config.auto);
    }
  };
  window.Tab = Tab;
})();
