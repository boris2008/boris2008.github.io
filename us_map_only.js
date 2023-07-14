// Set up dimensions
var width = 960;
var height = 600;

// Create SVG element
var svg = d3.select("#us_map")
  .attr("width", width)
  .attr("height", height);
  svg.append("text") // Append a text element
  .attr("x", width / 2) // Set the x position of the text
  .attr("y", 20) // Set the y position of the text
  .attr("text-anchor", "middle") // Set the text anchor to middle
  .attr("font-size", "25px") // Set the font size
  .text("United States Revenue"); // Set the text content of the title
// Add tooltip div
var tooltip = d3.select("#column1").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

// Load map data and revenue data
Promise.all([
  d3.json("https://d3js.org/us-10m.v1.json"),
  d3.csv("data/states_revenue.csv")
  ]).then(function (data) {
  var us = data[0];
  var revenueData = data[1];
  console.log(revenueData);
  console.log(revenueData.length);

  // Prepare revenue data by creating a lookup object
  var revenueLookup = {};
  revenueData.forEach(function (d) {
    revenueLookup[d.fips_code] = {
      abbreviation: d.state_abbreviation,
      revenue: d.Revenue
    };
  });

  
  console.log(revenueLookup);
  console.log(revenueLookup['01'].abbreviation);
  // Define path generator
  var path = d3.geoPath();

  // Filter and color the states in the west region
  
  svg.append("g")
  .attr("class", "states")
  .selectAll("path")
  .data(topojson.feature(us, us.objects.states).features)
  .enter().append("path")
  .attr("stroke", "black")
  .style("stroke-width", "4px")
  .attr("class", "state")
  .attr("d", path)
  .style("fill", "silver")
  .on("mouseover", function (d) {
    var fips = d.id;
    var revenueInfo = revenueLookup[fips];

    // Adjust the tooltip position based on the SVG element's position within the HTML layout
    var svgBounds = document.getElementById("us_map").getBoundingClientRect();
    var offsetX = svgBounds.left;
    var offsetY = svgBounds.top;

    tooltip.style("left", (d3.event.pageX - offsetX + 10) + "px")
      .style("top", (d3.event.pageY - offsetY - 28) + "px")
      .style("opacity", 0.9)
      .style('font-size',"25px")
      .html(revenueInfo.abbreviation + "<br/>" + "Revenue: $" + revenueInfo.revenue);
  });

  // Append state abbreviations
 /*d.id might contains the item that doesn't exist in the objective "revenueLookup".
 and it will trigger the error as undefined "abbreviation". 
 */
  svg.append("g")
    .attr("class", "state-labels")
    .selectAll("text")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("text")
    .attr("class", "state-label")
    .attr("transform", function (d) { return "translate(" + path.centroid(d) + ")"; })
    //.text(function (d) { return d.id; });
    .text(function (d) {
      if (revenueLookup[d.id]) {
        return revenueLookup[d.id].abbreviation;
      } else {
        return "N/A";
      }
    });
      
});
