$(document).ready(function(){
    $('#headerWrap #titleBox #title').click(function(){
      window.location.href="../html/home.html";
    });
    $('#headerWrap #titleBox #loginLetter').click(function(){
        window.location.href="../html/login.html";
    });
    $('#headerWrap #titleBox #joinLetter').click(function(){
        window.location.href="../html/join.html";
    });
    $('#footerWrap #facebookIcon').click(function(){
        window.open("https://facebook.com");
    });
    $('#footerWrap #twitterIcon').click(function(){
        window.open("https://twitter.com");
    });
    $('#footerWrap #instagramIcon').click(function(){
        window.open("https://instagram.com");
    });
});