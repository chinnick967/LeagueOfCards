$("#proceed").click(function(){
    $('#WelcomeContainer').fadeOut();
});

var tutorial_current = 0;
var tutarray = ['Assets/Tutorial/1.jpg', 'Assets/Tutorial/2.jpg', 'Assets/Tutorial/3.jpg', 'Assets/Tutorial/4.jpg', 'Assets/Tutorial/5.jpg', 'Assets/Tutorial/6.jpg', 'Assets/Tutorial/7.jpg', 'Assets/Tutorial/8.jpg', 'Assets/Tutorial/9.jpg', 'Assets/Tutorial/10.jpg'];

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