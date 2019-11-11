var width = 800,
height=600,
centered;
var svg = d3.select("#map")
            .attr('width',width)
            .attr('height',height);

d3.json("./data/dataset/california-counties.geojson").then(function (json) {

    var projection = d3.geoMercator().fitSize([width, height], json);
    var path = d3.geoPath().projection(projection);

    counties = svg.append('g')
        .attr('class','counties')
        .style('fill','whitesmoke');
     
        
    counties.selectAll('path')
        .data(json.features)
        .enter()
        .append("path")
        .attr('class','county')
        .attr("d", path)
        .style('stroke','darkgrey')
        .on("click", clicked);


    function clicked(d) {
        var x, y, k;
        
        if (d && centered !== d) {
            var centroid = path.centroid(d);
            x = centroid[0];
            y = centroid[1];
            k = 3;
            centered = d;
        } else {
            x = width / 2;
            y = height / 2;
            k = 1;
            centered = null;
        }
        
        counties.selectAll("path")
            .classed("active", centered && function(d) { return d === centered; });
        
        counties.transition()
            .duration(750)
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
            .style("stroke-width", 1.5 / k + "px");
        }
          


// a9-ex5
// https://bl.ocks.org/mbostock/2206590
});
