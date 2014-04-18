var placeTriangleVertices = function(tool, event, vertices, path){

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

var placeCircle = function(tool, event, obj){

  tool.onMouseUp = function(event) {
    obj = new Path.Circle({
    center: event.middlePoint,
    radius: event.delta.length / 2
  });
    obj.fillColor = 'black';
  }

}



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





$("#triangle").click(function(){
  var t = new Triangle();
  t.drawTriangle();
});




$("#circle").click(function(){
  var c = new Circle();
  c.drawCircle();
});
  


