
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
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "/clearall",
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

    $.ajax("/", {
        type: "GET"
    }).then(
        function () {
            location.reload();
        }
    );
});
