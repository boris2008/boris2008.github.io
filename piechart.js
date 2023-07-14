var dataset = [
  { region: "West", percentage: 17.6, color: "green" },
  { region: "midWest", percentage: 26.93, color: "blue" },
  { region: "South", percentage: 38.37, color: "red" },
  { region: "NorthEast", percentage: 17.1, color: "orange" }
];

// Set the dimensions and margins of the graph
var width = 410;
var height = 500;
var radius = 200;
var margin = { top: 20, right: 20, bottom: 20, left: 20 };

// Create SVG element
const svg2 = d3.select("#pieChart1")
.attr("width", width)
.attr("height", height)
.append("svg")
.append("g")
  .attr("transform", `translate(205,205)`);

svg2.append("text") // Append a text element
  .attr("x", width/2-200) // Set the x position of the text
  .attr("y", height/2) // Set the y position of the text
  .attr("text-anchor", "Middle") // Set the text anchor to middle
  .attr("font-size", "25px") // Set the font size
  .attr("fill","black")
  .text("Region Percentage of Revenue");

; // Set the text content of the title

// Generate pie slices
const pie = d3.pie()
  .value(d => d.percentage)
  .sort(null);

// Define arc
const arc = d3.arc()
  .innerRadius(50)
  .outerRadius(radius);

// Create arcs
const arcs = svg2.selectAll("arc")
  .data(pie(dataset))
  .enter()
  .append("g");

// Draw each slice
arcs.append("path")
  .attr("d", arc)
  .attr("fill", d => d.data.color)
  .attr("stroke", "black")
  .style("stroke-width", "2px");

// Add region labels
arcs.append("text")
  .attr("transform", d => `translate(${arc.centroid(d)})`)
  .attr("text-anchor", "middle")
  .text(d => `${d.data.region}:${d.data.percentage}%`)
  .style("font-size", "18px")
  .style("fill","white");
