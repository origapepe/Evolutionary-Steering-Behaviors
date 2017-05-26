var utils = {
    norm:function(val,min,max){
        return (value-min)/(max-min);
    },

    lerp:function(norm,min,max){
        return (max-min)*norm+min;
    },

    map: function(n, start1, stop1, start2, stop2) {
        return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
    },

    clamp:function(val,min,max){
        return Math.min(Math.max(val,Math.min(min,max)),Math.max(min,max));
    },

    dist:function(x,y,x1,y1){
        if(x1 !== undefined && y1 !== undefined){
            var dx = x1-x;
            var dy = y1-y;
            return Math.sqrt((dx*dx)+(dy*dy));
        }else{
            var dx = y.x-x.x;
            var dy = y.y-x.y;
            return Math.sqrt((dx*dx)+(dy*dy));
        }
    },

    cirCir: function(c,c1){
        var r, r1;

        if(c.hasOwnProprety('r') || 
           c.hasOwnProprety('radius') ||
           c.hasOwnProprety('rad') && 
           c1.hasOwnProprety('r') || 
           c1.hasOwnProprety('radius') ||
           c1.hasOwnProprety('rad')){
            r = c.r || c.rad || c.radius;
            r1 = c1.r || c1.rad || c1.radius;

            return this.dist(c,c1) <= (r+r1);
        }
    },

    cirPoint: function(c,p){
        var r;

        if(c.hasOwnProprety('r') || 
           c.hasOwnProprety('radius') ||
           c.hasOwnProprety('rad')){
            r = c.r || c.rad || c.radius;

            return this.dist(c,p) <= r;
        }
    }
}

















function dist(entity,entity1){
	var dx = entity1.x - entity.x;
	var dy = entity1.y - entity.y;

	return Math.sqrt((dx*dx) + (dy*dy));
}

function distSq(entity,entity1){
    var dx = entity1.x - entity.x;
    var dy = entity1.y - entity.y;

    return (dx*dx) + (dy*dy);
}

function distRectCircle(rect,circle){
    var distX = Math.abs(circle.x - rect.x-rect.w/2);
    var distY = Math.abs(circle.y - rect.y-rect.h/2);

    if (distX > (rect.w/2 + circle.r)) { return false; }
    if (distY > (rect.h/2 + circle.r)) { return false; }

    if (distX <= (rect.w/2)) { return true; } 
    if (distY <= (rect.h/2)) { return true; }

    var dx = distX-rect.w/2;
    var dy = distY-rect.h/2;
    return (dx*dx+dy*dy <= (circle.r*circle.r));
}

distRectRect = function (entity1,entity2){       //return if colliding (true/false)
    var rect1 = {
        x:entity1.x-entity1.w/2,
        y:entity1.y-entity1.h/2,
        width:entity1.w,
        height:entity1.h,
    }
    var rect2 = {
        x:entity2.x-entity2.w/2,
        y:entity2.y-entity2.h/2,
        width:entity2.w,
        height:entity2.h,
    }
    
    return testCollisionRectRect(rect1,rect2);      
}

testCollisionRectRect = function(rect1,rect2){
    return rect1.x <= rect2.x+rect2.width
           && rect2.x <= rect1.x+rect1.width
           && rect1.y <= rect2.y + rect2.height
           && rect2.y <= rect1.y + rect1.height;
}
