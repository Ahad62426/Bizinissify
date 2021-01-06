var date = DateTime.now();
int getTodayTimeStamp() {
  var today = new DateTime(date.year, date.month, date.day);
  return today.millisecondsSinceEpoch;
}

int getCurrentMonthTimeStamp() {
  var monthsFirstDay = new DateTime(date.year, date.month, 1);
  return monthsFirstDay.millisecondsSinceEpoch;
}

int getCurrentYearTimeStamp() {
  var today = new DateTime(date.year, 1, 1);
  return today.millisecondsSinceEpoch;
}