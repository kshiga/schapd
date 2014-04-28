var thisCanvas = {
  path: null,
  h1: null,
  h2: null,
  g: null
};


var Tools = function(){
  this.triangleTool = new paper.Tool();
  this.triangleTool.onMouseDown = function(event){
    if(thisCanvas.path.segments.length < 3){
      thisCanvas.path.add(event.point);
    }
    thisCanvas.path.closed = true;
  };

  this.regularTriangleTool = new paper.Tool();
  this.regularTriangleTool.onMouseUp = function(event, p){
    p = new Path.Circle({
      center: event.middlePoint,
      radius: event.delta.length / 2
    });
    p.fillColor = 'black';
  };

  this.circleTool = new paper.Tool();
  this.circleTool.onMouseUp = function(event, p){
    p = new Path.Circle({
      center: event.middlePoint,
      radius: event.delta.length / 2
    });
    p.fillColor = 'black';
  };

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
    if(event.key = 'enter'){
      console.log(thisCanvas.g)
      if(thisCanvas.g != null){
        var joined = thisCanvas.g.children[0].unite(thisCanvas.g.children[1]);
        joined.position = thisCanvas.g.children[0].position;
        joined.fillColor = 'black';

      };
    };
  };

  this.subtractTool = new paper.Tool();
  this.divideTool = new paper.Tool();
};


Tools.prototype.useTool = function(type){
  switch(type){
    case "triangle":
      var t = new Path();
      this.triangleTool.activate();
      break;
    case "regularTriangle":
      this.regularTriangleTool.activate();
      break;
    case "circle":
      this.circleTool.activate();
      break;
    case "select":
      this.selectTool.activate();
      console.log(paper.tool);
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
  }
};





(function (window, document) {
 var t = new Tools();
  
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
  })


}(this, this.document));