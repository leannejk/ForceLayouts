
var width = 1000,
    height = 1000;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width)
    .attr("height", height);

// Load data
d3.json("data/airports.json").then(function(data) {
  console.log(data);

  // i) INITIALIZE FORCE-LAYOUT AND DEFINE 'NODES' AND 'EDGES'
  var simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links))
      .force("charge", d3.forceManyBody())

  simulation.alpha(0.2)


  // ii) DRAW THE LINKS (SVG LINE)
  var link = svg.selectAll(".link")
      .data(data.links)
      .enter()
      .append("line")
      .attr("class", "link")
      .style("stroke", "grey");

  // iii) DRAW THE NODES (SVG CIRCLE)
  var node = svg.selectAll(".node")
      .data(data.nodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("r", 7)
      .style("fill", function (d){
        if (d.country === "United States")
          return "blue"
        else return "red"

      })

  node.call(d3.drag()
      .on("start", dragstart)
      .on("drag", drag)
      .on("end", dragend));

  node.append("title")
      .text(function(d) { return d.name; });

  node.on("click", function (){
    var circles = document.getElementsByTagName("circle");
    for (var j = 0; j < circles.length; j++) {
      circles[j].classList.remove("highlighted");
    }
    this.classList.add("highlighted")
  })

  // iv) LISTEN TO THE 'TICK' EVENT AND UPDATE THE X/Y COORDINATES FOR ALL ELEMENTS
  simulation.on("tick", function() {

    var margin = 400

    // Update node coordinates
    node
        .attr("cx", d => d.x + margin )
        .attr("cy", d => d.y + margin);

    // Update edge coordinates
    link
        .attr("x1", d => d.source.x + margin)
        .attr("y1", d => d.source.y + margin)
        .attr("x2", d => d.target.x  + margin)
        .attr("y2", d => d.target.y + margin)
  });

  function dragstart(d) {
    if (!d.active) simulation.alphaTarget(0.3).restart();
    d.subject.fx = d.subject.x;
    d.subject.fy = d.subject.y;
  }

  function drag(d) {
    d.subject.fx = d.x;
    d.subject.fy = d.y;
  }

  function dragend(d) {
    if (!d.active) simulation.alphaTarget(0);
    d.subject.fx = null;
    d.subject.fy = null;
  }


});
