$(document).ready(function() {

    // Updating user details
    $("#update-user").on("click", function() {
        var userInput = {
            updateFullName: $("#update-full-name").val().trim(),
            updateEmailId: $("#update-email-id").val().trim(),
            updateLocation: $("#update-location").val().trim()
        };
        updateDB(userInput);
    });

    function updateDB(userInput) {
        $.ajax({
            method: "PUT",
            url: "/update-user",
            data: userInput
        }).done(function() {
            window.location.href = "/profile";
        });
    }
});