(function (window, document) {
var thisCanvas = {
  path: null,
  h1: null,
  h2: null,
  g: null
};

var clearSelection = function(){
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
}


var Tools = function(thisCanvas){
  this.triangleTool = new paper.Tool();
  this.triangleTool.onMouseDown = function(event){
    if(thisCanvas.path.segments.length < 3){
      thisCanvas.path.add(event.point);
      if(thisCanvas.path.segments.length === 3){
        thisCanvas.path.closed = true; 
      }
    }
  };

  this.regularTriangleTool = new paper.Tool();
  this.regularTriangleTool.onMouseUp = function(event){
    p = new Path.Circle({
      center: event.middlePoint,
      radius: event.delta.length / 2
    });
    p.fillColor = 'black';
  };

  this.circleTool = new paper.Tool();
  this.circleTool.onMouseUp = function(event){
    p = new Path.Circle({
      center: event.middlePoint,
      radius: event.delta.length / 2
    });
    p.fillColor = 'black';
  };

  this.selectTool = new paper.Tool();
  this.selectTool.onMouseDown = function(event){
    
    thisCanvas.h1 = project.hitTest(event.point);
    if(!thisCanvas.h1){
      return;
    } else {
      thisCanvas.h1.item.selected = true;

      $("#info").val(thisCanvas.h1.item.exportJSON({asString:true}));
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
          paper.tools[3].activate();
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
          paper.tools[3].activate();
          console.log(thisCanvas.g);
          return thisCanvas.g;
        };
      };
      t2.activate();
    };
  };

  this.joinTool = new paper.Tool();
  this.joinTool.onKeyDown = function(event){
    if(event.key == 'enter'){
      if(thisCanvas.g != null){
        var joined = thisCanvas.g.children[0].unite(thisCanvas.g.children[1]);
        joined.position = thisCanvas.g.children[0].position;
        joined.fillColor = 'black';
        thisCanvas.g.remove();
        paper.tools[3].activate();
      };
    };
  };

  this.subtractTool = new paper.Tool();
  this.subtractTool.onKeyDown = function(event){
    if(event.key == 'enter'){
      if(thisCanvas.g != null){
        var subtracted = thisCanvas.g.children[0].subtract(thisCanvas.g.children[1]);
        subtracted.position = thisCanvas.g.children[0].position;
        subtracted.fillColor = 'black';
        thisCanvas.g.remove();
        paper.tools[3].activate();
      };
    };
  };
  this.divideTool = new paper.Tool();
  this.divideTool.onKeyDown = function(event){
    if(event.key == 'enter'){
      if(thisCanvas.g != null){
        var divided = thisCanvas.g.children[0].divide(thisCanvas.g.children[1]);
        var excluded = thisCanvas.g.children[0].exclude(thisCanvas.g.children[1]);
        divided.children[1].fillColor = 'black';
        excluded.fillColor = 'black';
        excluded.position = (thisCanvas.g.children[0].position + thisCanvas.g.children[1].position)/2;
        excluded.position = (thisCanvas.g.children[0].position + thisCanvas.g.children[1].position)/2;
        thisCanvas.g.remove();
        paper.tools[3].activate();
      };
    };
  };

  this.exportTool = new paper.Tool();
  this.exportTool.onKeyDown = function(event){
    if(event.key == 'space'){
      if(thisCanvas.h1 != null & thisCanvas.h2 == null){
        var svg = thisCanvas.h1.itemexportSVG({asString: false, precision: 5, matchShapes: false});
        console.log(svg);
      };
    };
  };

  this.saveTool = new paper.Tool();
  this.libraryTool = new paper.Tool();
};


Tools.prototype.useTool = function(type){
  switch(type){
    case "triangle":
      clearSelection();
      thisCanvas.path = new Path();
      thisCanvas.path.fillColor = 'black';
      this.triangleTool.activate();
      break;
    case "regularTriangle":
      this.regularTriangleTool.activate();
      break;
    case "circle":
      clearSelection();
      this.circleTool.activate();
      break;
    case "select":
      clearSelection();
      thisCanvas.h1 = null;
      thisCanvas.h2 = null;
      thisCanvas.g = null;
      this.selectTool.activate();
      break;
    case "join":
      this.joinTool.activate();
      break;
    case "subtract":
      this.subtractTool.activate();
      break;
    case "divide":
      this.divideTool.activate();
      break;
    case "export":
      this.exportTool.activate();
    case "library":
       this.libraryTool.activate();
  }
};

  var id = 0;
  var t = new Tools(thisCanvas);
  $("#library-container").hide();
  var open = false;
  
  $("#triangle").click(function(e){
    t.useTool("triangle");
  });
  $("#circle").click(function(e){
    t.useTool("circle");
  });
  $("#select").click(function(e){
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
  $("#save").click(function(e){ });

 $("#library").click(function(e){
    if(!open){
      $("#library-container").show();
      open = true;
    } else {
      $("#library-container").hide();
      open = false;
    }
  });

  
  
}(this, this.document));
