$(document).ready(function() {

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
            url: "/updateuser",
            data: userInput
        }).done(function() {
            window.location.href = "/profile";
        });
    }
});

// function getUserDetails() {
//     $.get('/api/profile', renderUserData);
// }

// function updateUserDetails() {
//     $.put('/api/update-user', postUserDetails);
// }


// function checkClickedButton() {
//     $('#edit-info').on('click', function() {
//         updateUserDetails();
//     });
// }


// function renderUserData(data) {
//     var userData = data;
//     if (!userData || !userData.length) {
//         $(".info-display").text("record not available");
//     } else {
//         $("#full-name").text("Full name: " + userData["0"].fullName);
//         $("#user-name").text("Username: " + userData["0"].userName);
//         $("#email").text("Email: " + userData["0"].email);
//         $("#location").text("Location: " + userData["0"].location);
//     }
//     console.log(userData);
// }



// function postUserDetails(data) {
//     var userData = data;
//     if (!userData || !userData.length) {
//         $(".info-display").text("record not available");
//     } else {

//         // $("#update-name");
//         // $("#update-email");
//         // $("update-location");

//     }
//     console.log(userData);
// }


// getUserDetails();
// checkClickedButton();