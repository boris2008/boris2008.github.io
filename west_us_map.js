// Set up dimensions
var width = 960;
var height = 600;

// Create SVG element
var svg = d3.select("#map")
  .attr("width", width)
  .attr("height", height);
svg.append("text") // Append a text element
  .attr("x", width / 2) // Set the x position of the text
  .attr("y", 20) // Set the y position of the text
  .attr("text-anchor", "middle") // Set the text anchor to middle
  .attr("font-size", "20px") // Set the font size
  .text("United States Revenue"); // Set the text content of the title

// Load map data
d3.json("https://d3js.org/us-10m.v1.json").then(function(us) {
  // Define path generator
  var path = d3.geoPath();

  // Filter and color the states in the west region
  var westRegionFips = ["53", "41", "06", "32", "04", "16", "30", "56", "08", "35", "49","02","15"];
  //midwest: 17,18,19,20,26,27,38,39,46,55
  //south:01,05,12,13,22,28,37,45,47,48,54 
  //northeast:09,23,25,33,34,36,42,44,50

  svg.append("g")
    .attr("class", "states")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
    .attr("class", "state")
    .attr("d", path)
    .style("fill", function(d) {
      return westRegionFips.includes(d.id) ? "green" : "gray";
    });
});
