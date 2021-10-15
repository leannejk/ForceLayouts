var width = 1000,
    height = 600;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width)
    .attr("height", height);

// var projection = d3.geoMercator()
//     .translate([width / 2, height / 2]);

var projection = d3.geoOrthographic()
    .translate([width / 2, height / 2]);

var path = d3.geoPath()
    .projection(projection);

d3.json("data/world-110m.json")
    .then(function(dataWorld) {
        d3.json("data/airports.json")
            .then(function (dataAirports){

            // Convert TopoJSON to GeoJSON (target object = 'states')
            var world = topojson.feature(dataWorld, dataWorld.objects.countries).features

            // Render the world by using the path generator
            svg.selectAll("path")
                .data(world)
                .enter().append("path")
                .attr("d", path);
            });

            svg.selectAll("circle")
                .data(dataAirports.nodes)
                .enter().append("circle")
                .attr("transform", function(d) {
                    return "translate(" + projection([d.longitude, d.latitude]) + ")";
                })
                .attr("r", 5)
                .attr("fill", "pink")


    });