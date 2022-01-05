let canvasWidth = 900;
let canvasHeight = 480;

let myCanvas;  // Canvas Object 

// Let Pipe Objects
let SpeedofGame = 60   // Value uptop 100
let counterModulus = 101 - SpeedofGame;
let counter = 0;
let pipes = [];
let DISPLACEMENTSPEED = 8;
let SPACING = 125;

let MAINCANVAS;

// Game Objects 
let slider;
let GameStarted = false;
let MUTATIONRATE = 0.05;


// Bird properties
let birdSize = 32;
let birdArray = [];
let SelectedBirdArray = [];
let TOTAL = 200;


let BirdBrain ;
let input;
let SCORE = 0;
let birdBrainLoaded = false;
let ipfile ;
let defaultBrain ;


function pauseSimulation() {
	noLoop();
}

function resumeSimulation() {
	loop();
}
function resetSimulation() {
	birdArray = [];
}

function startSimulation() {

	if(birdBrainLoaded)
	{
		let newBrain  = birdArray[0].brain.loadFromJSON(BirdBrain);
		birdArray[0].brain = newBrain;
		console.log("New brain Loaded")
		loop();
	}
	
	else
	alert("please load the brain.json file")
}


function startSimulationDefault()
{
	let newBrain  = birdArray[0].brain.loadFromJSON(defaultBrain[0]);
	birdArray[0].brain = newBrain;
	console.log("New brain Loaded");
	loop();
}

function saveJsonFile() {
	let bird = birdArray[0];
	saveJSON(bird.brain, 'my.json');
}

function handleFile(file) {
	ipfile = file;
	print(file);
	console.log(file.data);
	if (file.type === 'application'  && file.subtype ==='json') {
		BirdBrain = file.data;
		birdBrainLoaded =  true;
	} else {
		BirdBrain = null;
		alert("Upload only one file ( JSON File ) ")
	}
  }

function setup() {
	myCanvas = createCanvas(canvasWidth, canvasHeight);


	input = createFileInput(handleFile);
	MAINCANVAS.parent("Canvas");

	slider = createSlider(1, 10, 1);
	slider.parent("slider");

	input.parent("upload");
	myCanvas.background(153, 197, 242);
	pipes.push(new Pipe());  // Default pipe at start

	birdArray.push(new Bird());
	
	noLoop();

}

function draw() {

	// Repeat the process n times to increase the speed of the game 
	for (let n = 0; n < slider.value(); n++) {
		if (counter > counterModulus) {
			pipes.push(new Pipe());
			counter = 0;
		}
		counter++;
		//Draw pipes and remove them once the pipe leaves the window
		for (let i = pipes.length - 1; i >= 0; i--) {
			pipes[i].update();

			// Check fof hitting osf Birds in Pipes
			for (let j = 0; j < birdArray.length; j++) {
				if (pipes[i].hits(birdArray[j]))  // Remove that Bird from population and add to prev population
				{
					gameOver();
					noLoop();

					SelectedBirdArray.push(birdArray.slice(j, j + 1)[0])
					birdArray.splice(j, 1);
				}
			}

			if (pipes[i].offscreen()) {
				pipes.splice(i, 1);
			}

		}

		// Check if Bird goes out of Scope
		for (let i = 0; i < birdArray.length; i++) {
			if (birdArray[i].offScreen()) {
				SelectedBirdArray.push(birdArray.slice(i, i + 1)[0])
				birdArray.splice(i, 1);
			}
		}

		birdArray[0].think(pipes);
		birdArray[0].update();


		if (birdArray.length == 0) {
			if (SelectedBirdArray.length != TOTAL)
				console.log("FAIL")
			console.log("Game Over..!")
			noLoop();
		}

	}


	// All the drawing stuff
	background(153, 197, 242);

	for (let pipe of pipes) {
		pipe.display();
	}



	for (let i = 0; i < birdArray.length; i++) {
		birdArray[i].showLines();
	}

		for (let pipe of pipes) {
		pipe.display();
	}
	updateInfo(birdArray);



}

function gameOver()
{
	textSize(64);
	noStroke();
	text("Game Over", canvasWidth*0.5-200 , canvasHeight*0.5 - 100)
}


function updateInfo() {
	document.getElementById("score").innerHTML = floor(birdArray[0].score/50);
	// document.getElementById("generation").innerHTML = N_GENERATIONS;
	// document.getElementById("alive").innerHTML = birdArray.length  + " ( Initial : " + TOTAL + " ) ";
	// document.getElementById("prev").innerHTML = floor(MAX_PREVIOUS) ;

}


