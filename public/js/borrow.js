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
        // if (!allData || !allData.length) {
        //     // $(".info-display").text("record not available");
        // } else {   
        // }
        $("#item-name").text("Item: " + allData[0].name);
        $("#item-desc").text("Description: " + allData[0].description);
        $("#category").text("Category: " + allData[0].category);
        $("#img").text("Category: " + allData[0].imageURL);
        $("#avail").text("Available: " + allData[0].available);



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