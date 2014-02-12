var Draw = {
  triangle: function(context, vertices){
        context.beginPath();
        context.moveTo(vertices[0], vertices[1]);
        for(i = 2; i < vertices.length; i+=2){
          context.lineTo(vertices[i], vertices[i+1]);
          context.stroke();
        }
        context.closePath();
        context.fill();

    }
}