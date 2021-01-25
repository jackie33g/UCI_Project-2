var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 0,
  right: 0,
  bottom: 150,
  left: 0
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

///Import Data
d3.json("http://127.0.0.1:5000/scatterplot_chart").then(function(info) {

  console.log(info)
// Add X axis

var xTicks = [];
var xTicksIndex = [];
for(i=0;i<info.results.length;i++){
var xTickData = info["results"][i]["company_location"];

  if(xTicks.includes(xTickData)){
    // document.write("Value exists!")
  }
  else{
  xTicks.push(xTickData)
  xTicksIndex.push(xTicks.length);}
}
//  console.log(xTicksIndex)

var ticksData =[
  {index:xTicksIndex,
  country:xTicks}
];
// console.log(ticksData)

var company_location_index = [];
for(i=0;i<info.results.length;i++){
  for(j=0;j<xTicksIndex.length;j++ ){
   if(info["results"][i]["company_location"]===xTicks[j]){
    company_location_index.push(xTicksIndex[j])
   }
  }
}
// console.log(company_location_index)

info.results.forEach(function(data,i){
 data.ID = data.ID;
 data.company_location = data.company_location;
 data.country_of_bean_origin = data.country_of_bean_origin;
 data.rating = data.rating;
 data.company_location_index = company_location_index[i];
})

console.log(info)


var x = d3.scaleLinear()
.domain([-4,ticksData[0].index.length+1])
.range([ 0, width*1 ]);

var xAxis = svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x))
// .selectAll("text")
//     .attr("transform", "translate(-10,10)rotate(-90)")
//     .style("text-anchor", "end")
//     .style("font-size", 12)
//     .style("fill", "#69a3b2")

    svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width/2)
    .attr("y", height + margin.bottom-10)
    .text("Company Locations");
    


// Add Y axis
var y = d3.scaleLinear()
.domain([1.5, 5])
.range([ height, 0]);
svg.append("g")
.attr("transform", "translate(50,0)") 
.call(d3.axisLeft(y))
svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+20)
    .attr("x", -margin.top-100)
    .text("Rating")




// Add a clipPath: everything out of this area won't be drawn.
var clip = svg.append("defs").append("svg:clipPath")
  .attr("id", "clip")
  .append("svg:rect")
  .attr("width", width )
  .attr("height", height )
  .attr("x", 0)
  .attr("y", 0);

// Color scale: give me a specie name, I return a color
var color = d3.scaleOrdinal()
.domain([0,ticksData[0].index.length])
.range([ "#111111","#ffffff"])

// Add brushing
var brush = d3.brushX()                 // Add the brush feature using the d3.brush function
  .extent( [ [0,0], [width,height] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
  .on("end", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function

// Create the scatter variable: where both the circles and the brush take place
var scatter = svg.append('g')
.attr("clip-path", "url(#clip)")


// Add circles

scatter
.selectAll("circle")
.data(info.results)
.enter()
.append("circle")
  .attr("cx", function (d) { return x(d.company_location_index); } )
  .attr("cy", function (d) { return y(d.rating); } )
  .attr("r", 5)
  .style("fill", function (d) { return color(d.country_of_bean_origin) } )
  .style("opacity", 0.5)

// Add the brushing
scatter
.append("g")
  .attr("class", "brush")
  .call(brush);

// A function that set idleTimeOut to null
var idleTimeout
function idled() { idleTimeout = null; }

// A function that update the chart for given boundaries
function updateChart() {

extent = d3.event.selection

// If no selection, back to initial coordinate. Otherwise, update X axis domain
if(!extent){
  if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
  x.domain([ -4,xTicksIndex.length+1])
}else{
  x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
  scatter.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
}

// Update axis and circle position
xAxis.transition().duration(1000)
.call(d3.axisBottom(x).tickValues(ticksData[0].index).tickFormat((d,i)=>ticksData[0].country[i]))
.selectAll("text")
.attr("transform", "translate(-10,10)rotate(-90)")
    .style("text-anchor", "end")
    .style("font-size", 12)
    .style("fill", "#69a3b2")

scatter
  .selectAll("circle")
  .transition().duration(1000)
  .attr("cx", function (d) { return x(d.company_location_index); } )
  .attr("cy", function (d) { return y(d.rating); } )

}



})

