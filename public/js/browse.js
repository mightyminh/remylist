$(document).ready(function() {

    function getItemDetails() {
        $.get('/api/allItems', renderitemData);
    }

    function renderitemData(data) {
        var itemData = data;
        if (!itemData || !itemData.length) {
            // ID/CLASS text for “record not available”.
        } else {
            // 
        }
        console.log(itemData);
    }

    getItemDetails();
});