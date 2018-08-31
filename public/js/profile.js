var API = {
    resend: function(id, sendTime){
        return $.ajax({
            url: "api/messages/resend",
            type: "PUT",
            data: sendTime
        })
    }   
}

////update function////

$("#message-history").on("click", ".resend", function(e){
    e.preventDefault();
    var targetId = $(this)
            .attr("data-id");

    $("#resendDiv").modal({ show: true });


});