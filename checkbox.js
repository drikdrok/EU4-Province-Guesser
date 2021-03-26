class Checkbox {
	constructor(parent, x, y, group, checked, update){
		this.parent = parent;

		this.x = x;
		this.y =  y;

		this.group = group || "None";

		//this.setPosition(selectX, selectY);

		this.width = 16;
		this.height = 16;
	
		this.checked = checked || false;

		this.update = update || function(){};
	}

	draw(){
		stroke(30);


		rect(this.parent.x + this.x, this.parent.y + this.y, this.width, this.height);

		strokeWeight(3);
		if (this.checked){
			line(this.parent.x + this.x + 3, this.parent.y + this.y + 8, this.parent.x + this.x + 7, this.parent.y + this.y + 12);
			line(this.parent.x + this.x + 7, this.parent.y + this.y + 12, this.parent.x + this.x + 13, this.parent.y + this.y + 3);
		}

		strokeWeight(1);
		
		noStroke();
	}

	mousePressed(){
		let x = this.parent.x + this.x;
		let y = this.parent.y + this.y;
		if (mouseX >= x && mouseX <= x + this.width && mouseY >= y && mouseY <= y + this.height){
			this.checked = !this.checked;
			this.update(this);
		}
	}

	setChecked(c){
		this.checked = c;
	}
}