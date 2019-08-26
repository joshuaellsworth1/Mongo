// $.getJSON("/pages", function (data) {
//     for (var i = 0; i < data.length; i++) {
//         $("#results").append("<p><a href='" + data[i].url + "' data-id='" + data[i]._id + "'>" + data[i].headline + "</a></p>");
//     }
// });

$(".saved").on("click", function (event) {
    event.preventDefault();
    console.log("saved")
    var id = $(this).attr("page-id");

    $.ajax("/pages/" + id, {
        type: "PUT"
    }).then(
        function () {
            location.reload();
        }
    );
});


$("#clear-all").on("click", function() {
    // Make an AJAX GET request to delete the notes from the db
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "/clearall",
      // On a successful call, clear the #results section
      success: function(response) {
        $("#results").empty();
      }
    });
  });


$("#scrape").on("click", function (event) {
    event.preventDefault();
    console.log("scrape")

    $.ajax("/scrape/", {
        type: "GET"
    }).then(
        function () {
            location.reload();
        }
    );
});

$("#home").on("click", function (event) {
    event.preventDefault();
    console.log("home")

    $.ajax("/home", {
        type: "GET"
    }).then(
        function () {
            location.reload();
        }
    );
});
