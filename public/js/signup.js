$(document).ready(function() {

    //Real time validation on signup form
    $('#repeat-password').on("input", function() {
        var newPassword = $("#newuser-password").val().trim();
        var repeatPassword = $(this).val().trim();

        if (newPassword && repeatPassword && (repeatPassword != newPassword)) {
            $("#password-message").show();
            $("#password-message").text("Passwords don't match");
        } else {
            $("#password-message").hide();
        }
    });
});