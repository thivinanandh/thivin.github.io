class Bird
{
    constructor(brain)
    {
        this.x = 65;
        this.y = canvasHeight*0.5;
        this.lift = -12;
        this.velocity = 0;
        this.gravity = 0.8;

        this.score = 0.01;
        this.fitnessScore = 0;
        this.fitnessProbability;   // To avoid Zero entry error dring selection
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
        stroke(0);
        fill(191, 46, 13);
        ellipse(this.x,this.y,32,32);
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
        let nearPipe ;
        let insidepipe = 0;
        for ( let  i = 0 ; i < pipes.length ; i++)
        {
            dist = pipes[i].x + pipes[i].width - this.x;
            if(dist >0  && dist < minDist)
            {
                minDist = dist;
                nearPipe = pipes[i];
            if(dist < pipes[i].width)
                insidepipe = 1;
            }
        }

        //Ltes give 6 inputs to the NN
        let inputArray = [];
        inputArray[0] = this.y / canvasHeight  // Y position
        inputArray[1] = nearPipe.top / canvasHeight;
        inputArray[2] = nearPipe.bottom / canvasHeight;
        inputArray[3] = nearPipe.x / canvasWidth;
        inputArray[4] = this.velocity / 15;
        inputArray[5] = insidepipe;

        let output = this.brain.compute(inputArray);

        if(output[0] > output[1])
        {
            this.up();
        }

    }

  


}