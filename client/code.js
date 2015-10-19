// jobschemacheck

$(function() {
    $("#go").click(function() {
        var url = $("#url").val()
        var certify_url = "https://jobschemacert.herokuapp.com/validate/?url=" + encodeURIComponent(url)
        $.get(certify_url, function(data) {
            console.log(data)
            if (data.valid) {
                $("#passed").show()
                $("#failed").hide()
            } else {
                $("#failed").show()
                $("#passed").hide()
            }
        })
    })

});

