<template>
  <div style="height:100%;width:100%;text-align:left;">
    <div id="distplot"></div>
  </div>
</template>
<script>
// import mapboxgl from 'mapbox-gl'
import * as d3 from 'd3'
import d3Tip from 'd3-tip'
export default {
  name: "distplot",
  data:function() {
    return {
      width : 650,
      height : 450  
    }
  },
  mounted () {
    this.drawdistplot()
  },
  methods: {
    drawdistplot(){
      d3.json('test_geo.json').then(data => {
        const new_data = data.features;
        // select the svg container first
        const svg = d3.select('#distplot')
            .append('svg')
            // .attr('viewBox', `0 0 800 300`)
            .attr('width', this.width)
            .attr('height', this.height)
            .style('background-color', "#f5f5f5");

        // create margins & dimensions
        const margin = {top: 20, right: 20, bottom: 70, left: 120};
        const graphWidth = this.width - margin.left - margin.right;
        const graphHeight = this.height - margin.top - margin.bottom;
        const graph = svg.append('g')
        .attr('width', graphWidth)
        .attr('height', graphHeight)
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
        // console.log(d3.max(new_data, d => d.properties.price));
        // prepare scale for histogram
        var x = d3.scaleLinear()
            .domain([0, d3.max(new_data, d => d.properties.price)])
            .range([0, graphWidth]);
        var histogram = d3.histogram()
            .value(d => d.properties.price)   // I need to give the vector of value
            .domain(x.domain())  // then the domain of the graphic
            .thresholds(x.ticks(200)); // then the numbers of bins
        var bins = histogram(new_data);
        var y = d3.scaleLinear()
            .domain([0, d3.max(bins, d => d.length)])
            .range([graphHeight, 0]);
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
        };
        // tooltip function and content setup
        const tip = d3Tip()
        .attr('class', 'tip_card')
        .html(d => {
            let content = `<p>${'price range: ' + d.x0.toFixed(0) + '-' + d.x1.toFixed(0)}</p>`;
            content += `<p>${'houses count: ' + d.length}</p>`;
            return content;
        }).direction('ne');
        graph.call(tip);  
        // join the data to rects
        graph.selectAll('rect')
            .data(bins)
            .enter()
            .append('rect')
            .attr("transform", d => `translate(${x(d.x0)},0)`)
            .attr("x", 0.5)
            .attr('y', graphHeight)
            .attr("width", d => x(d.x1) - x(d.x0)- 0.5)
            .style("fill", "#FF5A5F")
            .transition().duration(2000)
                .attr('y', d => y(d.length))
                .attr("height", d => graphHeight - y(d.length));
        graph.selectAll('rect')
            .on("mouseover", (new_data, i, n) => {
                tip.show(new_data, n[i]);
                handleMouserover(new_data, i, n);
            })
            .on("mouseout", (new_data, i, n) => {
                tip.hide();
                handleMouseout(new_data, i, n);
            });
        // create axes groups
        const xAxisGroup = graph.append('g')
            .attr("class", "axis_x")
            .attr('transform', `translate(0, ${graphHeight})`);
        const yAxisGroup = graph.append('g')
            .attr("class", "axis_y");
        const xAxis = d3.axisBottom(x)
            .ticks(20);
        const yAxis = d3.axisLeft(y)
            .ticks(5);
        xAxisGroup.call(xAxis);
        yAxisGroup.call(yAxis);
        xAxisGroup.selectAll('text')
            .attr('transform', 'rotate(-40)')
            .attr('text-anchor', 'end');
        // text label for the x axis
        svg.append("text")             
            .attr("transform", `translate(${graphWidth/2 + margin.left}, ${graphHeight + margin.top + 55})`)
            .attr('font-family', 'Arial')
            .attr('fill', '#767676')
            .text("Price")
            .style('font-size', '16px')
            .style("text-anchor", "middle");
        // text label for the y axis
        svg.append("text")             
            .attr("transform", `translate(35, ${graphHeight/2 + margin.top})`)
            .attr('font-family', 'Arial')
            .attr('fill', '#767676')
            .text("Counts")
            .style('font-size', '16px')
            .style("text-anchor", "middle");
       });
    }
  }
}
</script>