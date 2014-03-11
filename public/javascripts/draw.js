(function (window, document) {
    var layout = document.getElementById('layout'),
        menu = document.getElementById('menu'),
        menuLink = document.getElementById('menuLink'),
        canvas = document.getElementById('canvas'),
        windowWidth = window.innerWidth,
        windowHeight = window.innerHeight,
        canvasX,
        canvasY,
        cursorX = 0,
        cursorY = 0,
        canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        getXY;

    getXY = function(){
      $("#canvas").mousemove(function(e){
        var offsetX = 0,
            offsetY = 0;
            
        offsetX = canvas.offsetLeft - canvas.scrollLeft;
        offsetY = canvas.offsetTop - canvas.scrollTop;

        canvasX = e.pageX - offsetX;
        canvasY = e.pageY - offsetY;

        return {
            cX: canvasX, 
            cY: canvasY
        }

      })
    }

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

    
    $("#triangle").click(function(){
        var vertices = [],
            count = 3;
        $("#canvas").click(function(){
            if(count > 0){
              getXY();
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

    // $("#circle").click(function(){
    //     var center = [],
    //         completed = false;
    //         radius = 0;
    //         getXY();
    //     $("#canvas").mousedown(function(){
    //         console.log("mousedown!");
    //         center = [canvasX, canvasY];            
    //          $("#canvas").mousemove(function(){
    //              if(((cursorX != center[0]) || (cursorY != center[1])) && !completed){
    //                 console.log(completed + "(should be false)");
    //                 console.log("mdcenter x: "+ center[0] + "\n mdcenter y: " + center[1]);
    //                 radius = Draw.getRadius(cursorX, cursorY, center); 
    //                 console.log("mdradius: " + radius);
    //         //        Draw.trackCircle(renderingContext, center, radius);
    //               }   
    //          })    
    //     });
    //     $("#canvas").mouseup(function(){
    //         Draw.drawCircle(renderingContext, center, radius);
    //         console.log("mouseup!");  
    //         completed = true;
    //     });
    // });



}(this, this.document));
