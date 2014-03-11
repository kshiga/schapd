(function (window, document) {
    var layout   = document.getElementById('layout'),
        menu     = document.getElementById('menu'),
        menuLink = document.getElementById('menuLink'),
        canvas = document.getElementById('canvas'),
        windowWidth = window.innerWidth,
        windowHeight = window.innerHeight,
        canvasX = 0,
        canvasY = 0,
        cursorX = 0,
        cursorY = 0,
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
        console.log("canvas x: " + canvasX + "\n canvas y: " + canvasY);
    })

    $("#canvas").mousemove(function(e){
        var offsetX = 0,
            offsetY = 0;
            
        offsetX = canvas.offsetLeft - canvas.scrollLeft;
        offsetY = canvas.offsetTop - canvas.scrollTop;

        cursorX = e.pageX - offsetX;
        cursorY = e.pageY - offsetY;
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
              return;
              console.log("burn the sacrificial lamb");
            }
        });
    })

    $("#circle").click(function(){
        var center = [],
            radius = 0,
            dragging = false;
        $("#canvas").mousedown(function(){
            dragging = true;
            center = [canvasX, canvasY];
            console.log("center x: "+ center[0] + "\n center y: " + center[1]);
            $("#canvas").mousemove(function(){
                if((cursorX != center[0]) || (cursorY != center[1])){
                   radius = Draw.getRadius(cursorX, cursorY, center); 
                   console.log("center x: "+ center[0] + "\n center y: " + center[1]);
                   console.log("cursor x: " + canvasX + "\n cursor y: " + canvasY);
                   console.log("radius: " + radius);
            //       Draw.trackCircle(renderingContext, center, radius);
                 }   
            })
            
        })
        $("#canvas").mouseup(function(){
            dragging = false;
            //Draw.completeCircle();
        })
    })



}(this, this.document));
