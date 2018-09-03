var API = {
  resend: function(id, sendTime) {
    console.log("resend run");
    return $.ajax({
      url: "api/resend/" + id,
      type: "PUT",
      data: sendTime
    });
  }
};

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

flatpickr("#sendTime", {
  altInput: true,
  enableTime: true,
  minDate: new Date()
});
