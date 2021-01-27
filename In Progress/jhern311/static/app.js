var svgWidth = 700;
var svgHeight = 700;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
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

// Import Data
d3.json("/donut_top10").then(function(info) {
  console.log("info" +info)
});

// Uncomment to style it like Apple Watch
/*
if (!Highcharts.theme) {
    Highcharts.setOptions({
        chart: {
            backgroundColor: 'black'
        },
        colors: ['#F62366', '#9DFF02', '#0CCDD6'],
        title: {
            style: {
                color: 'silver'
            }
        },
        tooltip: {
            style: {
                color: 'silver'
            }
        }
    });
}
// */

/**
 * In the chart render event, add icons on top of the circular shapes
 */
function renderIcons() {

  // Australia
  if (!this.series[0].icon) {
      this.series[0].icon = this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
          .attr({
              stroke: '#303030',
              'stroke-linecap': 'round',
              'stroke-linejoin': 'round',
              'stroke-width': 2,
              zIndex: 10
          })
          .add(this.series[2].group);
  }
  this.series[0].icon.translate(
      this.chartWidth / 2 - 10,
      this.plotHeight / 2 - this.series[0].points[0].shapeArgs.innerR -
          (this.series[0].points[0].shapeArgs.r - this.series[0].points[0].shapeArgs.innerR) / 2
  );

  // Denmark
  if (!this.series[1].icon) {
      this.series[1].icon = this.renderer.path(
          ['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8,
              'M', 8, -8, 'L', 16, 0, 8, 8]
      )
          .attr({
              stroke: '#ffffff',
              'stroke-linecap': 'round',
              'stroke-linejoin': 'round',
              'stroke-width': 2,
              zIndex: 10
          })
          .add(this.series[2].group);
  }
  this.series[1].icon.translate(
      this.chartWidth / 2 - 10,
      this.plotHeight / 2 - this.series[1].points[0].shapeArgs.innerR -
          (this.series[1].points[0].shapeArgs.r - this.series[1].points[0].shapeArgs.innerR) / 2
  );

  // Canada
  if (!this.series[2].icon) {
      this.series[2].icon = this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
          .attr({
              stroke: '#303030',
              'stroke-linecap': 'round',
              'stroke-linejoin': 'round',
              'stroke-width': 2,
              zIndex: 10
          })
          .add(this.series[2].group);
  }

  this.series[2].icon.translate(
      this.chartWidth / 2 - 10,
      this.plotHeight / 2 - this.series[2].points[0].shapeArgs.innerR -
          (this.series[2].points[0].shapeArgs.r - this.series[2].points[0].shapeArgs.innerR) / 2
  );

  // France
if (!this.series[3].icon) {
  this.series[3].icon = this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
      .attr({
          stroke: '#303031',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': 2,
          zIndex: 10
      })
      .add(this.series[3].group);
}

this.series[3].icon.translate(
  this.chartWidth / 2 - 10,
  this.plotHeight / 2 - this.series[3].points[0].shapeArgs.innerR -
      (this.series[3].points[0].shapeArgs.r - this.series[3].points[0].shapeArgs.innerR) / 2
);

 // Netherlands
 if (!this.series[4].icon) {
    this.series[4].icon = this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
        .attr({
            stroke: '#303031',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': 2,
            zIndex: 10
        })
        .add(this.series[4].group);
  }
  
  this.series[4].icon.translate(
    this.chartWidth / 2 - 10,
    this.plotHeight / 2 - this.series[4].points[0].shapeArgs.innerR -
        (this.series[4].points[0].shapeArgs.r - this.series[4].points[0].shapeArgs.innerR) / 2
  );

 // U.S.A
 if (!this.series[5].icon) {
    this.series[5].icon = this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
        .attr({
            stroke: '#303031',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': 2,
            zIndex: 10
        })
        .add(this.series[5].group);
  }
  
  this.series[5].icon.translate(
    this.chartWidth / 2 - 10,
    this.plotHeight / 2 - this.series[5].points[0].shapeArgs.innerR -
        (this.series[5].points[0].shapeArgs.r - this.series[5].points[0].shapeArgs.innerR) / 2
  );

   // New Zealand
if (!this.series[6].icon) {
    this.series[6].icon = this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
        .attr({
            stroke: '#303031',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': 2,
            zIndex: 10
        })
        .add(this.series[6].group);
  }
  
  this.series[6].icon.translate(
    this.chartWidth / 2 - 10,
    this.plotHeight / 2 - this.series[6].points[0].shapeArgs.innerR -
        (this.series[6].points[0].shapeArgs.r - this.series[6].points[0].shapeArgs.innerR) / 2
  );

   // Japan
if (!this.series[7].icon) {
    this.series[7].icon = this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
        .attr({
            stroke: '#303031',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': 2,
            zIndex: 10
        })
        .add(this.series[7].group);
  }
  
  this.series[7].icon.translate(
    this.chartWidth / 2 - 10,
    this.plotHeight / 2 - this.series[7].points[0].shapeArgs.innerR -
        (this.series[7].points[0].shapeArgs.r - this.series[7].points[0].shapeArgs.innerR) / 2
  );

 // Belgium
 if (!this.series[8].icon) {
    this.series[8].icon = this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
        .attr({
            stroke: '#303031',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': 2,
            zIndex: 10
        })
        .add(this.series[8].group);
  }
  
  this.series[8].icon.translate(
    this.chartWidth / 2 - 10,
    this.plotHeight / 2 - this.series[8].points[0].shapeArgs.innerR -
        (this.series[8].points[0].shapeArgs.r - this.series[8].points[0].shapeArgs.innerR) / 2
  );

   // U.K.
if (!this.series[9].icon) {
    this.series[9].icon = this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
        .attr({
            stroke: '#303031',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': 2,
            zIndex: 10
        })
        .add(this.series[9].group);
  }
  
  this.series[9].icon.translate(
    this.chartWidth / 2 - 10,
    this.plotHeight / 2 - this.series[9].points[0].shapeArgs.innerR -
        (this.series[9].points[0].shapeArgs.r - this.series[9].points[0].shapeArgs.innerR) / 2
  );
}

Highcharts.chart('container', {

  chart: {
      type: 'solidgauge',
      height: '100%',
      events: {
          render: renderIcons
      }
  },

  title: {
      text: 'Top 10 Countries by Rating',
      style: {
          fontSize: '32px'
      }
  },

  tooltip: {
      borderWidth: 0,
      backgroundColor: 'none',
      shadow: false,
      style: {
          fontSize: '16px'
      },
      
      pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',
      positioner: function (labelWidth) {
          return {
              x: (this.chart.chartWidth) / 2,
              y: (this.chart.plotHeight / 2) + 15
          };
      }
  },

  pane: {
    startAngle: 0,
    endAngle: 650,
    background: [{ // Track for Australia
        outerRadius: '118%',
        innerRadius: '108%',
        backgroundColor: Highcharts.color(Highcharts.getOptions().colors[0])
            .setOpacity(0.3)
            .get(),
        borderWidth: 0
    }, { // Track for Denmark
        outerRadius: '107%',
        innerRadius: '97%',
        backgroundColor: Highcharts.color(Highcharts.getOptions().colors[1])
            .setOpacity(0.3)
            .get(),
        borderWidth: 0
    }, { // Track for Canada
        outerRadius: '96%',
        innerRadius: '86%',
        backgroundColor: Highcharts.color(Highcharts.getOptions().colors[2])
            .setOpacity(0.3)
            .get(),
        borderWidth: 0
    }, { // Track for France
        outerRadius: '85%',
        innerRadius: '75%',
        backgroundColor: Highcharts.color(Highcharts.getOptions().colors[3])
            .setOpacity(0.3)
            .get(),
        borderWidth: 0
    }, { // Track for Netherlands
        outerRadius: '74%',
        innerRadius: '64%',
        backgroundColor: Highcharts.color(Highcharts.getOptions().colors[4])
            .setOpacity(0.3)
            .get(),
        borderWidth: 0
    }, { // Track for U.S.A
        outerRadius: '63%',
        innerRadius: '53%',
        backgroundColor: Highcharts.color(Highcharts.getOptions().colors[5])
            .setOpacity(0.3)
            .get(),
        borderWidth: 0
    }, { // Track for New Zealand
        outerRadius: '52%',
        innerRadius: '42%',
        backgroundColor: Highcharts.color(Highcharts.getOptions().colors[6])
            .setOpacity(0.3)
            .get(),
        borderWidth: 0
    }, { // Track for Japan
        outerRadius: '41%',
        innerRadius: '31%',
        backgroundColor: Highcharts.color(Highcharts.getOptions().colors[7])
            .setOpacity(0.3)
            .get(),
        borderWidth: 0
    }, { // Track for Belgium
        outerRadius: '30%',
        innerRadius: '20%',
        backgroundColor: Highcharts.color(Highcharts.getOptions().colors[8])
            .setOpacity(0.3)
            .get(),
        borderWidth: 0
    }, { // Track for U.K.
        outerRadius: '19%',
        innerRadius: '9%',
        backgroundColor: Highcharts.color(Highcharts.getOptions().colors[9])
            .setOpacity(0.3)
            .get(),
        borderWidth: 0
    }]
    
},


  yAxis: {
      min: 3,
      max: 4,
      lineWidth: 0,
      tickPositions: []
  },

  plotOptions: {
      solidgauge: {
          dataLabels: {
              enabled: false
          },
          linecap: 'round',
          stickyTracking: false,
          rounded: true
      }
  },

  series: [{
    name: 'Australia',
    data: [{
        color: Highcharts.getOptions().colors[0],
        radius: '118%',
        innerRadius: '108%',
        y: 3.500
    }]
}, {
    name: 'Denmark',
    data: [{
        color: Highcharts.getOptions().colors[1],
        radius: '107%',
        innerRadius: '97%',
        y: 3.482
    }]
}, {
    name: 'Canada',
    data: [{
        color: Highcharts.getOptions().colors[2],
        radius: '96%',
        innerRadius: '86%',
        y: 3.438
    }]
}, {
    name: 'France',
    data: [{
        color: Highcharts.getOptions().colors[3],
        radius: '85%',
        innerRadius: '75%',
        y: 3.346
    }]
}, {
    name: 'Netherlands',
    data: [{
        color: Highcharts.getOptions().colors[4],
        radius: '74%',
        innerRadius: '64%',
        y: 3.292
    }]
}, {
    name: 'U.S.A',
    data: [{
        color: Highcharts.getOptions().colors[5],
        radius: '63%',
        innerRadius: '53%',
        y: 3.289
    }]
}, {
    name: 'New Zealand',
    data: [{
        color: Highcharts.getOptions().colors[6],
        radius: '52%',
        innerRadius: '42%',
        y: 3.271
    }]
}, {
    name: 'Japan',
    data: [{
        color: Highcharts.getOptions().colors[7],
        radius: '41%',
        innerRadius: '31%',
        y: 3.346
    }]
}, {
    name: 'Belgium',
    data: [{
        color: Highcharts.getOptions().colors[8],
        radius: '30%',
        innerRadius: '20%',
        y: 3.346
    }]
}, {
    name: 'U.K.',
    data: [{
        color: Highcharts.getOptions().colors[0],
        radius: '19%',
        innerRadius: '9%',
        y: 3.346
    }]
}]
});