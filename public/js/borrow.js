


$(document).ready(function() {

    function getAll() {
        $.get('/api/allitems', renderAll);
    }


function getAllData() {
    $('#all').on('click', function() {
        getAllDetails();
        // use userData["0"].id 
    });




    function getByLocation() {
        $.get('/api/itemslocation', renderByLocation);
    }

function getByCategory() {
        $.get('/api/itemscategory', renderByCategory);
    }



    function renderuserData(data) {
        var userData = data;
        if (!userData || !userData.length) {
            $(".info-display").text("record not available");
        } else {
            

           

        }
        console.log(userData);
    }

    getUserDetails();
});



}