// jobschemacheck

$(function() {
    $("#go").click(function() {
        $('#go').attr('disabled','disabled').text("Loading...")
        var url = $("#url").val()
        var certify_url = "https://jobschemacert.herokuapp.com/validate/?url=" + encodeURIComponent(url)
        $.get(certify_url, function(data) {
            $('#go').removeAttr('disabled').text("Certify the job advert")
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

