$(document).ready(function() {

    $('#repeat-password').on("input", function() {
        var newPassword = $("#newuser-password").val().trim();
        var repeatPassword = $(this).val().trim();

        if (newPassword && repeatPassword && (repeatPassword != newPassword)) {
            console.log("no match");
            $("#password-message").text("password don't match");
        } else {
            $("#password-message").text("password don't match").hide();
            console.log("matching");
        }
    });

});