// Reference for chart:  https://bl.ocks.org/curran/8c5bb1e0dd8ea98695d28c8a0ccfc533

// Parameters for chart (like this way better)
var width = 960,
  height = 960,
  outerPadding = 100,
  labelPadding = 5,
  chordPadding = 0.03,
  arcThickness = 20,
  opacity = 0.5,
  fadedOpacity = 0.02,
  transitionDuration = 1000,
  outerRadius = width / 2 - outerPadding,
  innerRadius = outerRadius - arcThickness,
  valueFormat = d3.format(",");

var svg = d3.select(".chart").append("svg")
  .attr("width", width)
  .attr("height", height)
  g = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
    ribbonsG = g.append("g"),
    groupsG = g.append("g");

// Import Data
d3.json("http://127.0.0.1:5000/dependency_chart").then(function(data) {
  var array = data.results;
  // console.log(array)

  // Chart starts here
  // D3 layouts, shapes and scales.
  var ribbon = d3.ribbon()
    .radius(innerRadius),
  chord = d3.chord()
    .padAngle(chordPadding)
    .sortSubgroups(d3.descending),
  arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius),
  color = d3.scaleOrdinal()
    .range(d3.schemeCategory20);
  
  var tooltipOptions = {
    html : true,
    template: '<div class="title" role="tooltip"><div class="tooltip-content"></div></div>'
  };

  // Renders the given data as a chord diagram.
  function render(data){

    var matrix = generateMatrix(data),
        chords = chord(matrix);

    color.domain(matrix.map(function (d, i){
      return i;
    }));

    // Render the ribbons.
    ribbonsG.selectAll("path")
        .data(chords)
      .enter()
        .append("path")
        .attr("class", "ribbon")
        .attr("d", ribbon)
        .style("fill", function(d) {
          return color(d.source.index);
        })
        .style("stroke", function(d) {
          return d3.rgb(color(d.source.index)).darker();
        })
        .style("opacity", opacity)
        .append("title")
          .attr("class", "tooltip-content")
          .text(textFunction);

    // Function for text for tooltip.
    function textFunction(d){
      var src = matrix.names[d.source.index];
      var dest = matrix.names[d.target.index];
      return `${dest} → ${src}: ${d.source.value}`}

    // Scaffold the chord groups.
    var groups = groupsG
      .selectAll("g")
        .data(chords.groups)
      .enter().append("g");

    // Render the chord group arcs.
    groups
      .append("path")
        .attr("class", "arc")
        .attr("d", arc)
        .style("fill", function(group) {
          return color(group.index);
        })
        .style("stroke", function(group) {
          return d3.rgb(color(group.index)).darker();
        })
        .style("opacity", opacity)
        .call(groupHover);

    // Render the chord group labels and flip.
    var angle = d3.local(),
        flip = d3.local();
    groups
      .append("text")
        .each(function(d) {
          angle.set(this, (d.startAngle + d.endAngle) / 2)
          flip.set(this, angle.get(this) > Math.PI);
        })
        .attr("transform", function(d) {
          return [
            "rotate(" + (angle.get(this) / Math.PI * 180 - 90) + ")",
            "translate(" + (outerRadius + labelPadding) + ")",
            flip.get(this) ? "rotate(180)" : ""
          ].join("");
        })
        .attr("text-anchor", function(d) {
          return flip.get(this) ? "end" : "start";
        })
        .text(function(d) {
          return matrix.names[d.index];
        })
        .attr("alignment-baseline", "central")
        .style("font-family", '"Helvetica Neue", Helvetica')
        .style("font-size", "10pt")
        .style("cursor", "default")
        .call(groupHover);
  }

  // Sets up hover interaction to highlight a chord group.
  function groupHover(selection){
    selection
      .on("mouseover", function (group){
        g.selectAll(".ribbon")
            .filter(function(ribbon) {
              return (
                (ribbon.source.index !== group.index) &&
                (ribbon.target.index !== group.index)
              );
            })
          .transition().duration(transitionDuration)
            .style("opacity", fadedOpacity);
      })
      .on("mouseout", function (){
        g.selectAll(".ribbon")
          .transition().duration(transitionDuration)
            .style("opacity", opacity);
      });
  }

  // Transform data for matrix!!!! 
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
  // console.log(matrix) 
  render(array);
});

