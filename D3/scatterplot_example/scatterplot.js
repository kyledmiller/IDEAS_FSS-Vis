//some global variables (not the best style, but will work for us)
var data;

// define the size of the svg
var margin = {top: 50, right: 50, bottom: 50, left: 50},
	width = 500;// - margin.left - margin.right,
	height = 500;// - margin.top - margin.bottom;

//define some colors (https://github.com/d3/d3-scale-chromatic)
var colorMap = d3.scaleOrdinal(d3.schemeSet1);

var x, y

function init(inputData, year){

	data = inputData.filter(function(d) {return d.party_code == 100 || d.party_code == 200 || d.party_code == 328 });
	console.log(data);

	// now create the svg element
	var svg = d3.select("#container").append("svg") //svg is js, "svg" ref a css element
		// .append assigns an element
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g") //child element of svg
			.attr('id','scatterSVG')
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	//define the scales: these will convert from pixels to data units
	x = d3.scaleLinear().range([0, width]);
	y = d3.scaleLinear().range([height, 0]);

	//nice does what it sounds like : gives you nice round values 
	//creates a domain and range for the plot
	// x.domain(d3.extent(data, function(d) { return +d.x_dimension; })).nice(); //extent finds min/max vals
	// y.domain(d3.extent(data, function(d) { return +d.alt_dimension; })).nice();
	x.domain([-1,1]);
	y.domain([-1,1]);

	//define the axes
	var xAxis = d3.axisBottom(x);
	var yAxis = d3.axisLeft(y);

	// add the axes to the SVG element
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis) //xAxis is built-in
	.append("text")
		.attr("class", "label")
		.attr("x", width -20) //"x", "y" are page positions
		.attr("y", 40)
		.style("text-anchor", "end")
		.text("Fiscally Conservative Lean");

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("x", -20)
		.attr("y", -50)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Socially Progressive Lean")

	//add slider
	var slider = document.getElementById("myRange");

	// Update the current slider value (each time you drag the slider handle)
	slider.oninput = function() {
		populateScatter(x, y, this.value);
	}

	var slidecontainer = d3.select('#slidecontainer');
	slidecontainer.append("label")
		.attr('for', 'congress_num')
		.style('display','inline-block')
		.style('width','150px')
		.style('text-align','left')
		.html('Congress #<span id="congress_num"></span>');

	//add the data and the legend to the scatter plot
	populateScatter(x, y)
}


function populateScatter(x, y, congress_num=114){

	legend_dict={ 
		200:"Republican", 
		100:"Democrat", 
		328:"Independent"
   };

	var svg = d3.select('#scatterSVG'); //could have been passed as global variable
	
	svg.selectAll(".dot").remove() //for when we use this function to update the plot
	svg.selectAll(".legend").remove() //for when we use this function to update the plot

   // Update congress
   	d3.select("#congress_num").text(congress_num);

	var colors = []; //for the legend

	//add all the dots
	svg.selectAll(".dot") //.dot is class, dot is string
		.data(data).enter()
		.append("circle")
			.filter(function(d) {return d.congress_number == congress_num})
			.attr("class", "dot")
			.attr("r", 5)
			.attr("cx", function(d) { return x(+d.x_dimension); })
			.attr("cy", function(d) { return y(+d.alt_dimension); })
			.style("fill", function(d) { 
				//for the legend
				if(!colors.includes(+d.party_code)) {
					colors.push(+d.party_code);
				}
				return colorMap(+d.party_code);
			})
			.style("opacity",0.7);



	//add a legend, using the colors array defined above
	var legend = svg.selectAll(".legend")
		.data(colors).enter()
		.append("g")
			.attr("class", "legend")
			.attr("transform", function(d, i) { return "translate("+margin.right+"," + i * 20 + ")"; });

	legend.append("rect")
		.attr("x", width - 18)
		.attr("width", 18)
		.attr("height", 18)
		.style("fill", function (d) {return colorMap(d)});

	legend.append("text")
		.attr("x", width - 24)
		.attr("y", 9)
		.attr("dy", ".35em")
		.style("text-anchor", "end")
		.text(function(d) { return legend_dict[d]; });
}

//runs on load
d3.csv('data/congress_data.csv')	// read in data, pass ->
	.then(function(d) {     // name the data 'd'
		init(d)				// call init function, feed 'd'
	})
	.catch(function(error){
		console.log('ERROR:', error)	
	})

