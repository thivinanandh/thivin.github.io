let time = 0;
let wave = [];


function setup() {
    createCanvas(1500,700);
	//frameRate(60);

	slider = createSlider(1,1000,5);
	slider.position(30,30);
	slider.style('width', '350px');
	text('n value ');
	timeslider = createSlider(1,200,50);
	timeslider.style('width', '350px');
	timeslider.position(30,60);
	ampslider = createSlider(50,200,130);
	ampslider.style('width', '350px');
	ampslider.position(30,90);

	paragraph = createP(' ');
	paragraph2 = createP(' ');
	paragraph3 = createP(' ');

	paragraph.position(390,18);
	paragraph2.position(390,58);
	paragraph3.position(390,88);
	
	var button = createButton("reset");
	button.position(650,30);
	button.mousePressed(reload);
}



function draw() {
    background(0);
    translate(350,350);
	let count = 0; 
	let x = 0;
	let y = 0;
	// Display Silder value in a text box
	prev_slider_val = slider.value();
	
	//document.getElementById("slider").innerHTML = "Adjust the value of N using the slider" ;
	paragraph.html( "The Value of N              : " + slider.value() );
	paragraph2.html( "The Value of time step     : " + timeslider.value()*0.001 );
	paragraph3.html( "Amplitude                  : " + ampslider.value()*2 );
	
	
	
	for(let i = 0; i< slider.value() ; i++ )
	{	
		
		let n = i * 2 +1;
		
		let prevx = x;
		let prevy = y;
		// polar to cartesian 
		let radius = ampslider.value() * (4/ (n * PI));
		x += radius  * cos(n*time);
		y += radius  * sin(n*time);
	 	
		stroke(255, 100);
	    noFill();
		strokeWeight(1);
	    ellipse(prevx, prevy, radius * 2);


		
		//fill(255);
		strokeWeight(1);
		stroke(0,255,0);
		line(prevx,prevy,x,y);
		//ellipse(x,y,10);
	
	}
	wave.unshift(y);
	
	// Draw the y point as wave
	translate(500,0); 
	strokeWeight(1);
	stroke(255,0,0);
	line(x-500,y,0,wave[0]);
	
	
	beginShape(); 
	noFill();
	count ++;
	
	for (let i = 0; i< wave.length; i++)
	{
		stroke(0,0,255);
		strokeWeight(3);
		vertex(i,wave[i]);
		stroke(0,0,255);
		strokeWeight(3);

	}
	
	for (let j = 0; j< wave.length; j++)
	{
		stroke(255,255,255);
		strokeWeight(1);
		if(wave[j] < 0 )
			point(j, -ampslider.value());
		if(wave[j] > 0 )
			point(j, ampslider.value());
		if((time % PI) < 0.001 )
			line(j, -ampslider.value() , j , -ampslider.value());
		stroke(0,0,255);
		strokeWeight(3);

	}

	count ++;
	endShape(); 
	
	
    time += timeslider.value() * 0.001;

	// control number of points on canvas
	if ( wave.length > 500){
		wave.pop();
	}
	//delay(0.01);
}


function reload()
{
		history.go(0);
		
}