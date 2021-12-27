//Class for Storing Matrix and perform operations based on that

function sum2Vectors(vec1,vec2)
{
    if(vec1.length != vec2.length)
    {
        console.log(" Incompatible Vector Dimensions")
    }

    for ( let i = 0 ; i < vec1.length;i++)
        vec1[i] += vec2[i];

    return vec1;

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

    resetValues()
    {
        for( let i =0 ; i < this.rows;i++)
                for(let j = 0 ; j< this.columns;j++)
                    this.values[i][j] = 0;
    }

    matrixVectorMult(Vector)
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

    }

    //Copy a Matrix
    copy()
    {
        let matrixObj =  new Matrix(this.rows,this.columns);
        
        for(let i = 0 ; i < this.rows;i++)
        {
            matrixObj.values[i] = this.values.slice();
        }
    }
}





class layers{

    
    constructor(layerDimension,ActivationFunction,previousLayerDimension)
    {
        this.dimension = layerDimension;
        this.previousLayerDimension = previousLayerDimension;
        this.activationFunction = ActivationFunction;
    }

    // 
}


// Class : Neural Network
// Only contains the feedforward part of the neural network
// 

class NeuralNetwork
{
    constructor(inputLayer,hiddenLayers,outputLayers)
    {
        this.inputDimension = inputLayer;


    }
}

