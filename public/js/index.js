// Get references to page elements
var $submitBtn = $("#startSubmit");
var $messageBody = $("#startMessage");
var loggedInUserId = 1;//"1" is just a testing placeholder, in production will come from the login process
var messageList = [];
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
  deleteExample: function(id) {
    return $.ajax({
      url: "api/messages/" + id,
      type: "DELETE"
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
  API.getMessages(loggedInUserId).then(function(data) {
    console.log(data)
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

    $("#message-list").empty();
    $("#message-list").append($messages);
  });
};


// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);

