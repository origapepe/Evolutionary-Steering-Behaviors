function DNA(genes){
	if(genes){
		this.genes = genes;
	}else{
		this.genes = [];

		this.genes[0] = random(-5,5);
		this.genes[1] = random(-5,5);

		this.genes[2] = random(3,50);
		this.genes[3] = random(3,50);

		this.genes[4] = floor(random(100000000));
	}
};

DNA.prototype.crossover = function(partner){
	var newdna = [];
	for(var i = 0; i < this.genes.length-1; i++){
		if(mid()){
			newdna[i] = this.genes[i];
		}else{
			newdna[i] = partner.genes[i];
		}
	}

	newdna[4] = floor(random(100000000));

	return new DNA(newdna);
};

DNA.prototype.mutate = function(mRate){
	for(var i = 0; i < this.genes.length-1; i++){
		if(mid()){
			if(i <= 1){
				this.genes[i] = random(-5,5);
			}else{
				this.genes[i] = random(5,100);
			}

		}
	}
};

function mid(){
	return random(1) < 0.5;
}
