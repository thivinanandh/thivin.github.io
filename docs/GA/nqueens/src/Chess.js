class Chess
{
    constructor(n,canvasObject,queenImage)
    {
        this.n = n;
        this.canvasObject = canvasObject;
        this.cellWidth = this.canvasObject.width / this.n;   // Square will remain same for height
        this.textSize = this.cellWidth/3;
        this.queenImage = queenImage;

        //Call Create  oard fucntion
        this.createBoard();
        
        let tempArray = [];
        for (let i = 0 ; i < this.n ; i++)
            tempArray[i] = 0;
        this.displayQueens(tempArray);

        this.imageArray = [];
    }

    // INitialises and Draws a board in Canvas
    createBoard()
    {
        this.canvasObject.background(255, 255, 255);
        
        let colorVal_square = 0;
        let colorVal_text = 0;
        //Create the Squares as mentioned in 
        for (let i =0 ; i < this.n ; i++)
        {
            for ( let j=0; j < this.n ; j++)
            {
                if((i + j) % 2 == 0  )   /// white Square
                {
                    colorVal_square =   color(241,221,179);
                    colorVal_text   =   color(184,136,94);
                    
                }
                else
                {
                    colorVal_square     =   color(184,136,94);
                    colorVal_text       =   color(241,221,179);
                }
                
                //create a Rectangle
                let xpos = i*this.cellWidth; 
                let ypos = j*this.cellWidth;
                fill(colorVal_square)
                stroke('none')
                rect(xpos,ypos,this.cellWidth,this.cellWidth)


            }
        }
        // --- Update the text on the Chess boards
        // For columns , Number from top 
        let number = this.n;

        for ( let i = 0 ; i < this.n ; i++)
        {
            
            let j = this.n;
            
            if(i%2 !=0)
                colorVal_text   =   color(184,136,94);
            else
                colorVal_text = color(241,221,179)
            
            fill(colorVal_text);
            noStroke();
            textSize(this.textSize)
            text(number.toString(),j*this.cellWidth-(this.textSize*0.7),(i)*this.cellWidth+(this.textSize));
            number --;
        }

        let ascii= 97;
        for ( let i = 0 ; i < this.n ; i++)
        {
            
            let j = this.n;
            if(i%2 ==0)
                colorVal_text = color(241,221,179)
            else
                colorVal_text   =   color(184,136,94);
            
            let char = String.fromCharCode(ascii);
            fill(colorVal_text);
            noStroke();
            textSize(this.textSize)
            text(char,(i)*this.cellWidth+ (this.textSize*0.7),j*this.cellWidth-(this.textSize*0.7));
            ascii++;
        }
    } // End of CreateBoard


    displayQueens(Array)
    {
        // Delete the existing images 
        this.createBoard();
        for (let i =0 ; i < Array.length ; i++)
        {
            let col = Array[i];
            image(this.queenImage, col*this.cellWidth+ this.cellWidth*0.1, i*this.cellWidth + this.cellWidth*0.1,this.cellWidth *0.7,this.cellWidth *0.7);
        }
        
        
    }


}