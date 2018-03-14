# my-component 
> 用原生js实现的组件
#### 加入了eslint对语法进行测试，保证代码的规格，配置了一个强行必须写分号，npm install就可以了
## drag
点击查看:[drag组件](https://shoukailiang.github.io/my-component/drag/)
  #### 自定义属性进行配置
  > data-config='{"width": "100px","height": "100px","backgroundColor": "black","position": "absolute"}'
  ```
  var div1 = new Drag('box1');//box1为id名字
  div1.init();
  ```
## datepicker
  点击查看:[datepicker组件](https://shoukailiang.github.io/my-component/datepicker/)

  能实现选择日期，上一月，下一月，点击日期会返回到input上
  ```
  datepicker.init('.datepicker')
  ```
## tab
   点击查看:[tab组件](https://shoukailiang.github.io/my-component/tab/)
  #### 用自定义属性对组件进行配置
  > data-config='{ "triggerType": "mouseover", "effect": "fade", "sequence": "2", "auto": 5000}'
  - triggerType 表示 事件触发的机制,mouseover和click
  - effect 切换的效果，有fade和default可以选择
  - sequence 默认选择第几个tab
  - auto 是否自动轮播，若有时间则轮播，false则不轮播
  ```
  var tab1 = new Tab(document.querySelector('.js-tab1'))//传入的dom
  ```
