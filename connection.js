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
    if (document.cookie !== "") {
        window.location.replace("home.html");
    }
    $("#connection").click(function (e) {
        e.preventDefault();
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.snapchat.wac.epitech.eu/connection",
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                email: escapeHtml(document.getElementById("email").value),
                password: escapeHtml(document.getElementById("password").value)
            }),
            "success": function (response) {
                var now = new Date();
                var time = now.getTime();
                time += 3600 * 1000;
                now.setTime(time);
                var cookie_str = "token=" + response["data"]["token"];
                cookie_str += "; expires=" + now.toUTCString();
                document.cookie = cookie_str;
                window.location.replace("home.html")
            },
            "error": function (xhr) {
                var str = "Une erreur s'est produite : " +
                    xhr.responseText.substr(9, xhr.responseText.length - 12);
                $("#confirm").html(str);
            }
        }
        $.ajax(settings);
    });
});