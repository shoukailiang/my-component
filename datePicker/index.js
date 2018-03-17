(function () {
  var datepicker = {};
  datepicker.getMonthData = function (year, month) {
    var ret = [];
    if (year === undefined || month === undefined) {
      var today = new Date();
      year = today.getFullYear();
      month = today.getMonth() + 1;
    }

    var firstDay = new Date(year, month - 1, 1);
    var firstDayWeekDay = firstDay.getDay(); // 获取星期几
    if (firstDayWeekDay === 0) firstDayWeekDay = 7;
    // 年月，当传入年月时用来返回
    year = firstDay.getFullYear();
    month = firstDay.getMonth() + 1;

    var lastDayOfLastMonth = new Date(year, month - 1, 0);
    var lastDateOfLastMonth = lastDayOfLastMonth.getDate();
    // 前面还有填充多少个上个月的数据，如果第一天是礼拜一那就不用填充了
    var preMonthDayCount = firstDayWeekDay - 1;
    // 当月的最后一天
    var lastDay = new Date(year, month, 0);
    var lastDate = lastDay.getDate();
    // 极端情况，一个月6周
    for (let i = 0; i < 6 * 7; i++) {
      var date = i + 1 - preMonthDayCount;
      var showDate = date;
      var thisMonth = month;
      if (date <= 0) {
        // 上个月
        thisMonth = month - 1;
        showDate = lastDateOfLastMonth + date;
      } else if (date > lastDate) {
        // 下个月
        thisMonth = month + 1;
        showDate = showDate - lastDate;
      }
      if (thisMonth === 0) thisMonth = 12;
      if (thisMonth === 13) thisMonth = 1;

      ret.push({
        month: thisMonth,
        date: date,
        showDate: showDate
      });
    }
    return {
      year: year,
      month: month,
      days: ret
    };
  };
  window.datepicker = datepicker;
})();
