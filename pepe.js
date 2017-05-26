var Pepe = {};

var mouseX;
var mouseY;

const PI = Math.PI;
const TWO_PI = PI*2;

random = function (min, max) {

  var rand = Math.random();

  if (typeof min === 'undefined') {
    return rand;
  } else
  if (typeof max === 'undefined') {
    if (min instanceof Array) {
      return min[Math.floor(rand * min.length)];
    } else {
      return rand * min;
    }
  } else {
    if (min > max) {
      var tmp = min;
      min = max;
      max = tmp;
    }

    return rand * (max-min) + min;
  }
};

function Text(text, x, y, size, font){
	if(size){
		var si = String(size) + 'px';
		ctx.font = si + ' Arial';
		if(font){
			ctx.font = si + ' ' + font;
		}

		ctx.font = si + ' Arial';
	}
	ctx.fillText(text, x, y);
}

function arc(x, y, r,stroke){
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI*2, false);
	if(stroke){
		ctx.stroke();
	}else{
		ctx.fill();
	}
}

function dot(x, y){
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x+1, y+1);
	ctx.stroke();
}

function line(x, y, x1, y1){
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x1, y1);
	ctx.stroke();
}

function rect(x,y,w,h,stroke){
	if(stroke){
		ctx.strokeRect(x, y, w, h);
	}else{
		ctx.fillRect(x, y, w, h);
	}
}

function fill(r,g,b,a){
	if(typeof r === 'string'){
		ctx.fillStyle = r;
	}
	if(!a){
		ctx.fillStyle = 'rgb('+r+','+g+','+b+')';
	}
	if(arguments.length == 1){
		ctx.fillStyle = 'rgb('+r+','+r+','+r+')';
	}
	if(arguments.length == 2){
		ctx.fillStyle = 'rgba('+r+','+r+','+r+','+g+')';
	}else{
		ctx.fillStyle = 'rgba('+r+','+g+','+b+','+a+')';
	}
}

function color(r,g,b,a){
	if(arguments.length == 1){
		return 'rgb('+r+','+r+','+r+')';
	}else if(arguments.length == 2){
		return 'rgba('+r+','+r+','+r+','+g+')';
	}
	if(b){
		return 'rgb('+r+','+g+','+b+')';
	}
	if(a){
		return 'rgba('+r+','+g+','+b+','+a+')';
	}
}

function stroke(r,g,b,a){
	if(typeof r === 'string'){
		ctx.strokeStyle = r;
	}
	if(!a){
		ctx.strokeStyle = 'rgb('+r+','+g+','+b+')';
	}
	if(arguments.length == 1){
		ctx.strokeStyle = 'rgb('+r+','+r+','+r+')';
	}
	if(arguments.length == 2){
		ctx.strokeStyle = 'rgba('+r+','+r+','+r+','+g+')';
	}else{
		ctx.strokeStyle = 'rgba('+r+','+g+','+b+','+a+')';
	}
}

document.onmousemove = function(e){
	mouseX = e.clientX;
	mouseY = e.clientY;
}

function save(){
	ctx.save();
};

function restore(){
	ctx.restore();
};

function sin(a){
	return Math.sin(a);
};

function cos(a){
	return Math.cos(a);
};

function floor(a){
	return Math.floor(a);
};

function round(a){
	return Math.round(a);
};

function min(a){
	return Math.min(a);
};

function max(a){
	return Math.max(a);
};

function abs(a){
	return Math.abs(a);
};

function sqrt(a){
	return Math.sqrt(a);
};

function pow(num,esp){
	return Math.pow(num,esp);
};


function sqr(a){
	return a * a;
};

function factorial(n){
	if(n == 1){
		return 1;
	}else{
		return n * factorial(n - 1);
	}
};

function decimal(n, dec){
	var num = n;
	return num.toFixed(dec);

};

function constrain(n, low, high) {
  return max(min(n, high), low);
};

function clamp(val,min, max){
	if(val == 0){
		return 0;
	}else if(val <= min){
		return val = min;
	}else if(val >= max){
		return val = max;
	}else{
		return val;
	}
}

function lerp(value1, value2, amount) {
    var amount = amount < 0 ? 0 : amount;
    var amount = amount > 1 ? 1 : amount;

    return value1 + (value2 - value1) * amount;
}
