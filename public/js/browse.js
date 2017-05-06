$(document).ready(function() {

    function getItemName() {
        $.get('/api/allItems', renderitemData);
    }

    function renderitemData(data) {
        var itemData = data;
        if (!itemData || !itemData.length) {
            $(".info-display").text("record not available");
        } else {
            $("#item-name").text("Item name: " + itemData["0"].itemName);
        }
        console.log(itemData);
    }

    getItemDetails();
});