# my-component
> 用原生js实现的组件
- drag
  ### 自定义属性进行配置
  > data-config='{"width": "100px","height": "100px","backgroundColor": "black","position": "absolute"}'
  ```
  var div1 = new Drag('box1');//box1为id名字
  div1.init();
  ```
- datepicker

  能实现选择日期，上一月，下一月，点击日期会返回到input上
  ```
  datepicker.init('.datepicker')
  ```
- tab
  ### 用自定义属性对组件进行配置
  > data-config='{ "triggerType": "mouseover", "effect": "fade", "sequence": "2", "auto": 5000}'
  - triggerType 表示 事件触发的机制,mouseover和click
  - effect 切换的效果，有fade和default可以选择
  - sequence 默认选择第几个tab
  - auto 是否自动轮播，若有时间则轮播，false则不轮播
  ```
  var tab1 = new Tab(document.querySelector('.js-tab1'))//传入的dom
  ```
