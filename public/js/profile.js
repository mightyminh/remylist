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
            url: "/update-user",
            data: userInput
        }).done(function() {
            window.location.href = "/profile";
        });
    }

    $("#make-unavailable").on("click", function() {
        var itemUnavailable = {
            itemId: $(this).attr("available-item-id")
        };
        $.ajax({
            method: "PUT",
            url: "/item-unavailable",
            data: itemUnavailable
        }).done(function() {
            window.location.href = "/items-by-lender";
        });
    });

    $("#make-available").on("click", function() {
        var itemAvailable = {
            itemId: $(this).attr("unavailable-item-id")
        };
        $.ajax({
            method: "PUT",
            url: "/item-available",
            data: itemAvailable
        }).done(function() {
            window.location.href = "/items-by-lender";
        });
    });

    $("#add-new-item").on("click", function() {
        var newItem = {
            addItemName: $("#add-item-name").val().trim(),
            addItemDescription: $("#add-item-description").val().trim(),
            addItemUrl: $("#add-item-url").val().trim(),
            addItemCategory: $("#add-item-category").val().trim(),
            addItemLender: $("#add-new-item").attr("lender-id")
        };
        $.ajax({
            method: "POST",
            url: "/add-item",
            data: newItem
        }).done(function() {
            window.location.href = "/items-by-lender";
        });
    });
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