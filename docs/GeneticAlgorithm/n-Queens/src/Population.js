/// Object Contains the DNA of the Population that we are going to 
// simulate using Genetic Algorithm

// The DNA will Hold the information of Genotype and the other values


class Gene
{
    
    //Length of charecters 
    // Gene Length 
    constructor(n)
    {
        this.geneLength = n;
        this.genomeSequence = [];
        
        this.matchedChar = 0;
        this.fitnessScore = 0;
        this.fitnessProbabilty = 0;

        this.initializeRandomValues();

    }

    
    // Function to generate Random Character for 
    generateChar()
    {
        let randVal = floor(random(0,this.geneLength));
        return randVal;
    }

    initializeRandomValues()
    {
        for( let i = 0 ; i < this.geneLength ; i++)
        {
            let randval = floor(random(0,this.geneLength));

            while(this.genomeSequence.includes(randval) )
                randval = floor(random(0,this.geneLength))    
            
            this.genomeSequence[i] = randval;
        }

            
            
    }

    
    // Compute Mutation
    // Mutation should involve swap of variables in order to avoid any repeating Index 
    mutation(value)
    {
        let orig = this.genomeSequence.splice();
        for (let i = 0 ; i < this.geneLength; i++)
        {
            if(random(1) < value)
            {
                let indexA = floor(random(this.geneLength));
                let indexB = floor(random(this.geneLength));

                let temp = this.genomeSequence[indexA];
                this.genomeSequence[indexA] = this.genomeSequence[indexB];
                this.genomeSequence[indexB] = temp; 
            }
        }

        // var unique = this.genomeSequence.filter((v, i, a) => a.indexOf(v) === i);

        // if(unique.length != this.genomeSequence.length)
        // {
        //     console.log(" Errror in Mutation Domain")
        //     console.log(" Orig : ", orig , " Modified : ", this.genomeSequence )
        // }
    }
}


class population
{

    constructor(  mutation_rate, number ,chessObject)
    {
        this.mutation_rate      = mutation_rate;
        this.maxPopulation      = number;

        this.chessBoard = chessObject;
        //length of Phrase 
        this.genomeLength   = this.chessBoard.n;
        this.N              = this.chessBoard.n;
        this.generationCount = 1;

        this.population     = [];

        // Variables related to Fitness
        this.MaxFitnessGeneration = 0;
        

        

        
        this.sumOfFitness = 0;
        this.bestGeneindex = 0;
        this.bestGeneScore = 0;

        this.fitnessMethod = 1;                   //  ------------------- INPUT NEEDED --------------------------//
        // CrossOver
        this.crossOverMethod = userSelectedCrossOver;     //  ------------------- INPUT NEEDED --------------------------//
        //  
        this.selectionMethod = "ARRAYBASED";       //  ------------------- INPUT NEEDED --------------------------//

        //
        this.numofpopulationDisplay = 10;          //  ------------------- INPUT NEEDED --------------------------//

        // Global Max Fittness =  n*n-1 - interfernce,  ( This will be max, when interference is zero)
        this.GlobalMaxFitness = this.fitnessFunction(this.N*((this.N)-1),this.fitnessMethod);

        // Initialise a population of MaxPopulation and the compute the 
        for(let i = 0 ; i < this.maxPopulation ; i ++)
        {
            this.population[i] = new Gene(this.genomeLength);
        }
        
        // compute the Fitness and max Fitness for the Entire Population 
        this.computeFitness();
    }

    computeIntersectionScores(boardValues,row,col)
    {
        boardValues[row][col] = 0 
        //Horizontal 
        for (let j = 0 ; j < this.N ; j++)
        {
            if(j == col) continue;
            boardValues[row][j] += 1

        }
        
        //Vertical
        for(let i = 0 ; i < this.N; i++)
        {
            if(i==row) continue;
            boardValues[i][col] += 1;
        }
        
        //Down Diagonal - RIGHT
        let currRow = row+1;
        let currCol = col+1;
        while(currRow < this.N & currCol < this.N)
        {
            boardValues[currRow][currCol] += 1;
            currRow++;
            currCol++;
        }

        //Up Diagonal Right
         currRow = row-1;
         currCol = col+1;
        while(currRow >= 0 & currCol < this.N)
        {
            boardValues[currRow][currCol] += 1;
            currRow--;
            currCol++;
        }

        // Down Diagonal Left 
          currRow = row+1;
          currCol = col-1;
         while(currRow < this.N & currCol >= 0)
         {
             boardValues[currRow][currCol] += 1;
             currRow++;
             currCol--;
         }

         //Up Diagonal Left 
          currRow = row-1;
          currCol = col-1;
         while(currRow >=0 & currCol >= 0)
         {
             boardValues[currRow][currCol] += 1;
             currRow--;
             currCol--;
         }
    }


     // Compute the Fitness Function 
     // For a perfect placement, Every queen should not be interferd with the path of other queens
     // The interference of every queen in the b0ard by other queens are computed.
     // The worst case will be when all queens are lying in a straight line ( attaked by n-1 Queens)
     // So the worst possible case wull have n*n-1 interferences.. 
    // Score is computed by FITNESS  = n*n-1 - interference
    // A minimum score of 0.01 is added to actual fitness just to ensure that one of the parent is picked when 
    // All population in a generation does not have a score above zero
    // A Specific Gene is punished by giving the score as zero , if there are two queens in same columns, 
    // i.e , when there are repeated index in the genomic sequqnce
    
     computeFitness()
     {
        this.MaxFitnessGeneration = 0;
         this.sumOfFitness = 0;
         let boardValues = [];
         let temp_intersection = 0;
         let tempCounter = 0;
         for (let i = 0 ; i < this.genomeLength ; i++)
            boardValues[i] = [];
                  
         for ( let player = 0 ; player <  this.maxPopulation ; player++)
         {
             // Make the interference board zero 
            for(let i = 0 ; i < this.genomeLength ;i++)
                for(let j = 0 ; j < this.genomeLength ;j++)
                    boardValues[i][j] = 0;
            // Variable to Track the number of paths being Intersected.
            
            for ( let queen  = 0 ; queen < this.genomeLength ; queen++)
                this.computeIntersectionScores(boardValues,queen,this.population[player].genomeSequence[queen])
            
                let interference  = 0; 
            // Compute interference Scores
            for( let i = 0 ; i < this.genomeLength ; i++)
            {
                let posOfQueen  = this.population[player].genomeSequence[i];
                interference += boardValues[i][posOfQueen]
            }
            
            
            
            let score = this.N*((this.N)-1) - interference;

            var arr = this.population[player].genomeSequence;
            var unique = arr.filter((v, i, a) => a.indexOf(v) === i);

            // if(unique.length != this.genomeLength)
            // {
            //     score = score - 4*(this.genomeLength - unique.length );
            //     if(score < 0) score  = 1
            //     console.log("Errrorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
            // }

            // if( (this.genomeLength - unique.length) > 2 )
            // {
            //     tempCounter++;
            // }
                
            
            this.population[player].matchedChar = score;

            // Compute Fitness Score
            let fitnessScore = this.fitnessFunction(score,this.fitnessMethod);
            
            // Assign the score to the GENE Class 
            this.population[player].fitnessScore = fitnessScore;

            // Compute Total Sum of 
            this.sumOfFitness += fitnessScore

            // Identify Maximum Fitness and the Gene which has max fitness
            if(fitnessScore > this.MaxFitnessGeneration)
            {
                this.MaxFitnessGeneration = fitnessScore;
                this.bestGeneindex        = player;
                this.bestGeneScore        = score;
            }
         }


         for ( let i = 0 ; i < this.maxPopulation; i++)
             this.population[i].fitnessProbabilty = this.population[i].fitnessScore / this.sumOfFitness;
         
            //  console.log(" PENALTY AWARDECD: ", tempCounter);
         return this.MaxFitnessGeneration ;
     }

     // The fitness funciton which computes the Fitness of the Current Genome Sequence
     fitnessFunction(score,method)
     {
        if(method ==1)
        {
            score = pow(score,2);
            if(score ==0) score  = 0.1;
            return score;
        }

     }

     // To Stop the Algorithm when the computation ended.
     isMaxFittnessReached()
     {
        // console.log("Max Fit : " , this.MaxFitnessGeneration , "Glob Fit : ", this.GlobalMaxFitness )
        // console.log("GLOBAL FITNESS GENERATION : " , this.MaxFitnessGeneration)
         if(this.MaxFitnessGeneration >= this.GlobalMaxFitness)
            return true;
     }


     crossover(method,parentA,parentB)
     {
        let parentA_genome = parentA.genomeSequence;
        let parentB_genome = parentB.genomeSequence;

        let newString = [];

        if(method == "Split By Half")
        {
            
            for ( let i = 0 ; i < this.genomeLength;i++)
            {
                if(i < this.genomeLength/2)
                    newString[i] = parentA_genome[i];
                else
                    newString[i] = parentB_genome[i];
            }
        }

        if(method == "Split Random")
        {
            
            for ( let i = 0 ; i < this.genomeLength;i++)
            {
                if(i < floor(random(1,this.genomeLength-1)))
                    newString[i] = parentA_genome[i];
                else
                    newString[i] = parentB_genome[i];
            }
        }

        if(method == "Multiple Split")
        {
            let chunkSize = floor(random(1,this.genomeLength-1))
            let A = true
            let finishedChunk = 0;
            for ( let i = 0 ; i < this.genomeLength;i++)
            {
                if(A)
                {
                    newString[i] = parentA_genome[i];
                    finishedChunk++;

                    if(finishedChunk >= chunkSize)
                    {
                        A =false;
                        finishedChunk = 0;
                    }
                        

                }
                    
                else
                {
                    newString[i] = parentB_genome[i];
                    finishedChunk++;
                    if(finishedChunk >= chunkSize)
                    {
                        A =true;
                        finishedChunk = 0;
                    }
                }
                    
            }
        }

        if(method == "Uniform Dist")
        {
            for ( let i = 0 ; i < this.genomeLength;i++)
            {
                let rand = random(1);
                if(i < 0.5)
                    newString[i] = parentA_genome[i];
                else
                    newString[i] = parentB_genome[i];
            }
        }

        if(method == "Unique CrossOver")
        {
            // Get a Unique Slice from parent A
            let startIndex = floor(random(parentA_genome.length-1));
            let endIndex   = floor(random(startIndex+1 , parentA_genome.length));

            //Get the Slice from main Array 
            newString = parentA_genome.slice(startIndex,endIndex);

            for ( var i = 0 ; i < parentB_genome.length; i++)
            {
                let val = parentB_genome[i];
                if(!newString.includes(val))
                    newString.push(val)
            }

        }

        let child = new Gene(this.genomeLength);

        child.genomeSequence = newString;

        var unique = newString.filter((v, i, a) => a.indexOf(v) === i);
        if(unique.length != newString.length){
            console.log(" Error in the Cross Over Function ")
            console.log(" Par A :" , parentA_genome ," Par b : ", parentB_genome, " Child : ", newString)
        }
        

        return child;

     }




     //Selecting a parent   
     selectParent(method)
     {

            let  val = random(0,1);
            
            let cumSum = float(0.00000000000001 );
            let i = 0;
            while(float(cumSum) <= float(val) & i < this.maxPopulation)
            {
                cumSum += this.population[i].fitnessProbabilty;
                i++;
            }
            return i-1;
         
     }


     // Selection of Matting Population 
     selection()
     {
         let NewPopulation = [];
         let s = 0
        for (let i = 0 ; i < this.maxPopulation; i++)
        {
            let k = this.selectParent();
            let l = this.selectParent();
                
            let parentA     = this.population[k];
            let parentB    = this.population[l];
  
            let child = this.crossover(this.crossOverMethod,parentA,parentB);
            
            //Mutate Child
            child.mutation(this.mutation_rate)

            NewPopulation[i] = child;

        }
        
        this.population = [];

        this.population = NewPopulation;
        this.generationCount++;
     }

     // Draw the canvas with the best popultion
     getBestGenome()
     {
         let array = this.population[this.bestGeneindex].genomeSequence;
         this.chessBoard.displayQueens(array);
     }


     getDisplayPhrase()
     {
         let totalPhrase = [];
         let len = min(this.numofpopulationDisplay,this.maxPopulation);
        for ( let i = 0 ; i < len; i++)
        {
            totalPhrase += this.population[i].genomeSequence.join("") + "<br>";
        }
        return totalPhrase;
     }

}