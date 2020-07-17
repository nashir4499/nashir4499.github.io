$(document).ready(function () {
    $('.klik_menu').click(function () {
        var menu = $(this).attr('id');
        if (menu == "home") {
            $('.cardkiri').load('home.html');
        } else if (menu == "tentang") {
            $('.cardkiri').load('tentang.php');
        } else if (menu == "tutorial") {
            $('.cardkiri').load('tutorial.php');
        } else if (menu == "sosmed") {
            $('.cardkiri').load('sosmed.php');
        }
    });


    // halaman yang di load default pertama kali
    $('.cardkiri').load('home.php');
});