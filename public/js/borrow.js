$(document).ready(function() {


    function getAll() {
        $.get('/api/allItems', renderAll);
    }

    function getCategory1() {
        $.get('/api/itemsCategory', renderCategory1);
    }

    function getData() {
        $('.all').on('click', function() {
            getAll();
        });
        $('.dropdown-menu .category1').on('click', function() {
            getCategory1();
        });
    }

    function renderAll(data) {
        var allData = data;
        if (!allData || !allData.length) {
            $(".items").text("record not available");
        } else {
            for (var i = 0; i < allData.length; i++) {
                $("#item-name").append("Item: " + allData[i].name + "  |  ");
                $("#item-desc").append("Description: " + allData[i].description + "  |  ");
                $("#category").append("Category: " + allData[i].category + "  |  ");
                $("#img").append("Image URL: " + allData[i].imageURL + "  |  ");
                $("#avail").append("Available: " + allData[i].available + "  |  ");
            }
        }
        console.log(allData);

    }

    function renderCategory1(data) {
        var dataByCategory = data;
        if (!dataByCategory || !dataByCategory.length) {
            $(".items").text("record not available");
        } else {
            for (var i = 0; i < dataByCategory.length; i++) {
                $("#item-name").append("Item: " + dataByCategory[i].name + "  |  ");
                $("#item-desc").append("Description: " + dataByCategory[i].description + "  |  ");
                $("#img").append("Image URL: " + dataByCategory[i].imageURL + "  |  ");
                $("#avail").append("Available: " + dataByCategory[i].available + "  |  ");

            }

        }

        console.log(dataByCategory);

    }

    getData();
});










//     function getByLocation() {
//         $.get('/api/itemslocation', renderByLocation);
//     }

// function getByCategory() {
//         $.get('/api/itemscategory', renderByCategory);
//     }