"use strict";

// SP70 events
const events = {
    0: [{ day: 4, title: 'SP OpenHouse' }, { day: 5, title: 'SP OpenHouse' }, { day: 6, title: 'SP OpenHouse' }],
    1: [],
    2: [{ day: 8, title: 'SP70 Music Festival' }],
    3: [],
    4: [],
    5: [],
    6: [{ day: 12, title: 'SP70 Charity Golf and Gala dinner' }, { day: 31, title: 'Poly 50' }],
    7: [],
    8: [],
    9: [{ day: 25, title: 'SP70 Dinner and Dance' }, { day: 27, title: 'SP70!' }],
    10: [],
    11: []
};

// to show January's calendar when website is opened
document.getElementById("calendar").innerHTML = createCalendar(new Date(2024, 0));

// adding event listener for month selected
// this is the month selected by the user from the dropdown
const monthSelector = document.getElementById('monthSelector');
monthSelector.addEventListener('change', function() {
    const selectedMonth = parseInt(this.value);
    document.getElementById("calendar").innerHTML = createCalendar(new Date(2024, selectedMonth));
});

// function to generate the calendar table
// calDate is the month the user chooses
// <table id='calendar_table'> starts the creation of the table and assigns that id
function createCalendar(calDate) {
    var calendarHTML = "<table id='calendar_table'>";
    calendarHTML += calCaption(calDate);
    calendarHTML += calWeekdayRow();
    calendarHTML += calDays(calDate);
    // closing the table tag
    calendarHTML += "</table>";
    return calendarHTML;
}

// function to write the calendar caption
function calCaption(calDate) {
    var monthName = ["January", "February", "March", "April",
                    "May", "June", "July", "August", "September",
                    "October", "November", "December"];
   
    // determine the month
    var thisMonth = calDate.getMonth();
   
    // determine the year
    var thisYear = calDate.getFullYear();
   
    // caption
    return "<caption>" + monthName[thisMonth] + " " + thisYear + "</caption>";
}

// function to write a table row of weekday abbreviations
function calWeekdayRow() {
    // array of weekday abbreviations
    var dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    var rowHTML = "<tr>";
   
    // loop through the dayName array
    for (var i = 0; i < dayName.length; i++) {
        rowHTML += "<th class='calendar_weekdays'>" + dayName[i] + "</th>";
    }
   
    rowHTML += "</tr>";
    return rowHTML;
}

// function to calculate the number of days in the month
function daysInMonth(calDate) {
    // array of days in each month
    var dayCount = [31,28,31,30,31,30,31,31,30,31,30,31];
   
    // extract the four digit year and month value
    var thisYear = calDate.getFullYear();
    var thisMonth = calDate.getMonth();
   
    // 2024 feb is a leap year, leap years occur every 4 years except years divisible by 100
    if (thisYear % 4 === 0) {
        if ((thisYear % 100 != 0) || (thisYear % 400 === 0)) {
            // if the year is leap year
            dayCount[1] = 29;
        }
    }   
   
    // return the number of days for the current month
    return dayCount[thisMonth];
}

// Function to write table rows for each day of the month
function calDays(calDate) {
    // to determine the starting day of the month
    // calDate.getFullYear() to get 4 digit year from calDate
    // calDate.getMonth() extracts month from calDate (rmb month is 0 indexed)
    var day = new Date(calDate.getFullYear(), calDate.getMonth(), 1);
    var weekDay = day.getDay();
    var htmlCode = "<tr>";

    // blank cells for before first day of month where weekDay is the day of the week of the first day of the month
    for (var i = 0; i < weekDay; i++) {
        htmlCode += "<td></td>";
    }
   
    // write cells for each day of the month
    var totalDays = daysInMonth(calDate);
    var today = new Date();
    var isCurrentMonth = today.getMonth() === calDate.getMonth() && today.getFullYear() === calDate.getFullYear();
   
    // iterates from first to last day of month
    for (var dayNum = 1; dayNum <= totalDays; dayNum++) {
        // updates day object to the day of the month based on the loop and the value in dayNum
        day.setDate(dayNum);
        // returns the day of the week for the current day
        weekDay = day.getDay();  
        // weekDay will be 0 on sundays, if it is sunday, it will append a new row to indicate new week 
        if (weekDay === 0) htmlCode += "<tr>";

        // for if there is any events that day
        const dayEvents = getEvents(calDate.getMonth(), dayNum);
        // for css
        const dayClass = 'calendar_dates';
        // to highlight current day, i am giving id for that day so i can use css to highlight
        let todayClass = '';
        if (isCurrentMonth && dayNum === today.getDate()) {
            todayClass = ' id="calendar_today"';
        }

        htmlCode += `<td class='${dayClass}'${todayClass}>${dayNum}${dayEvents}</td>`;

        // weekDay is 6 when it is saturday so row ends here
        if (weekDay === 6) htmlCode += "</tr>";
    }   
   
    return htmlCode;
}

// function to get events for a specific day
function getEvents(month, day) {
    // get events for that month
    const monthEvents = events[month];
    let dayEvents = [];

    // iterates over each event in the array of events for that month
    for (let i = 0; i < monthEvents.length; i++) {
        // if there is an event on that day, the event is added into dayEvents
        if (monthEvents[i].day === day) {
            dayEvents.push(monthEvents[i]);
        }
    }

    // initializing empty string
    let eventHTML = "";
    // iterate over the events in that day and add it to the HTML string
    for (let i = 0; i < dayEvents.length; i++) {
        const event = dayEvents[i];
        eventHTML += "<div class='event'>" + event.title + "</div>";
    }    
    return eventHTML;
}