<template>
  <div style="height:100%;width:100%;text-align:left;">
    <div id="circularbar"></div>
  </div>
</template>
<script>
// import mapboxgl from 'mapbox-gl'
import * as d3 from 'd3'
import d3Tip from 'd3-tip'
// import scaleRadial from 'd3-scale'

export default {
  name: "circularbar",

  data:function() {
    return {
    }
  },
  mounted () {
    this.drawcircularbar()
  },
  methods: {
   drawcircularbar(){
       d3.csv('df.csv').then(function(data){
        // select the svg container first
        const svg = d3.select('#circularbar')
            .append('svg')
            .attr('viewBox', `0 0 800 600`)
            .style('background-color', "#f0f4f5");

        // set the dimensions and margins of the graph
        const margin = {top: 30, right: 120, bottom: 20, left: 0};
        const graphWidth = 800 - margin.left - margin.right;
        const graphHeight = 600 - margin.top - margin.bottom;
        const innerRadius = 180;
        const outerRadius = Math.min(graphWidth, graphHeight);
        const graph = svg.append('g')
            .attr('width', graphWidth)
            .attr('height', graphHeight)
            .attr('transform', `translate(${graphWidth/2}, ${graphHeight/2 + 40})`);

        function scaleRadial() {
            var domain = [0, d3.max(data, d => d.countword)],
                range = [0, innerRadius, outerRadius / 2];

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

        // prepare scale for rect/color
        var x = d3.scaleBand()
            .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
            .domain(data.map(d => d.description)); 
        var y = scaleRadial()
            .domain([0, d3.max(data, d => d.countword)])
            .range([innerRadius, outerRadius / 2]);   // Domain will be define later.
        const myColor = d3.scaleLinear()
            .domain([20, 300])
            .range(["#00ccbb", "#FF5A5F"]);

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
            let content = `<p>${'avg price: $' + d.price.toFixed(0)}</p>`;
            content += `<p>${'# of house available: ' + d.countword}</p>`;
            return content;
        }).direction('ne');
        graph.call(tip);

        // join the data to path
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
            });
        // add the labels of circular bar
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
        graph.selectAll('text')
            .on("mouseover", (d, i, n) => {
                tip.show(d, n[i]);
            })
            .on("mouseout", 
                tip.hide()
            );
        // legend setup (colored square, which represent the price)
        const data_for_legend = [
            {"color":"#ff5a5f","value":0,"price":1000},
            {"color":"#ffb3b5","value":20,"price":300},
            {"color":"#a28481","value":40,"price":100},
            {"color":"#00A699","value":60,"price":50}
        ];
        graph.selectAll("legend")
            .data(data_for_legend)
            .enter()
            .append('rect')
            .attr('width', 45)
            .attr('height', 10)
            .attr('fill', d => d.color)
            .attr('x', graphWidth/2.1)
            .attr('y', d => d.value - 200)
            .attr('stroke-width', '0px')
            .style("anchor", "middle")
            .style("opacity", '0.6');
        // legend segments line (colored square, which represent the price)
        graph.selectAll("legend")
            .data(data_for_legend)
            .enter()
            .append("line")
                .attr('x1', graphWidth/2.1 + 50)
                .attr('x2', graphWidth/2.1 + 70)
                .attr('y1', d => d.value - 195)
                .attr('y2', d => d.value - 195)
                .attr('stroke', '#767676')
                .attr('stroke-width', '2px')
                .style('stroke-dasharray', ('2,2'));
        // legend labels (colored square, which represent the price)
        graph.selectAll("legend")
            .data(data_for_legend)
            .enter()
            .append("text")
                .attr('x', graphWidth/2.1 + 80)
                .attr('y', d => d.value - 195)
                .text(d => '$' + d.price)
                .style("font-size", 12)
                .attr('alignment-baseline', 'middle')
                .attr('font-family', 'Arial')
                .attr("fill", "#767676");
        // // Add square
        // graph.selectAll("legend")
        //     .data(data_for_legend)
        //     .enter()
        //     .append("rect")
        //         .attr('x', graphWidth/2.1 - 20)
        //         .attr('y', -220)
        //         .attr("width", 150)
        //         .attr("height", 105)
        //         .attr('stroke', '#767676')
        //         .attr('stroke-width', '1.5px')
        //         .style('stroke-dasharray', ('2,2'))
        //         .attr("fill", "none")
      });
    }
  }
}
</script>
