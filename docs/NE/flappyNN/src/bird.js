class Bird
{
    constructor(brain)
    {
        this.x = 80 ;
        this.y = canvasHeight*0.5;
        this.lift = -12;
        this.velocity = 0;
        this.gravity = 0.8;

        this.score = 0.01;
        this.fitnessScore = 0;
        this.fitnessProbability;   // To avoid Zero entry error dring selection
        this.inputArray = [];
        this.nearPipe = 0;
        this.insidepipe = 0;
        // If Brain provided, Copy the neuralNetowrk
        if(brain)
        {
            this.brain = brain.copy();
        }
        else{
            let inputDimension  = 6;
            let hiddenLayers = [];
            let hiddenLayer1 = {
                "activation" : "RELU",
                "dimension"  : 9
            }
            hiddenLayers.push(hiddenLayer1);
            let outputLayer = {
                                "activation" : "SIGMOID",
                                "dimension"  : 2
            } 

            let mutationRate = MUTATIONRATE;
            let crossOverMethod = "";
            this.brain = new NeuralNetwork(inputDimension,hiddenLayers,outputLayer,mutationRate,crossOverMethod);
        }
    }



    // Function to draw the bird
    show()
    {
        drawingContext.setLineDash([]);
        stroke(0);
        fill(191, 46, 13);
        ellipse(this.x,this.y,32,32);
    }

    showLines()
    {
        drawingContext.setLineDash([5, 10]);
        stroke(0)
        line(this.x,this.y,this.x,height)
        stroke(0)
        line(this.x,this.y,this.nearPipe.x,this.nearPipe.top)
        line(this.x,this.y,this.nearPipe.x,this.y)
        line(this.x,this.y,this.nearPipe.x,height - this.nearPipe.bottom)
        noStroke();
        text(str("vel : " + round(this.velocity,2)),this.x-65,this.y+5)
        
        if(this.insidepipe)
        {
            fill(0, 161, 46);
            text("inside",this.x-15,this.y+35)
        }
            
        else
        {
            fill(184, 21, 0);
            text("outside",this.x-15,this.y+35) 
        }
            
        this.show();
        
    }

    // Function to Update position 
    update()
    {
        this.score++;
        this.velocity += this.gravity;
        this.y += this.velocity;
    }

    // For jump 
    up() {
        this.velocity += this.lift;
    }

    offScreen() {
    return this.y > height || this.y < 0;
    }


    think(pipes)
    {
        // Find the closest pipe 
        let minDist = Infinity;
        let dist = 0;
        
        this.insidepipe = 0;
        for ( let  i = 0 ; i < pipes.length ; i++)
        {
            dist = pipes[i].x + pipes[i].width - this.x;
            if(dist >0  && dist < minDist)
            {
                minDist = dist;
                this.nearPipe = pipes[i];
            if(dist < pipes[i].width)
                this.insidepipe = 1;
            }
        }



        //Ltes give 6 inputs to the NN
        this.inputArray = [];
        this.inputArray[0] = this.y / canvasHeight  // Y position
        this.inputArray[1] = this.nearPipe.top / canvasHeight;
        this.inputArray[2] = this.nearPipe.bottom / canvasHeight;
        this.inputArray[3] = this.nearPipe.x / canvasWidth;
        this.inputArray[4] = this.velocity / 15;
        this.inputArray[5] = this.insidepipe;

        ellipse(this.x+50,this.y+50,32,32);

        let output = this.brain.compute(this.inputArray);

        if(output[0] > output[1])
        {
            this.up();
        }

    }

  


}