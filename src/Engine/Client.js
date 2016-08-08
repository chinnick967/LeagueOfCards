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

// check if user is logged in
$( document ).ready(function() {
    if (!loginInfo.username) {
        window.location = "http://lol.cards/LeagueOfCards/create-account/";
    } else {
        document.getElementById('username').innerHTML = "";
        $("#username").append("Welcome, " + loginInfo.username);
    }
});

function message(text) {
    document.getElementById('text').innerHTML = '';
    $('#text').append(text);

    document.getElementById('cover').style.display = 'block';
    $('#message').slideDown();
}

function closemessage() {
    document.getElementById('message').style.display = 'none';
    document.getElementById('cover').style.display = 'none';
}

$('#exit').click(function(){
    closemessage();
});

$('#packstab').click(function(){
    message('This feature is not quite available. It will be phased in later in the beta.');
});

$('#decktab').click(function(){
    message('This feature is not quite available. It will be phased in later in the beta.');
});

$('#tradetab').click(function(){
    message('This feature is not quite available. It will be phased in later in the beta.');
});

$('#getdaily').click(function(){
    message('This feature is not quite available. It will be phased in later in the beta.');
});

$('#getip').click(function(){
    message('This feature is not quite available. It will be phased in later in the beta.');
});

$('#closebutton').click(function(){
    location.reload();
});