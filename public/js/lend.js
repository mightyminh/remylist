$(document).ready(function() {

    //User updating the status of item "Available" and updating database
    $(".make-unavailable").on("click", function(e) {
        var itemUnavailable = {
            itemId: $(this).attr("available-item-id")
        };
        $.ajax({
            method: "PUT",
            url: "/item-unavailable",
            data: itemUnavailable
        }).done(function() {
            window.location.href = "/items-by-lender";
        });
    });

    //User updating the status of item "Unvailable" and updating database
    $(".make-available").on("click", function() {
        var itemAvailable = {
            itemId: $(this).attr("unavailable-item-id")
        };
        $.ajax({
            method: "PUT",
            url: "/item-available",
            data: itemAvailable
        }).done(function() {
            window.location.href = "/items-by-lender";
        });
    });

    // Adding a new item to the database
    $("#add-new-item").on("click", function() {
        var newItem = {
            addItemName: $("#add-item-name").val().trim(),
            addItemDescription: $("#add-item-description").val().trim(),
            addItemUrl: $("#add-item-url").val().trim(),
            addItemCategory: $("#add-item-category").val().trim(),
            addItemLender: $("#add-new-item").attr("lender-id")
        };
        $.ajax({
            method: "POST",
            url: "/add-item",
            data: newItem
        }).done(function() {
            window.location.href = "/items-by-lender";
        });
    });

    // Deleting an item from the database
    $(".delete-item").on("click", function() {
        var deleteId = {
            itemId: $(".delete-item").attr("delete-item-id")
        };

        $.ajax({
            method: "DELETE",
            url: "/delete-item",
            data: deleteId
        }).done(function() {
            window.location.href = "/items-by-lender";
        });
    });

    // Requesting and setting borrower's ID to the database
    var itemRequestId;
    $(".request-item").on("click", function() {
        var request = {
            itemId: $(this).attr("request-item-id")
        };
        itemRequestId = request.itemId;
        $.ajax({
            method: "PUT",
            url: "/set-borrower",
            data: request
        }).done(function() {
            window.location.href = "/all-items";
        });
    });

    // Sending mail to the lender
    $(".send-mail").on("click", function() {
        var mail = {
            numDays: $("#num-days").val(),
            mailMessage: $("#email-message").val(),
            itemId: itemRequestId
        };
        $.ajax({
            method: "POST",
            url: "/send-mail",
            data: mail
        }).done(function() {
            window.location.href = "/all-items";
        });
    });
});