$(document).ready(function() {


    function getAll() {
        $.get('/api/allItems', renderAll);
    }

    function getAllData() {
        $('.all').on('click', function() {
            getAll();
            // use userData["0"].id 
        });
    }

    function renderAll(data) {
        var allData = data;
        // if (!allData || !allData.length) {
        //     // $(".info-display").text("record not available");
        // } else {   

        // }
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