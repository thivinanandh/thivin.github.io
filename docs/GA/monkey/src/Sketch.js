
/// The global Variables

let Sentence
let Mutation_Rate
let maxPopulation



let populationObject;

function setup()
{
    Sentence = "Thivin The Great..!";
    Mutation_Rate = 0.0085;
    maxPopulation = 200;


    // Print Actual Phrase 
    var actualPhraseElement = document.getElementById("titlePhrase");
    actualPhraseElement.innerHTML = Sentence;

    populationObject  = new population(Sentence,Mutation_Rate,maxPopulation);
   

    

    var rightTable = document.getElementById("generations");
    rightTable.innerHTML = populationObject.getDisplayPhrase();

    
}


function draw()
{
    populationObject.selection();
    populationObject.computeFitness();

    updateInfo();

    if(populationObject.isMaxFittnessReached())
    {
        noLoop();
    }



}


function updateInfo()
{
    document.getElementById("generation").innerHTML = populationObject.generationCount;
    let matched = populationObject.population[populationObject.bestGeneindex].matchedChar;
    let percentage  = (matched/Sentence.length) * 100;
    document.getElementById("Fitness").innerHTML    = percentage.toFixed(2) + " %";
    document.getElementById("Population").innerHTML = maxPopulation;
    
    bestprediction = populationObject.getBestGenome()
    var PredictedPhraseElement = document.getElementById("predictedPhrase");
    PredictedPhraseElement.innerHTML = bestprediction;

    var rightTable = document.getElementById("generations");
    rightTable.innerHTML = populationObject.getDisplayPhrase();
}