// Get references to page elements
var $submitBtn = $("#startSubmit");
var $messageBody = $("#startMessage");
var loggedInUserId = 1;//"1" is just a testing placeholder, in production will come from the login process

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
  getMessages: function(id) {
    return $.ajax({
      url: "api/messages",
      type: "GET",
      data: JSON.stringify(id)
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
    refreshExamples();
  });

  $messageBody.val("");
  $("#startTime").val("");
  $("#startDate").val("");

  
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);

