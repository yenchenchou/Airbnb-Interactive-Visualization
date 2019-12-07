<template>
  <div style="height:100%;width:100%;text-align:left;">
    <div id="circular_bar"></div>
  </div>
</template>
<script>
// import mapboxgl from 'mapbox-gl'
import * as d3 from 'd3'
import d3Tip from 'd3-tip'

export default {
  name: "circular_bar",

  data:function() {
    return {
        width : this.pltwidth,
        height : 500  
    }
  },
  props: {
      pltwidth:Number,
  },
  mounted () {
    this.drawcircularbar()
  },
  methods: {
   drawcircularbar(){
       var self = this;
    d3.json('description_cnt_avg_df.json').then(function(data){
        const svg = d3.select('#circular_bar')
        .append('svg')
        .attr('width', self.width)
        .attr('height', self.height)
        .style('background-color', "#f5f5f5");

    // set the dimensions and margins of the graph
    var margin = {top: 0, right: 53, bottom: 0, left: 0},
        graphWidth = self.width - margin.left - margin.right,
        graphHeight = self.height - margin.top - margin.bottom,
        innerRadius = 150,
        outerRadius = 500;

    // append the svg object
    const graph = svg.append('g')
        .attr('width', graphWidth)
        .attr('height', graphHeight)
        .attr('transform', `translate(${graphWidth/2}, ${graphHeight/2})`);

    function scaleRadial() {
    var domain = [0, 1],
        range = [0, 1];

    function scale(x) {
        var r0 = range[0] * range[0], r1 = range[1] * range[1];
        return Math.sqrt((x - domain[0]) / (domain[1] - domain[0]) * (r1 - r0) + r0);
    }

    scale.domain = function(_) {
        return arguments.length ? (domain = [+_[0], +_[1]], scale) : domain.slice();
    };

    scale.range = function(_) {
        return arguments.length ? (range = [+_[0], +_[1]], scale) : range.slice();
    };

    scale.ticks = function(count) {
        return d3.scaleLinear().domain(domain).ticks(count);
    };

    scale.tickFormat = function(count, specifier) {
        return d3.scaleLinear().domain(domain).tickFormat(count, specifier);
    };

    return scale;
    }

    // Scales
    var x = d3.scaleBand()
        .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
        .domain(data.map(d => d.description)); 
    var y = scaleRadial()
        .domain([0, d3.max(data, d => d.countword)])
        .range([innerRadius, outerRadius / 2]);   // Domain will be define later.
    const myColor = d3.scaleLinear()
        .domain([20, 300])
        .range(["#00ccbb", "#FF5A5F"]);

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
    .attr('class', 'tip_card_circular_bar')
    .html(d => {
        let content = `<p style='margin-bottom: 0px; padding: 5px;'>${'Avg. Price: $'} <span style="color:#FFF">${d.price.toFixed(0)}</span></p>`;
        content += `<p style='margin-bottom: 0px; padding: 5px;'>${'Available Houses: '}<span style="color:#FFF">${d.countword.toFixed(0)}</span></p>`;
        return content;
    }).direction('se')
    graph.call(tip)

    // Add the bars
    graph.append("g")
        .selectAll("path")
        .data(data)
        .enter()
        .append("path")
        .attr("fill", d => myColor(d.price))
        .style("opacity", '0.7')
        .attr("d", d3.arc()     // imagine your doing a part of a donut plot
            .innerRadius(innerRadius)
            .outerRadius(d => y(d.countword))
            .startAngle(d => x(d.description))
            .endAngle(d => x(d.description) + x.bandwidth())
            .padAngle(0.01)
            .padRadius(innerRadius));
    graph.selectAll('path')
        .on("mouseover", (d, i, n) => {
            tip.show(d, n[i]);
            handleMouserover(d, i, n);
        })
        .on("mouseout", (d, i, n) => {
            tip.hide();
            handleMouseout(d, i, n);
        })
    // Add the labels
    graph.append("g")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
            .attr("text-anchor", d => (x(d.description) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start")
            .attr("transform", d => `rotate(${((x(d.description) + x.bandwidth() / 2) * 180 / Math.PI - 90)})` + `translate(${y(d.price)+10},${0})`)
        .append("text")
            .text(d => d.description)
            .attr("transform", d => (x(d.description) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)")
            .style("font-size", "14px")
            .attr("alignment-baseline", "middle")
            .attr('font-family', "Arial")
            .attr('fill', '#767676');

    // Color legend.
    var data_for_legend = [
        {"color":"#ff5a5f","value":0,"price":1000},
        {"color":"#ffb3b5","value":20,"price":300},
        {"color":"#a28481","value":40,"price":100},
        {"color":"#00A699","value":60,"price":50}
    ]
    graph.selectAll("legend")
        .data(data_for_legend)
        .enter()
        .append('rect')
        .attr('width', 50)
        .attr('height', 15)
        .attr('fill', d => d.color)
        .attr('x', graphWidth/2.1)
        .attr('y', d => d.value - 220)
        .attr('stroke-width', '0px')
        .style("anchor", "middle")
        .style("opacity", '0.6');

       graph.selectAll("legend")
        .data(data_for_legend)
        .enter()
        .append("text")
            .attr('x', graphWidth/2.1 + 10)
            .attr('y', d => d.value - 211)
            .text(d => '$' + d.price)
            .style("font-size", 12)
            .style("font-weight","bold")
            .attr('alignment-baseline', 'middle')
            .attr('font-family', 'Arial')
            .attr("fill", "#767676");

      });
    }
  }
}
</script>