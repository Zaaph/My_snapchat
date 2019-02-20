function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

$(document).ready(function () {
    if (document.cookie === "") {
        window.location.replace("index.html");
    }
    console.log(document.cookie);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.snapchat.wac.epitech.eu/snaps",
        "method": "GET",
        "headers": {
          "token": document.cookie.substr(6)
        },
        "success": function (response) {
            var i = 0;
            $(response["data"]).each(function (index) {
                var duration = response["data"][index]["duration"];
                var user = escapeHtml(response["data"][index]["from"]);
                var snap_id = response["data"][index]["snap_id"]; 
                $("#snaps").append($("<li id=li" + i + "></li>"));
                var $li = $("#li" + i);
                $li.append($("<p id=p" + i + "></p>").text("De : " + user));
                var $img = $("<img id=img" + i + ">").css("display", "none");
                $li.append($img);
                $("#p" + i).click(function () {
                    var $p = $(this);
                    $img.attr("src",
                        "https://api.snapchat.wac.epitech.eu/snap/" + snap_id);
                    $img.css("display", "block");
                    $img.css("height", "600px").css("width", "600px");
                    setTimeout(function () {
                        $.ajax({
                            "async": true,
                            "crossDomain": true,
                            "url": "https://api.snapchat.wac.epitech.eu/seen",
                            "method": "POST",
                            "headers": {
                                "Content-Type": "application/json",
                                "token": document.cookie.substr(6)
                            },
                            "processData": false,
                            "data": JSON.stringify({
                                "id": snap_id
                            }),
                            "success": function () {
                                $li.remove();
                            },
                            "error": function () {
                                $li.append("<p></p>")
                                    .text("Une erreur s'est produite :(");
                            }
                        });                
                    }, duration * 1000);
                });
                i++;
            });
        },
                    /*$.ajax({
                        "async": true,
                        "crossDomain": true,
                        "url": "https://api.snapchat.wac.epitech.eu/snap/"
                            + snap_id,
                        "method": "GET",
                        "headers": {
                            "token": document.cookie.substr(6)
                        },
                        "success": function (response) {
                            console.log(response);
                            /*var img = document.createElement('img');
                            img.src = 'data:image/jpeg;base64,' +
                                btoa(unescape(
                                    encodeURIComponent(response)));
                            console.log(img.src);
                            document.body.appendChild(img);
                            /*var reader = new FileReader();
                            reader.onload = (function(self) {
                                return function(e) {
                                    $img.attr("src", e.target.result);
                                }
                            })(this);
                            reader.readAsDataURL(new Blob([response]));
                            $img.css("display", "block");
                            console.log("success");*/
                            /*setTimeout(function () {
                                $.ajax({
                                    "async": true,
                                    "crossDomain": true,
                                    "url": "https://api.snapchat.wac.epitech.eu/seen",
                                    "method": "POST",
                                    "headers": {
                                        "Content-Type": "application/json",
                                        "token": document.cookie.substr(6)
                                    },
                                    "processData": false,
                                    "data": JSON.stringify({
                                        "id": snap_id
                                    }),
                                    "success": function () {
                                        $li.remove();
                                    },
                                    "error": function () {
                                        $li.append("<p></p>")
                                            .text("Une erreur s'est produite :(");
                                    }
                                });
                                
                            }, duration * 1000);
                        },
                        "error": function (xhr) {
                            $p.text("Une erreur s'est produite :(");
                            $p.off("click");
                        }
                    });
                });
                i++;
            });*/
        
        "error": function (response) {
            
        }
    }
    $.ajax(settings);
})