let time = 0;
let wave = [];
let gameObject;
let maxElement;
let gridSpace;
let nMoves = 0;
let nEmptySpaces = 0;
let gameOverFlag = 0;

let textSize1 = 30;
let MaxElemRow = 0;
let MaxElemCol = 0;

// setup Global Variabales

var gridSize = 4;
var offsetPixels = 15;

var GameMaxTile = 2048;

let colors = [];

var Score = 0;

let X1 =  0 ;
let X2 = 0;
let Y1 = 0;
let Y2 = 0;





function colorPicker(value)
{
  let colorArray = [];
  switch (value) {
    case 2:
    case 256:
      colorArray[0] = 255;
      colorArray[1] = 0;
      colorArray[2] = 0;
      break;
   
    case 4:
    case 512:
      colorArray[0] = 0;
      colorArray[1] = 0;
      colorArray[2] = 255;
    break;

    case 8:
      case 128:
      colorArray[0] = 203;
      colorArray[1] = 21;
      colorArray[2] = 115;

    break;

    case 16:
    case 2048:
      colorArray[0] = 206;
      colorArray[1] = 172;
      colorArray[2] = 0;

    break;

    case 32:
      colorArray[0] = 14;
      colorArray[1] = 7;
      colorArray[2] = 149;
    break;

    case 64:
      case 1024:
      colorArray[0] = 91;
      colorArray[1] = 52;
      colorArray[2] = 0;
    break;

 

  
    default:
      colorArray[0] = 200;
      colorArray[1] = 200;
      colorArray[2] = 200;
      break;
  }

  return colorArray;
}


function setup() 
{
  strokeWeight(4);
  stroke(255, 204, 0);
  translate(200, 200, 100);
  var cnv = createCanvas(500, 500);
  // var x = (windowWidth - width) / 2;
  // var y = (windowHeight - height) / 2;
  // cnv.position(x, y);
  cnv.parent('div-2');

  gameObject = new gameClass();
  //frameRate(60);
  fill(255,229,164);

  // draw Grid lines
  gridSpace = width / gridSize;
  rect(0, 0, width, height);
  for (let i = 1; i < gridSize; i++) 
  {
    strokeWeight(1);
    stroke(0, 0, 0);
    line(i * gridSpace, 0, i * gridSpace, height);
    line(0, i * gridSpace, width, i * gridSpace);
  }

  

  nEmptySpaces = gridSize * gridSize;

  gameObject.fillZeros();

  // Reset Button
  var button = createButton("reset");
	button.position((windowWidth - width )/2 ,(windowHeight - 0.3*height));
  button.mousePressed(reload);

  // Score Card 
  paragraph = createP(' ');
  paragraph.position((windowWidth  - width)/2 ,(windowHeight - 0.35*height));

  paragraph2 = createP(' ');
  paragraph.position((windowWidth  - width)/2 ,(windowHeight - 0.25*height));
  

  // Score Card

  //gameObject.insertNewNumber();

  initialiser();


 }



function draw() {
  
  
  background(0);
  for (let i = 1; i < gridSize; i++) 
  {
    strokeWeight(4);
    stroke(0, 124, 40);
    line(i * gridSpace, 0, i * gridSpace, height);
    line(0, i * gridSpace, width, i * gridSpace);
  }
  
//   strokeWeight(2);
//   stroke(0, 100, 100);
  line(0, 0, 0, height);
  line(0 , 0, width,0);
  line(0, height, width ,height);
  line(width, 0,width ,height);


  gameObject.displayNumbers();
  gameObject.updateEmpty();

  gameObject.updateScore();


  if(gameOverFlag) gameObject.displayGameOver();

  if(maxElement == GameMaxTile) gameObject.displayGameWin();

  // create a tile at random position

}

function windowResized() {
  centerCanvas();
}

function keyPressed()
{
  if (keyCode === UP_ARROW) {
    gameObject.moveDirection("up");
  }
   else if (keyCode === DOWN_ARROW) {
    gameObject.moveDirection("down");
  } 
  else if (keyCode === RIGHT_ARROW) {
    gameObject.moveDirection("right");
  } 
  else if (keyCode === LEFT_ARROW) {
    gameObject.moveDirection("left");
  }
  
}

function touchStarted() { 
  X1 = mouseX; 
  Y1 = mouseY; 
} 


function touchEnded() { 
  X2 = mouseX ; 
  Y2 = mouseY; 

   if(Y2 - Y1  >  120 )
   {
    gameObject.moveDirection("down");
    console.log("Swipwe Down ");

   }

   else if(Y1 - Y2  >  120 ) 
   {
    gameObject.moveDirection("up");
    console.log("Swipwe up ");

   }


   else if(X1 - X2  >  120 ) 
   {
    gameObject.moveDirection("left");
    console.log("Swipwe left ");


   }

   else if(X2 - X1  >  120 )
   {
    gameObject.moveDirection("right");
    console.log("Swipwe right ");


   }


   //paragraph2.html(" X1 : " +  X1 + " X2 : " + X2 + " Y1 : " + Y1 + " Y2 : "+ Y2);
   console.log(" X1 : " , X1 ," X2: " , X2, " Y1 : " , Y1 , " Y2 : " , Y2  );


} 




function initialiser()
{
    gameObject.insertNewNumber();

    b = gameObject.checkGameOver();

    // gameObject.gameArray[0][0] = 1024;
    // gameObject.gameArray[0][1] = 1024;

}

function reload()
{
  gameObject.fillZeros();
  gameObject.insertNewNumber();

  b = gameObject.checkGameOver();
		
		
}


function gameClass() {
  // Main Array of the game
  this.gameArray = [];
  this.prevGameArray = [];

  this.EmptyArray = [];



  this.fillZeros = function() {
    for (let i = 0; i < gridSize; i++) 
    {
      this.gameArray[i] = [];
      this.prevGameArray[i] = [];
      for (let j = 0; j < gridSize; j++) 
      {
        this.gameArray[i][j] = 0;
        this.prevGameArray[i][j] = 0;
      }
    }
  };





  this.updateEmpty = function() {
    nEmptySpaces = 0;
    let tempMax = 0;
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (this.gameArray[i][j] === 0) 
        {
          this.EmptyArray[nEmptySpaces] = (i * gridSize) + j;
          nEmptySpaces++;
        }
        else
        {
            if(tempMax < this.gameArray[i][j])
            {
                tempMax = this.gameArray[i][j];
                MaxElemCol = j;
                MaxElemRow = i;
            }
        }
      }
    }

    maxElement = tempMax;
  };





  this.displayNumbers = function() {
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {

        if (this.gameArray[i][j] !== 0) 
        {
            textSize(textSize1+10);

            if(this.gameArray[i][j] > 1000)
            {
              textSize(textSize1)
            }
            
          colorArray =   colorPicker(this.gameArray[i][j]);
          fill(colorArray[0], colorArray[1], colorArray[2]);
          noStroke();
          rect(j*gridSpace + 0.5*offsetPixels, i*gridSpace + 0.5*offsetPixels, gridSpace- offsetPixels, gridSpace - offsetPixels,offsetPixels,offsetPixels);
          noStroke();
          fill(255);
          // rectMode(CENTER);
          text(this.gameArray[i][j], (j) * gridSpace + textSize1, (i+1) * gridSpace - 50);
          // fill(255);
        }

        else
        {
          fill(0,237,120,9);
          // tint(255, 127); 
          noStroke();
          rect(j*gridSpace + 0.5*offsetPixels, i*gridSpace + 0.5*offsetPixels, gridSpace- offsetPixels, gridSpace - offsetPixels,offsetPixels,offsetPixels);
        }
      }
    }


  };



  this.insertNewNumber = function() {
    this.updateEmpty();
    // console.log(" NEW NUM INSERY");
    // console.log(nEmptySpaces, gridSize);

    let randNum = floor(random(0, nEmptySpaces));
    let index  = this.EmptyArray[randNum];

    let k = floor (index / gridSize);
    let m = index % gridSize;

    if (maxElement < 64) {
      this.gameArray[k][m] = 2;
    }

    else if ( maxElement > 128 && maxElement < 512)
    {
      if(randNum % 4 == 0) 
      {
        this.gameArray[k][m] = 4;
      } 
      else{
        this.gameArray[k][m] = 2;
      }
    }

    else
    {
      // let index  = this.EmptyArray[randNum];
      let t_found = false;
      let t_index = 0;
      let kk;
      let mm;
      for (let i = 0; i < this.EmptyArray.length; i++) {
        
        let index1  = this.EmptyArray[i];
        kk = floor (index1 / gridSize);
        mm = index1 % gridSize;

        if(kk === MaxElemRow || mm === MaxElemCol ) 
        {
          t_found = true;
          t_index = i;
          break;

        }     
      }

      if(t_found)
      {
        index1  = this.EmptyArray[t_index];
      }
      else
      {
        index1  = this.EmptyArray[randNum]; 
      }
      
      
      kk = floor (index1 / gridSize);
      mm = index1 % gridSize;
      if(randNum % 2 == 0) 
      {
        this.gameArray[kk][mm] = 4;
      } 
      else{
        this.gameArray[kk][mm] = 4;
      }
    }



  };


  this.moveDirection = function(direction) {
   
    this.copyToPrevArray();

    switch (direction) {
      case 'up':
        for (let col = 0; col < gridSize; col++) {
          let tempSize = 0;
          let tempArray = [];

          for (let row = 0; row < gridSize; row++) 
          {
            if (this.gameArray[row][col] !== 0)
            {
              tempArray[tempSize] = this.gameArray[row][col];
              tempSize++;
            }
            this.gameArray[row][col] = 0;
          }


          let additionDone = 0;
          for (let k = 0; k < tempSize; k++) 
          {
              this.gameArray[k - additionDone][col] = tempArray[k];
            if(k > 0 && additionDone === 0 && tempArray[k] === tempArray[k-1])
            {
                this.gameArray[k-1][col] *= 2;
                this.gameArray[k][col] = 0;
                additionDone = 1;
                // tempArray[k+1] = 0;
            }
          }


        }

        break;

        case 'left':
        for (let row = 0; row < gridSize; row++) {
          let tempSize = 0;
          let tempArray = [];

          for (let col = 0; col < gridSize; col++) 
          {
            if (this.gameArray[row][col] !== 0)
            {
              tempArray[tempSize] = this.gameArray[row][col];
              tempSize++;
            }
            this.gameArray[row][col] = 0;
          }


          let additionDone = 0;
          for (let k = 0; k < tempSize; k++) 
          {
              this.gameArray[ row ][k - additionDone] = tempArray[k];
            if(k > 0 && additionDone === 0 && tempArray[k] === tempArray[k-1])
            {
                this.gameArray[row][k-1] *= 2;
                this.gameArray[row][k] = 0;

                additionDone = 1;
            }
          }

        }

        break;

        
        case 'down':
        for (let col = 0; col < gridSize; col++) {
          let tempSize = 0;
          let tempArray = [];

          for (let row = gridSize -1; row >= 0; row--) 
          {
            if (this.gameArray[row][col] !== 0)
            {
              tempArray[tempSize] = this.gameArray[row][col];
              tempSize++;
            }
            this.gameArray[row][col] = 0;
          }


          let additionDone = 0;
          for (let k = 0; k < tempSize; k++) 
          {
              this.gameArray[gridSize - 1 - k + additionDone][col] = tempArray[k];
            if(k > 0 && additionDone === 0&& tempArray[k] === tempArray[k-1] )
            {
                this.gameArray[gridSize - k ][col] *= 2;
                this.gameArray[gridSize - k -1][col] = 0;

                additionDone = 1;
            }
          }

        }

        break;

        
        case 'right':
        for (let row = 0; row < gridSize; row++) {
          let tempSize = 0;
          let tempArray = [];

          for (let col = gridSize -1; col >= 0; col--) 
          {
            if (this.gameArray[row][col] !== 0)
            {
              tempArray[tempSize] = this.gameArray[row][col];
              tempSize++;
            }
            this.gameArray[row][col] = 0;
          }


          let additionDone = 0;
          for (let k = 0; k < tempSize; k++) 
          {
              this.gameArray[ row ][gridSize - 1 - k + additionDone] = tempArray[k];
            if(k > 0 && additionDone === 0 && tempArray[k] === tempArray[k-1])
            {
                this.gameArray[row][gridSize - k ] *= 2;
                this.gameArray[row][gridSize - k -1] = 0;

                additionDone = 1;
            }
          }

        }

        break;     

      default:

        break;
    }
    // Update the Empty Queue
    this.updateEmpty();

    gameOverFlag = this.checkGameOver();

    if(gameOverFlag) gameObject.displayGameOver();


    if(this.MoveMadeCheck())
    {
      // console.log(" MOVE MADE - calling insert new nu");
      this.insertNewNumber();
      nMoves++;
    }

    
    if(maxElement === GameMaxTile) gameObject.displayGameWin();

  };


  this.checkGameOver = function()
  {
      let noSpaceLeft = true;
      if(nEmptySpaces !== 0) noSpaceLeft = false;

      let noMoveLeft  = true;
      for(let row  = 0 ; row < gridSize ; row++)
      {
          for (let col = 0 ; col < gridSize - 1 ; col++)
          {
              if(this.gameArray[row][col] == this.gameArray[row][col+1])
              {
                noMoveLeft = false;
              }
          }
      }

      for(let col  = 0 ; col < gridSize ; col++)
      {
          for (let row = 0 ; row < gridSize - 1 ; row++)
          {
              if(this.gameArray[row][col] == this.gameArray[row+1][col])
              {
                noMoveLeft = false;
              }
          }
      }

      if(noMoveLeft && noSpaceLeft) return true;
      else return false;

  };



  this.displayGameOver = function()
  {
    if(gameOverFlag)
    {
      console.log("Gameoverfla : ", gameOverFlag);
      fill(255, 0, 0);
      textSize(60);
      text("Game OVER", 40,height/2);
    }
  };

  
  this.copyToPrevArray = function()
  {
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        this.prevGameArray[i][j] = this.gameArray[i][j];
      }
    }

  };


  this.MoveMadeCheck = function()
  {
    let moveMadeFlag = false;
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if(this.prevGameArray[i][j] != this.gameArray[i][j])
        {
          moveMadeFlag = true;
        }
      }
    }
    return moveMadeFlag;
  };


  this.displayGameWin = function()
  {

      // console.log("Gameoverflag : ", gameOverFlag);
      fill(255, 0, 0);
      textSize(60);
      text("You have Won ...!", 40,height/2);
      let userInput = confirm("Do you want to Continue playing the game ..");
      if(userInput)
      {
        GameMaxTile *= 2;
      }

      else
      {
        reload();
      }

  };

  this.updateScore = function ()
  {
    paragraph.html( "Number of Moves  : " + nMoves  );
  };



}
