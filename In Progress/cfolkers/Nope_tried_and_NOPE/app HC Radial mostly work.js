// Import Data
d3.json("http://127.0.0.1:5000/dependency_chart").then(function(info) {
  var array = info.results;
//   console.log(array)

  var toChartArray = []

  for (var i = 0; i <array.length; i++) {
    toChartArray.push([array[i].company_location, array[i].country_of_bean_origin, array[i].sum_num]);  
  }
  // console.log(toChartArray)

  // For radial flip https://jsfiddle.net/vo58wnyh/5/ 
  (function(H) {
    H.seriesTypes.dependencywheel.prototype.pointClass.prototype.getDataLabelPath = function(a) {
      var c = this.series.chart.renderer,
        f = this.shapeArgs,
        e = 0 > this.angle || this.angle > Math.PI,
        g = f.start,
        b = f.end,
        width = this.dataLabel.getBBox().width;
  
      // if (width < (f.r + (this.dataLabel.options.distance || 0)) * (b - g)) {
      //   // safe for arc shapeArgs (enough space for labelling in the arc)
      //   this.dataLabelPath || (this.dataLabelPath = c.arc({
      //     open: !0
      //   }).add(a));
      //   this.dataLabelPath.attr({
      //     x: f.x,
      //     y: f.y,
      //     r: f.r + (this.dataLabel.options.distance || 0),
      //     start: e ? g : b,
      //     end: e ? b : g,
      //     clockwise: +e
      //   })
      // } else {
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
      // }
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
        size: '60%'
    }]

});

});
