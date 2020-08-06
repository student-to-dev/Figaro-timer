/*
This javascript file utilizes the DigitalClock object constructor in script.js file to create an instance of DigitalClock object.
This newly instantiated object gets access to public or exposed variables and functions.
        start(), formatTime()
        */

// DOM Elements
var clockFace = document.getElementById("clock-face"),
  meridiem = document.getElementById("meridiem"),
  startButton = document.getElementById("start"),
  pauseButton = document.getElementById("pause"),
  resetButton = document.getElementById("reset");

// Instantiating StopWatch object.
var digitalClock = new DigitalClock();
var interval, // holds the interval to be cleared when reset or pause
  intervalTime = 500, // setInterval duration config
  formatTimeSize = 2, // time format config
  clockRunning = false; // state of clock, boolean

// Initialize clock
var initializeClock = function () {
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
  clockRunning = false;
  interval = null;
  clockFace.innerHTML = "00 : 00 : 00";
  meridiem.innerHTML = "AM";
};

// when clicked start button time sets up to current time and starts ticking
var startClock = function () {
  // check if clock is already running
  if (!clockRunning) {
    console.log("Clock started!");
    interval = setInterval(function () {
      var formattedTime = digitalClock.formatTime(
        digitalClock.start(),
        formatTimeSize
      );
      clockFace.innerHTML = formattedTime["timeStamp"];
      meridiem.innerHTML = formattedTime["meridiem"];
    }, intervalTime);
    clockRunning = true; // set clock to running state
    // toggling buttons to disable or enable
    startButton.disabled = true; // once clock starts, set start to disable mode
    pauseButton.disabled = false; // pause allowed while clock running
    resetButton.disabled = true; // reset disabled while clock running
  }
};

// Toggles between pause or resume so that one button can do both
var pauseResumeToggle = function () {
  return pauseButton.value == "Pause" ? pauseTimer() : resumeTimer(); // Ternary operator
};

// pause timer
var pauseTimer = function () {
  if (clockRunning) {
    console.log("Timer paused.");
    clearInterval(interval); // clear interval set by startClock()
    interval = null; // set interval to null
    clockRunning = false;
    pauseButton.value = "Resume"; // set same button ready for Resume
    resetButton.disabled = false; // once clock pauses, allow reset
  }
};

// resume timer
var resumeTimer = function () {
  if (!clockRunning) {
    console.log("Timer resumed.");
    pauseButton.value = "Pause"; // toggle back to pause
    startClock(); // start clock
  }
};

// reset the timer to initial state
var resetTimer = function () {
  console.log("Timer reset.");
  pauseButton.value = "Pause"; //once reset, toggle to pause
  clearInterval(interval); // clear interval
  initializeClock(); // roll back to initial state
};

// Event listeners on buttons click
startButton.addEventListener("click", startClock);
pauseButton.addEventListener("click", pauseResumeToggle);
resetButton.addEventListener("click", resetTimer);
