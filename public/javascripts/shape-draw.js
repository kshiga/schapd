var Draw = {
  triangle: function(context, vertices){
        context.beginPath();
        context.moveTo(vertices[0], vertices[1]);
        for(i = 2; i < vertices.length; i+=2){
          console.log(vertices[i]+", "+vertices[i+1])
          context.lineTo(vertices[i], vertices[i+1]);
          context.stroke();
        }
        context.closePath();
        context.fill();

    },

  getRadius: function(x, y, center){
    var distance = 0,
        xval = Math.pow((x - center[0]), 2),
        yval = Math.pow((y - center[1]), 2);

    distance = Math.sqrt( yval + xval);

    return distance;
  },

  trackCircle: function(context, center, radius){
    context.save();
    context.beginPath();
    context.arc(center[0], center[1], radius, 0, 2*Math.PI);
    context.stroke();
    context.restore();
  },

  drawCircle: function(context, center, radius){
    context.restore();
    context.beginPath();
    context.arc(center[0], center[1], radius, 0, 2*Math.PI);
    context.fill();
  }


}