var chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    Tools = require('../public/javascripts/tools.js')

describe('shape creation', function(){
    it('should create the triangle shape', function(){
        var t1 = Tools.triangle(11, 23, 7, 45, 15, 30),
            v1 = [[11,23],[7,45],[15,30]],
            e1 = [[], [], []];
        t1.type.should.equal("triangle");
        t1.xmin.should.equal(7);
        t1.ymin.should.equal(23);
        t1.vertices.length.should.equal(3);
        t1.edges.length.should.equal(3);
    });
    it('should create the circle shape', function(){
        var c1 = Tools.circle(28, 34, 10);

        c1.type.should.equal("circle");
        c1.xmin.should.equal(18);
        c1.ymin.should.equal(24);
        c1.center[0].should.equal(28);
        c1.center[1].should.equal(34);
    });

    it('should create the compound shape', function(){
        var v1 = [[20, 50], [20, 20], [50, 20], [50, 50]],
            e1 = [[], [], [35, 35, 10], []],
            s1;
        s1 = Tools.compound(v1, e1);

        s1.type.should.equal("compound");
        s1.vertices.length.should.equal(4);
        s1.edges.length.should.equal(4);
    });
});

describe('shape manipulation', function(){ 
    var shapeArray = [],
        s1 = Tools.triangle(15, 24, 84, 35, 63, 24);
    it('should add the shape', function(){
        Tools.add(shapeArray, s1);

        shapeArray.length.should.equal(1);
        shapeArray[0].type.should.equal("triangle");
    });

    it('should delete the shape', function(){
        Tools.remove(shapeArray, s1);

        shapeArray.length.should.equal(0);
    });
    
    it('should move the shape', function(){});
    it('should select the shape', function(){});
    it('should deselect the shape', function(){});
    it('should select 2 shapes', function(){});
    it('should clip 2 shapes', function(){});
    it('should join 2 shapes', function(){});
    it('should divide the 2 shapes', function(){});
});


