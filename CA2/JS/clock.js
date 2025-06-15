"use strict";

// Name: Vijeyakumar Dakshaa
// Student ID: P2415899
// Class: DAAA/FT/1A/04
// Date: 28/07/24 
// Purpose: FED CA2


// execute the function
// 1000 ms is 1 sec so this is to call the function every second 
setInterval(runClock, 1000);

// function to create and run the countdown clock
function runClock() {

    // store the current date and time
    var currentDay = new Date();

    // calculate days until October 27
    // if it is past October 27, it will calculate for October 27 of next year
    // 1000 * 60 * 60 * 24 converts ms to days
    var birthday = new Date(currentDay.getFullYear(), 9, 27); // October is month 9 (0-indexed)
    if (currentDay > birthday) {
        birthday.setFullYear(birthday.getFullYear() + 1);
    }
    var daysLeft = (birthday - currentDay) / (1000 * 60 * 60 * 24);

    // calculate the hours left in the current day
    var hrsLeft = (daysLeft - Math.floor(daysLeft)) * 24;

    // calculate minutes and seconds left in the current hour
    var minsLeft = (hrsLeft - Math.floor(hrsLeft)) * 60;
    var secsLeft = (minsLeft - Math.floor(minsLeft)) * 60;

    // display the time left until October 27
    document.getElementById("days").textContent = Math.floor(daysLeft);
    document.getElementById("hrs").textContent = Math.floor(hrsLeft);
    document.getElementById("mins").textContent = Math.floor(minsLeft);
    document.getElementById("secs").textContent = Math.floor(secsLeft);
}