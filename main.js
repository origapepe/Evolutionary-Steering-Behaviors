var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	width = canvas.width = window.innerWidth,
	height = canvas.height = window.innerHeight,
	stop = false;

var def;

var food,poison;
var vehicles;
var m, f;
var info, show;

setup();
draw();

function setup(){
	console.log('ready');

	info = document.getElementById("info");
	show = false;

	def = Vector.init();

	vehicles = [];
	m = [];
	f = [];

	food = [];
	poison = [];

	for(var i = 0; i < 70; i++){
		var t = findType();
		var v = new Vehicle(random(width), random(height),t);

		add(v,t,m,f);
	}

	for(var i = 0; i < 260; i++){
		food.push(Vector.init(random(width), random(height)));
	}

	for(var i = 0; i < 120; i++){
		poison.push(Vector.init(random(width), random(height)));
	}
};

function draw(){
	ctx.clearRect(0,0,width,height);

	for(var i = vehicles.length-1; i >= 0; i--){
		var v = vehicles[i];
		v.behaviors(food, poison);
		v.reproduce(m,f);
		v.run();

		if(v.dead()){
			var id = v.id;
			if(v.type === 'm'){
				for(var j = m.length-1; j >= 0 ; j--){
					if(id === m[j].id){
						m.splice(j,1);
					}
				}
			}else{
				for(var j = f.length-1; j >= 0 ; j--){
					if(id === f[j].id){
						f.splice(j,1);
					}
				}
			}
			food.push(Vector.init(vehicles[i].pos.x,vehicles[i].pos.y));
			vehicles.splice(i,1);
		}
	}

	for(var i = food.length-1; i >= 0; i--){
		fill(0,255,0);
		arc(food[i].x,food[i].y,2);
	}

	for(var i = poison.length-1; i >= 0; i--){
		fill(255,0,0);
		arc(poison[i].x,poison[i].y,2);
	}

	if(food.length < 260){
		if(random(1) < 0.05){
			food.push(Vector.init(random(width),random(height)));
		}
	}

	if(poison.length < 120){
		if(random(1) < 0.005){
			poison.push(Vector.init(random(width),random(height)));
		}
	}

	if(vehicles.length <= 0){
		for(var i = 0; i < 70; i++){
			var t = findType();
			var v = new Vehicle(random(width), random(height),t);

			add(v,t,m,f);
		}
	}

	if(!stop){
		requestAnimationFrame(draw);
	};
};

if(stop){
	cancelAnimationFrame(draw);
};

function findMid(a,b){
	var x, y;

	x = (a.x+b.x)/2;
	y = (a.y+b.y)/2;
	return Vector.init(x,y);
};

function findType(){
	var c = floor(random(2));
	var t = c === 0? 'm':'f';

	return t;
}

function swampType(t){
	var type = t === 'm'? 'f':'m';

	return type;
}

function add(elt, type, boy, girl){
	if(type === 'm'){
		boy.push(elt);
	}else{
		girl.push(elt);
	}

	vehicles.push(elt);
}

function remove(index, t, boy, girl){
	if(t === 'm'){
		boy.splice(index,1);
	}else{
		girl.splice(index,1);
	}

	vehicles.splice(index, 1);
}

info.addEventListener("change", function(e){
	show = !show;
})
