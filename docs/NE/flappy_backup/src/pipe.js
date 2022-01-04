// Code inspired from Daniel shifman ( Condinf Train)
class Pipe
{
    // Constructor 
    constructor(speed)
    {
        this.spacing  = SPACING;
        this.top     = random(canvasHeight / 6 , canvasHeight * 0.75);
        this.bottom  = height  - (this.spacing + this.top);
        this.width   = 80;
        this.x = width;
        this.speed = DISPLACEMENTSPEED;
        this.outOfScreen = false;
    }

    // Function to Identify the whether the bird is inside the pipe area ( its )
    hits(bird)
    {
        if(bird.x + 14 >= this.x && bird.x -14 <= this.x+this.width ) 
        {
            if(bird.y - 14 < this.top || bird.y + 14 > ( height - this.bottom))
            {
                return true;
            }     
        }

        return false; // Default
    }

      // Indentify whether bird is within the gap
      inbetweenPipes(bird)
      {
          let inGap = false;
          let insidePipe = false;
          let tolerance = 10;
          if(bird.x >= this.x - tolerance && bird.x <= this.x+this.width + tolerance*0.5 ) 
          {
                inGap  = true;
              if(bird.y < this.top || bird.y > ( height - this.bottom))
              {
                  insidePipe = false
              }     
          }
          if(inGap & !insidePipe)
            return true; // Default
          else
            return false;
      }

      // This function Displayes pipe
      display()
      {
        //Set the rect mode to corner
        fill(11, 153, 61);
        rectMode(CORNER);
        rect(this.x, 0, this.width, this.top);  // TOp rectangle
        rect(this.x, height - this.bottom, this.width, this.bottom);

      }


      // Update the Speed of pipe movement 
      // This Determines the Speed of the game
      update() {
        this.x -= this.speed;
      }


      offscreen() {
        if (this.x + this.width <0) {
          return true;
        } else {
          return false;
        }
      }

    
}
