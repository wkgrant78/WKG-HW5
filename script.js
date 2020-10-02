
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
    let currentHour = moment().format();
    let timeString = $(timeId).text();
    
    // var currentTime = $('#date-today').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));
    // if/else for past/current/future times
    if(currentHour < timeId) {
      $(textEntry).addClass("past-hour");
    } else if (currentHour > timeId) {
      $(textEntry).addClass("future-hour");
    } else {
      $(textEntry).addClass("present-hour");
    }
    counter ++;
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
  



      // // conditional (ternary) operator is the only JavaScript operator that takes three operands: a condition followed by a question mark ( ? ), then an expression to execute if the condition is truthy followed by a colon ( : ), and finally the expression to execute if the condition is falsy
      // function loadCorrectDataset() {
      //   result = localStorage.getItem('workDay')
      //   return (result ? result : workDay);
      // }
      
      // function initializeLocalStorage() {
      //   localStorage.setItem('workDay', JSON.stringify(workDay));
      // };
      
      // function saveToLocalStorage(dayObj) {
      //   localStorage.setItem('workDay', JSON.stringify(dayObj));
      // }
      // //  
      // function saveSchedule(workDay, val) {
      //   if(!localStorage.getItem('workDay')) {
      //     initializeLocalStorage();
      //   }
      
      //   let workHours = JSON.parse(localStorage.getItem('workDay'));
      //   workHours[workDay] = val
      
      //   saveToLocalStorage(workHours);
      // }
      
      // function updateCalendartoDo(dayObject) {
      //   $(".calendar-row").each(function(index) {
      //     let res = $(this).children("div");
      //     $(this).children("textarea").text(dayObject[res.text()]);
      //   })
      // }
      