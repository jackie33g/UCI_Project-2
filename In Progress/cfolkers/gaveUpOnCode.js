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