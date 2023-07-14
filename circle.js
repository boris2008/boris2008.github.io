function generateCircle(container) {
  const svg = container
    .attr("width", "100%")
    .attr("height", "100%");

  const circle = svg
    .append("circle")
    .attr("cx", "50%")
    .attr("cy", "50%")
    .attr("r", "40%")
    .attr("fill", "red");

  return circle.node();
}
