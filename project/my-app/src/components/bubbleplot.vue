<template>
  <div style="height:100%;width:100%;text-align:left;">
    <div id="bubbleplot"></div>
  </div>
</template>
<script>
import * as d3 from 'd3'
import d3Tip from 'd3-tip'
export default {
  name: "bubbleplot",
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
    this.drawbubbleplot()
  },
  methods: {
   drawbubbleplot(){
     d3.select('#svg_bubble').remove();
     var data = this.hotel;
        const priceAvgAmount = d3.nest().key(d => d.properties.city)
        .rollup(function(v) {
            return {
                avg_number_of_reviews: d3.mean(v, d => d.properties.number_of_reviews),
                avg_price: d3.mean(v, d => d.properties.price),
                avg_availability_365: d3.mean(v, d => d.properties.availability_365),
                cnt_house: v.length
            }
        }).entries(data.features);
        const svg = d3.select('#bubbleplot')
            .append('svg')
            .attr("id", "svg_bubble")
            .attr('viewBox', `0 0 ${this.width} ${this.height}`)
            .style('background-color', "#f5f5f5");
        // create margins & dimensions
        const margin = {top: 20, right: 20, bottom: 50, left: 60};
        const graphWidth = this.width - margin.left - margin.right;
        const graphHeight = this.height - margin.top - margin.bottom;
        const graph = svg.append('g')
          .attr('id', 'bubble_g')
          .attr('viewBox', `0 0 ${graphWidth} ${graphHeight}`)
          .attr('transform', `translate(${margin.left}, ${margin.top})`);
        // prepare scale for bubble/color/legend
        const sorted_cnt_house = priceAvgAmount.map(d => d.value.cnt_house).sort(d3.ascending)
        const x = d3.scaleLinear()
            .domain([0, d3.max(priceAvgAmount, d => d.value.avg_number_of_reviews)])
            .range([0, graphWidth]);
        const y = d3.scaleLinear()
            .domain([0, d3.max(priceAvgAmount, d => d.value.avg_availability_365)])
            .range([graphHeight, 0]);
        const z = d3.scaleLinear()
            .domain([0, d3.max(priceAvgAmount, d => d.value.cnt_house)])
            .range([4.5, 30]);
        const legend_size = d3.scaleLinear()
            .domain([0, d3.max(priceAvgAmount, d => d.value.cnt_house)])
            .range([4.5, 30]);
        const myColor = d3.scaleLinear()
            .domain([d3.quantile(sorted_cnt_house, 0).toFixed(0), d3.quantile(sorted_cnt_house, 0.95).toFixed(0)])
            .range(["#00ccbb", "#FF5A5F"]);
        // mouse hover event handler
        const handleMouserover = (d, i, n) => {
            d3.select(n[i])
                .transition().duration(10)
                .attr('stroke', '#FF5A5F')
                .attr('stroke-width', '3.5px')
                .style('opacity', 1)
        };
        const handleMouseout = (d, i, n) => {
            d3.select(n[i])
                .transition().duration(10)
                .attr('stroke','white')
                .attr('stroke-width', '1px')
                .style("opacity", 0.5)      
        };          
        // tooltip function and content setup
        const tip = d3Tip()
        .attr('class', 'tip_card')
        .html(d => {
            let content = `<p style='color:#fda281; margin-bottom: 0px; padding: 5px;'><strong>${d.key}</strong></p>`;
            content += `<p style='margin-bottom: 0px; padding: 5px;'>avg reviews: ${d.value.avg_number_of_reviews.toFixed(0)}</p>`;
            content += `<p style='margin-bottom: 0px; padding: 5px;'>days available: ${d.value.avg_availability_365.toFixed(0)}</p>`;
            content += `<p style='color:#fff; margin-bottom: 0px; padding: 5px;'>avg price: ${d.value.avg_price.toFixed(0)}</p>`;
            return content;
            
        }).direction('se')
        graph.call(tip)
        // join the data to cirlces
        graph.selectAll('.circle1')
            .data(priceAvgAmount)
            .enter()
            .append('circle')
            .attr("class", "bubbles_1")
            .attr("cx", d => x(d.value.avg_number_of_reviews))
            .attr("cy", d => y(d.value.avg_availability_365))
            .attr("r", d => z(d.value.cnt_house))
            .attr('stroke','white')
            .attr('stroke-width', '1px')
            .style("fill", d => myColor(d.value.avg_price))
            .style("opacity", 0.6)
        graph.selectAll('circle')
            .on("mouseover", (d, i, n) => {
                tip.show(d, n[i]);
                handleMouserover(d, i, n);
            })
            .on("mouseout", (d, i, n) => {
                tip.hide();
                handleMouseout(d, i, n);
            })
        // legend setup (bubble)
        const legendData = [
            d3.quantile(sorted_cnt_house, 0.75).toFixed(0),
            // d3.quantile(sorted_cnt_house, 0.995).toFixed(0),
            d3.quantile(sorted_cnt_house, 1).toFixed(0)]
        const lengend_margin = {
            "top_circle_legend" : 65,
            "right_circle_legend" : 100,
            "top_line_legend" : 85,
            "left_line_legend" : 20,
            "top_number_legend" : 85, //fix
            "right_number_legend" : 20,
        }
        graph.selectAll("legend")
            .data(legendData)
            .enter()
            .append("circle")
            .attr("cx", graphWidth - lengend_margin.right_circle_legend)
            .attr("cy", d => lengend_margin.top_circle_legend - legend_size(d) + 10)
            .attr("r", d => legend_size(d))
            .attr("stroke", "#767676")
            .attr('stroke-width', '2px')
            .style("fill", "none")
            .style("opacity", 0.5);
        // legend segments line (bubble)
        svg.selectAll("legend")
            .data(legendData)
            .enter()
            .append("line")
                .attr('x1', graphWidth + 15)
                .attr('x2', graphWidth - 5)
                .attr('y1', d => lengend_margin.top_line_legend - legend_size(d) + 10)
                .attr('y2', d => lengend_margin.top_line_legend - legend_size(d) + 10)
                .attr('stroke', '#767676')
                .attr('stroke-width', '2px')
                .style('stroke-dasharray', ('2,2'));
        // legend labels (bubble)
        svg.selectAll("legend")
            .data(legendData)
            .enter()
            .append("text")
                .attr('x', graphWidth + lengend_margin.right_number_legend)
                .attr('y', d => lengend_margin.top_number_legend - legend_size(d) + 10)
                .text(d => d)
                .attr('alignment-baseline', 'middle')
                .attr('font-family', 'Arial')
                .attr("fill", "#767676")
                .style("font-size", 12);
        // legend text (bubble)
        svg.append("text")             
            .attr("transform", `translate(${graphWidth - 40}, ${margin.top + 10})`)
            .text("House Counts")
            .attr('fill', '#767676')
            .attr('font-family', 'Arial')
            .style('font-size', '12px')
            .style('text-anchor', 'middle');
        // legend for color
        const sorted_price = priceAvgAmount.map(d => d.value.avg_price).sort(d3.ascending)
        const q_1 = d3.quantile(sorted_price, 1).toFixed(0);
        const q_2 = d3.quantile(sorted_price, 0.75).toFixed(0);
        const q_3 = d3.quantile(sorted_price, 0.5).toFixed(0);
        const q_4 = d3.quantile(sorted_price, 0.1).toFixed(0);
        const data_for_legend = [
            {"color":myColor(q_1),"value":0,"price":q_1},
            {"color":myColor(q_2),"value":20,"price":q_2},
            {"color":myColor(q_3),"value":40,"price":q_3},
            {"color":myColor(q_4),"value":60,"price":q_4}
        ];
        graph.append('g')
            .selectAll('rect')
            .data(data_for_legend)
            .enter()
            .append('rect')
            .attr('width', 45)
            .attr('height', 10)
            .attr('fill', d => d.color)
            .attr('x', graphWidth - lengend_margin.right_circle_legend - 21.5)
            .attr('y', d => d.value + lengend_margin.top_circle_legend + 20)
            .attr('stroke-width', '0px')
            .style("text-anchor", "middle")
            .style("opacity", '0.6');
        // legend segments line (colored square, which represent the price)
        svg.selectAll("legend")
            .data(data_for_legend)
            .enter()
            .append("line")
                .attr('x1', graphWidth - 10)
                .attr('x2', graphWidth + 15)
                .attr('y1', d => 110 + d.value)
                .attr('y2', d => 110 + d.value)
                .attr('stroke', '#767676')
                .attr('stroke-width', '2px')
                .style('stroke-dasharray', ('2,2'));
        // legend labels (colored square, which represent the price)
        svg.selectAll("legend")
            .data(data_for_legend)
            .enter()
            .append("text")
                .attr('x', graphWidth + 20)
                .attr('y', d => 110 + d.value)
                .text(d => '$' + d.price)
                .attr('alignment-baseline', 'middle')
                .attr('font-family', 'Arial')
                .attr("fill", "#767676")
                .style("font-size", 12);
    
        // create axes groups
        const xAxisGroup = graph.append('g')
            .attr("class", "axis_x")
            .attr('transform', `translate(0, ${graphHeight})`);
        const yAxisGroup = graph.append('g')
            .attr("class", "axis_y");
        xAxisGroup.call(d3.axisBottom(x));
        yAxisGroup.call(d3.axisLeft(y));
        // text label for the x axis
        svg.append("text")             
            .attr("transform", `translate(${graphWidth/2 + margin.left -5}, ${graphHeight + margin.top + 40})`)
            .attr('font-family', 'Arial')
            .attr('fill', '#767676')
            .text("Reviews")
            .style('font-size', '16px')
            .style("text-anchor", "middle");
        // text label for the y axis
        svg.append("text")             
            .attr("transform", `translate(20, ${graphHeight/2 + margin.top + 5}) rotate(-90)`)
            .attr('font-family', 'Arial')
            .attr('fill', '#767676')
            .text("Days")
            .style('font-size', '16px')
            .style("text-anchor", "middle");
    },
    update_plot(){
    // console.log("testing in bubble",this.incomingpoint)
    d3.selectAll('.bubbles2_identifier').remove();
     var data = this.hotel;
      const priceAvgAmount = d3.nest().key(d => d.properties.city)
      .rollup(function(v) {
        return {
          avg_number_of_reviews: d3.mean(v, d => d.properties.number_of_reviews),
          avg_price: d3.mean(v, d => d.properties.price),
          avg_availability_365: d3.mean(v, d => d.properties.availability_365),
          cnt_house: v.length
        }
      }).entries(data.features);
      const margin = {top: 20, right: 20, bottom: 50, left: 90};
      const graphWidth = this.width - margin.left - margin.right;
      const graphHeight = this.height - margin.top - margin.bottom;
      const x = d3.scaleLinear()
          .domain([0, d3.max(priceAvgAmount, d => d.value.avg_number_of_reviews)])
          .range([0, graphWidth]);
      const y = d3.scaleLinear()
          .domain([0, d3.max(priceAvgAmount, d => d.value.avg_availability_365)])
          .range([graphHeight, 0]);
      const z = d3.scaleLinear()
          .domain([0, d3.max(priceAvgAmount, d => d.value.cnt_house)])
          .range([4, 30]);
      const myColor = d3.scaleLinear()
          .domain([20, 300])
          .range(["#00ccbb", "#FF5A5F"]);

      const new_coming = [{'value':{
        'avg_number_of_reviews': this.incomingpoint.properties.number_of_reviews, 
        'avg_price': this.incomingpoint.properties.price,
        'avg_availability_365': this.incomingpoint.properties.availability_365, 
        'cnt_house': 1
        }}]    
      d3.select("#bubble_g").selectAll('.bubbles_1').style("opacity", '0.4');
      d3.select("#bubble_g").selectAll('.bubbles_2')
        .data(new_coming)
        .enter()
        .append('circle')
        .attr("class", "bubbles2_identifier")
        .attr("cx", d => x(d.value.avg_number_of_reviews))
        .attr("cy", d => y(d.value.avg_availability_365))
        .attr("r", d => z(d.value.cnt_house) * 2)
        .attr('stroke','white')
        .attr('stroke-width', '1px')
        .style("fill", d => myColor(d.value.avg_price))
        .style("opacity", 0.8)
        .transition().duration(2000)
          .attr("r", d => z(d.value.cnt_house) * 5)
          .attr('stroke','#ffbf00')
          .attr('stroke-width', '5px');
  }
  },
  watch:{
      incomingpoint: function() {
        //   console.log("watch",newValue,oldValue)
          this.update_plot()
      },
      hotel: function(){
          this.drawbubbleplot()
      }
  }
}
</script>