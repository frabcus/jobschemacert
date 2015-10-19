// jobschemacheck

$(function() {
    var doit = function() {
        $('#go').attr('disabled','disabled').text("Loading...")
        var url = $("#url").val()
        var certify_url = "https://jobschemacert.herokuapp.com/validate/?url=" + encodeURIComponent(url)
        $.get(certify_url, function(data) {
            console.log(data)
            if (data.valid) {
                $("#passed").show()
                $("#failed").hide()
                $("#error").hide()
            } else {
                $("#failed").show()
                $("#passed").hide()
                $("#error").hide()
            }
        }).always(function() {
            $('#go').removeAttr('disabled').text("Certify the job advert")
        }).fail(function() {
            $("#failed").hide()
            $("#passed").hide()
            $("#error").show()
        });
    }

    $("#go").click(doit)
    $("#url").keyup(function (e) {
        if (e.keyCode == 13) {
            doit();
        }
    });

});

