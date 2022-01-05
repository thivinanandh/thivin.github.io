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
        let randVal = floor(random(32,123));
        
        return String.fromCharCode(randVal);
    }

    initializeRandomValues()
    {
        for( let i = 0 ; i < this.geneLength ; i++)
            this.genomeSequence[i] = this.generateChar();
    }

    
    // Compute Mutation
    mutation(value)
    {
        for (let i = 0 ; i < this.geneLength; i++)
        {
            if(random(1) < value)
                this.genomeSequence[i] = this.generateChar();
        }
    }
}


class population
{

    constructor( phrase, mutation_rate, number )
    {
        this.exactPhrase        = phrase;
        this.mutation_rate      = mutation_rate;
        this.maxPopulation      = number;
        //length of Phrase 
        this.genomeLength   = this.exactPhrase.length;
        this.generationCount = 1;

        this.population     = [];

        // Variables related to Fitness
        this.MaxFitnessGeneration = 0;
        
        
        this.sumOfFitness = 0;
        this.bestGeneindex = 0;

        this.fitnessMethod = 1;                   //  ------------------- INPUT NEEDED --------------------------//
        // CrossOver
        this.crossOverMethod = "SPLITBYHALF";     //  ------------------- INPUT NEEDED --------------------------//
        //  
        this.selectionMethod = "ARRAYBASED";       //  ------------------- INPUT NEEDED --------------------------//

        //
        this.numofpopulationDisplay = 25;          //  ------------------- INPUT NEEDED --------------------------//


        this.GlobalMaxFitness = this.fitnessFunction(this.genomeLength,this.fitnessMethod);

        // Initialise a population of MaxPopulation and the compute the 
        for(let i = 0 ; i < this.maxPopulation ; i ++)
        {
            this.population[i] = new Gene(this.genomeLength);
        }
        
        // compute the Fitness and max Fitness for the Entire Population 
        this.computeFitness();
    }




     // Compute the Fitness Function 
     computeFitness()
     {
        let GenerationMaximumFitness = 0;
         this.sumOfFitness = 0;
         for (let gene = 0 ; gene < this.maxPopulation ; gene++)
         {
            let  matchedChar = 0
            let genelength = this.population[gene].geneLength;
            for ( let i = 0 ; i < genelength ; i++)
            {
                if(this.population[gene].genomeSequence[i] == this.exactPhrase[i])
                    matchedChar++;
            }
     
            // Compute the Fitnesss Score
            this.population[gene].matchedChar = matchedChar;
            this.population[gene].fitnessScore = this.fitnessFunction(matchedChar,this.fitnessMethod);
            this.sumOfFitness += this.population[gene].fitnessScore;

            if(this.population[gene].fitnessScore > GenerationMaximumFitness)
            {
                GenerationMaximumFitness = this.population[gene].fitnessScore;
                this.bestGeneindex = gene;
            }
                
            // console.log(this.sumOfFitness)
         }

         this.MaxFitnessGeneration = GenerationMaximumFitness;
         let sssuumm = 0;
         for (let i = 0 ; i < this.maxPopulation ; i++)
         {
            this.population[i].fitnessProbabilty = this.population[i].fitnessScore / this.sumOfFitness;
            if(this.population[i].fitnessProbabilty >sssuumm )
            sssuumm = this.population[i].fitnessProbabilty
         }

         return this.MaxFitnessGeneration ;
     }

     // The fitness funciton which computes the Fitness of the Current Genome Sequence
     fitnessFunction(score,method)
     {
        if(method ==1)
        {
            var score =  score/this.genomeLength;
            score = pow(score*100,2);
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
        if(method === "SPLITBYHALF")
        {
            let parentA_genome = parentA.genomeSequence;
            let parentB_genome = parentB.genomeSequence;

            let newString = [];
            for ( let i = 0 ; i < this.genomeLength;i++)
            {
                if(i < this.genomeLength/2)
                {
                    newString[i] = parentA_genome[i];
                }
                    
                else
                {
                    newString[i] = parentB_genome[i];

                }
            }
            let child = new Gene(this.genomeLength);

            child.genomeSequence = newString;

            // console.log("parentA: ", parentA_genome.join("") , " Fitness : " , parentA.matchedChar)
            // console.log("parentB: ", parentB_genome.join(""), " Fitness : " , parentB.matchedChar)
            // console.log("child: ", child.genomeSequence.join(""), " Fitness : " , child.matchedChar)

            return child;
        }
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


     getBestGenome()
     {
         return this.population[this.bestGeneindex].genomeSequence.join("");
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