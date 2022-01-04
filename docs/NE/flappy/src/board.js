class Tile
{
    constructor(xpos,ypos,width,height,text,textSize,color)
    {
        this.xpos = xpos;
        this.ypos = ypos;
        this.width = width;
        this.height = height;
        this.number = text; 
        this.textSize = textSize;    
        this.color  = color;
        this.draw();
    }

    draw()
    {
        fill(255,244,0);
        this.rectangle = rect(this.xpos,this.ypos,this.width,this.height); 
        fill(0);
        textSize(this.textSize);
        text(this.number, this.xpos + this.width*0.4 ,(this.ypos + this.width*0.65 ))
    }


    highlight()
    {
        // console.log("here")
        fill(0,244,0);
        rect(this.xpos,this.ypos,this.width,this.height); 
        fill(0);
        textSize(this.textSize);
        text(this.number, this.xpos + this.width*0.4 ,(this.ypos + this.width*0.65 ))
    }

    translate(Direction)
    {
        let nSteps = 100;  // Deceides the speed of translation
        let StepLength  = this.width/nSteps;
        if(Direction =="left")
        {
            for(let i = 0 ; i < nSteps;i++)
            {
                this.xpos -= StepLength;
            }
        }
        if(Direction =="right")
        {
            for(let i = 0 ; i < nSteps;i++)
                this.xpos += StepLength;
        }
        if(Direction =="up")
        {
            for(let i = 0 ; i < nSteps;i++)
                this.ypos -= StepLength;
        }
        if(Direction =="down")
        {
            for(let i = 0 ; i < nSteps;i++)
                this.ypos += StepLength;
        }
        
    }
}

class Board
{
    constructor(n,canvasObject)
    {
        this.n = n;
        this.canvasObject = canvasObject;
        this.cellWidth = this.canvasObject.width / this.n;   // Square will remain same for height
        this.textSize = this.cellWidth/3;

        this.tileColor = color(255,245,0);
        
        this.mainArray = [];
        for (let i = 0 ; i < this.n ; i++)
            this.mainArray[i] = [];

        this.zeroIndex_x = 0;
        this.zeroIndex_y = 0;

        this.tileArray = [];  // to store all the tile Objects

        this.movableTiles = [];
        for( let i = 0 ; i < this.n; i++)
            this.tileArray[i] = [];
        this.initValues();
        this.createBoard();

        this.score = 0;
        this.movesMade = 0;
        this.gameWon = false;

        this.drawBoard();
        this.mouseHovered;
    }

    // Intiialise array to an Random numbers
    initValues()
    {
        let tempArray = [];
        for ( let i = 0 ; i < this.n*this.n ;i++)
            tempArray[i] = i+1;
        
        tempArray[this.n*this.n] = 0;
        
        
        

        // // Shuffle the Variables
        // for ( let i = 0 ; i < this.n*this.n; i++)    
        // {
        //     let Swapindex = floor(random(1,this.n*this.n));
        //     let temp = tempArray[i];
        //     tempArray[i] =  tempArray[Swapindex];
        //     tempArray[Swapindex] = temp;
        // }
        this.zeroIndex_x = this.n - 1;
        this.zeroIndex_y = this.n - 1;
        
        
        for ( let i = 0 ; i < 100; i++)
        {
            let pickArray = [];

            if(this.zeroIndex_x - 1 >= 0) pickArray.push((this.zeroIndex_x - 1)*this.n + this.zeroIndex_y);
            if(this.zeroIndex_x + 1 < this.n) pickArray.push((this.zeroIndex_x + 1)*this.n + this.zeroIndex_y);
            if(this.zeroIndex_y - 1 >= 0) pickArray.push((this.zeroIndex_x)*this.n + this.zeroIndex_y -1);
            if(this.zeroIndex_y + 1 < this.n) pickArray.push((this.zeroIndex_x)*this.n + this.zeroIndex_y +1);

            let randomVal = floor(random(0,pickArray.length))

            //Shuffle temp[zerindex] with temp[random]
            let temp = tempArray[randomVal];
            tempArray[randomVal] = 0;
            tempArray[this.zeroIndex_x*this.n + this.zeroIndex_y] = temp;

            this.zeroIndex_x = floor(randomVal/this.n);
            this.zeroIndex_y = floor(randomVal%this.n);

        }


        for ( let i = 0 ; i < this.n;i++)
            for(let j = 0 ; j < this.n ;j++)
            {
                this.mainArray[i][j] = tempArray[i*this.n + j];
                if(this.mainArray[i][j] == 0)
                {
                    this.zeroIndex_x = i;
                    this.zeroIndex_y = j;
                }

            }


        
    }

    createBoard()
    {
        for ( let i = 0 ; i < this.n;i++)
        for(let j = 0 ; j < this.n ;j++)
        {
 

            if(!(this.zeroIndex_x == i & this.zeroIndex_y == j))
            {
                this.tileArray[i][j] = new Tile(j*this.cellWidth,i*this.cellWidth,this.cellWidth,
                    this.cellWidth,this.mainArray[i][j], this.textSize,this.tileColor); 
            }            

            // if(!(this.zeroIndex_x == i & this.zeroIndex_y == j))
            // text(this.mainArray[i][j] , j*this.cellWidth  + this.cellWidth*0.40,((i+1)*this.cellWidth ) - this.cellWidth*0.40)
        }

        //Update Movable Tiles
        this.updateMovableTiles()
    }

    //Add movable tiles
    updateMovableTiles()
    {
        this.movableTiles = [];
        if(this.zeroIndex_x + 1 < this.n) this.movableTiles.push(this.tileArray[this.zeroIndex_x+1][this.zeroIndex_y]);
        if(this.zeroIndex_x - 1 >= 0) this.movableTiles.push(this.tileArray[this.zeroIndex_x-1][this.zeroIndex_y]);
        if(this.zeroIndex_y + 1 < this.n) this.movableTiles.push(this.tileArray[this.zeroIndex_x][this.zeroIndex_y+1]);
        if(this.zeroIndex_y - 1 >= 0) this.movableTiles.push(this.tileArray[this.zeroIndex_x][this.zeroIndex_y-1]);
    }

    drawBoard()
    {
        for ( let i = 0 ; i < this.n;i++)
        for(let j = 0 ; j < this.n ;j++)
        {
 
 
            if(!(this.zeroIndex_x == i & this.zeroIndex_y == j))
                this.tileArray[i][j].draw(); 
                  

            // if(!(this.zeroIndex_x == i & this.zeroIndex_y == j))
            // text(this.mainArray[i][j] , j*this.cellWidth  + this.cellWidth*0.40,((i+1)*this.cellWidth ) - this.cellWidth*0.40)
        }
        
    }

    printValues()
    {
        for( let i = 0 ; i < this.n ; i++)
            console.log(this.mainArray[i].join(" , "));
    }


    hovered()
    {
        isHovered= true;
        // console.log(" Hovered" , " Value : ", isHovered)
        // Identify the position 
    }

    highlightCellonHover()
    {
        if(isHovered &  (mouseX < this.canvasObject.width & mouseY < this.canvasObject.height))
        {
            let cellIndex_y = floor(mouseX/this.cellWidth);
            let cellIndex_x = floor(mouseY/this.cellWidth);
            

            if(!(this.zeroIndex_x == cellIndex_x & this.zeroIndex_y == cellIndex_y))
            {
                let found = false;
                for ( let i = 0 ; i < this.movableTiles.length ; i++)
                {
                    if(this.tileArray[cellIndex_x][cellIndex_y].number == this.movableTiles[i].number)
                    {
                        found = true;
                        break;
                    }
                }

                if(found)
                    this.tileArray[cellIndex_x][cellIndex_y].highlight();
                
                // console.log(" Cell : ", cellIndex_x, " , " , cellIndex_y);  
            }
            

        }
    }

    hoveredOut()
    {
        isHovered = false;
        // console.log(" CameOut ", " Value : ", isHovered)
       
    }

    //Click to translate the tiles
    moveTile()
    {
        if(isHovered &  (mouseX < this.canvasObject.width & mouseY < this.canvasObject.height))
        {
            let cellIndex_y = floor(mouseX/this.cellWidth);
            let cellIndex_x = floor(mouseY/this.cellWidth);
            
            if(!(this.zeroIndex_x == cellIndex_x & this.zeroIndex_y == cellIndex_y))
            {
                let found = false;
                for ( let i = 0 ; i < this.movableTiles.length ; i++)
                {
                    if(this.tileArray[cellIndex_x][cellIndex_y].number == this.movableTiles[i].number)
                    {
                        found = true;
                        break;
                    }
                }

                if(found)
                {

                    let moveDirection;
                    let moveTag_x = 0;
                    moveTag_x = this.zeroIndex_y - cellIndex_y; // move in X Direction
                    let moveTag_y = 0;
                    moveTag_y = this.zeroIndex_x - cellIndex_x; // move in Y Direction 
                    // console.log("Cellx: ",cellIndex_x , " Cell y : " , cellIndex_y);
                    // console.log("Zero_X: ",this.zeroIndex_x , " ZeroY : " , this.zeroIndex_y);
                    // console.log("moveTag_x : ", moveTag_x , " moveY : ", moveTag_y);
                    if(moveTag_x>0) moveDirection = "right";
                    if(moveTag_x<0) moveDirection = "left";
                    if(moveTag_y>0) moveDirection = "down";
                    if(moveTag_y<0) moveDirection = "up";


                    console.log(" Move Direction: ", moveDirection)

                    this.tileArray[cellIndex_x][cellIndex_y].translate(moveDirection) ;

                    this.mainArray[this.zeroIndex_x][this.zeroIndex_y] = this.tileArray[cellIndex_x][cellIndex_y].number;

                    // interchange Zero Index Array 
                    this.tileArray[this.zeroIndex_x][this.zeroIndex_y] = this.tileArray[cellIndex_x][cellIndex_y];

                    this.tileArray[cellIndex_x][cellIndex_y] = null;

                    clear();
                    //Change Zero Index to Current Index 
                    this.zeroIndex_x = cellIndex_x;
                    this.zeroIndex_y =  cellIndex_y;

                    //Update the movable tiles
                    this.updateMovableTiles();

                    //Update Scores
                    this.updateScores();

                    this.movesMade++;

                    //Draw Board
                    this.drawBoard();
                }
            }
        }        
    }


    updateScores()
    {
        let total = 0;
        for( let i = 0 ; i < this.n*this.n;i++)
        {
                if(this.mainArray[floor(i/this.n)][floor(i%this.n)] == i+1)
                    total += 1;

        }

        this.score = total;
        if(this.score >= this.n*this.n-1)
            this.gameWon = true;
    }
   
 


}