// Import Data
d3.json("http://127.0.0.1:5000/dependency_chart").then(function(info) {
  var array = info.results;
//   console.log(array)

  var toChartArray = []

  for (var i = 0; i <array.length; i++) {
    toChartArray.push([array[i].company_location, array[i].country_of_bean_origin, array[i].sum_num]);  
  }
  // console.log(toChartArray)

  (function(H) {
    H.seriesTypes.dependencywheel.prototype.pointClass.prototype.getDataLabelPath = function(a) {
      var c = this.series.chart.renderer,
        f = this.shapeArgs,
        e = 0 > this.angle || this.angle > Math.PI,
        g = f.start,
        b = f.end,
        width = this.dataLabel.getBBox().width;
        // go for radial
        var
          x = (f.r + (this.dataLabel.options.distance || 0)) * Math.cos(this.angle) + f.x,
          y = (f.r + (this.dataLabel.options.distance || 0)) * Math.sin(this.angle) + f.y,
          p1 = [
            Math.round(x),
            Math.round(y)
          ]
        p2 = [
            Math.round(x + Math.cos(this.angle) * width),
            Math.round(y + Math.sin(this.angle) * width)
          ],
          e = -Math.PI / 2 > this.angle || this.angle > Math.PI / 2,
          svg_path = e ? ['M', p2[0], p2[1], 'L', p1[0], p1[1]] : ['M', p1[0], p1[1], 'L', p2[0], p2[1]];
        if (b - g === 0) {
          this.dataLabel.options.enabled = false;
          this.dataLabel.text = "";
        }
        this.dataLabelPath || (this.dataLabelPath = c.path(svg_path).add(a));

      return this.dataLabelPath;
    }
  })(Highcharts);

  Highcharts.chart('dependency-container', {

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
            color: '#333',
            textPath: {
                enabled: true,
                attributes: {
                    dy: 5
                },
            },
            distance: 10
        },
        size: '63%'
    },
    // http://jsfiddle.net/kzoon/pj7evnd9/
    // {
    //   type: 'pie',
    //   zIndex: 1,
    //   size: '60%',
    //   data: [{
    //     name: 'Belize',
    //     y: 13,
    //     dataLabels: {
    //       connectorColor: "#f7a35c"
    //     }
    //   }, {
    //     name: 'Brazil',
    //     y: 80,
    //     dataLabels: {
    //       connectorColor: "#434348"
    //     }
    //   }, {
    //     name: 'Italy',
    //     y: 13,
    //     dataLabels: {
    //       connectorColor: "#90ed7d"
    //     }
    //   }, {
    //     name: 'United Kingdom',
    //     //name: 'United Kingdom without Northern Ireland',
    //     y: 11,
    //     dataLabels: {
    //       connectorColor: "#f7a35c"
    //     }
    //   }, {
    //     name: 'Belgium',
    //     y: 1,
    //     dataLabels: {
    //       connectorColor: "#8085e9"
    //     }
    //   }, {
    //     name: 'Norway',
    //     y: 16,
    //     dataLabels: {
    //       connectorColor: "#f15c80"
    //     }
    //   }, {
    //     name: 'Netherlands',
    //     y: 1,
    //     dataLabels: {
    //       connectorColor: "#333"
    //     }
    //   }, {
    //     name: 'Germany',
    //     y: 20,
    //     dataLabels: {
    //       connectorColor: "#333"
    //     }
    //   }],
    //   colors: ['none'],
    //   borderWidth: 0,
    //   dataLabels: {
    //     connectorShape: 'crookedLine',
    //     crookDistance: '120%',
    //     alignTo: 'connectors',

    //   }

    // }
  ]
});

});
