(function(){
    function CanvasHistory(){
        this.log = [];
        this.index = -1;
        this.isCurrent = true;
    };
    CanvasHistory.prototype.log = function(action){
        if(this.isCurrent){
            this.log.push(action);
        } else {
            this.log.splice(this.index, this.log.length - 1, action);
        }
    };
    CanvasHistory.prototype.undo = function(){
        this.index --;
        this.isCurrent = this.index == this.log.length;
    };
    CanvasHistory.prototype.redo = function(){
        if(!this.isCurrent){
            this.index++;
            this.isCurrent = this.index == this.log.length;    
        }
    };
    function ShapeLibrary(loadedShapes){
      this.list = loadedShapes;
    };
    ShapeLibrary.prototype.saveShape = function(shape){
        
    };
    ShapeLibrary.prototype.getShape = function(shapeID){
        
    };
    ShapeLibaray.prototype.deleteShape = function(shapeID){
        
    };
    function Canvas() {
        this.tool = "selectTool";
        this.history = new CanvasHistory();
        this.canvas = new paper.Project('myCanvas');
        this.shapeLibrary = new ShapeLibrary();
        this.activeShape = "";
    };
    Canvas.prototype.setTool = function(tool){
        this.tool = tool;
        tool.activate();
    };
    Canvas.prototype.setActive = function(shape){
        this.activeShape = shape;
    };
    function Triangle(){
        this.path = new Path({
            selected: true,
            strokeColor:'red'
        });
    };
    Triangle.prototype.setVertex = function(point){
        if(this.path.segments.length < 3){
            this.path.add(point);
            if(this.path.segments.length == 3){
                this.path.fillColor = 'black';
                this.path.closed = true;
            }
        }
        return this.path.closed;
    }
    Triangle.prototype.removeVertex = function(){
        if(this.path.segments.length){
            this.path.removeSegment(this.path.segments.length - 1);
            this.path.closed = false;    
            if(!this.path.segments.length){
                this.path.remove();
            }
        } 
    }
    function Circle(center, radius){
        this.path  = new Shape.Circle(center, radius);
    };
    
   var artboard = new Canvas();
   var triangleTool = new paper.Tool({
       onMouseUp: function(event){
           var t = artboard.activeShape != "" ? artboard.activeShape : new Triangle();
           var complete =  t.setVertex(event.point);
           var newActive = complete ? "" : t;
           artboard.history.log({action:'setVertex',object:t.path});
           artboard.setActive(newActive);
       }
   });
   var circleTool = new paper.Tool({
       onMouseUp: function(event){
           var c = new Circle(event.middlePoint, event.delta.length / 2);
           artboard.history.log({action:'drawCircle', object:c.path});
           artboard.setActive("");
       }
   });
   var selectTool = new paper.Tool({
      onMouseDown: function(event){
       if(event.item)
          if(!event.shiftKey){
              artboard.canvas.deselectAll();
          } 
          event.item.selected = true;
          artboard.history.log({action:'select', object: event.item});
       }
      },
      onMouseDrag: function(event){
          var previous = event.item.position;
          event.item.position += event.delta;
          artboard.history.log({action:'select', object:event.item, previous: previous});
      },
      onKeyDown: function(event){
          if(event.key == 'backspace' || event.key == 'delete'){
              artboard.canvas.selectedItems.map(function(item){
                  artboard.history.log({action:'remove', object:item});
                  item.remove();
              });
              
          } else if (event.key == 'enter'){
              artboard.canvas.selectedItems.map(function(item){
                  var duplicate = item.clone();
                  duplicate.position.x += (duplicate.bounds.width/4);
                  duplicate.position.y += (duplicate.bounds.height/4);
                  artboard.history.log({action:'duplicate', object: duplicate});
              });
          }
      }
   });
   
   
   
}());
