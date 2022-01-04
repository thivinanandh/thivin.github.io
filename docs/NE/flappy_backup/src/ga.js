function CrossOver(parentA, parentB)
{
    // Cross Biasses
    let biasVal = [];
    for(let i = 0 ; i < parentA.allLayersArray.length; i++)
    {
        let biasA = parentA.getMatrixForCrossOver()[1][i].values;
        let biasB = parentB.getMatrixForCrossOver()[1][i].values;

        let start = floor(random(0,biasA.length));
        let end   = floor(random(start+1,biasA.length));
        let currBiasVal = [];
        for(let j = 0 ; j < biasA.length ; j++)
        {
            if(j >= start & j <= end ) currBiasVal[j] = biasA[j];
            else currBiasVal[j] = biasB[j];
        }

        biasVal[i] = currBiasVal.slice();
    }

    // Cross - Over WEight Matrices
    // Cross Biasses
    let MatrixWeightVal = [];
    for(let i = 0 ; i < parentA.allLayersArray.length; i++)
    {
        let WeightA = parentA.getMatrixForCrossOver()[0][i];
        let WeightB = parentB.getMatrixForCrossOver()[0][i];

        let start = floor(random(0,WeightA.length));
        let end   = floor(random(start+1,WeightA.length));
        let currWeightVal = [];
        for(let j = 0 ; j < WeightA.length ; j++)
        {
            if(j >= start & j <= end ) currWeightVal[j] = WeightA[j];
            else currWeightVal[j] = WeightB[j];
        }

        MatrixWeightVal[i] = currWeightVal.slice();
    }

    // create Weight + bias Array
    let Arr = [];
    Arr[0] = MatrixWeightVal.slice();
    Arr[1] = biasVal.slice();

    // get a copy of Current NN
    let child = parentA.copy();

    child.pushNewValues(Arr);

    return child;
}


function updateFitnessProbability(birdArray)
{
    let maxscore = 0;
    let maxIndex = 0;
// Compute fitness scrores
    for ( let i = 0 ; i < birdArray.length; i++) 
    {
        birdArray[i].fitnessScore = fitnessFunction(birdArray[i].score,1);
        if(birdArray[i].fitnessScore > maxscore)
        {
            maxscore = birdArray[i].fitnessScore ;
            maxIndex = i;
        }
            
    }

    MAXSCOREINGENERATION = birdArray[maxIndex].score;
       

    // compute sum of scores to normalise stuff
    let sum = 0;
    for ( let i = 0 ; i < birdArray.length; i++)   
        sum += birdArray[i].fitnessScore;
    
        for ( let i = 0 ; i < birdArray.length; i++)   
            birdArray[i].fitnessProbability =  birdArray[i].fitnessScore/sum;

}


function selectParent(birdArray)
{
    let  val = random(0,1);

            
    let cumSum = float(0.00000000000001 );
    let i = 0;
    while(float(cumSum) <= float(val) & i < birdArray.length)
    {
        cumSum += birdArray[i].fitnessProbability;
        i++;
    }
    return i-1;
}

function fitnessFunction(score,method)
    {
        if(method ==1)
        {
            score = pow(score,2);
            if(score ==0) score  = 0.1;
            return score;
        }

     }

function Selection(birdArray,crossOver)
{
    let NewPopulation = [];
    let s = 0
   for (let i = 0 ; i < TOTAL; i++)
   {
        let k = selectParent(birdArray);
        let l = selectParent(birdArray);

        let parentA_brain = birdArray[k].brain;
        let parentB_brain = birdArray[l].brain;

        let child = new Bird(parentA_brain);
        if(crossOver)
            child.brain  = CrossOver(parentA_brain,parentB_brain);
        
        child.brain.mutate();

        NewPopulation.push(child);
   }

   return NewPopulation;
    
}


function CreateNewpopulation(birdArray)
{
    N_GENERATIONS++;
    //Update Fitness Score and Probability of selected birds for Selection 
    updateFitnessProbability(birdArray);

    // Perform crossover and mutation to generate new birds
    let newpopulation = Selection(birdArray,true);

    MAX_PREVIOUS = MAXSCOREINGENERATION;

    return newpopulation;

}


function getCurrentHighest(birdArray)
{
    let max = 0;
    let index = 0;
    for(let i = 0 ; i < birdArray.length; i++)
        if(birdArray[i].score > max)
        {
            max = birdArray[i].score
            index = i;
        }
            
    
    MAXSCOREINGENERATION = max;
    MAXINDEX = index;
    return index;
}
