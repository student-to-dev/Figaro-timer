"use strict";

/*
DigitalClock Object constructor. (Template for creating other DigitalClock object)
Allows easy creation of DigitalClock object with access to exposed (public) functions.
*/
function DigitalClock() {
  /* Returns current date and time. */
  var start = function () {
    return new Date();
  };

  /*Formats date.
  time: time to format
  formatTimeSize: leading number of 0's of numbers.*/
  var formatTime = function (time, formatTimeSize) {
    var hours = addLeadingZero(time.getHours() % 12, formatTimeSize);
    var minutes = addLeadingZero(time.getMinutes(), formatTimeSize);
    var seconds = addLeadingZero(time.getSeconds(), formatTimeSize);
    var timeStamp = hours + " : " + minutes + " : " + seconds;
    var meridiem = time.getHours() < 12 ? "AM" : "PM";
    return {
      timeStamp,
      meridiem
    };
  };

  /*Adds leading 0's*/
  var addLeadingZero = function (time, size) {
    var appendedTime = "0000" + time;
    return appendedTime.substring(appendedTime.length - size);
  };

  //Exposing functions
  return {
    start: start,
    formatTime: formatTime
  };
}