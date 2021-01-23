// chart = {
//     const svg = d3.create("svg")
//         .attr("chart", [-width / 2, -height / 2, width, height]);
  
//     const chords = chord(matrix);
  
//     const group = svg.append("g")
//         .attr("font-size", 10)
//         .attr("font-family", "sans-serif")
//         .selectAll("g")
//         .data(chords.groups)
//         .join("g");
  
//     group.append("path")
//         .attr("fill", d => color(names[d.index]))
//         .attr("d", arc);
  
//     group.append("text")
//         .each(d => (d.angle = (d.startAngle + d.endAngle) / 2))
//         .attr("dy", "0.35em")
//         .attr("transform", d => `rotate(${(d.angle * 180 / Math.PI - 90)}) translate(${outerRadius + 5}) ${d.angle > Math.PI ? "rotate(180)" : ""}`)
//         .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
//         .text(d => names[d.index]);
  
//     group.append("title")
//         .text(d => `${names[d.index]}
//   ${d3.sum(chords, c => (c.source.index === d.index) * c.source.value)} outgoing →
//   ${d3.sum(chords, c => (c.target.index === d.index) * c.source.value)} incoming ←`);
  
//     svg.append("g")
//         .attr("fill-opacity", 0.75)
//         .selectAll("path")
//         .data(chords)
//         .join("path")
//             .style("mix-blend-mode", "multiply")
//             .attr("fill", d => color(names[d.target.index]))
//             .attr("d", ribbon)
//         .append("title")
//             .text(d => `${names[d.source.index]} → ${names[d.target.index]} ${d.source.value}`);
  
//     return svg.node();
//   }

d3.json("http://127.0.0.1:5000/dependency_chart").then(function(info) {
  
  console.log(info.results)

// data = Array.from(d3.rollup((await FileAttachment("flare.json").json())
//     .flatMap(({name: source, imports}) => imports.map(target => [rename(source), rename(target)])),
//     ({0: [source, target], length: value}) => ({source, target, value}), link => link.join())
//     .values())

// rename = name => name.substring(name.indexOf(".") + 1, name.lastIndexOf("."))

// names = Array.from(new Set(data.flatMap(d => [d.source, d.target]))).sort(d3.ascending)

// matrix = {
//     const index = new Map(names.map((name, i) => [name, i]));
//     const matrix = Array.from(index, () => new Array(names.length).fill(0));
//     for (const {source, target, value} of data) matrix[index.get(source)][index.get(target)] += value;
//     return matrix;
// }

// chord = d3.chordDirected()
//     .padAngle(10 / innerRadius)
//     .sortSubgroups(d3.descending)
//     .sortChords(d3.descending)

// arc = d3.arc()
//     .innerRadius(innerRadius)
//     .outerRadius(outerRadius)

// ribbon = d3.ribbonArrow()
//     .radius(innerRadius - 1)
//     .padAngle(1 / innerRadius)

// color = d3.scaleOrdinal(names, d3.quantize(d3.interpolateRainbow, names.length))

// outerRadius = 397
// outerRadius = innerRadius + 10

// innerRadius = 358
// innerRadius = Math.min(width, height) * 0.5 - 90

// width = 964
// height = 964
// height = width

// d3 = require("d3@5")

});