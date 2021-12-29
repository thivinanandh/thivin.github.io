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


//Class for Storing Matrix and perform operations based on that
class Vector{

    constructor(len)
    {
        this.len = len;
        this.values = [];
        this.initialiseVector();
    }

    initialiseVector()
    {
        for ( let i  = 0 ; i < this.len;i++)
            this.values[i] = random(-1,1);
    }

    vectorReset()
    {
        for ( let i  = 0 ; i < this.len;i++)
            this.values[i] = 0;
    }

    sum(vec2)
    {
        if(this.len != vec2.length)
        {
            console.log(" Incompatible Vector Dimensions")
            console.log("this : ", this.len ," com : ", vec2.length);
        }   
        // console.log(vec2)
        // console.log(this.values)
        let val = []
        for ( let i = 0 ; i < this.len;i++)
        {
            val[i] = this.values[i] + vec2[i];
        }
        
        return val;
    }

    copy()
    {
        let vector = new Vector(this.len);
        vector.values = this.values.slice();
        return vector;
    }

    print()
    {
        console.log(" Bias ");
        var a = this.values.map( item => Number(item).toFixed(2));
        console.log(a.join(" , "));
    }

    modify(arr)
    {
        this.values = arr.slice();
    }

}



class Matrix
{
    isVector = false;
    constructor(rows,columns)
    {
        if(columns > 1)
        {
            this.rows = rows;
            this.columns = columns;
            this.values = [];

            for ( let i = 0 ; i < this.rows;i++)
                this.values[i] = [];
            
            this.initialiseRandomValues();
        }
        
        
    }

    //initialses random values for the matrix
    initialiseRandomValues()
    {
            for( let i =0 ; i < this.rows;i++)
                for(let j = 0 ; j< this.columns;j++)
                    this.values[i][j] = random(-1,1);
    }

    //resets the values to zero
    resetValues()
    {
        for( let i =0 ; i < this.rows;i++)
                for(let j = 0 ; j< this.columns;j++)
                    this.values[i][j] = 0;
    }

    // Matrix Vector Multiplication
    dot(Vector)
    {
        let resultVector = [];
        if(this.columns != Vector.length)
        {
            console.log(" Incompatible Matrix Dimensions");
        }
        for(let i = 0 ; i < this.rows; i++)
        {
            resultVector[i] = 0
            for(let j = 0 ; j < this.columns; j++)
            {
                resultVector[i] += this.values[i][j] * Vector[j];
            }
        }
        return resultVector;

    }

    //Copy a Matrix Object
    copy()
    {
        let matrixObj =  new Matrix(this.rows,this.columns);
        
        for(let i = 0 ; i < this.rows;i++)
            matrixObj.values[i] = this.values[i].slice();
        
        return matrixObj;
    }

    // Flatten A weight Matrix 
    flatten()
    {
        let flatArray = [];
        let count = 0;
        for ( let  i= 0 ; i < this.rows; i++)
            for ( let j= 0 ;j < this.columns;j++)
            {
                flatArray[count] = this.values[i][j];
                count++;
            }
        return flatArray;
    }


    modify(FlatArray)
    {
        // console.log("Flat Array " , FlatArray)
        // console.log(" Row : ", this.rows);
        // console.log(" Col : ", this.columns);
        for(let i = 0 ; i < this.rows*this.columns; i++)
        {
            let row = floor(i/this.columns);
            let col = floor(i%this.columns);
            
            // console.log("row : ",row, " Col : ", col );
            this.values[row][col] = FlatArray[i];

        }
    }

    print()
    {
        console.log(" WEIGHT MATRIX ")
        for ( let i = 0 ; i < this.rows; i++)
        {
            var a = this.values[i].map( item => Number(item).toFixed(2));
            console.log(a.join(" , "));

        }
    }
}

//Class for layer object
// Stores the dimension of the layer and the dimension of previous layer
// Stores the activation function for the layer
// Stores the Weight and Bias matrices that is requried to compute the values for current layer
// ActivationFunction(weight*prevValues + bias) = CurrentLayerValues

class Layers{

    neuronValues = [];
    constructor(layerDimension,ActivationFunction,previousLayerDimension)
    {
        this.dimension = layerDimension;
        this.previousLayerDimension = previousLayerDimension;
        this.activationFunction = ActivationFunction;

        this.weightMatrix = new Matrix(this.dimension,previousLayerDimension);
        this.bias         = new Vector(this.dimension);
    }

    // Obtains the value from previous Layer to conpute the output
    // The previous values are provided as input and the result will be a vector array
    // WeightMatrix(dot)input + bias
    computeValues(input)
    {
        let temp = this.weightMatrix.dot(input);
        let output = this.bias.sum(temp);
        this.neuronValues = this.activationFunctionCalculate(output).slice();        
        return this.neuronValues;
    }

    activationFunctionCalculate(input)
    {
        let result = [];
        let check = false;
        if(this.activationFunction == "IDENTITY")
        {
            check = true;
            result = input.slice();
        }

        if(this.activationFunction =="SIGMOID")
        {
            check = true;
            for ( let i = 0 ; i < input.length;i++)
                result[i] = 1.0 / ( 1 + exp(-1 * input[i]));
        }

        if(this.activationFunction =="RELU")
        {
            check = true;
            for ( let i = 0 ; i < input.length;i++)
            {
                if(input[i] <= 0) result[i] = 0;
                else  result[i] = input[i];
            }
        }

        if(this.activationFunction == "LEAKY_RELU")
        {
            check = true;
            for ( let i = 0 ; i < input.length;i++)
            {
                if(input[i] <= 0) result[i] = 0.01 * input[i];
                else  result[i] = input[i];
            }
        }

        if(this.activationFunction == "SOFTMAX")
        {
            check = true;
            let denom = 0;
            for(let  i = 0 ;  i < input.length ; i++)  
                denom += exp(input[i]);
            
            for(let  i = 0 ;  i < input.length ; i++)  
                result[i] = exp(input[i])/denom;
            
        }

        if(!check) console.log("Failed to Apply activation function")
       
        // console.log(" result activation : ", result);
        return result;
    }

    copy()
    {
        let newLayer =  new Layers(this.dimension,this.activationFunction,this.previousLayerDimension);
        newLayer.weightMatrix = this.weightMatrix.copy();
        newLayer.bias         = this.bias.copy();

        return newLayer;
    }
    

    printValues()
    {
        this.weightMatrix.print();
        this.bias.print();
    }

    printParameters()
    {
        console.log(" Activation Function : ", this.activationFunction);
        console.log(" Input Dimension : ", this.dimension);
        console.log(" Prev Layer Dim  :", this.previousLayerDimension);
    }
}


// Class : Neural Network
// Only contains the feedforward part of the neural network
// 

class NeuralNetwork
{
    constructor(_inputLayer,_hiddenLayers,_outputLayers,_mutationRate,_crossOverMethod)
    {
        this.inputDimension = _inputLayer;

        //Save the input Parameters for Future copu
        this.I_input = _inputLayer;
        this.I_hidden = _hiddenLayers;
        this.I_output = _outputLayers;
        
        this.mutationRate = _mutationRate;
        this.crossOverMethod = _crossOverMethod;

        //Array for Storing WEight Matrices
        this.WeightMatrices = [];
        this.Biases = [];

        this.N_HiddenLayers   =  _hiddenLayers.length;
        this.hiddenLayerArray =  [];
        this.allLayersArray = [];   // To Store all the layers in single array
        let prevDim  = this.inputDimension;
        let act;
        let dim;
        for(let i = 0  ; i < this.N_HiddenLayers; i++)
        {
            act = _hiddenLayers[i]["activation"];
            dim = _hiddenLayers[i]["dimension"];
            this.hiddenLayerArray[i] = new Layers(dim,act,prevDim);
            prevDim = dim;
        }
        dim  = _outputLayers["dimension"];
        act  = _outputLayers["activation"];
        this.outputLayer = new Layers(dim,act,prevDim);
        this.StoreMatrices();  
    }


    StoreMatrices(Array)
    {
        for( let i = 0 ; i < this.N_HiddenLayers;i++)
            this.allLayersArray[i] = this.hiddenLayerArray[i];
        
        this.allLayersArray[this.N_HiddenLayers] = this.outputLayer;

        // hidden + output
        for(let i = 0 ; i < this.allLayersArray.length; i++)
        {
            this.WeightMatrices[i] = this.allLayersArray[i].weightMatrix;
            this.Biases[i]         = this.allLayersArray[i].bias;
        }

    }


    copy()
    {
        let newNN = new NeuralNetwork(this.I_input,this.I_hidden,this.I_output,this.mutationRate,this.crossOverMethod);
        
        // Copy all the layer Attributes
        for(let i = 0  ; i < this.N_HiddenLayers; i++)
            newNN.hiddenLayerArray[i] = this.hiddenLayerArray[i].copy();
        
        newNN.outputLayer = this.outputLayer.copy();

        newNN.StoreMatrices();

        return newNN;
    }


    // Mutate the neural Network
    mutate()
    {
        for( let i = 0 ; i < this.allLayersArray.length; i++)
        {
            this.WeightMatrices[i].mutate(this.mutationRate);
            this.Biases[i].mutate(this.mutationRate);
        }
    }
    // return a Flat Array for Crossing over 
    getMatrixForCrossOver()
    {
        let AllMatrix = [];
        let FlatMatrixWeight = [];
        for( let i = 0 ; i < this.allLayersArray.length; i++)
        {
            FlatMatrixWeight[i] = this.WeightMatrices[i].flatten();
        }

        AllMatrix[0] = FlatMatrixWeight;
        AllMatrix[1] = this.Biases;

        return AllMatrix;
    }

    // Obtain the flatten Matrix to get back to the original shape

    pushNewValues(AllMatrix)
    {
        let FlatMatrices = AllMatrix[0].slice();
        
        for( let i = 0 ; i < this.allLayersArray.length; i++)
        {
            this.WeightMatrices[i].modify(FlatMatrices[i])
            this.Biases[i].modify(AllMatrix[1][i].slice())
        }
    }

    printParameters()
    {
        for( let i = 0 ; i < this.allLayersArray.length; i++)
        {
            this.allLayersArray[i].printParameters();
            this.allLayersArray[i].printValues  ();
        }
    }

    compute(input)
    {
        let val = input;
        for( let  i = 0 ; i < this.allLayersArray.length ; i++)
        {
            val = this.allLayersArray[i].computeValues(val).slice();
        }

        return val;
    }


}

