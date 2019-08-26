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

// $(document).on("click", "btn", function () {
//     $("notes").empty();
//     var thatId = $(this).attr("data-id");
//     $.ajax({
//         method: "GET",
//         url: "/page/" + thatId
//     })
//         .then(function (data) {
//             console.log(data);
//             $("notes").append("<h1>".data.headline + "<h1>");
//             $("notes").append("<input id='headline' name='headline'>");
//             $("notes").append("textarea id='bodytext' name='body></textarea");
//             $("notes").append("<button data-id='" + data._id + "' id='notesaved'>Note Saved</button>");

//             if (data.page) {
//                 $("headline").val(data.page.headline);
//                 $("bodytext").val(data.page.body);
//             }
//         });

//     $(document).on("click", "#notesaved", function () {
//         var thatId = $(this).attr("data-id");
//         $.ajax({
//             method: "POST",
//             url: "/page/" + thatId,
//             data: {
//                 headline: $("#headline").val(),
//                 body: $("#bodytext").val()
//             }
//         })
//             .then(function (data) {
//                 console.log(data);
//                 $("#summary").empty();
//             });
//     });
//     $("#headline").val("");
//     $("#bodytext").val("");
// });