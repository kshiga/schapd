var Tools = {

    triangle: function(x1, y1, x2, y2, x3, y3){
        var leftmost = Math.min(x1, x2, x3),
            topmost = Math.min(y1, y2, y3);
        return {
            type: "triangle", 
            vertices: [[x1, y1], [x2, y2], [x3, y3]],
            edges: [[],[],[]],
            xmin: leftmost,
            ymin: topmost
        }
    },

    circle: function(cx, cy, r){
        var leftmost = cx - r,
            topmost = cy - r;
        return {
            type: "circle",
            center: [cx, cy],
            radius: r,
            xmin: leftmost,
            ymin: topmost
        };
    },

    compound: function (verticesArray, edgetypeArray) {
        var xvertices = [],
            yvertices = [],
            leftmost,
            topmost;

        for(i = 0; i < verticesArray.length; i++){
            xvertices.push(verticesArray[i][0]);
            yvertices.push(verticesArray[i][1]);
        };

        xvertices.sort();
        yvertices.sort();
        leftmost = xvertices[0];
        topmost = yvertices[0];

        return {
            type: "compound",
            vertices: verticesArray,
            edges: edgetypeArray,
            xmin: leftmost,
            ymin: topmost
        };

    },

    intersection: function(edge1, edge2){
        

    },

    clip: function(shape1, shape2){

    },
    divide: function(shape1, shape2){

    },
    join: function(shape1, shape2){

    },
    move: function(shape, dx, dy){
        if(shape.type = "circle"){
            shape.center[0] = shape.center[0] + dx;
            shape.center[1] = shape.center[1] + dy;
            return shape;
        } else {
            for(i = 0; i < vertices.length; i++){
                if(i % 2 === 0){
                    shape.vertices[i] = shape.vertices[i] + dx;
                } else {
                    shape.vertices[i] = shape.vertices[i] + dy;
                }
            }
            for(i = 0; i < edges.length; i++){
                var edge = edges[i]
                if(edge.length !== 0){
                    edge[0] = edge[0] + dx;
                    edge[1] = edge[1] + dy;
                }
            }
            return shape;
        };
    },

    add: function(shapesArray, shape){
        shapesArray.push(shape);
        return shapesArray;
    },

    select: function(shapesArray, index){
        var shape = shapesArray[index];
        return shape;
    },

    remove: function(shapesArray, shape){
        var index = shapesArray.indexOf(shape);
        if(index > -1){
            shapesArray.splice(index, 1);
        }
    },
    cursor: function(e){
        
    }
}

module.exports = Tools