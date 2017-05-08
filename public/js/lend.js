$(document).ready(function() {

    // Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}      

    function getLendInfo() {
        $.get('/api/lend', renderLendInfo);
    }

     function postLendInfo() {
        $.post('/api/lend', sendLendInfo);
    }

 function renderLendInfo(data) {
        var userLendData = data;
        // if (!userLendData || !userLendData.length) {
        //     $(".info-display").text("record not available");
        // } else {

            // $("#item-name").append("Item: " + userLendData[i].name + "  |  ");
            // $("#item-desc").append("Description: " + userLendData[i].description + "  |  ");
            // $("#category").append("Category: " + userLendData[i].category + "  |  ");
            // $("#img").append("Image URL: " + userLendData[i].imageURL + "  |  ");
            // $("#avail").append("Available: " + userLendData[i].available + "  |  ");
        // }
        console.log(userLendData);
    }


function sendLendInfo() {
        // if (!userLendData || !userLendData.length) {
        //     $(".info-display").text("record not available");
        // } else {

            // $("#item-name").append("Item: " + userLendData[i].name + "  |  ");
            // $("#item-desc").append("Description: " + userLendData[i].description + "  |  ");
            // $("#category").append("Category: " + userLendData[i].category + "  |  ");
            // $("#img").append("Image URL: " + userLendData[i].imageURL + "  |  ");
            // $("#avail").append("Available: " + userLendData[i].available + "  |  ");
        // }
        console.log(userLendData);
    }

function NewLendInfo(){
    $('.addButton').on('click', function() {
            postLendInfo(name,description,imgUrl,category);
        });
}

    getLendInfo();
    NewLendInfo();

});

        
  