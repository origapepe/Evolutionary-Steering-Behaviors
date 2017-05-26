function Vehicle(x, y, type, dna){
	this.pos = Vector.init(x,y);
	this.vel = Pepe.Vector.random2D();
	this.acc = Vector.init();

	this.life = 1;
	this.type = type;
	this.dna = dna === undefined?new DNA():dna;
	this.id = this.dna.genes[4];
	this.r = 10;

	this.maxS = 5;
	this.maxF = 0.5;


	this.reproducing = false;
	this.partner = null;
	this.mid = null;
	this.name = names[floor(random(names.length))];
};

Vehicle.prototype.applyForce = function(f){
	this.acc.add(f);
};

Vehicle.prototype.update = function(){
	if(this.reproducing){
		if(this.partner !== null){
			var mid = findMid(this.pos, this.partner.pos);
			this.mid = mid;
			this.partner.mid = mid;

			this.arrive(this.mid);
			this.partner.arrive(this.partner.mid);
		}
	}

	this.edges();

	this.vel.add(this.acc);
	this.vel.limit(this.maxS);
	this.pos.add(this.vel);
	this.acc.mult(0);

	this.life -= 0.001;
	this.life = clamp(this.life,0,1);
	
	if(random(1) < 0.0005){
		this.vel = Pepe.Vector.random2D();
	}
};

Vehicle.prototype.show = function() {
	save();
	
	ctx.translate(this.pos.x,this.pos.y);
	ctx.rotate(this.vel.getAngle());
	
	if(show){
		ctx.lineWidth = 1;
		stroke(0,255,0);
		fill(0,255,0);
		line(0,0,this.dna.genes[0]*20,0);
		arc(0,0,this.dna.genes[2], true);
		stroke(255,0,0);
		fill(255,0,0);
		line(0,0,this.dna.genes[1]*20,0);
		arc(0,0,this.dna.genes[3], true);
	}

	
	ctx.lineWidth = 1;
	if(this.type === 'm'){
	   fill(0,0,255);
	   stroke(0,0,255);
	}else if(this.type === 'f'){
	   fill(255,0,255);
	   stroke(255,0,255);
	};

	line(0,0,20,-7);
	line(0,0,20,7);

	var rg = parseInt(this.life*255);
	stroke(255-rg,rg,0);
	ctx.lineWidth = 2;
	tri(0,0,this.r,this.r*2, true);

	arc(0,0,4);
	
	restore();
	
	if(this.reproducing){
	 	if(this.partner !== null){
	 		ctx.lineWidth = 3;
	 		stroke(255);
	 		fill(100,0,200,0.7);
	 		line(this.pos.x, this.pos.y, this.partner.pos.x, this.partner.pos.y);
	 		arc(this.partner.pos.x, this.partner.pos.y, 10);
		}
	}
};

Vehicle.prototype.run = function(){
	this.update();
	this.show();
};

Vehicle.prototype.eat = function(list, nut, perception){
	var bestDSq = Infinity;
	var best = null;

	for(var i = list.length-1; i >= 0; i--){
		var dSq = distSq(this.pos, list[i]);

		if(dSq < this.maxS*this.maxS){
			list.splice(i,1);
			this.life += nut;
		}

		if(dSq < bestDSq && dSq < perception*perception){
			bestDSq = dSq;
			best = list[i];
		}
	}

	if(best !== null && best !== undefined){
		return this.seek(best);
	}

	return def;
};

Vehicle.prototype.behaviors = function(good, bad){
	if(!this.reproducing){
		var steerG = this.eat(good, 0.2, this.dna.genes[2]);
		var steerB = this.eat(bad, -0.5, this.dna.genes[2]);

		steerG.mult(this.dna.genes[0]);
		steerB.mult(this.dna.genes[1]);

		this.applyForce(steerG);
		this.applyForce(steerB);
	}
};

Vehicle.prototype.reproduce = function(boy, girl){
	var t, dna;
	var child = null;
	if(random(1) < 0.0002){
		if(!this.reproducing){
			var pType = swampType(this.type);
			
				if(pType === 'f'){
					if(girl.length >= 1){
						var index = floor(random(girl.length));
						this.partner = girl[index];
					}
				}else{
					if(boy.length >= 1){
						var index = floor(random(boy.length));
						this.partner = boy[index];
					}
				}
				if(this.partner !== null){
					this.partner.partner = this;
				}
			if(!this.partner.reproducing){
			
				this.reproducing = true;
				this.partner.reproducing = true;
			
				if(this.life > 0.75){//  3/4
					if(this.partner.life > 0.75){//  3/4
						dna = this.dna.crossover(this.partner.dna);
						dna.mutate(0.01);
					}
				}
			}
		}
	}

	if(this.partner !== null){
		if(distSq(this.pos, this.partner.pos) <= 9){
			child = new Vehicle(this.pos.x,this.pos.y, findType(), dna);

			if(child !== null){
				add(child,child.type,boy,girl);
			}

			this.reproducing = false;
			this.partner.reproducing = false;

			this.vel.norm();
			this.partner.vel.norm();

			this.partner.partner = null;
			this.partner = null;
		}
	}
};

Vehicle.prototype.dead = function(list){
	return this.life <= 0;
};

Vehicle.prototype.seek = function(target){
	var des = Pepe.Vector.sub(target,this.pos);
	des.setMag(this.maxS);
	var steer = Pepe.Vector.sub(des, this.vel);
	steer.limit(this.maxF);

	return steer;
};

Vehicle.prototype.arrive = function(target){
	var des = Pepe.Vector.sub(target,this.pos);
	var d = des.getMag();
	var mag = this.maxS;

	if(d < 100){
		mag = utils.map(d,0,100,1,this.maxS);
	}

	des.setMag(mag);
	var steer = Pepe.Vector.sub(des, this.vel);
	steer.limit(this.maxF);

	//return steer;
	this.applyForce(steer);
};

Vehicle.prototype.edges = function(target){
	var off = 20;
	if(this.pos.x < 0 - off){
		this.pos.x = width;
	}if(this.pos.x > width + off){
		this.pos.x = 0;
	}if(this.pos.y < 0 - off){
		this.pos.y = height;
	}if(this.pos.y > height + off){
		this.pos.y = 0;
	}
};









function tri(x,y,b,h,s){
	var b = b || 7;
	var h = h || 10;

	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(y-h,x+b/2);
	ctx.lineTo(y-h,x-b/2);
	ctx.closePath();
	if(s){
		ctx.stroke();
	}else{
		ctx.fill();
	}
};
