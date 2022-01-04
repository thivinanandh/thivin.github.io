let canvasWidth = 900;
let canvasHeight = 480;

let myCanvas;  // Canvas Object 

// Let Pipe Objects
let SpeedofGame =   60   // Value uptop 100
let counterModulus = 101 - SpeedofGame;
let counter = 0;
let pipes = [];
let DISPLACEMENTSPEED = 8;
let SPACING = 125;

// Game Objects 
let slider ;
let GameStarted = false;


//GA 
let N_GENERATIONS = 1;
let MUTATIONRATE = 0.05;
let MAXSCOREINGENERATION = 0;
let MAX_PREVIOUS = 0;
let MAXINDEX = 0;

// Bird properties
let birdSize = 32;
let birdArray = [];
let SelectedBirdArray = [];
let TOTAL = 200;



function pauseSimulation()
{
  noLoop();
}

function resumeSimulation()
{
  loop();
}
function resetSimulation()
{
	birdArray = [];
}


function startSimulation()
{
	
	GameStarted = true;
	loop();
}

function saveJsonFile()
{
	let bird = birdArray[MAXINDEX];
	saveJSON(bird.brain,"bird.json")
}


function setup() {
    myCanvas = createCanvas( canvasWidth,canvasHeight);

    myCanvas.parent("Canvas");
    slider = createSlider(1, 10, 1);
	slider.parent("slider");
    myCanvas.background(153, 197, 242);
	pipes.push(new Pipe());  // Default pipe at start
	
	for (let i = 0; i < TOTAL; i++) 
	birdArray[i] = new Bird();
	noLoop();
	
  }
  
  function draw() {


    // Repeat the process n times to increase the speed of the game 
    for ( let n = 0 ; n < slider.value() ; n++ )
    {
      if (counter > counterModulus ) {
        pipes.push(new Pipe());
        counter = 0;
      }
      counter++;
      //Draw pipes and remove them once the pipe leaves the window
      for (let i = pipes.length - 1; i >= 0; i--)
      {
        pipes[i].update();

        // Check fof hitting osf Birds in Pipes
        for ( let j = 0 ; j < birdArray.length;j++)
        {
          if(pipes[i].hits(birdArray[j]))  // Remove that Bird from population and add to prev population
          {
            SelectedBirdArray.push(birdArray.slice(j,j+1)[0])          
            birdArray.splice(j,1);
          }
        }

        if (pipes[i].offscreen()) {
          pipes.splice(i, 1);
        }

      }  

	  // Check if Bird goes out of Scope
	  for(let i = 0 ; i < birdArray.length;i++)
	  {
		  if(birdArray[i].offScreen())
		{
			SelectedBirdArray.push(birdArray.slice(i,i+1)[0])          
            birdArray.splice(i,1);
		}
	  }




      // Update bird Movement 
      for (let bird of birdArray) {
        bird.think(pipes);
        bird.update();
      }


	  if(birdArray.length == 0)
	  {
		  if(SelectedBirdArray.length != TOTAL)
		  	console.log("FAIL")
		  
		  counter = 0;
		  birdArray = CreateNewpopulation(SelectedBirdArray).slice();
		  SelectedBirdArray = [];
		  pipes = [];
		  pipes.push(new Pipe());  // Default pipe at start
		  console.log('Generation Number : ' , N_GENERATIONS);
		  console.log("birdArray : ",birdArray.length)
	  }
      
    }

  

    // All the drawing stuff
    background(153, 197, 242);

 

    for (let pipe of pipes) {
      pipe.display();
    }

    for (let i = 0; i < birdArray.length; i++) {
      birdArray[i].show();
    }
    
	
	getCurrentHighest(birdArray);
	updateInfo(birdArray);


  }


  function updateInfo()
  {
	document.getElementById("score").innerHTML = floor(MAXSCOREINGENERATION);
	document.getElementById("generation").innerHTML = N_GENERATIONS;
	document.getElementById("alive").innerHTML = birdArray.length  + " ( Initial : " + TOTAL + " ) ";
	document.getElementById("prev").innerHTML = floor(MAX_PREVIOUS) ;

  }


  