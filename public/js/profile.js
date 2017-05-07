$(document).ready(function() {

    function getUserDetails() {
        $.get('/api/profile', renderuserData);
    }

    // function updateUserDetails() {
    //     $.post('/api/profile', updateUserData);
    // }

    function renderuserData(data) {
        var userData = data;
        if (!userData || !userData.length) {
            $(".info-display").text("record not available");
        } else {

            $("#full-name").text("Full name: " + userData["0"].fullName);
            $("#user-name").text("Username: " + userData["0"].userName);
            $("#email").text("Email: " + userData["0"].email);
            $("#location").text("Location: " + userData["0"].location);

        }
        console.log(userData);
    }

    getUserDetails();
});

function updateUserDetails() {
    $('#edit-info').on('click', function() {
        updateUserDetails();
        // use userData["0"].id 
    });

}