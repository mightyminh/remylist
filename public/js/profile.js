$(document).ready(function() {

    $("#update-user").on("click", function() {
        var userInput = {
            updateFullName: $("#update-full-name").val().trim(),
            updateEmailId: $("#update-email-id").val().trim(),
            updateLocation: $("#update-location").val().trim()
        };
        updateDB(userInput);
    });

    function updateDB(userInput) {
        $.ajax({
            method: "PUT",
            url: "/update-user",
            data: userInput
        }).done(function() {
            window.location.href = "/profile";
        });
    }

    $("#make-unavailable").on("click", function() {
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

    $("#make-available").on("click", function() {
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
    $("#delete-item").on("click", function() {
        var deleteId = {
            itemId: parseInt($("#delete-item").attr("delete-item-id"))
        };

        $.ajax({
            method: "DELETE",
            url: "/delete-item",
            data: deleteId
        }).done(function() {
            window.location.href = "/items-by-lender";
        });
    });
});