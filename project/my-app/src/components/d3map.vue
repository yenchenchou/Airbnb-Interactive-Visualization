<template>
  <div style="height:100%;width:100%;text-align:left;">
    <div id="d3map"></div>
        <!-- <svg id="map"></svg> -->
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
      width : this.pltwidth,
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
        var promises = [];
        promises.push(d3.csv("city_house_cnt.csv", ({city, cnt}) => [city, +cnt]));
        Promise.all(promises).then(function (values) {
          const house = Object.assign(new Map(values[0]), {title: "house count"});
          d3.json("california-counties.json").then(function(data){
          var svg = d3.select("#d3map")
            .append("svg")
            .attr("id", "svg_map")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr('viewBox', `0 0 ${self.width} ${self.height}`)
            .style('background-color', "#f5f5f5");
          // create margins & dimensions
          const margin = {top: 20, right: 40, bottom: 45, left: 120};
          const graphWidth = self.width - margin.left - margin.right;
          const graphHeight = self.height - margin.top - margin.bottom;
          const graph = svg.append('g')
            .attr("id", "map_g")
            .attr('viewBox', `0 0 ${graphWidth} ${graphHeight}`)
            .attr('transform', `translate(${0}, ${margin.top})`);

          const color = d3.scaleLinear()
            .domain([0, 10])
            .range(["#FFF", "#FF5A5F"]);
          var projection = d3.geoMercator().fitSize([self.width, self.height - 40], data);
            
          var path = d3.geoPath().projection(projection)
          graph.append("g")
            .selectAll("path")
            .data(data.features)
            .join("path")
            .attr("fill", function (d){
              if (color(house.get(d.properties.name)) == undefined){
                return "white"
              } else {
                return color(house.get(d.properties.name))
              }
            })
            // .attr("fill", d => color(house.get(d.properties.name)))
            .attr("d", path)
            .attr('stroke', '#cccccc')
            .attr('stroke-width', '1px')
            .attr("class", "cities");
        });  
      });
    }
  }
}
</script>