$.getJSON("/pages", function (data) {
    for (var i = 0; i < data.length; i++) {
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});

$(document).on("click", "p", function () {
    $("summary").empty();
    var thatId = $(this).attr("data-id");
    $.ajax({
        method: "GET",
        url: "/pages/" + thatId
    })
        .then(function (data) {
            console.log(data);
            $("summary").append("<h1>".data.headline + "<h1>");
            $("summary").append("<input id='headline' name='headline'>");
            $("summary").append("textarea id='bodytext' name='body></textarea");
            $("summary").append("<button data-id='" + data._id + "' id='notesaved'>Note Saved</button>");

            if (data.page) {
                $("headline").val(data.page.headline);
                $("bodytext").val(data.page.body);
            }
        });

    $(document).on("click", "#notesaved", function () {
        var thatId = $(this).attr("data-id");
        $.ajax({
            method: "POST",
            url: "/pages/" + thatId,
            data: {
                headline: $("#headline").val(),
                body: $("#bodytext").val()
            }
        })
            .then(function (data) {
                console.log(data);
                $("#summary").empty();
            });
    });
    $("#headline").val("");
    $("#bodytext").val("");
});