$(function() {
    $("#go").click(function() {
        var url = $("#url").val()
        $.get(url, function(data) {
            console.log(data)
        })
    })

});

