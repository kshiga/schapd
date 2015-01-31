/* smooth scrolling for scroll to top */
$('.scroll-top').click(function(){
  $('html, body').animate({scrollTop: $("#header-container").offset().top},1500);
})