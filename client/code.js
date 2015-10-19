// jobschemacheck

$(function() {
    $("#go").click(function() {
        var url = $("#url").val()
        var certify_url = "https://jobschemacert.herokuapp.com/?url=" + encodeURIComponent(url)
        $.get(certify_url, function(data) {
            console.log(data)
            var obj = JSON.parse(data)
            if (obj.valid) {
                $("#passed").show()
                $("#failed").hide()
            } else {
                $("#failed").show()
                $("#passed").hide()
            }
        })
    })

});

