<template>
  <div style="height:100%;width:100%;text-align:left;">
    <div id="barplot"></div>
  </div>
</template>

<script>
// import mapboxgl from 'mapbox-gl'
import * as d3 from 'd3'
import d3Tip from 'd3-tip'
export default {
  name: "barplot",
  data:function() {
    return {
      height : 300,  
      width : 800
    }
  },
  mounted () {
    this.drawbarplot()
  },
  methods: {
    drawbarplot(){

      d3.json('test_geo.json').then(data => {
        const priceAvg = d3.nest().key(d => d.properties.room_type)
        .rollup(function(v) {
            return {
                avg_price: d3.mean(v, d => d.properties.price)
            }
        }).entries(data.features);

    // d3.json('test_geo.json').then(data => {
    //   var new_data = data.features;
    //   console.log(d3.map(new_data => new_data.properties.room_type));
      const svg = d3.select('#barplot')
          .attr("preserveAspectRatio", "xMinYMin meet")
          .append('svg')
          // .attr('viewBox', `0 0 {$width} {$height}`)
          .attr('width', this.width)
          .attr('height', this.height)
          .style('background-color', "#f0f4f5");

      // create margins & dimensions
      const margin = {top: 20, right: 20, bottom: 45, left: 120};
      const graphWidth = this.width - margin.left - margin.right;
      const graphHeight = this.height - margin.top - margin.bottom;
      const graph = svg.append('g')
        .attr('width', graphWidth)
        .attr('height', graphHeight)
        // .attr('viewBox', `0 0 ${graphWidth} ${graphHeight}`)
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      // prepare scale for rect/color
      const x = d3.scaleLinear()
        .domain([0, d3.max(priceAvg, d => d.value.avg_price)])
        .range([0, graphWidth]); 
      const y = d3.scaleBand()
        .domain(['Entire home/apt', 'Private room', 'Shared room']) // d3.map(new_data => new_data.properties.room_type)
        .range([0, graphHeight])
        .paddingInner(0.2)
        .paddingOuter(0.2);
      const myColor = d3.scaleOrdinal().domain(['Entire home/apt', 'Private room', 'Shared room'])
        .range(['#FF5A5F', '#00A699', '#FC642D']);
      
      // mouse hover event handler
      const handleMouserover = (d, i, n) => {
        d3.select(n[i])
        .transition().duration(10)
          .attr('stroke', '#767676')
          .attr('stroke-width', '3px')
      };
      const handleMouseout = (d, i, n) => {
        d3.select(n[i])
        .transition().duration(10)
          .attr('stroke','#ffd1d2')
          .attr('stroke-width', '0px')   
      } ;

      // tooltip function and content setup
      const tip = d3Tip()
      .attr('class', 'tip_card')
      .html(priceAvg => {
        let content = `<p class=bubble_point>${'$ ' + priceAvg.value.avg_price.toFixed(0)}</p>`;
        return content;
      }).direction('se');
      graph.call(tip);

      // join the data to rects
      graph.selectAll('rect')
        .data(priceAvg)
        .enter()
        .append('rect')
        .attr('height', y.bandwidth())
        .attr('fill', d => myColor(d.key))
        .attr('x', 0)
        .attr('y', d => y(d.key))
        .attr('stroke-width', '0px')
        .style("opacity", '1')
        .transition().duration(3000)
          .attr('x', 0)
          .attr("width", d => x(d.value.avg_price));
      graph.selectAll('rect')
        .on("mouseover", (d, i, n) => {
          tip.show(d, n[i]);
          handleMouserover(d, i, n);
        })
        .on("mouseout", (d, i, n) => {
          tip.hide();
          handleMouseout(d, i, n);
        });

      // create axes groups
      const xAxisGroup = graph.append('g')
        .attr("class", "axis_x")
        .attr('transform', `translate(0, ${graphHeight})`);
      const yAxisGroup = graph.append('g')
        .attr("class", "axis_y");
      const xAxis = d3.axisBottom(x)
        .ticks(7)
        .tickFormat(d => '$' + d);
      const yAxis = d3.axisLeft(y)
      xAxisGroup.call(xAxis);
      yAxisGroup.call(yAxis);
      // text label for the x axis
      svg.append("text")             
        .attr("transform", `translate(${graphWidth/2 + margin.left}, ${graphHeight + margin.top + 40})`)
        .attr('font-family', 'Arial')
        .attr('fill', '#767676')
        .text("Average Price")
        .style('font-size', '16px')
        .style("text-anchor", "middle");
      });
    }
  }
}
</script>