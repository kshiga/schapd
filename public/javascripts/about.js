var count = 0;
$(function() {
  

  $('#punch').click(function(e){
    switch(count){
      case 0:
        $('html, body').animate({scrollTop: $("#Schāpd-basics").offset().top}, 500);
        count++;
        break;
      case 1:
        $('html, body').animate({scrollTop: $("#Schāpd-Technologies").offset().top}, 500);
        count++;
        break;
      case 2:
        $('html, body').animate({scrollTop: $("#Schāpd-goals").offset().top}, 500);
        count++;
        break;
      case 3:
        $('html, body').animate({scrollTop: $("#Schāpd-influences").offset().top}, 500);
        count++;
        break;
      case 4:
        $('html, body').animate({scrollTop: $("#Schāpd-itself").offset().top}, 500);
        count++;
        break;
      case 5:
        $('html, body').animate({scrollTop: $("#Schāpd-Challenges").offset().top}, 500);
        count++;
        break;
      case 6:
        $('html, body').animate({scrollTop: $("#Schāpd-Follow").offset().top}, 500);
        count++;
        break;
      case 7:
        $('html, body').animate({scrollTop: $("#Schāpd-Questions").offset().top}, 500);
        count++;
        break;
      case 8:
        $('html, body').animate({scrollTop: $(".content-container").offset().top}, 500);
        count = 0;
        break;
    
    }
  })
});