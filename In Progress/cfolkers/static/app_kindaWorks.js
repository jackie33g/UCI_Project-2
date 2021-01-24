// var svgWidth = 1000;
// var svgHeight = 1000;

// var margin = {
//   top: 20,
//   right: 40,
//   bottom: 40,
//   left: 50
// };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
// var svg = d3.select(".chart")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Import Data
d3.json("http://127.0.0.1:5000/dependency_chart").then(function(info) {
  var array = info.results;
  // console.log(array)

  var toChartArray = []

  for (var i = 0; i <array.length; i++) {
    toChartArray.push([array[i].company_location, array[i].country_of_bean_origin, array[i].sum_num]);  
  }
  console.log(toChartArray)

  Highcharts.chart('container', {

    title: {
        text: 'Flow of Chocolate From Production to Manufater Country'
    },

    accessibility: {
        point: {
            valueDescriptionFormat: '{index}. From {point.from} to {point.to}: {point.weight}.'
        }
    },

    series: [{
        keys: ['to', 'from', 'weight'],
        data: toChartArray,
        type: 'dependencywheel',
        name: 'Flow of Cacao',
        dataLabels: {
            rotation: 270,
            // align: middle,
            color: '#333',
            // textPath: {
            //     enabled: true,
            //     attributes: {
            //         dy: 5
            //     },
            // },
            distance: 10
        },
        size: '95%'
    }]

});

});
