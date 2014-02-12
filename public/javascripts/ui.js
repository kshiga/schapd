(function (window, document) {
    var layout   = document.getElementById('layout'),
        menu     = document.getElementById('menu'),
        menuLink = document.getElementById('menuLink'),
        canvas = document.getElementById('canvas'),
        windowWidth = window.innerWidth,
        windowHeight = window.innerHeight,
        canvasX = 0,
        canvasY = 0,
        canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d");

    canvas.width = windowWidth;
    canvas.height = windowHeight;


    toggleClass = function(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for(; i < length; i++) {
          if (classes[i] === className) {
            classes.splice(i, 1);
            break;
          }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }

    $("#menuLink").click(function(e){
        var active = 'active';

        e.preventDefault();
        toggleClass(layout, active);
        toggleClass(menu, active);
        toggleClass(menuLink, active);
    })

    $(window).resize(function(){
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;

        canvas.width = windowWidth;
        canvas.height = windowHeight;

        console.log( "canvas width: " + canvas.width + "\n canvas height: " + canvas.height);
    })

    $("#canvas").click(function(e){
        var offsetX = 0,
            offsetY = 0;
            
         offsetX = canvas.offsetLeft - canvas.scrollLeft;
         offsetY = canvas.offsetTop - canvas.scrollTop;

         canvasX = e.pageX - offsetX;
         canvasY = e.pageY - offsetY;
    })
    
    $("#triangle").click(function(){
        var vertices = [],
            count = 3;
        $("#canvas").click(function(){
            if(count > 0){
              vertices.push(canvasX);
              vertices.push(canvasY);
              Draw.triangle(renderingContext, vertices);
              count--;
            } else {
              vertices = 0;
              count = 3;
            }
        });
    });



}(this, this.document));
