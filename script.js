
// "let" declare variables that are limited to the scope of a block statement
let workDay = {
  "8 AM": "",
  "9 AM": "",
  "10 AM": "",
  "11 AM": "",
  "12 PM": "",
  "1 PM": "",
  "2 PM": "",
  "3 PM": "",
  "4 PM": "",
  "5 PM": "",
}
$(document).ready(function(){
  // local storage stores all data as strings, use "JSON.stringify" to converts "workDay" string to an array for easier call back on refresh
      // if data is not in local storage, update with entry, otherwise update calendar with locally stored data
  if(!localStorage.getItem('workDay')) {
    updateCalendartoDo(workDay);
  } else {
    updateCalendartoDo(JSON.parse(localStorage.getItem('workDay')));
  }
})

// current date and time in header
$('#date-today').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));

let counter = 1;
// const property creates a read-only reference to the workDay values
for(const property in workDay) {
    let textEntry = "#textarea" + counter;
    $(textEntry).text(workDay[property]);
    let timeId = "#time" + counter;
    let currentTime = moment().format('H');
    let timeString = $(timeId).text();
    
    var hourPast = hourPast < currentTime;
    var hourNow = currentTime;
    var hourFuture = hourFuture < currentTime;


    // var currentTime = $('#date-today').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));
    // if/else for past/current/future times
    if(currentTime < timeId) {
      $(textEntry).addClass("hourPast");
      console.log(hourPast)
    } else if (currentTime > timeId) {
      $(textEntry).addClass("hourFuture");
    } else {
      $(textEntry).addClass("hourNow");
    }
    counter ++;
  }

  // referenced from stackoverflow
  const rows = document.getElementsByClassName("row");
  let currentHour = parseInt(moment().format('H'));
  
  Array.from(rows).forEach(row => {
    let
      rowIdString = row.id,
      rowHour;
    if (rowIdString) {
      rowHour = parseInt(rowIdString);
    }
    if (rowHour) {
      // Compares row id to current hour and sets color accordingly
      if (currentHour === rowHour) {
        setColor(row, "red");
      } else if ((currentHour < rowHour) && (currentHour > rowHour - 6)) {
        setColor(row, "green");
      } else if ((currentHour > rowHour) && (currentHour < rowHour + 6)) {
        setColor(row, "lightgrey");
      } else {
        setColor(row, "white");
      }
    }
  });
  
  function setColor(element, color) {
    element.style.backgroundColor = color;
  }

  // on click saves teaxarea value
  $("button").click(function() {
    value = $(this).siblings("textarea").val();
    workDay = $(this).siblings("div").text();
    
    saveSchedule(workDay, value);
  });
  
      
  function loadCorrectDataset() {
    result = localStorage.getItem('workDay')
    return (result ? result : workDay);
  }
  
  function initializeLocalStorage() {
    localStorage.setItem('workDay', JSON.stringify(workDay));
  };
  
  function saveToLocalStorage(dayObj) {
    localStorage.setItem('workDay', JSON.stringify(dayObj));
  }
  //  
  function saveSchedule(hrString, val) {
    if(!localStorage.getItem('workDay')) {
      initializeLocalStorage();
    }
  
    let workHours = JSON.parse(localStorage.getItem('workDay'));
    workHours[hrString] = val
  
    saveToLocalStorage(workHours);
  }
  
  function updateCalendartoDo(dayObject) {
    $(".calendar-row").each(function(index) {
      let res = $(this).children("div");
      $(this).children("textarea").text(dayObject[res.text()]);
    })
  }
  
