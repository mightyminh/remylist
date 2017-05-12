$(document).ready(function() {

    $(".make-unavailable").on("click", function(e) {
        console.log(e.target);
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