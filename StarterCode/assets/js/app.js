// Define SVG area dimensions
var svgWidth = 750;
var svgHeight = 450;

var margin = {top: 10, right: 30, bottom: 60, left: 60};
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// append the svg object to the id selected
var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
//append g element to svg
var chartGroup = svg.append("g")
.attr("transform",`translate(${margin.left}, ${margin.top})`);

    let cvs_data = "assets/data/data.csv"
//read the data
d3.csv(cvs_data).then(function(usCensusData) {
console.log(d3.max(usCensusData))
//console.log(data.poverty)
//console.log(data.healthcare)
usCensusData.forEach(function(data) {
    data.healthcare = +data.healthcare;
    data.poverty = +data.poverty;
});
  // add xAxis - [d3.min(data), d3.max(data)]
  var x = d3.scaleLinear()
    .domain(d3.extent(usCensusData, d => d.poverty))
    .range([ 0, chartWidth ]);

  // add yAxis
  var y = d3.scaleLinear()
    .domain([0, d3.max(usCensusData, d => d.healthcare)])
    .range([ chartHeight, 0]);



  // Create var to hold axis 
  var bottomAxis = d3.axisBottom(x);
  var leftAxis = d3.axisLeft(y);

  // Append axes to the chart
  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

  // Create circles
  var circlesGroup = chartGroup.selectAll("Circle")
    .data(usCensusData)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.poverty+0.25))
    .attr("cy", d => y(d.healthcare-4))
    .attr("r", "9")
    .attr("fill", "rgb(135,187,212) ") 
    .attr("opacity", "0.8");




var dotTxt = chartGroup.selectAll("null")
.data(usCensusData)
.enter()
.append("text");

dotTxt
    .attr("x", function(d) {
        return x(d.poverty+0.15);
    })
    .attr("y", function(d) {
        return y(d.healthcare-4.25);
    })
    .text(function(d) {
        return d.abbr;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "10px")
    .attr("text-anchor", "c")
    .attr("fill", "white");

 
chartGroup.append("g")
.append("text")
.attr("transform", "rotate(-90)")
.attr("y", -30)
.attr("x", 0 - (chartHeight / 2))
.attr("dy", "1rm")
.style("text-anchor", "middle")
.text("Lacks Healthcare (%)");

chartGroup.append("g")
.append("text")
.attr("transform", `translate(${chartWidth / 2}, ${chartHeight +  40})`)
.style("text-anchor", "middle")
.text("In Poverty (%)");

})

