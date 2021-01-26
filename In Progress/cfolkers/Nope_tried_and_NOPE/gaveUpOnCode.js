// gave up on code



              // Connect to postgresSQL
              // https://www.youtube.com/watch?v=ufdHsFClAk0 from 5:00 min // 12:30
              // const {Client} = require('pg')
              // const connectionString = 'postgres:postgres@localhost:5432/Chocolate_DB';

              // const client = new Client({
              //   connectionString:connectionString
              // });

              // client.connect()

              // client.query('SELECT * from dependency_chart',(err,res)=>{
              //   console.log(err,res)
              //   client.end()
              // });

              // // var dependencyInfo = [];

              // client.query('SELECT * from dependency_chart',(err,res)=>{
              //   console.log(err,res)
              //   // dependencyInfo.push()
              //   client.end()
              // });


              var transformData = function(dataResult) {
                var headers = dataResult.headers.map(function(h) {
                        return h.title;
                    }),
                    data = dataResult.rawData,
                    length = data.length,
                    attr1 = headers[0],
                    attr2 = headers[1],
                    metric = headers[2],
                    attr1Keys = {},
                    attr2Keys = {},
                    matrix = [];
    
                // Compute metric values for both attributes values and store them in hashmap
                data.forEach(function(row) {
                    var key1 = row[headers.indexOf(attr1)],
                        key2 = row[headers.indexOf(attr2)],
                        metricVal = parseFloat(row[headers.indexOf(metric)]);
    
                    if (!attr1Keys[key1]) attr1Keys[key1] = [];
                    if (!attr2Keys[key2]) attr2Keys[key2] = [];
                    attr1Keys[key1].push(metricVal);
                    attr2Keys[key2].push(metricVal);
                });
    
                // Get the keys in an array
                var attr1Vals = Object.keys(attr1Keys),
                    attr2Vals = Object.keys(attr2Keys),
                    matrixIdx = 0,
                    i = 0;
    
                // Initialize result matrix
                for (i=0; i<attr1Vals.length+attr2Vals.length; i++) matrix.push([]);
    
                // For each key in an array generate a row in a resulting matrix
                attr1Vals.forEach(function(attrVal) {
                    // Generate leading zeros
                    for (i=0; i<attr1Vals.length; i++) matrix[matrixIdx].push(0);
                    matrix[matrixIdx] = matrix[matrixIdx].concat(attr1Keys[attrVal]);
                    matrixIdx++;
                });
    
                // For each key in an array generate a row in a resulting matrix
                attr2Vals.forEach(function(attrVal) {
                    // Generate leading zeros
                    matrix[matrixIdx] = matrix[matrixIdx].concat(attr2Keys[attrVal]);
                    for (i=0; i<attr2Vals.length; i++) matrix[matrixIdx].push(0);
                    matrixIdx++;
                });
    
                return {
                    labels: [].concat(attr1Vals.concat(attr2Vals)),
                    matrix: matrix
                };
            };

            // trying to do:
            var data = {
                packageNames: ['Main', 'A', 'B'],
                matrix: [[0, 1, 1], // Main depends on A and B
                         [0, 0, 1], // A depends on B
                         [0, 0, 0]] // B doesn't depend on A or Main
              };



        var nameToIndex = {},
            names = [],
            matrix = [],
            n = 0,
            
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

        console.log(nameToIndex[apple])
        >> 2

        console.log(nameToIndex[kiwi])
        >> 1
        
        var nameToIndex = {};

        var allFruits = [...new Set(data.map(function(d) {
            return d.origin
        }).concat(data.map(function(d) {
            return d.destination
        })))].sort(function(a, b) {
            return d3.ascending(a, b)
        });

        allFruits.forEach(function(d, i) {
            nameToIndex[d] = i;
        });

        console.log(nameToIndex)





      // Generates a matrix (2D array) from the given data, which is expected to
      // have fields {origin, destination, count}. The matrix data structure is required
      // for use with the D3 Chord layout.
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

      // Configuration parameters.
      var width = 960,
          height = 960,
          outerPadding = 150,
          labelPadding = 5,
          chordPadding = 0.03,
          arcThickness = 30,
          opacity = 0.5,
          fadedOpacity = 0.01,
          transitionDuration = 300,
          outerRadius = width / 2 - outerPadding,
          innerRadius = outerRadius - arcThickness,
          valueFormat = d3.format(",");

      // DOM Elements.
      var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height)
          g = svg.append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
          ribbonsG = g.append("g"),
          groupsG = g.append("g");

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
      
      var popoverOptions = {
        html : true,
        template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><div class="popover-content"></div></div>'
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
          .enter().append("path")
            .attr("class", "ribbon")
            .attr("d", ribbon)
            .style("fill", function(d) {
              return color(d.source.index);
            })
            .style("stroke", function(d) {
              return d3.rgb(color(d.source.index)).darker();
            })
            .style("opacity", opacity)
            .on("mouseenter", function(d){
              var src = matrix.names[d.source.index];
              var dest = matrix.names[d.target.index];
              popoverOptions.content = [
                "<strong>" + src +" to " + dest +"</strong>",
                valueFormat(d.target.value),
                "<br><strong>" + dest +" to " + src +"</strong>",
                valueFormat(d.source.value)
              ].join("<br>");
              $(this).popover(popoverOptions);
              $(this).popover("show");
            }) 
            .on("mouseleave", function (d){
              $(this).popover("hide");
            })


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

        // Render the chord group labels.
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
      // Used for both the arcs and the text labels.
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


          // }
        // .append("title").text(function(d){
        //   var src = matrix.names[d.source.index];
        //   var dest = matrix.names[d.target.index];
        //   return dest + " → " + src + ": " + d.source.value
        //   });


          // var tooltipOptions = {
  //   html : true,
  //   template: '<div class="title" role="tooltip"><div class="tooltip-content"></div></div>'
  // };




  <!-- <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/tether/1.3.2/js/tether.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha/js/bootstrap.min.js"></script> -->


  <!-- FOR APP_KINDAWORKS -->
  <!-- <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/sankey.js"></script>
  <script src="https://code.highcharts.com/modules/dependency-wheel.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js"></script> -->



  <!-- FOR APP_KINDA WORKS -->
  <!-- <figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
      Chart showing a dependency wheel, where each point consists of multiple
      weighted links to other points. This chart type is often used to
      visualize data flow, and can be a striking way to illustrate
      relationships in data.
    </p>
  </figure> -->


  <p class="tt">Lorem ipsum dolor sit amet <a href="#" data-tooltip="This is a pure CSS tooltip">hover over this link</a> 
  elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, <a href="#" data-tooltip="This is a pure CSS tooltip">hover over this link which is longer than the other</a> quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>



.tooltip {
  display: inline-block;
  position: relative;
  /* position: absolute;			
  text-align: center;			
  width: auto;					
  height: auto;					
  padding: 2px;		 */
  color: black;		
  font: 12px sans-serif;		
  background-color: white;		
  pointer-events: none;		
  outline: none;
  /* padding: 5;
  height: 20px;
  left: 5;

  font-size: 12px;
  position: relative; */
}


/* .popover-content {
    display: none;
    position: absolute;
    width: auto;
    height: auto;
    padding: 2px;
    font: 12px sans-serif;
    text-align: center;
    background: white;
    border: 0;
    border-radius: 10px;
    color: black;		

  } */


/* .tooltip {
    padding: 5;
    outline: none;
    border: 1px soild #cdcdcd;
    border-color: rgba(0,0,0,.15);
    font-size: 12px;
    color: black;
    align-content: center;
    background-color: white;
    position: relative;
 }  */


INDEX.HTML
 <!-- FOR HIGHCHART WORKS
 <figure class="highcharts-figure">
   <div id="dependency-container"></div>
   <p class="highcharts-description">
   INFO GOES HERE
   </p>
 </figure> -->

<!-- NEED THESE FOR HIGHCHARTS
<script src="http://code.jquery.com/jquery-1.9.1.js"></script>

<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/sankey.js"></script>
<script src="https://code.highcharts.com/modules/dependency-wheel.js"></script> -->





<!-- added for dependency chart -->
<script src="//d3js.org/d3.v4.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/tether/1.3.2/js/tether.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha/js/bootstrap.min.js"></script>


<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-pQQkAEnwaBkjpqZ8RU1fF1AKtTcHJwFl3pblpTlHXybJjHpMYo79HY3hIi4NKxyj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>

