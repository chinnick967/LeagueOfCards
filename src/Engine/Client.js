$("#proceed").click(function(){
    document.getElementById('WelcomeContainer').style.display = 'none';
    //$('#WelcomeContainer').slideUp();
});

var tutorial_current = 0;
var tutarray = [];

// load tutorial images
for (var i = 0; i < 10; i++) {
    tutarray[i] = 'Assets/Tutorial/' + (i + 1) + '.jpg';
}


function changetutorialimage(movement) {
    tutorial_current += movement;

    $('#tutorial').fadeOut('slow', function() {
        $(this).attr("src", tutarray[tutorial_current]);
        $('#tutorial').fadeIn('slow');

        if (tutorial_current != 0) {
            document.getElementById('arrow-left').style.display = 'block';
        } else {
            document.getElementById('arrow-left').style.display = 'none';
        }

        if (tutorial_current != 9) {
            document.getElementById('arrow-right').style.display = 'block';
        } else {
            document.getElementById('arrow-right').style.display = 'none';
        }
    });
}

$("#arrow-right").click(function(){
    changetutorialimage(1);
});

$("#arrow-left").click(function(){
    changetutorialimage(-1);
});

$.get("http://ipinfo.io", function(response) {
    if (response.country != 'US') {
        document.getElementById('vegas').style.display = 'block';
    }
}, "jsonp");