var cData = function(){
  this.shapeArray = [];
  this.owner = '';
  this.created = new Date(year, month, day, hours, minutes, seconds, milliseconds);
}

var placeTriangleVertices = function(tool, event, vertices, path){

  if(event.shiftKey){
    console.log("shift key");
    tool.onMouseUp = function(event) {
      path = new Path.Circle({
        center: event.middlePoint,
        radius: event.delta.length / 2
      });
    obj.fillColor = 'black';
    }
  }

  tool.onMouseDown = function(event){
    console.log("vertices: " + vertices);
    if(vertices.length < 3){
      path.add(event.point);
      vertices.push(event.point);
      console.log("length: " + vertices.length);
      
    } else if(vertices.length === 3){
      var tnew = new Triangle();
      tnew.drawTriangle();
    } 
  }
};

var regularTriangle = function(tool, event, path){
  tool.onMouseUp = function(event) {
    path = new Path.Circle({
    center: event.middlePoint,
    radius: event.delta.length / 2
  });
    obj.fillColor = 'black';
  }
};

var placeCircle = function(tool, event, path){
  if(event.shiftKey){
    console.log("shift key");
   }
  tool.onMouseUp = function(event) {
    path = new Path.Circle({
    center: event.middlePoint,
    radius: event.delta.length / 2
   });
    path.fillColor = 'black';
  }
};

var select = function(tool, event, options){
  var path;
  var items = [];
  var movePath = false;
  var activeGroup = null;
  tool.onMouseDown = function(event, options){
    path = null;
    var hitResult = project.hitTest(event.point, options);
    if(!hitResult){
      return;
    }

    if(hitResult){
      path = hitResult.item;

      if (event.modifiers.shift) {
        var lastItem = items.pop();
        var intersections = path.getIntersections(lastItem);
        activeGroup = new Group([lastItem, path])

        for (var i = 0; i < intersections.length; i++) {
          new Path.Circle({
            center: intersections[i].point,
            radius: 5,
            fillColor: '#009dec'
          }).removeOnDown();
        }
        items.push(lastItem);
      } 
      if(activeGroup){
        $(window).keypress(function(e){
          if(e.which == 100){
            var joined = lastItem.unite(path);

            console.log("joined: " + joined);
           }
        });
        
      }
      items.push(path);

    }
    return items;
    
    movePath = hitResult.type == 'fill';
    if (movePath){
      project.activeLayer.addChild(hitResult.item);
     }
  }
  tool.onMouseDrag = function(event) {
  
    path.position += event.delta;
  
  }
};

var Triangle = function(){
  this.path = new Path();
  this.path.fillColor = 'black';
  this.vertices = [];
  this.cursor = new paper.Tool();
  this.cursor.activate();
};

Triangle.prototype.drawTriangle = function(){

  var vertices = [];
  placeTriangleVertices(tool, event, vertices, this.path);
  this.path.closed = true;
  return vertices;
};

var Circle = function(){
  this.path = new Path();
  this.cursor = new paper.Tool();
  this.cursor.activate();
};

Circle.prototype.drawCircle = function(){
  placeCircle(this.cursor, event, this.path);
  return this;
};


var Selection = function(){
  this.items = [];
  this.cursor = new paper.Tool();
  this.cursor.activate();
};

Selection.prototype.getSelection = function(){
  var hitOptions = {
    segments: true,
    stroke: true,
    fill: true,
    tolerance: 5
  };

 this.items = select(this.cursor, event, hitOptions, this.items);
};


$("#triangle").click(function(){
  var t = new Triangle();
  t.drawTriangle();
});

$("#circle").click(function(){
  var c = new Circle();
  c.drawCircle();
});
  
$("#select").click(function(){
  console.log("selection tool");
  var s = new Selection();
  s.getSelection();
});

