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
      width : this.pltwidth,
      height : 450  
    }
  },
  props: {
      pltwidth:Number,
      hotel:Object,
      incomingpoint:Object
  },
  mounted () {
    this.drawdistplot()
  },
  methods: {
    drawdistplot(){
      d3.select('#svg_dist').remove();
        var new_data = this.hotel.features;
        const filter_data = new_data.filter(function(d){return d.properties.price < 1500;})
        const svg = d3.select('#distplot')
          .append('svg')
          .attr("id", "svg_dist")
          .attr('viewBox', `0 0 ${this.width} ${this.height}`)
          .style('background-color', "#f5f5f5");
        // create margins & dimensions
        const margin = {top: 20, right: 20, bottom: 70, left: 70};
        const graphWidth = this.width - margin.left - margin.right;
        const graphHeight = this.height - margin.top - margin.bottom;
        const graph = svg.append('g')
        .attr('id', 'dist_g')
        .attr('viewBox', `0 0 ${graphWidth} ${graphHeight}`)
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
        // console.log(d3.max(new_data, d => d.properties.price));
        // prepare scale for histogram
        var x = d3.scaleLinear()
            .domain([0, d3.max(filter_data, d => d.properties.price)])
            .range([0, graphWidth]);
        var histogram = d3.histogram()
            .value(d => d.properties.price)   // I need to give the vector of value
            .domain(x.domain())  // then the domain of the graphic
            .thresholds(x.ticks(100)); // then the numbers of bins
        var bins = histogram(filter_data);
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
            let content = `<p style='margin-bottom: 0px; padding: 5px;'>${'price range: ' + d.x0.toFixed(0) + '-' + d.x1.toFixed(0)}</p>`;
            content += `<p style='margin-bottom: 0px; padding: 5px;'>${'houses count: ' + d.length}</p>`;
            return content;
        }).direction('ne');
        graph.call(tip);  
        // join the data to rects
        graph.selectAll('.dist')
            .data(bins)
            .enter()
            .append('rect')
            .attr("class", "dist1")
            .attr("transform", d => `translate(${x(d.x0)},0)`)
            .attr("x", 0.5)
            .attr('y', graphHeight)
            .attr("width", d => x(d.x1) - x(d.x0)- 0.5)
            .style("fill", "#FF5A5F")
            .transition().duration(2000)
                .attr('y', d => y(d.length))
                .attr("height", d => graphHeight - y(d.length));
        graph.selectAll('rect')
            .on("mouseover", (filter_data, i, n) => {
                tip.show(filter_data, n[i]);
                handleMouserover(filter_data, i, n);
            })
            .on("mouseout", (filter_data, i, n) => {
                tip.hide();
                handleMouseout(filter_data, i, n);
            });
        // click function
        var pos = 1;
        d3.select("#btn1").on("click", function () {
          if (pos == 1) {
            graph.selectAll('rect').remove();
            graph.selectAll('.axis_x').remove();
            graph.selectAll('.axis_y').remove();
            const filter_data = new_data.filter(function(d){return d.properties.price < 1500;})
            // replot x-scale
            var x = d3.scaleLinear()
                .domain([0, d3.max(filter_data, d => d.properties.price)])
                .range([0, graphWidth]);
            var histogram = d3.histogram()
                .value(d => d.properties.price)   // I need to give the vector of value
                .domain(x.domain())  // then the domain of the graphic
                .thresholds(x.ticks(100)); // then the numbers of bins
            var bins = histogram(filter_data);
            var y = d3.scaleLinear()
              .domain([0, d3.max(bins, d => d.length)])
              .range([graphHeight, 0]);
            // draw plot
            graph.selectAll('.dist')
              .data(bins)
              .enter()
              .append('rect')
              .attr("class", "dist1")
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
              })
              .on("start", function repeat() {
                d3.active(this).transition().duration(2000)
              });
          }
            // create axes groups
            const xAxisGroup = graph.append('g')
                .attr("class", "axis_x")
                .attr('transform', `translate(0, ${graphHeight})`);
            const yAxisGroup = graph.append('g')
                .attr("class", "axis_y");
            const xAxis = d3.axisBottom(x)
                .ticks(5);
            const yAxis = d3.axisLeft(y)
                .ticks(5);
            xAxisGroup.call(xAxis);
            yAxisGroup.call(yAxis);
            xAxisGroup.selectAll('text')
                .attr('transform', 'rotate(-40)')
                .attr('text-anchor', 'end');
            pos = 2
        }); 
        d3.select("#btn2").on("click", function () {
          if (pos == 2) {
            graph.selectAll('rect').remove();
            graph.selectAll('.axis_x').remove();
            graph.selectAll('.axis_y').remove();
            // replot x-scale
            var x = d3.scaleLinear()
                .domain([0, d3.max(new_data, d => d.properties.price)])
                .range([0, graphWidth]);
            var histogram = d3.histogram()
                .value(d => d.properties.price)   // I need to give the vector of value
                .domain(x.domain())  // then the domain of the graphic
                .thresholds(x.ticks(100)); // then the numbers of bins
            var bins = histogram(new_data);
            var y = d3.scaleLinear()
              .domain([0, d3.max(bins, d => d.length)])
              .range([graphHeight, 0]);
            // draw plot
            graph.selectAll('.dist')
              .data(bins)
              .enter()
              .append('rect')
              .attr("class", "dist1")
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
              })
              .on("start", function repeat() {
                d3.active(this).transition().duration(2000)
              });
            }
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
            pos = 1
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
            .attr("transform", `translate(20, ${graphHeight/2 + margin.top}) rotate(-90)`)
            .attr('font-family', 'Arial')
            .attr('fill', '#767676')
            .text("Counts")
            .style('font-size', '16px')
            .style("text-anchor", "middle");

    },
    update_plot(){
      // console.log("testing in coming",this.incomingpoint)
      d3.selectAll('.dist2_identifier').remove();

      var new_data = this.hotel.features;
      const filter_data = new_data.filter(function(d){return d.properties.price < 1500;});
      const margin = {top: 20, right: 20, bottom: 70, left: 120};
      const graphWidth = this.width - margin.left - margin.right;
      const graphHeight = this.height - margin.top - margin.bottom;
      var x = d3.scaleLinear()
        .domain([0, d3.max(filter_data, d => d.properties.price)])
        .range([0, graphWidth]);
      var histogram = d3.histogram()
        .value(d => d.properties.price)   // I need to give the vector of value
        .domain(x.domain())  // then the domain of the graphic
        .thresholds(x.ticks(100)); // then the numbers of bins
      var bins = histogram(filter_data);
      var y = d3.scaleLinear()
        .domain([0, d3.max(bins, d => d.length)])
        .range([graphHeight, 0]);

      var new_bins = [];
      var cc = this.incomingpoint.properties.price
      var i = 0
    // console.log(cc)
      if(cc == d3.max(bins, d => d.x1)){
        new_bins.push(bins[bins.length-2].x1)
        new_bins.push(bins[bins.length-1].x1)
        new_bins.push(bins[bins.length-2].length)
      }
      if(cc == d3.min(bins, d => d.x0)){
        new_bins.push(bins[0].x0)
        new_bins.push(bins[1].x0)
        new_bins.push(bins[0].length)
      }
      for (i; i < bins.length; i++) {
        if(cc > bins[i].x0 && cc < bins[i].x1){
          new_bins.push(bins[i].x0)
          new_bins.push(bins[i].x1)
          new_bins.push(bins[i].length)
        }
      }
      d3.select("#dist_g").selectAll('.dist1').style("opacity", '0.4');
      d3.select("#dist_g").selectAll('.dist2')
        .data(new_bins)
        .enter()
        .append('rect')
        .attr("class", "dist2_identifier")
        .attr("transform", `translate(${x(new_bins[0])},0)`)
        .attr("x", 0.5)
        .attr('y', graphHeight)
        .attr("width", x(new_bins[1]) - x(new_bins[0])- 0.5)
        .style("fill", "#FF5A5F")
        .transition().duration(2000)
          .attr('y', y(new_bins[2]))
          .attr("height", graphHeight - y(new_bins[2]));
    }
  },
  watch:{
      incomingpoint: function() {
          // console.log("watch",newValue,oldValue)
          this.update_plot()
      },
      hotel: function(){
          this.drawdistplot()
      }
  }
}
</script>