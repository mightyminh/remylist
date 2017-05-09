$(document).ready(function() {

    // function getById() {
    //     $.get('', renderLocation1);
    // }

    function getAll() {
        $.get('/api/allItems', renderAll);
    }

    function getCategory1() {
        $.get('/api/itemsCategory', renderCategory1);
    }


    // function getCategory2() {
    //     $.get('/api/itemsCategory', renderCategory2);
    // }

    // function getCategory3() {
    //     $.get('/api/itemsCategory', renderCategory3);
    // }

    function getLocation1() {
        $.get('/api/itemsLocation', renderLocation1);
    }

    // function getLocation2() {
    //     $.get('/api/itemsLocation', renderLocation1);
    // }

    // function getLocation3() {
    //     $.get('/api/itemsLocation', renderLocation1);
    // }

    function getData() {
        $('.all').on('click', function() {
            $(".borrow-info").empty();
            getAll();
        });
        $('.category .category1').on('click', function() {
            $(".borrow-info").empty();
            getCategory1();
        });
        // $('.category .category2').on('click', function() {
        //     getCategory2();
        // });
        // $('.category .category3').on('click', function() {
        //     getCategory3();
        // });
        $('.location .location1').on('click', function() {
            getLocation1();
    });

    //     $('.location .location2').on('click', function() {
    //         getLocation2();
    // });

    //     $('.location .location3').on('click', function() {
    //         getLocation3();
    // });
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
        } 
        for (var i = 0; i < dataByCategory.length; i++) {

            $("#item-name").append("Item: " + dataByCategory[i].name + "  |  ");
            $("#item-desc").append("Description: " + dataByCategory[i].description + "  |  ");
            $("#img").append("Image URL: " + dataByCategory[i].imageURL + "  |  ");
            $("#avail").append("Available: " + dataByCategory[i].available + "  |  ");
        }

        console.log(dataByCategory);
    }

 // function renderCategory2(data) {
 //        var dataByCategory = data;
 //        if (!dataByCategory || !dataByCategory.length) {
 //            $(".items").text("record not available");
 //        } else {
 //            for (var i = 0; i < dataByCategory.length; i++) {
 //                $("#item-name").append("Item: " + dataByCategory[i].name + "  |  ");
 //                $("#item-desc").append("Description: " + dataByCategory[i].description + "  |  ");
 //                $("#img").append("Image URL: " + dataByCategory[i].imageURL + "  |  ");
 //                $("#avail").append("Available: " + dataByCategory[i].available + "  |  ");

 //            }

 //        }

 //        console.log(dataByCategory);

 //    }

 //     function renderCategory3(data) {
 //        var dataByCategory = data;
 //        if (!dataByCategory || !dataByCategory.length) {
 //            $(".items").text("record not available");
 //        } else {
 //            if (dataByCategory.category === "Homegoods"){
 //            for (var i = 0; i < dataByCategory.length; i++) {
 //                $("#item-name").append("Item: " + dataByCategory[i].name + "  |  ");
 //                $("#item-desc").append("Description: " + dataByCategory[i].description + "  |  ");
 //                $("#img").append("Image URL: " + dataByCategory[i].imageURL + "  |  ");
 //                $("#avail").append("Available: " + dataByCategory[i].available + "  |  ");
 //            }
 //            }

 //        }

 //        console.log(dataByCategory);

 //    }

 function renderLocation1(data) {
             var dataByLocation = data;
        // if (!dataByLocation || !dataByLocation.length) {
        //     $(".items").text("record not available");
        // } 
        // for (var i = 0; i < dataByLocation.length; i++) {

            // $("#item-name").append("Item: " + dataByLocation[i].name + "  |  ");
            // $("#item-desc").append("Description: " + dataByLocation[i].description + "  |  ");
            // $("#img").append("Image URL: " + dataByLocation[i].imageURL + "  |  ");
            // $("#avail").append("Available: " + dataByLocation[i].available + "  |  ");
            // $("#category").append("Category: " + dataByLocation[i].category + "  |  ");

        // }
        // console.log(dataByLocation);
    }
    getData();
});


