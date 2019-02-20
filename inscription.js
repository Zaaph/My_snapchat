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
    var cookies = document.cookie.split(";");
    console.log(cookies);
    $("#register").click(function (e) {
        e.preventDefault();
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.snapchat.wac.epitech.eu/inscription",
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                email: escapeHtml(document.getElementById("email").value),
                password: escapeHtml(document.getElementById("password").value)
            }),
            "success": function () {
                $("#confirm").html("Votre compte a bien été créé!");
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

 