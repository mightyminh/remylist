$(document).ready(function() {
    var itemLenderId;
    $(".reply-lender").on("click", function() {
        itemLenderId = $(this).attr("lender-id")
    });

    // Sending mail to the Lender
    $(".contact-lender").on("click", function() {
        var reply = {
            mailMessage: $("#reply-lender-mail").val(),
            lenderId: itemLenderId
        };
        $.ajax({
            method: "POST",
            url: "/contact-lender",
            data: reply
        }).done(function() {});
    });
});