(function(window, document){
    function CanvasHistory(){
        this.histlog = [];
        this.index = -1;
        this.isCurrent = true;
    };
    CanvasHistory.prototype.logaction = function(action){
        if(this.isCurrent){
            this.histlog.push(action);
        } else {
            this.histlog.splice(this.index, this.histlog.length - 1, action);
        }
        this.isCurrent = this.index == this.histlog.length; 
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
    CanvasHistory.prototype.previousAction = function(){
      return this.histlog[this.histlog.length-1]["action"];
    }
    function ShapeLibrary(loadedShapes){
      this.list = loadedShapes;
    };
    ShapeLibrary.prototype.saveShape = function(shape){
        
    };
    ShapeLibrary.prototype.getShape = function(shapeID){
        
    };
    ShapeLibrary.prototype.deleteShape = function(shapeID){
        
    };
    function Canvas() {
        this.tool = "selectTool";
        this.canvashistory = new CanvasHistory();
        this.canvas =  paper.project;
        this.shapeLibrary = new ShapeLibrary();
        this.activeShape = "";
        this.canvas.activate();
    };
    Canvas.prototype.setTool = function(tool){
        this.tool = tool;
        tools[tool].activate();
    };
    Canvas.prototype.setActive = function(shape){
        this.activeShape = shape;
    };
    function Triangle(){

        this.path = new Path({
            selected: true,
            strokeColor:'black',
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
        this.path  = new Path.Circle(center, radius);
        this.path.fillColor = 'black';
        this.path.selected = true;
    };
    
   var artboard = new Canvas();
   var triangleTool = new paper.Tool({
       onMouseUp: function(event){
           var t = artboard.activeShape;
           if(artboard.activeShape == ""){
            artboard.canvas.deselectAll();
            t = new Triangle();
            
           }
           var complete =  t.setVertex(event.point);
           var newActive = complete ? "" : t;
           artboard.canvashistory.logaction({action:'setVertex',object:t.path});
           artboard.setActive(newActive);
       }
   });
  var circleTool = new paper.Tool({
       onMouseUp: function(event){
           artboard.canvas.deselectAll();
           var c = new Circle(event.middlePoint, event.delta.length / 2);
           artboard.canvashistory.logaction({action:'drawCircle', object:c.path});
           artboard.setActive("");
       }
  });
  var selectTool = new paper.Tool({
      onMouseDown: function(event){
       if(event.item){
          //event.item.selected = true;
          artboard.canvashistory.logaction({action:'select', object: event.item});
       } 
      },
      onMouseUp:function(event){
        if(event.item){
          if(artboard.canvashistory.previousAction() == "move"){
            return true;
          }
          if(event.event.shiftKey){
            event.item.selected = !event.item.selected;
          } else {
            artboard.canvas.deselectAll();
            event.item.selected = true;
          }
        } else {
          artboard.canvas.deselectAll();
        }
          
      },
      onMouseDrag: function(event){
        $.each(artboard.canvas.selectedItems, function(index, value){
          value.position += event.delta;
        });
         artboard.canvashistory.logaction({action:'move'});
      },
      onKeyDown: function(event){
          if(event.key == 'backspace' || event.key == 'delete'){
              event.event.preventDefault();
              artboard.canvas.selectedItems.map(function(item){
                  artboard.canvashistory.logaction({action:'remove', object:item});
                  item.remove();
              });
              
          } else if (event.key == 'enter'){
              artboard.canvas.selectedItems.map(function(item){
                  var duplicate = item.clone();
                  duplicate.position.x += (duplicate.bounds.width/4);
                  duplicate.position.y += (duplicate.bounds.height/4);
                  artboard.canvashistory.logaction({action:'duplicate', object: duplicate});
              });
          }
      }
  });
  var tools = {"circleTool": circleTool, "triangleTool":triangleTool, "selectTool":selectTool};
  var manipulate = {
    join: function(){
      var g = [].concat(artboard.canvas.selectedItems);
      var len = g.length;
      var result = artboard.canvas.selectedItems[0];
      var position = artboard.canvas.selectedItems[0].position
      for(var i = 1; i < len; i++){
        result = result.unite(g[i]);
      }
      g.map(function(path){console.log(path); path.remove();});
      result.position = position;
      result.selected = true;
    },
    subtract: function(){
      var len = artboard.canvas.selectedItems.length;
      var subtracting = artboard.canvas.selectedItems[len-1];
      var from = artboard.canvas.selectedItems[len-2];
      var result = from.subtract(subtracting);
      result.position = from.position;
      result.fillColor = "black";
      from.remove();
      subtracting.remove();
      artboard.canvas.deselectAll();
      result.selected = true;
    },
    divide: function(){
      var len = artboard.canvas.selectedItems.length;
      var d2 = artboard.canvas.selectedItems[len-1];
      var d1 = artboard.canvas.selectedItems[len-2];
      var position = (d1.position + d2.position)/2;
      var divided = d1.divide(d2);
      var excluded = d1.exclude(d2);
      divided.children[1].fillColor = 'black';
      excluded.fillColor = 'black';
      divided.position = position;
      excluded.position = position;
      d1.remove();
      d2.remove();
      artboard.canvas.deselectAll();
      result.selected = true;
    }
  }

  $('.schapd-tool').click(function(){
    var tool = $(this).attr('id');
    $('.schapd-tool.active').removeClass('active')
    $(this).addClass('active');
    artboard.setTool(tool);
  });
  $('.schapd-manipulate').click(function(){
    var action = $(this).attr('id');
    manipulate[action]();
  });
}(this, this.document));
