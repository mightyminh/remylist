$(document).ready(function() {


    function getAll() {
        $.get('/api/allItems', renderAll);
    }

    function getAllData() {
        $('.all').on('click', function() {
            getAll();
        });
    }

    function renderAll(data) {
        var allData = data;
        if (!allData || !allData.length) {
            $(".all-items").text("record not available");
        } else {
            for (var i = 0; i < allData.length; i++) {
                $("#item-name").append("Item: " + allData[i].name + "  |  ");
                $("#item-desc").append("Description: " + allData[i].description + "  |  ");
                $("#category").append("Category: " + allData[i].category + "  |  ");
                $("#img").append("Category: " + allData[i].imageURL + "  |  ");
                $("#avail").append("Available: " + allData[i].available + "  |  ");
            }
        }



        console.log(allData);
    }

    getAllData();
});










//     function getByLocation() {
//         $.get('/api/itemslocation', renderByLocation);
//     }

// function getByCategory() {
//         $.get('/api/itemscategory', renderByCategory);
//     }