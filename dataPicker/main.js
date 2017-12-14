(function () {
  var datepicker = window.datepicker;
  datepicker.buildUi = function (year, month) {
    var monthData = datepicker.getMonthData(year, month);
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
  datepicker.init = function (input) {
    var html = datepicker.buildUi();
    var $warper = document.createElement('div');
    $warper.className = 'datepicker-wraper';
    $warper.innerHTML = html;
    document.body.appendChild($warper);

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
  };
})();
