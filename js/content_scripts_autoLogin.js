$(document).ready(function() {
    var num = 1;
    $("input").each(function() {
        if ($(this).is(":visible")) {

            if (num == 1) {
                $(this).val('login__');
                $(this).attr('style','background-color: #ff9999;');
            }
            else if (num == 2) {
                $(this).val('pass__');
                $(this).attr('style','background-color: #ff9999;');
            }
            num++;

        }
    });
});


