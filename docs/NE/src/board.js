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
        rect(this.xpos,this.ypos,this.width,this.height); 
        fill(0);
        textSize(this.textSize);
        text(this.number, this.xpos + this.width*0.4 ,(this.ypos + this.width*0.65 ))
    }

    translate()
    {

    }

    highlight()
    {
        console.log("here")
        fill(0,244,0);
        rect(this.xpos,this.ypos,this.width,this.height); 
        fill(0);
        textSize(this.textSize);
        text(this.number, this.xpos + this.width*0.4 ,(this.ypos + this.width*0.65 ))
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

        this.tileArray = [];
        for( let i = 0 ; i < this.n; i++)
            this.tileArray[i] = [];
        this.initValues();
        this.createBoard();

        this.drawBoard();
        this.mouseHovered;
    }

    // Intiialise array to an Random numbers
    initValues()
    {
        let tempArray = [];
        for ( let i = 0 ; i < this.n*this.n ;i++)
            tempArray[i] = i;
        
        
        

        // Shuffle the Variables
        for ( let i = 0 ; i < this.n*this.n; i++)    
        {
            let Swapindex = floor(random(1,this.n*this.n));
            let temp = tempArray[i];
            tempArray[i] =  tempArray[Swapindex];
            tempArray[Swapindex] = temp;
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
                this.tileArray[j][i] = new Tile(j*this.cellWidth,i*this.cellWidth,this.cellWidth,
                    this.cellWidth,this.mainArray[i][j], this.textSize,this.tileColor); 
            }            

            // if(!(this.zeroIndex_x == i & this.zeroIndex_y == j))
            // text(this.mainArray[i][j] , j*this.cellWidth  + this.cellWidth*0.40,((i+1)*this.cellWidth ) - this.cellWidth*0.40)
        }
    }

    drawBoard()
    {
        for ( let i = 0 ; i < this.n;i++)
        for(let j = 0 ; j < this.n ;j++)
        {
 

            if(!(this.zeroIndex_x == i & this.zeroIndex_y == j))
                this.tileArray[j][i].draw(); 
                  

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
            
            console.log(" Cell : ", cellIndex_x, " , " , cellIndex_y);  
            console.log("cell Number : ", this.tileArray[cellIndex_x][cellIndex_y].number)
            if(!(this.zeroIndex_x == cellIndex_x & this.zeroIndex_y == cellIndex_y))
                this.tileArray[cellIndex_y][cellIndex_x].highlight();
            

        }
    }

    hoveredOut()
    {
        isHovered = false;
        // console.log(" CameOut ", " Value : ", isHovered)
       
    }


 
   


}