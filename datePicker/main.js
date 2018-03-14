(function () {
  var datepicker = window.datepicker;
  var $warper;
  var monthData;
  datepicker.buildUi = function (year, month) {
    monthData = datepicker.getMonthData(year, month);
    console.log(monthData);
    var html = `
    <div class="datepicker-header">
      <a href="#" class="datepicker-btn datepicker-prev-btn">&lt</a>
      <a href="#" class="datepicker-btn datepicker-next-btn">&gt</a>
      <span class="datapicker-curr-month">${monthData.year}-${monthData.month}</span>
    </div>
    <div class="datepicker-body">
      <table>
        <thead>
          <tr>
            <th>一</th>
            <th>二</th>
            <th>三</th>
            <th>四</th>
            <th>五</th>
            <th>六</th>
            <th>日</th>
          </tr>
        </thead>
      <tbody>
      `;
    for (var i = 0; i < monthData.days.length; i++) {
      var date = monthData.days[i];
      // 一周的第一天
      if (i % 7 === 0) {
        html += '<tr>';
      }
      /* 自定义属性data-date用了data.date，这个会有负数，会让月份回退 */
      html += `<td data-date=${date.date}>${date.showDate}</td>`;
      if (i % 7 === 6) {
        html += `</tr>`;
      }
    }
    html += `
        </tbody> 
      </table>
    </div>
    `;
    return html;
  };

  datepicker.render = function (direction) {
    var year, month;
    if (monthData) {
      year = monthData.year;
      month = monthData.month;
    }

    if (direction === 'prev') {
      month = month - 1;
    }

    if (direction === 'next') {
      month = month + 1;
    }

    var html = datepicker.buildUi(year, month);
    $warper = document.querySelector('.datepicker-wraper');
    if (!$warper) {
      $warper = document.createElement('div');
      $warper.className = 'datepicker-wraper';
      document.body.appendChild($warper);
    }
    $warper.innerHTML = html;
  };
  datepicker.init = function (input) {
    datepicker.render();
    var $input = document.querySelector('input');
    var isOpen = false;
    $input.addEventListener('click', function () {
      if (isOpen) {
        $warper.classList.remove('datepicker-wraper-show');
        isOpen = false;
      } else {
        $warper.classList.add('datepicker-wraper-show');
        // 获取input的left和top来计算日历的方位，
        var left = $input.offsetLeft;
        var top = $input.offsetTop;
        var height = $input.offsetHeight;
        $warper.style.top = top + height + 4 + 'px';
        $warper.style.left = left + 'px';
        isOpen = true;
      }
    }, false);

    $warper.addEventListener('click', function (e) {
      var $target = e.target;
      if (!$target.classList.contains('datepicker-btn')) return;
      // 上一月

      if ($target.classList.contains('datepicker-prev-btn')) {
        datepicker.render('prev');
      } else if ($target.classList.contains('datepicker-next-btn')) {
        datepicker.render('next');
      }
    }, false);
    $warper.addEventListener('click', function (e) {
      var $target = e.target;
      if ($target.tagName.toLowerCase() !== 'td') return;
      /* dataset这个api是data开头的属性能用这个属性获取到 */
      var date = new Date(monthData.year, monthData.month - 1, $target.dataset.date);
      console.log(date);
      $input.value = format(date);
      /* 点击完后就把日历关掉 */
      $warper.classList.remove('datepicker-wraper-show');
      isOpen = false;
    });
    function format (data) {
      var ret = '';
      var padding = function (num) {
        if (num < 9) {
          return '0' + num;
        } else {
          return num;
        }
      };
      ret += data.getFullYear() + '-';
      ret += padding(data.getMonth() + 1) + '-';
      ret += padding(data.getDate());
      return ret;
    }
  };
})();
