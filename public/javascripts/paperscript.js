(function (window, document) {

/*////////// Global Page Variables /////////////////////////////////////////////////////*/
var thisCanvas = {
  path: null,
  h1: null,
  h2: null,
  g: null
};
var id = 0;
var open = false;





/*////////// Page Defaults /////////////////////////////////////////////////////*/
$("#library-container").hide();
$("#myCanvas").css("cursor", "url('../images/tools/select-cursor.png'), move")





/*////////// Helper Functions /////////////////////////////////////////////////////*/
var clearSelection = function(){
  thisCanvas = {
  path: null,
  h1: null,
  h2: null,
  g: null
  }
}






/*////////// Tool Definitions /////////////////////////////////////////////////////*/
var Tools = function(thisCanvas){
  //triangle tool
  this.triangleTool = new paper.Tool();
  this.triangleTool.onMouseDown = function(event){
    if(thisCanvas.h1 != null){
      console.log("clearing 1st selection");
      thisCanvas.h1.item.selected = false;
    }
    if(thisCanvas.h2 != null){
      console.log("clearing 1st & 2nd selection");
      thisCanvas.h1 = null;
      thisCanvas.h2.item.selected = false;
      thisCanvas.h2 = null;
    }
    if(thisCanvas.path.segments.length < 3){
      thisCanvas.path.add(event.point);
      if(thisCanvas.path.segments.length === 3){
        thisCanvas.path.closed = true; 
        thisCanvas.path.fillColor = 'black';
        thisCanvas.path = new Path();
        paper.tools[0].activate();

      }
    }
  };

  // Circle Tool
  this.circleTool = new paper.Tool();
  this.circleTool.onMouseUp = function(event){
    if(thisCanvas.h1 != null){
      console.log("clearing 1st selection");
      thisCanvas.h1.item.selected = false;
    }
    if(thisCanvas.h2 != null){
      console.log("clearing 1st & 2nd selection");
      thisCanvas.h1 = null;
      thisCanvas.h2.item.selected = false;
      thisCanvas.h2 = null;
    }
    p = new Path.Circle({
      center: event.middlePoint,
      radius: event.delta.length / 2
    });
    p.fillColor = 'black';
    thisCanvas.path = null;
    paper.tools[1].activate();
  };

  // Selecton Tool
  this.selectTool = new paper.Tool();
  this.selectTool.onMouseDown = function(event){
  if(thisCanvas.h1 != null){
    console.log("clearing 1st selection");
    thisCanvas.h1.item.selected = false;
  }
  if(thisCanvas.h2 != null){
    console.log("clearing 1st & 2nd selection");
    thisCanvas.h1 = null;
    thisCanvas.h2.item.selected = false;
    thisCanvas.h2 = null;
  }
    
    thisCanvas.h1 = project.hitTest(event.point);
    if(!thisCanvas.h1){
      return;
    } else {
      thisCanvas.h1.item.selected = true;
      $("#info").val(thisCanvas.h1.item.exportJSON());
      return thisCanvas.h1;
    }
  };
  this.selectTool.onMouseDrag = function(event){
      thisCanvas.h1.item.position += event.delta;
  };

  this.selectTool.onKeyDown = function(event){
    if(event.key == 'backspace' || event.key == 'delete'){
      thisCanvas.h1.item.remove();
    };
    if(event.key == 'enter'){
      thisCanvas.h1.item.selected = false;
      var duplicate = thisCanvas.h1.item.clone();
      duplicate.position.x += (duplicate.bounds.width/4);
      duplicate.position.y += (duplicate.bounds.height/4);
    };
    if(event.key == 'shift' && thisCanvas.h1 != null){
      var t2 = new paper.Tool();
      t2.onMouseDown = function(event){
        thisCanvas.h2 = project.hitTest(event.point);
        if(!thisCanvas.h2 || (thisCanvas.h1.item.id == thisCanvas.h2.item.id)){
          thisCanvas.h1.item.selected = false;
          thisCanvas.h2.item.selected = false;          
          paper.tools[2].activate();
          return;
        } else {
          thisCanvas.h2.item.selected = true;
          var intersections = (thisCanvas.h1.item).getIntersections(thisCanvas.h2.item);
          thisCanvas.g = new Group([thisCanvas.h1.item, thisCanvas.h2.item]);
          for (var i = 0; i < intersections.length; i++) {
            new Path.Circle({
              center: intersections[i].point,
              radius: 5,
              fillColor: '#009dec'
            }).removeOnDown();
          };
          paper.tools[2].activate();
          console.log("returned group: ");
          console.log(thisCanvas.g);
        };
      };
      t2.activate();
    };
  };




  // Export Tool
  this.exportTool = new paper.Tool();
  this.exportTool.onKeyDown = function(event){
    if(event.key == 'space'){
      
    };
  };

};






/*////////// Tool Handling /////////////////////////////////////////////////////*/
Tools.prototype.useTool = function(type){
  switch(type){
    case "triangle":
      thisCanvas.path = new Path();
      thisCanvas.path.fillColor = 'black';
      this.triangleTool.activate();
      break;
    case "circle":
      this.circleTool.activate();
      break;
    case "select":
      this.selectTool.activate();
      break;
    case "join":
      console.log("join clicked");
      console.log("using group: " + thisCanvas.g)
      if(thisCanvas.g != null ){
        console.log("joining")
        var joined = thisCanvas.g.children[0].unite(thisCanvas.g.children[1]);
        joined.position = thisCanvas.g.children[0].position;
        joined.fillColor = 'black';
        thisCanvas.g.remove();
        paper.tools[2].activate();
        thisCanvas.g = new Group();
      };
      paper.tools[2].activate();
      $("#myCanvas").css("cursor", "url('../images/tools/select-cursor.png'), move");
      break;
    case "subtract":
      if(thisCanvas.g != null){
        var subtracted = thisCanvas.g.children[0].subtract(thisCanvas.g.children[1]);
        subtracted.position = thisCanvas.g.children[0].position;
        subtracted.fillColor = 'black';
        thisCanvas.g.remove();
        paper.tools[2].activate();
        thisCanvas.g = new Group();
      };
      paper.tools[2].activate();
      $("#myCanvas").css("cursor", "url('../images/tools/select-cursor.png'), move");
      break;
    case "divide":
      if(thisCanvas.g != null){
        var divided = thisCanvas.g.children[0].divide(thisCanvas.g.children[1]);
        var excluded = thisCanvas.g.children[0].exclude(thisCanvas.g.children[1]);
        divided.children[1].fillColor = 'black';
        excluded.fillColor = 'black';
        excluded.position = (thisCanvas.g.children[0].position + thisCanvas.g.children[1].position)/2;
        excluded.position = (thisCanvas.g.children[0].position + thisCanvas.g.children[1].position)/2;
        thisCanvas.g.remove();
        paper.tools[2].activate();
        thisCanvas.g = new Group();
      };
      paper.tools[2].activate();
      $("#myCanvas").css("cursor", "url('../images/tools/select-cursor.png'), move");
      break;
    case "export":
      if(thisCanvas.h1 != null & thisCanvas.h2 == null){
        var svg = thisCanvas.h1.itemexportSVG({asString: false, precision: 5, matchShapes: false});
        console.log(svg);
      };
      break;
  }
};





/*////////// Interractive Controls /////////////////////////////////////////////////////*/
  
  var t = new Tools(thisCanvas);
  

  $("#triangle").click(function(e){
    $("#myCanvas").css("cursor", "url('../images/tools/triangle-cursor.png'), crosshair")
    t.useTool("triangle");
  });
  $("#circle").click(function(e){
    $("#myCanvas").css("cursor", "url('../images/tools/circle-cursor.png'), move")
    t.useTool("circle");
  });
  $("#select").click(function(e){
    $("#myCanvas").css("cursor", "url('../images/tools/select-cursor.png'), move")
    t.useTool("select");
  });
  $("#join").click(function(e){
    t.useTool('join');
  });
  $("#subtract").click(function(e){
    t.useTool('subtract');
  });
  $("#divide").click(function(e){
    t.useTool('divide');
  });
  $("#export").click(function(e){
    t.useTool('export');
  });
  $("#save").click(function(e){
   });
 $("#library").click(function(e){
  if(!open){
    $("#library-container").show();
    open = true;
  } else {
    $("#library-container").hide();
    open = false;
  }
});

 $(window).ready(function(e){
  for(var i = 0; i < sData.length; i++){
    var id = "c"+ sData[i].id;
    var pr = new Project(id)
    pr.activate();
    paper.project.activeLayer.importJSON(sData[i].info);
    paper.project.activeLayer.children[0].scale(0.5)
    paper.project.activeLayer.children[0].position.x=50;
    paper.project.activeLayer.children[0].position.y=50;
  }
  paper.projects[0].activate();
 })
  
}(this, this.document));
