var svgWidth = 1000;
var svgHeight = 1000;

var margin = {
  top: 20,
  right: 40,
  bottom: 40,
  left: 50
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


                      // // Lable for matrix components 
                      // var metric = 'Country of Origin', // country_of_bean_origin owner
                      //     attr1 = 'Country of Manufacter', // company_location
                      //     attr2 = 'Number'; // value_num

                      // var elements = [attr1, attr2, metric];


// Import Data
d3.json("http://127.0.0.1:5000/dependency_chart").then(function(info) {
  var array = info.results;
  // console.log(array)

  // Transform data for matrix!!!! 
  // https://bl.ocks.org/curran/8c5bb1e0dd8ea98695d28c8a0ccfc533
  function generateMatrix(data){
    var nameToIndex = {},
        names = [],
        matrix = [],
        n = 0, i, j;

    function recordName(name){
      if( !(name in nameToIndex) ){
        nameToIndex[name] = n++;
        names.push(name);
      }
    }

    data.forEach(function (d){
      recordName(d.origin);
      recordName(d.destination);
    });

    for(i = 0; i < n; i++){
      matrix.push([]);
      for(j = 0; j < n; j++){
        matrix[i].push(0);
      }
    }

    data.forEach(function (d){
      i = nameToIndex[d.origin];
      j = nameToIndex[d.destination];
      matrix[j][i] = d.count;
    });

    matrix.names = names;

    return matrix;
  }

  var matrix = generateMatrix(array);
  console.log(matrix)
    

                        // // https://sdk.gooddata.com/gooddata-js/example/chord-chart-to-analyze-sales
                        // var transformData = function(dataResults) {
                        //     data = array.results
                        //     length = data.length,
                        //     attr1 = data.company_location; // 
                        // //     // attr2 = headers[1],
                        // //     // metric = headers[2],
                        // //     // attr1Keys = {},
                        // //     // attr2Keys = {},
                        // //     // matrix = [];

                        //     console.log("Length "+length)
                        //     console.log(attr1)
                        // };

                        // transformData(info) //so runs function

  // CHART STARTS HERE
  // https://jyu-theartofml.github.io/posts/circos_plot &
  // https://github.com/fzaninotto/DependencyWheel/blob/master/js/d3.dependencyWheel.js 

  
  // d3.chart.dependencywheel = function(options) {
  // }
});
