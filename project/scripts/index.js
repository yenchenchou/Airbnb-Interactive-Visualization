var map = L.map('mapid',{
    zoomDelta: 0.25,
    zoomSnap: 0
});

// 設定經緯度座標
map.setView(new L.LatLng(36.778259, -119.417931), 6);

var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osm = new L.TileLayer(osmUrl, {minZoom: 2, maxZoom: 16});
map.addLayer(osm);

var dataset = omnivore.csv('assets_cwy_new simple.csv');



// 
// var width = 800,
// height=600,
// centered;
// var svg = d3.select("#map")
//             .attr('width',width)
//             .attr('height',height);


// var promises = [];
// promises.push(d3.json("./data/dataset/california-counties.geojson"))
// promises.push(d3.csv("./data/dataset/df_california_filtered_cleaned.csv"))

// Promise.all(promises).then(function(values){
//     var map = values[0];
//     var data = values[1];
//     var test = data.map(d => {
//         var rObj = {};
//         rObj['host_id'] =d.host_id
//         rObj['coordinate'] = [+d.longitude,+d.latitude];
//         return rObj;
//         })
//     //var test = Object.assign(new Map(data.map(d=> [d.latitude,d.longitude])))

//     var projection = d3.geoMercator().fitSize([width, height], map);
//     var path = d3.geoPath().projection(projection);

//     var counties = svg.append('g')
//         .attr('class','counties')
//         .style('fill','whitesmoke');
     
        
//     counties.selectAll('path')
//         .data(map.features)
//         .enter()
//         .append("path")
//         .attr('class','county')
//         .attr("d", path)
//         .style('stroke','darkgrey')
//         .on("click", clicked);
    
    
//      var spot=svg.append('g')
//         .attr('class','house_spot')
    
//     spot.selectAll('circle')
//          .data(test)
//          .enter()
//          .append('circle')
//          .attr('r',0.5)
//          .attr('cx',d=>projection(d.coordinate)[0]) 
//          .attr('cy',d=>projection(d.coordinate)[1]) 
//          .attr('fill','black')
//          .style('opacity','0.5');

//     function clicked(d) {
//         var x, y, k;
        
//         if (d && centered !== d) {
//             var centroid = path.centroid(d);
//             x = centroid[0];
//             y = centroid[1];
//             k = 3;
//             centered = d;
//         } else {
//             x = width / 2;
//             y = height / 2;
//             k = 1;
//             centered = null;
//         }
        
//         counties.selectAll("path")
//             .classed("active", centered && function(d) { return d === centered; });
        
//         counties.transition()
//             .duration(750)
//             .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
//             .style("stroke-width", 1.5 / k + "px");
        
//         spot.transition()
//             .duration(750)
//             .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
//             .style("stroke-width", 1.5 / k + "px");
        
//     }


// // a9-ex5
// // https://bl.ocks.org/mbostock/2206590
// });
