function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    }
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
};

$(document).ready(function () {
    console.log(document.cookie);
    if (document.cookie === "") {
        window.location.replace("index.html");
    }
    $("#upload").click(function () {
        document.getElementById("file").click();
    });
    $("#deco").click(function () {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        window.location.replace("connection.html");
    });
    $("#file").change(function(e) {
        var filename = this.files[0].name;
        if (!filename.match(/.+\.(jpg|jpeg)/)) {
            $("#filename").html("Le format sélectionné n'est pas supporté");
            return;
        }
        $("#filename").html("Fichier sélectionné : " + filename);
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.snapchat.wac.epitech.eu/all",
            "method": "GET",
            "headers": {
              "Content-Type": "application/json",
              "token": document.cookie.substr(6)
            },
            "success": function (response) {
                var i = 0;
                var img = "";
                $(response["data"]).each(function (index) {
                    var user = escapeHtml(response["data"][index]["email"]);
                    $("#users").append($("<li id=li" + i + "></li>"));
                    $("#li" + i).append($("<p></p>").text(user));
                    $("#li" + i).append(
                        $("<button class=\"btn btn-primary\"" +
                            "id=\"btn" + i + "\"></button>")
                        .text("Envoyer votre snap"));
                    $("#li" + i).append("<input type=\"number\" id=\"duration"
                        + i +"\" style=\"{margin-left: 5px;}\">");
                    $("#btn" + i).click(function () {
                        var $btn = $(this);
                        var duration_id = "duration" + $(this).attr("id")
                            .substr(3);
                        var duration = document.getElementById(duration_id)
                            .value;
                        if (duration === "") {
                            duration = 10;
                        }
                        var file = e.target.files[0];
                        var form = new FormData();
                        form.append("duration", duration);
                        form.append("to", user);
                        form.append("image", file);
                        var settings = {
                            "async": true,
                            "crossDomain": true,
                            "url": "https://api.snapchat.wac.epitech.eu/snap",
                            "method": "POST",
                            "headers": {
                                "token": document.cookie.substr(6)
                            },
                            "processData": false,
                            "contentType": false,
                            "mimeType": "multipart/form-data",
                            "data": form,
                            "success": function (response) {
                                $btn.text("Snap envoyé!");
                                $btn.toggleClass("btn-primary")
                                    .toggleClass("btn-success");
                                $btn.off("click");
                            },
                            "error": function (xhr) {
                                $btn.text("Une erreur s'est produite :(");
                                $btn.toggleClass("btn-primary")
                                    .toggleClass("btn-danger");
                            }
                        }
                        $.ajax(settings);
                    });
                    i++;
                });
            },
            "error": function (xhr, ajaxOptions, thrownError) {
                var str = "Une erreur s'est produite : " +
                    xhr.responseText.substr(9, xhr.responseText.length - 12);
                $("#confirm").html(str);
            }
        }
        $.ajax(settings);
    });
});