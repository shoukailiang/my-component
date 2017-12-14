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
      html += `<td>${date.showDate}</td>`;
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
  };
})();
