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
    }
  },
  mounted () {
    this.drawbarplot()
  },
  methods: {
   drawbarplot(){
       d3.json('room_type_price.json').then(function(data){
        const svg = d3.select('#barplot')
        .append('svg')
        .attr('width', 800)
        .attr('height', 300)
        .style('background-color', "#f0f4f5");
const margin = {top: 20, right: 20, bottom: 45, left: 120};
    const graphWidth = 800 - margin.left - margin.right;
    const graphHeight = 300 - margin.top - margin.bottom;
    const graph = svg.append('g')
        .attr('width', graphWidth)
        .attr('height', graphHeight)
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.price)])
        .range([0, graphWidth]); 
    const y = d3.scaleBand()
        .domain(data.map(item => item.room_type))
        .range([0, graphHeight])
        .paddingInner(0.2)
        .paddingOuter(0.2);
    const myColor = d3.scaleOrdinal().domain(data.map(item => item.room_type))
        .range(['#FF5A5F', '#00A699', '#FC642D']);
    console.log(myColor)
    // event handler
    const handleMouserover = (d, i, n) => {
        d3.select(n[i])
        .transition().duration(10)
            .attr('stroke', '#767676')
            .attr('stroke-width', '3px')
    }
    const handleMouseout = (d, i, n) => {
        d3.select(n[i])
        .transition().duration(10)
            .attr('stroke','#ffd1d2')
            .attr('stroke-width', '0px')   
    } 
    // Tooltip setupb order-radius: 25px;
    const tip = d3Tip()
    .attr('class', 'tip_card')
    .html((d, i, n) => {
        let content = `<p class=bubble_point>${'$' + d.price.toFixed(2)}</p>`;
        console.log(i,n)
        return content;
    }).direction('se')
    graph.call(tip)
    // join the data to circs
    const rects = graph.selectAll('rect')
    .data(data);
    // append the enter selection to the DOM
    rects.enter()
        .append('rect')
        .attr('height', y.bandwidth())
        .attr('fill', function(d){return myColor(d.room_type)})
        .attr('x', 0)
        .attr('y', d => y(d.room_type))
        .attr('stroke-width', '0px')
        .style("opacity", '1')
        .transition().duration(3000)
            .attr('x', 0)
            .attr("width", d => d.price);
    graph.selectAll('rect')
        .on("mouseover", (d, i, n) => {
            tip.show(d, n[i]);
            handleMouserover(d, i, n);
        })
        .on("mouseout", (d, i, n) => {
            tip.hide();
            handleMouseout(d, i, n);
        })
    // create axes groups
    const xAxisGroup = graph.append('g')
        .attr("class", "axis_x")
        .attr('transform', `translate(0, ${graphHeight})`)
    const yAxisGroup = graph.append('g')
        .attr("class", "axis_y")
    // create & call axesit
    const xAxis = d3.axisBottom(x)
        .ticks(7)
        .tickFormat(d => '$' + d);
    const yAxis = d3.axisLeft(y)
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);
    xAxisGroup.selectAll('text')
        // .attr('fill', '#767676')
    yAxisGroup.selectAll('text')
    // text label for the x axis
    svg.append("text")             
        .attr("transform", `translate(${graphWidth/2 + margin.left}, ${graphHeight + margin.top + 40})`)
        .attr('fill', '#767676')
        .style('font-size', '16px')
        .style("text-anchor", "middle")
        .text("Avg. Price")
        .attr('font-family', "Arial")
        .attr('fill', '#767676');
       });
       }
  }
  }
</script>