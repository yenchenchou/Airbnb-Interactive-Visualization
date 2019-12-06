<template>
  <div style="height:100%;width:100%;text-align:left;">
    <div id="d3map" width="500" height="610"></div>
        <svg id="map"></svg>
  </div>
</template>
<script>
// import mapboxgl from 'mapbox-gl'
import * as d3 from 'd3'
//import d3Tip from 'd3-tip'
export default {
  name: "d3map",
  data:function() {
    return {
      width : 500,//this.pltwidth,
      height : 450,  
      //point:this.incomingpoint
    }
  },
  props: {
      pltwidth:Number,
      hotel:Object,
      incomingpoint:Object
  },
  mounted () {
    this.drawd3map()
  },
  methods: {
    drawd3map(){
        var self = this
        var svg = d3.select("#map")
            .attr('width',self.width)
            .attr('height',self.height);
        var promises = [];
        promises.push(d3.json("./california-counties.geojson"))
        promises.push(d3.json("./test_geo.json"))

        Promise.all(promises).then(function (values) {
            var map = values[0];
            var data = values[1];

            console.log(map)
            console.log(data.features)
            console.log(svg)
            var test = {};
            test['host_id'] =data.features.properties.host_id
            test['coordinate'] = data.features.geometry.coordinates//[+d.longitude,+d.latitude];

    // var test = data.map(d => {
    //     var rObj = {};
    //     rObj['host_id'] =d.features.properties.host_id
    //     rObj['coordinate'] = d.features.geometry.coordinates//[+d.longitude,+d.latitude];
    //     return rObj;
    //     })
    //     console.log('test',test)
     //var test = Object.assign(new Map(data.map(d=> [d.latitude,d.longitude])))

    var projection = d3.geoMercator().fitSize([self.width, self.height], map);
    var path = d3.geoPath().projection(projection);

    var counties = svg.append('g')
        .attr('class','counties')
        .style('fill','whitesmoke');
     
        
    counties.selectAll('path')
        .data(map.features)
        .enter()
        .append("path")
        .attr('class','county')
        .attr("d", path)
        .style('stroke','darkgrey')
        //.on("click", clicked);
    
    
     var spot=svg.append('g')
        .attr('class','house_spot')
    
    spot.selectAll('circle')
         .data(test)
         .enter()
         .append('circle')
         .attr('r',0.5)
         .attr('cx',d=>projection(d.coordinate)[0]) 
         .attr('cy',d=>projection(d.coordinate)[1]) 
         .attr('fill','black')
         .style('opacity','0.5');

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


        });
      
    }
  },
  watch:{
      incomingpoint: function() {
          // console.log("watch",newValue,oldValue)
          this.update_plot()
      },
      hotel: function(){
          this.drawbarplot()
      }
  }
}
</script>
