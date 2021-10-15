var width = 1000,
    height = 600;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width)
    .attr("height", height);

// var projection = d3.geoMercator()
//     .translate([width / 2, height / 2])
//     .scale(100)

var projection = d3.geoOrthographic()
    .translate([width / 2, height / 2])
    .scale(300)

var path = d3.geoPath()
    .projection(projection);

d3.json("data/world-110m.json")
    .then(function(dataWorld) {
        d3.json("data/airports.json")
            .then(function (dataAirports) {

                // Convert TopoJSON to GeoJSON (target object = 'states')
                var world = topojson.feature(dataWorld, dataWorld.objects.countries).features

                // Render the world by using the path generator
                svg.selectAll("path")
                    .data(world)
                    .enter().append("path")
                    .attr("d", path)
                    .attr("class", "map")

                // var simulation = d3.forceSimulation(dataAirports.nodes)
                //     .force('link', d3.forceLink(dataAirports.links))
                //
                //
                // // ii) DRAW THE LINKS (SVG LINE)
                // var link = svg.selectAll(".link")
                //     .data(dataAirports.links)
                //     .enter()
                //     .append("line")
                //     .attr("class", "link")
                //     .style("stroke", "grey");
                //
                // // iii) DRAW THE NODES (SVG CIRCLE)
                // var node = svg.selectAll(".node")
                //     .data(dataAirports.nodes)
                //     .enter()
                //     .append("circle")
                //     .attr("class", "node")
                //     .attr("r", 5)
                //     .style("fill", "yellow")
                //
                // simulation.on("tick", function () {
                //
                //     // Update node coordinates
                //     node
                //         .attr("cx", d => d.x)
                //         .attr("cy", d => d.y);
                //
                //     // Update edge coordinates
                //     link
                //         .attr("x1", d => d.source.x)
                //         .attr("y1", d => d.source.y)
                //         .attr("x2", d => d.target.x)
                //         .attr("y2", d => d.target.y)
                // });

                var node = svg.selectAll("circle")
                        .data(dataAirports.nodes)
                        .enter().append("circle")
                        .attr("transform", function (d) {
                            return "translate(" + projection([d.longitude, d.latitude]) + ")";
                        })
                        .attr("class", "node")

                node.append("title")
                    .text(function(d) { return d.name; });
                })

    })
