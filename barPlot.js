function createBarPlot(csvFilePath) {
  // Set the dimensions of the chart
  var margin = { top: 60, right: 20, bottom: 70, left: 100 };
  var width = 600 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;

  // Create an SVG element
  var svg = d3.select("#barPlot")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom +200)
    .append("svg")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Read the CSV file
  d3.csv(csvFilePath).then(function(data) {
    // Set up scales for x and y axes
    var x = d3.scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(data.map(function(d) { return d.category; }));

    var y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(data, function(d) { return +d.Revenue; })]);
    //calculate the total revenue  
    var revenueSum = d3.sum(data, function(d) { return +d.Revenue; });
    // Create bars
    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.category); })
      .attr("y", function(d) { return y(+d.Revenue); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(+d.Revenue); })
      .style("fill", "brown");

    // Create x-axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("transform", "rotate(-45)")
      .attr("font-size", "25px");

    // Create y-axis
    svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("font-size", "25px");

    // Add x-axis label
    /*
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.top + 40)
      .attr("text-anchor", "middle")
      .attr("font-size", "25px")
      .text("Category");
    */
    // Add y-axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 20)
      .attr("text-anchor", "middle")
      .attr("font-size", "25px")
      .text("Revenue in Million Dollars");

    // Add figure title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", -margin.top / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "25px")
      .text("Region Revenue By Categories");
    // Add figure title
    svg.append("text")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2+30)
    .attr("text-anchor", "middle")
    .attr("font-size", "25px")
    .text("Region Total: "+parseInt(revenueSum)+ " M");

  });
}
