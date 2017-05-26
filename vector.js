var Vector = {
	x: 0,
	y: 0,

	init: function(x,y){
		var obj = Object.create(this);
		obj.set(x||0,y||0);

		return obj;
	},

	set: function(x,y){
		this.x = x;
		this.y = y;
	},

	add: function(vec){
		this.x += vec.x;
		this.y += vec.y;
	},

	sub: function(vec){
		this.x -= vec.x;
		this.y -= vec.y;
	},

	mult: function(n){
		this.x *= n;
		this.y *= n;
	},

	div: function(n){
		this.x /= n;
		this.y /= n;
	},

	getAngle: function(){
		return Math.atan2(this.y,this.x);
	},

	setAngle: function(a){
		var len = this.getMag();

		this.x = Math.cos(a)*len;
		this.y = Math.sin(a)*len;
	},

	getMag: function(){
		var vx = this.x;
		var vy = this.y;
		return Math.sqrt((vx*vx)+(vy*vy));
	},

	getMagSq: function(){
		var vx = this.x;
		var vy = this.y;
		return (vx*vx)+(vy*vy);
	},

	setMag: function(len){
		this.norm();
		this.mult(len);
	},

	copy: function(){
		return Vector.init(this.x,this.y);
	},

	limit: function(max){
		var mSq = this.getMagSq();

		if(mSq > max*max) {
		    this.setMag(max);
		}
	},

	norm: function(){
		if(this.getMag() !== 0){
			this.div(this.getMag());
		}
	}
}

var p = Pepe || {};

p.Vector = {};

p.Vector.add = function(vec,vec1){
	var x = vec.x+vec1.x;
	var y = vec.y+vec1.y;

	return Vector.init(x,y);
};

p.Vector.sub = function(v1,v2,target){
	if (!target) {
		target = v1.copy();
	} else {
		target.set(v1);
	}
	target.sub(v2);
	return target;
};

p.Vector.mult = function(vec,vec1){
	var x = vec.x*vec1.x;
	var y = vec.y*vec1.y;

	return Vector.init(x,y);
};

p.Vector.div = function(vec,vec1){
	var x = vec.x/vec1.x;
	var y = vec.y/vec1.y;

	return Vector.init(x,y);
};

p.Vector.fromAngle = function(a){
	var x = Math.cos(a);
	var y = Math.sin(a)
	
	return Vector.init(x,y);
};

p.Vector.random2D = function(){
	var v = Pepe.Vector.fromAngle(random(TWO_PI));

	return v;
};
