var API = {

    resend: function(id, sendTime){
        console.log("resend run")
        return $.ajax({
            url: "api/resend/" + id,
            type: "PUT",
            data: sendTime
        });
    },
    profilepic: function(data){
        return $.ajax({
            url: "api/profilepic",
            type: "PUT",
            data: data
        });
    },
    infoUpdate: function(data){
        console.log("infoupdate running")
        return $.ajax({
            url: "api/profileupdate",
            type: "PUT",
            data: data
        });
    }
}

////update function////

$("#history-list").on("click", ".resend", function(e) {
  e.preventDefault();
  var targetId = $(this).attr("data-id");

  $("#resendDiv").modal({ show: true });

  $("#resend-submit").on("click", function(e) {
    e.preventDefault();
    var newTime = {
      newTime: $("#sendTime").val()
    };
    API.resend(targetId, newTime).then(() => {
      let fade = new Promise((res, rej) => {
        res($("#updateDiv").fadeOut(450));
      });

      fade.then(() => {
        function closeModal() {
          $("#resendDiv").modal("hide");
        }

        setTimeout(closeModal, 400);
      });

      location.reload();
    });
  });

  $("#modal-close").on("click", e => {
    let fade = new Promise((res, rej) => {
      res($("#updateDiv").fadeOut(450));
    });

    fade.then(() => {
      function closeModal() {
        $("#resendDiv").modal("hide");
      }

      setTimeout(closeModal, 400);
    });
  });
});

///add/update profile pic

$("#profilepic-update").on("click", function(e){
    e.preventDefault();

    $("#profilepicDiv").modal({ show: true });

    $("#profilepic-submit").on("click", function(e){
        e.preventDefault();

        
        var newPicUrl = $("#profilepic-input").val().trim();

        if(newPicUrl !== ""){

            if(newPicUrl.slice(0,8) === "https://" && newPicUrl.slice(newPicUrl.length-4 === ".jpg")){
                var picUpdate = {
                    profilepic: newPicUrl
                };
                
                API.profilepic(picUpdate)
                        .then(result => {
                            let fade = new Promise((res, rej) => {
                                res($("#updateDiv").fadeOut(450));
                            });
                    
                            fade.then(() => {
                                function closeModal() {
                                $("#resendDiv").modal("hide");
                            };
                    
                            setTimeout(closeModal, 400);
                            });
                
                            location.reload();
                        });

            }else{
                alert("Please enter a valid address (must be '.jpg'")
            }
        }else{
            alert("Please enter an image url")
        };
    });
    $("#modal-close-pic").on("click", e => {
        let fade = new Promise((res, rej) => {
          res($("#profilepicDiv").fadeOut(450));
        });
      
        fade.then(() => {
          function closeModal() {
            $("#profilepicDiv").modal("hide");
          };
      
          setTimeout(closeModal, 400);
        });
    });
});

//update profile-info//

$(".list-group-item").on("click", function(){
    var colName = $(this).attr("id");
    if(!colName){
        return;
    }

    $("#profileinfoDiv").modal({ show: true });

    $("#profileinfo-submit").on("click", function(e){
        e.preventDefault();

        var newVal = $("#profileinfo-input").val().trim();
        if(newVal !== ""){

            var newUpdate = {
                body: newVal,
                set: colName
            };

            API.infoUpdate(newUpdate).then(() => {
                let fade = new Promise((res, rej) => {
                    res($("#profileinfoDiv").fadeOut(450));
                });
        
                fade.then(() => {
                    function closeModal() {
                    $("#profileinfoDiv").modal("hide");
                };
        
                setTimeout(closeModal, 400);
                });

                location.reload();
            });

            
        }else{
            alert("Please enter a your new information.")
        }
    });
    $("#modal-close-info").on("click", e => {
        let fade = new Promise((res, rej) => {
          res($("#profileinfoDiv").fadeOut(450));
        });
      
        fade.then(() => {
          function closeModal() {
            $("#profileinfoDiv").modal("hide");
          };
      
          setTimeout(closeModal, 400);
        });
    });
});


flatpickr("#sendTime", {
  altInput: true,
  enableTime: true,
  minDate: new Date()
});
