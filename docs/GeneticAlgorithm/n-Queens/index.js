// population
var slider = document.getElementById("populationSlider");
var output = document.getElementById("Population");
var output_1 = document.getElementById("Population_1");

//Mutation Rate
var mutSlider = document.getElementById("mutationSlider");
var mut = document.getElementById("Mutation");
var mut_1 = document.getElementById("Mutation_1");


//N value Rate
var nSlider = document.getElementById("nSlider");
var n_1 = document.getElementById("n_1");

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
    output_1.value = this.value;
  }

  // Update the current slider value (each time you drag the slider handle)
  mutSlider.oninput = function() {
    mut.innerHTML = this.value;
    mut_1.value = this.value;
  }


  // Update the current slider value (each time you drag the slider handle)
  nSlider.oninput = function() {
    n_1.value = this.value;
    let a  = new Chess(this.value,myCanvas,queenImage)
  }