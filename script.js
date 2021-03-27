let blankMap;
let coloredMap;
let provinceOutline;

let scaleFactor = 1;
let offsetX = -2000;
let offsetY = 0;

let clicked = "none";

let selectedColor;
let selectedProvince = "none";


let dragStart = [0, 0];

let provinces = [[255, 255, 255, "Dummy"]]; //Dummy is to align province id's so Stockholm is id 1
let provincesData;

let provinceNames = [];


//let regions;
let provinceToFind;
let provincesToFind = [];


let totalToFind = 0;
let correct = 0; 

let state = "select"; 


let checkboxes;


let disableClick = false;


let startButton;
let restartButton;

let selectPanel;
let panel;


function preload(){
	blankMap = loadImage("assets/images/blankProvinces.png");
   	coloredMap = loadImage("assets/images/provinces.png");
   	provinceOutline = loadImage("assets/images/provinceOutline.png");

   	provincesData = loadTable("assets/provinces.csv", "csv", "header");

   	font = loadFont("assets/ARIAL.TTF");

   	provinceNames = loadStrings("assets/prov_names.txt");
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	noStroke();

	textSize(24)
	textFont(font);

	loadProvinces();
	loadRegions();


	selectPanel = {
		x: width / 2 - 996/2,
		y: height / 2 - 700/2,
		width: 996,
		height: 700
	}

	panel = {
		x: width / 2 - 600/2,
		y: 10,
		width: 600,
		height: 175
	}

	checkboxes = { //Definitions of all checkboxes
		Europe: new Checkbox(selectPanel, 165, 80, 0, false, (self) => {
			flipGroupOfCheckboxes("Europe");
		}),

		Asia: new Checkbox(selectPanel, 365, 80, 0, false, (self) => {
			flipGroupOfCheckboxes("Asia");
		}),


		Africa: new Checkbox(selectPanel, 565, 312, 0, false, (self) => {
			flipGroupOfCheckboxes("Africa");
		}),

		America: new Checkbox(selectPanel, 765, 80, 0, false, (self) => {
			flipGroupOfCheckboxes("America");
		}),

		Oceania: new Checkbox(selectPanel, 965, 80, 0, false, (self) => {
			flipGroupOfCheckboxes("Oceania");
		}),

		scandinavia_region: new Checkbox(selectPanel, 165, 125, "Europe"),
		british_isles_region: new Checkbox(selectPanel, 165, 155, "Europe"),
		france_region: new Checkbox(selectPanel, 165, 185, "Europe"),
		iberia_region: new Checkbox(selectPanel, 165, 215, "Europe"),
		low_countries_region: new Checkbox(selectPanel, 165, 245, "Europe"),
		italy_region: new Checkbox(selectPanel, 165, 275, "Europe"),
		north_german_region: new Checkbox(selectPanel, 165, 305, "Europe"),
		south_german_region: new Checkbox(selectPanel, 165, 335, "Europe"),
		poland_region: new Checkbox(selectPanel, 165, 365, "Europe"),
		russia_region: new Checkbox(selectPanel, 165, 395, "Europe"),
		balkan_region: new Checkbox(selectPanel, 165, 425, "Europe"),
		carpathia_region: new Checkbox(selectPanel, 165, 455, "Europe"),
		baltic_region: new Checkbox(selectPanel, 165, 485, "Europe"),
		ruthenia_region: new Checkbox(selectPanel, 165, 515, "Europe"),
		crimea_region: new Checkbox(selectPanel, 165, 545, "Europe"),
		ural_region: new Checkbox(selectPanel, 165, 575, "Europe"),
		caucasia_region: new Checkbox(selectPanel, 165, 605, "Europe"),
		anatolia_region: new Checkbox(selectPanel, 165, 635, "Europe"),


		north_china_region: new Checkbox(selectPanel, 365, 125, "Asia"),
		south_china_region: new Checkbox(selectPanel, 365, 155, "Asia"),
		xinan_region: new Checkbox(selectPanel, 365, 185, "Asia"),
		bengal_region: new Checkbox(selectPanel, 365, 215, "Asia"),
		hindustan_region: new Checkbox(selectPanel, 365, 245, "Asia"),
		west_india_region: new Checkbox(selectPanel, 365, 275, "Asia"),
		deccan_region: new Checkbox(selectPanel, 365, 305, "Asia"),
		coromandel_region: new Checkbox(selectPanel, 365, 335, "Asia"),
		burma_region: new Checkbox(selectPanel, 365, 365, "Asia"),
		malaya_region: new Checkbox(selectPanel, 365, 395, "Asia"),
		moluccas_region: new Checkbox(selectPanel, 365, 425, "Asia"),
		indonesia_region: new Checkbox(selectPanel, 365, 455, "Asia"),
		indo_china_region: new Checkbox(selectPanel, 365, 485, "Asia"),
		west_siberia_region: new Checkbox(selectPanel, 365, 515, "Asia"),
		east_siberia_region: new Checkbox(selectPanel, 365, 545, "Asia"),
		mongolia_region: new Checkbox(selectPanel, 365, 575, "Asia"),
		central_asia_region: new Checkbox(selectPanel, 365, 605, "Asia"),
		tibet_region: new Checkbox(selectPanel, 365, 635, "Asia"),


		japan_region: new Checkbox(selectPanel, 565, 80, "Asia"),
		manchuria_region: new Checkbox(selectPanel, 565, 110, "Asia"),
		persia_region: new Checkbox(selectPanel, 565, 140, "Asia"),
		khorasan_region: new Checkbox(selectPanel, 565, 170, "Asia"),
		mashriq_region: new Checkbox(selectPanel, 565, 200, "Asia"),
		arabia_region: new Checkbox(selectPanel, 565, 230, "Asia"),
		korea_region: new Checkbox(selectPanel, 565, 260, "Asia"),
		egypt_region: new Checkbox(selectPanel, 565, 365, "Africa"),
		horn_of_africa_region: new Checkbox(selectPanel, 565, 395, "Africa"),
		maghreb_region: new Checkbox(selectPanel, 565, 425, "Africa"),
		niger_region: new Checkbox(selectPanel, 565, 455, "Africa"),
		guinea_region: new Checkbox(selectPanel, 565, 485, "Africa"),
		sahel_region: new Checkbox(selectPanel, 565, 515, "Africa"),
		east_africa_region: new Checkbox(selectPanel, 565, 545, "Africa"),
		kongo_region: new Checkbox(selectPanel, 565, 575, "Africa"),
		south_africa_region: new Checkbox(selectPanel, 565, 605, "Africa"),
		central_africa_region: new Checkbox(selectPanel, 565, 635, "Africa"),

		hudson_bay_region: new Checkbox(selectPanel, 765, 125, "America"),
		cascadia_region: new Checkbox(selectPanel, 765, 155, "America"),
		great_plains_region: new Checkbox(selectPanel, 765, 185, "America"),
		mississippi_region: new Checkbox(selectPanel, 765, 215, "America"),
		northeast_america_region: new Checkbox(selectPanel, 765, 245, "America"),
		southeast_america_region: new Checkbox(selectPanel, 765, 275, "America"),
		great_lakes_region: new Checkbox(selectPanel, 765, 305, "America"),
		canada_region: new Checkbox(selectPanel, 765, 335, "America"),
		central_america_region: new Checkbox(selectPanel, 765, 365, "America"),
		mexico_region: new Checkbox(selectPanel, 765, 395, "America"),
		caribbeans_region: new Checkbox(selectPanel, 765, 425, "America"),
		rio_grande_region: new Checkbox(selectPanel, 765, 455, "America"),
		california_region: new Checkbox(selectPanel, 765, 485, "America"),
		brazil_region: new Checkbox(selectPanel, 765, 515, "America"),
		colombia_region: new Checkbox(selectPanel, 765, 545, "America"),
		peru_region: new Checkbox(selectPanel, 765, 575, "America"),
		upper_peru_region: new Checkbox(selectPanel, 765, 605, "America"),
		la_plata_region: new Checkbox(selectPanel, 765, 635, "America"),

		australia_region: new Checkbox(selectPanel, 965, 125, "Oceania")
	}


	startButton = createButton("Start");
	startButton.mousePressed(startGame);
	startButton.position(selectPanel.x + 805, selectPanel.y + 590);
	startButton.style("font-size", "16px");
	startButton.style("width", "176px");
	startButton.style("height", "64px");
	startButton.style("user-select", "none");

	restartButton = createButton("Restart");
	restartButton.mousePressed(restartGame);
	restartButton.position(width / 2 - 176/2, 110);
	restartButton.style("font-size", "16px");
	restartButton.style("width", "176px");
	restartButton.style("height", "64px");
	restartButton.style("user-select", "none");
	restartButton.hide();

}

function draw() {

	clear();

	push();
	translate(offsetX, offsetY);
	scale(scaleFactor);

	image(blankMap, 0, 0)
	image(provinceOutline, 0, 0);

	pop();



	if (state == "playing")
		drawPanel();
	else if (state == "select")
		drawSelectScreen();
	

	disableClick = false;

	if (state == "playing" && focused){
		if (mouseX < 35*(width/1080))
			offsetX += 20;
		else if (mouseX > width - 35*(width/1080))
			offsetX -= 20;

		if (mouseY < 35*(width/1080))
			offsetY += 20;
		else if (mouseY > height - 35*(width/1080))
			offsetY -= 20;
	}

	clampOffset();
}

function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
   panel.x = width / 2 - panel.width / 2

   selectPanel.x = width / 2 - selectPanel.width/2;
   selectPanel.y = height / 2 - selectPanel.height/2;

   startButton.position(selectPanel.x + 805, selectPanel.y + 590);
   restartButton.position(width / 2 - 176/2, 110);
}

function mousePressed(){
	if (mouseButton === LEFT){
		if (state == "playing" && !disableClick){
			clickOnProvince();
		}else if (state == "select"){
			for (let v of Object.keys(checkboxes)){
				checkboxes[v].mousePressed();
			}
		}
	}else{
		dragStart = [mouseX, mouseY]
	}

}

function clickOnProvince(){
	if (provincesToFind.length > 0){
		//Get color of province clicked on
		coloredMap.loadPixels();

		let xScreenCoord = Math.floor(-(offsetX / scaleFactor.toFixed(1)) + (mouseX / width) / scaleFactor.toFixed(1) * width);
		let yScreenCoord = Math.floor(-(offsetY / scaleFactor.toFixed(1)) + (mouseY / height) / scaleFactor.toFixed(1) * height);

		let index = (xScreenCoord + yScreenCoord*coloredMap.width) * 4;

		selectedColor = [coloredMap.pixels[index], coloredMap.pixels[index+1], coloredMap.pixels[index+2]]

		if (selectedColor[0] == 255 && selectedColor[1] == 255 && selectedColor[2] == 255){ //Exit if not clicked on province
			return
		}


	    for (let i = 0; i < provinces.length; i++) {
	     	if (provinces[i][0] == selectedColor[0] && provinces[i][1] == selectedColor[1] && provinces[i][2] == selectedColor[2]){  // Ah yes, Javascript, where "3" == 3 
	     		selectedProvince = provinces[i][3];
	     	}
	   	}

		// Color provinces
		//print(provinces[provincesToFind[provinceToFind]]);
		//print(provincesToFind[provinceToFind]);
		//print(provincesToFind)
		//print(provinceToFind);
		let provinceToBeColored = [provinces[provincesToFind[provinceToFind]][0], provinces[provincesToFind[provinceToFind]][1], provinces[provincesToFind[provinceToFind]][2]];

		let red = 0;
		let green = 0;

		if (selectedColor[0] == provinceToBeColored[0] && selectedColor[1] == provinceToBeColored[1] && selectedColor[2] == provinceToBeColored[2]){
			green = 255;
			correct++;
		}else{
			red = 255;
		}

		blankMap.loadPixels();
		for (let y = 0; y < coloredMap.height; y++){
			for (let x = 0; x < coloredMap.width; x++){
				let pixel = y*coloredMap.width*4 + x*4;

				if (coloredMap.pixels[pixel] == provinceToBeColored[0] && coloredMap.pixels[pixel+1] == provinceToBeColored[1] && coloredMap.pixels[pixel+2] == provinceToBeColored[2]){
					blankMap.pixels[pixel] = red;
					blankMap.pixels[pixel+1] = green;
					blankMap.pixels[pixel+2] = 0;
				}
			}
		}
		blankMap.updatePixels();


		//New province to find
		provincesToFind.splice(provinceToFind, 1);
		if (provincesToFind.length > 0){
			provinceToFind = Math.floor(Math.random() * provincesToFind.length);
		}else{
			restartButton.show();
		}
	}

	//print(provinces[provincesToFind[provinceToFind]])
	//print(provincesToFind)
}

function loadProvinces(){
	for (let r = 0; r < provincesData.getRowCount(); r++){
	    for (let c = 0; c < provincesData.getColumnCount(); c++) {
	     	let splitString = split(provincesData.getString(r, c), ";");
	   	
	   		provinces.push([splitString[1], splitString[2], splitString[3], splitString[4]]);
	   	}
	}

	loadProvinceNames();
}

function loadRegions(){
	for (let region of Object.keys(regions)){ // Add every province in every area of the region
		let provs = [];
		for (let i = 0; i < regions[region].length; i++){
			if (areas[regions[region][i]] != undefined && areas[regions[region][i]].length > 0 ){
				provs = provs.concat(areas[regions[region][i]]);
			}
		}
		//print(region)
		regions[region] = provs;
	}
	//print(regions);
}

function mouseDragged(){
	if (mouseButton != LEFT && state == "playing"){

		offsetX += (mouseX - dragStart[0]);
	    offsetY += (mouseY - dragStart[1]); 
	    dragStart = [mouseX, mouseY];
	}

	clampOffset();

	return false;
}


function mouseWheel(event){
	if (state == "playing"){
		zoom(event.delta);
	}

	return false; //This disables default zoom behavior which is problematic on laptops
}

function keyPressed(){
	if (state == "playing"){
		if (keyCode == 187)
			zoom(-1);
		else if (keyCode == 189)
			zoom(1);
	}
}

function drawPanel(){
	stroke(0);
	fill(201, 204, 209);
	rect(panel.x, panel.y, panel.width, panel.height);
	fill(0, 0, 0);
	noStroke();

	color(0, 0, 0);
	textSize(24);
	text("Correct", width / 2 - textWidth("Correct") / 2 - 230, 40);
	text("Total", width / 2 - textWidth("Total") / 2 + 230, 40);
	text(correct + "/" + totalToFind, width / 2 - textWidth(correct + "/" + totalToFind)/2 - 230, 75);
	text(totalToFind - provincesToFind.length + "/" + totalToFind, width / 2 - textWidth(totalToFind - provincesToFind.length + "/" + totalToFind)/2 + 230, 75);
	
	if (provincesToFind.length > 0){
		text("Find", width / 2 - textWidth("Find") / 2, 40);
		
		textSize(38);
		text(provinces[provincesToFind[provinceToFind]][3], width / 2 - textWidth(provinces[provincesToFind[provinceToFind]][3]) / 2, 75);
		
		textSize(20);
		text("You Guessed", width / 2 - textWidth("You Guessed")/2, 130);
		text(selectedProvince, width / 2 - textWidth(selectedProvince) / 2, 158);
	}else{
		textSize(38);
		text("Well Done!", width / 2 - textWidth("Well Done!") / 2, 75);
	}
	color(1,1,1);
}

function startGame(){
	for (let v of Object.keys(checkboxes)){
		if (checkboxes[v].checked){
			if (regions[v] != undefined){
				provincesToFind = provincesToFind.concat(regions[v]);
				//print(regions[v])
			}
		}
	}

	if (provincesToFind.length == 0)
		return;
	

	provinceToFind = Math.floor(Math.random() * provincesToFind.length);
	totalToFind = provincesToFind.length;

	disableClick = true;
	startButton.hide();
	state = "playing";
	//print(provincesToFind);
}

function restartGame(){
	correct = 0;
	for (let v of Object.keys(checkboxes))
		checkboxes[v].checked = false;

	state = "select";
	startButton.show();
	restartButton.hide();

	blankMap = loadImage("assets/images/blankProvinces.png");
}


function loadProvinceNames(){
	for (let i = 0; i < provinceNames.length; i++){
		let str = provinceNames[i];
		str = str.replace("PROV", "");
		let id = str.substring(0, str.indexOf(":"));
		let name = str.substring(str.indexOf(":") + 4, str.length-1);
		provinces[id][3] = name;
	}
}


function flipGroupOfCheckboxes(group){
	for (let box of Object.keys(checkboxes)){
		if (checkboxes[box].group == group)
			checkboxes[box].checked = !checkboxes[box].checked;
	}
}

function clampOffset(){
 	if (offsetX > 200*(width/1080))
		offsetX = 200*(width/1080);
	else if (offsetX < -coloredMap.width * scaleFactor + width - 200*(width/1080))
		offsetX = -coloredMap.width * scaleFactor + width - 200*(width/1080);
	
	if (offsetY > 200*(width/1080))
		offsetY = 200*(width/1080);
	else if (offsetY < -coloredMap.height * scaleFactor + height - 200*(width/1080))
		offsetY = -coloredMap.height * scaleFactor + height - 200*(width/1080);
    
}


function zoom(delta){
	let screenCoordsBefore = [
		Math.floor(-(offsetX / scaleFactor.toFixed(5)) + (mouseX / width) / scaleFactor.toFixed(5) * width),
		Math.floor(-(offsetY / scaleFactor.toFixed(5)) + (mouseY / height) / scaleFactor.toFixed(5) * height)
	]

	scaleFactor -= Math.sign(delta) * 0.1;

	let screenCoordsAfter = [
		Math.floor(-(offsetX / scaleFactor.toFixed(5)) + (mouseX / width) / scaleFactor.toFixed(5) * width),
		Math.floor(-(offsetY / scaleFactor.toFixed(5)) + (mouseY / height) / scaleFactor.toFixed(5) * height)
	]


	// Zoom towards mouse
	if (scaleFactor >= 0.4 && scaleFactor <= 5){
		offsetX -= (screenCoordsBefore[0] - screenCoordsAfter[0]) * scaleFactor;
		offsetY -= (screenCoordsBefore[1] - screenCoordsAfter[1]) * scaleFactor;
	}


	if (scaleFactor <= 0.4)
		scaleFactor = 0.4;
	else if (scaleFactor >= 5)
		scaleFactor = 5;
	

	if (scaleFactor >= 1.5) 
		noSmooth();
	else
		smooth();
}



function drawSelectScreen(){

	stroke(0);
	fill(201, 204, 209);
	rect(selectPanel.x, selectPanel.y, selectPanel.width, selectPanel.height);
	fill(0, 0, 0);
	noStroke();


	//Text
	textSize(36);
	text("Select Regions", selectPanel.x + selectPanel.width/2 - textWidth("Select Regions") / 2, selectPanel.y + 50);;

	text("Europe", selectPanel.x + 15, selectPanel.y + 100);
	text("Asia", selectPanel.x + 220, selectPanel.y + 100);
	text("Africa", selectPanel.x + 405, selectPanel.y + 330);
	text("America", selectPanel.x + 600, selectPanel.y + 100);
	text("Oceania", selectPanel.x + 805, selectPanel.y + 100);

	textSize(20);
	text("Scandinavia", selectPanel.x + 15, selectPanel.y + 140);
	text("British Isles", selectPanel.x + 15, selectPanel.y + 170);
	text("France", selectPanel.x + 15, selectPanel.y + 200);
	text("Iberia", selectPanel.x + 15, selectPanel.y + 230);
	text("Lowlands", selectPanel.x + 15, selectPanel.y + 260);
	text("Italy", selectPanel.x + 15, selectPanel.y + 290);
	text("North Germany", selectPanel.x + 15, selectPanel.y + 320);
	text("South Germany", selectPanel.x + 15, selectPanel.y + 350);
	text("Poland", selectPanel.x + 15, selectPanel.y + 380);
	text("Russia", selectPanel.x + 15, selectPanel.y + 410);
	text("Balkans", selectPanel.x + 15, selectPanel.y + 440);
	text("Carpathia", selectPanel.x + 15, selectPanel.y + 470);
	text("Baltics", selectPanel.x + 15, selectPanel.y + 500);
	text("Ruthenia", selectPanel.x + 15, selectPanel.y + 530);
	text("Crimea", selectPanel.x + 15, selectPanel.y + 560);
	text("Uralia", selectPanel.x + 15, selectPanel.y + 590);
	text("Caucasia", selectPanel.x + 15, selectPanel.y + 620);
	text("Turkey", selectPanel.x + 15, selectPanel.y + 650);

	text("North China", selectPanel.x + 210, selectPanel.y + 140);
	text("South China", selectPanel.x + 210, selectPanel.y + 170);
	text("Xinan", selectPanel.x + 210, selectPanel.y + 200);
	text("Bengal", selectPanel.x + 210, selectPanel.y + 230);
	text("Hindustan", selectPanel.x + 210, selectPanel.y + 260);
	text("West India", selectPanel.x + 210, selectPanel.y + 290);
	text("Deccan", selectPanel.x + 210, selectPanel.y + 320);
	text("Coromandel", selectPanel.x + 210, selectPanel.y + 350);
	text("Burma", selectPanel.x + 210, selectPanel.y + 380);
	text("Malaya", selectPanel.x + 210, selectPanel.y + 410);
	text("Moluccas", selectPanel.x + 210, selectPanel.y + 440);
	text("Indonesia", selectPanel.x + 210, selectPanel.y + 470);
	text("Indochina", selectPanel.x + 210, selectPanel.y + 500);
	text("West Siberia", selectPanel.x + 210, selectPanel.y + 530);
	text("East Siberia", selectPanel.x + 210, selectPanel.y + 560);
	text("Mongolia", selectPanel.x + 210, selectPanel.y + 590);
	text("Central China", selectPanel.x + 210, selectPanel.y + 620);
	text("Tibet", selectPanel.x + 210, selectPanel.y + 650);

	text("Japan", selectPanel.x + 405, selectPanel.y + 100);
	text("Manchuria", selectPanel.x + 405, selectPanel.y + 130);
	text("Persia", selectPanel.x + 405, selectPanel.y + 160);
	text("Khorasan", selectPanel.x + 405, selectPanel.y + 190);
	text("Mashriq", selectPanel.x + 405, selectPanel.y + 220);
	text("Arabia", selectPanel.x + 405, selectPanel.y + 250);
	text("Korea", selectPanel.x + 405, selectPanel.y + 280);
	text("Egypt", selectPanel.x + 405, selectPanel.y + 380);
	text("Horn of Africa", selectPanel.x + 405, selectPanel.y + 410);
	text("Maghreb", selectPanel.x + 405, selectPanel.y + 440);
	text("Niger", selectPanel.x + 405, selectPanel.y + 470);
	text("Guinea", selectPanel.x + 405, selectPanel.y + 500);
	text("Sahel", selectPanel.x + 405, selectPanel.y + 530);
	text("East Africa", selectPanel.x + 405, selectPanel.y + 560);
	text("Kongo", selectPanel.x + 405, selectPanel.y + 590);
	text("South Africa", selectPanel.x + 405, selectPanel.y + 620);
	text("Central Africa", selectPanel.x + 405, selectPanel.y + 650);


	text("Hudson Bay", selectPanel.x + 600, selectPanel.y + 140);
	text("Cascadia", selectPanel.x + 600, selectPanel.y + 170);
	text("Great Plains", selectPanel.x + 600, selectPanel.y + 200);
	text("Mississippi", selectPanel.x + 600, selectPanel.y + 230);
	text("North East", selectPanel.x + 600, selectPanel.y + 260);
	text("South East", selectPanel.x + 600, selectPanel.y + 290);
	text("Great Lakes", selectPanel.x + 600, selectPanel.y + 320);
	text("Canada", selectPanel.x + 600, selectPanel.y + 350);
	text("Central America", selectPanel.x + 600, selectPanel.y + 380);
	text("Mexico", selectPanel.x + 600, selectPanel.y + 410);
	text("Caribbeans", selectPanel.x + 600, selectPanel.y + 440);
	text("Rio Grande", selectPanel.x + 600, selectPanel.y + 470);
	text("California", selectPanel.x + 600, selectPanel.y + 500);
	text("Brazil", selectPanel.x + 600, selectPanel.y + 530);
	text("Colombia", selectPanel.x + 600, selectPanel.y + 560);
	text("Peru", selectPanel.x + 600, selectPanel.y + 590);
	text("Upper Peru", selectPanel.x + 600, selectPanel.y + 620);
	text("La Plata", selectPanel.x + 600, selectPanel.y + 650);

	text("Australia", selectPanel.x + 805, selectPanel.y + 140);

	fill(255,255,255);

	for (let v of Object.keys(checkboxes))
		checkboxes[v].draw();

	textSize(24);
}