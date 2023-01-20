var EventsList = [];

//Event listener which runs the inner logic only when entire page has loaded.
$(document).ready(function () {
  
  //Event listener for the save button to create events
  $(".saveBtn").on("click", function(){

    var newEvent = $(this).prev().val().trim();
    
    //Error handling to prevent blank event submissions
    if (newEvent == "") {
      $(this).prev().val('');
      return
    }

    //logic for storing events as an array in local storage
    var lsKey = $(this).parent().attr('id');
    var storedEvents = localStorage.getItem(`${lsKey}`);
    if (storedEvents == null) {
      EventsList = [newEvent]
    } else {
      EventsList.push(newEvent);
    };
    localStorage.setItem(`${lsKey}`, JSON.stringify(EventsList));
    
    //clears input field when an event is written
    $(this).prev().val('');
    
    //calls function to 
    displayEvents()
  })
  
for (var i = 9; i<18; i++) {
  var currentHour = dayjs().format('h');
  if (i<currentHour) {
    $(`#hour-${i}`).addClass('past')
  } if (i == currentHour) {
    $(`#hour-${i}`).addClass('present')
  } if (i > currentHour) {
    $(`#hour-${i}`).addClass('future')
  }
}
 
function displayEvents () {
  for (var i = 9; i<18; i++) {
    var lsKey = 'hour-' + i;
    var storedEvents = JSON.parse(localStorage.getItem(`${lsKey}`));
    var eventsSpace = $(`#${lsKey}`).children(1);
    eventsSpace.val(storedEvents);
  }
}

function init(){
displayEvents();
};

init();
  
$('#currentDay').text(dayjs().format('MMMM D, YYYY'));
});
