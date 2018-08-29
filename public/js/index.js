// Get references to page elements
var $submitBtn = $("#startSubmit");
var $messageBody = $("#startMessage");
var loggedInUserId = 1;//"1" is just a testing placeholder, in production will come from the login process
var messageList = [];

$(document).ready(() => {
  refreshMessages();
});

// The API object contains methods for each kind of request we'll make
var API = {
  createMessage: function(message) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/messages",
      data: JSON.stringify(message)
    });
  },
  getMessages: function() {
    return $.ajax({
      url: "api/messages/" + loggedInUserId,
      type: "GET"
    });
  },
  deleteMessage: function(id) {
    return $.ajax({
      url: "api/messages/" + id,
      type: "DELETE"
    });
  },
  getHistory: function(){
    return $.ajax({
      url:"api/history/" + loggedInUserId,
      type: "GET"
    });
  }
};


// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  if($messageBody.val().trim() != ""){
    var newMessageBody = $messageBody.val().trim();
  }else{
    alert("Please enter a message to be sent");
  }
  
  var newSendTime = $("#startDate").val() + " " + $("#startTime").val() + ":00.000"

  var message = {
    body: newMessageBody,
    sendTime: newSendTime,
    UserId: loggedInUserId
  };

  if (!(message.body && message.sendTime)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.createMessage(message).then(function() {
    refreshMessages();
  });

  $messageBody.val("");
  $("#startTime").val("");
  $("#startDate").val("");

  
};

var refreshMessages = function() {
  API.getMessages().then(function(data) {

    if(data.length === 0){
      var $messages = function(){
        var $h2 = $("<h2>")
        .text(`Looks like you don't have any messages to be sent. Why not add one now?`)

      return $h2;
      }
    }else{

    var $messages = data.map(function(message) {
      var $a = $("<a>")
        .text(`${message.body} to be sent at: ${message.sendTime}`)
        .attr("href", "/example/" + message.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": message.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });
  }
    $("#message-list").empty();
    $("#message-list").append($messages);

  });
  
};


// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);


  $("#message-list").on("click", ".delete", function(e){
    e.preventDefault();
    var deleteId = $(this).closest("li").attr("data-id");

    API.deleteMessage(deleteId).then( returned => {
      refreshMessages();
    })
  });
//code for when we have history implemented//
var loadHistory = function() {
  API.getHistory().then(response => {
    var $history = response.map(message =>{
      var $a = $("<a>")
        .text(`${message.body} originally sent at: ${message.sendTime}`)
        .attr("href", "/example/" + message.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": message.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    })
  });
}