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
      width : this.pltwidth,
      height : 300,  
      //point:this.incomingpoint
    }
  },
  props: {
      pltwidth:Number,
      hotel:Object,
      incomingpoint:Object
  },
  mounted () {
    this.drawbarplot()
  },
  methods: {
    drawbarplot(){
      d3.select('#svg_bar').remove();
      var data = this.hotel;
    const priceAvg = d3.nest().key(d => d.properties.room_type)
        .rollup(function(v) {
            return {
                avg_price: d3.mean(v, d => d.properties.price)
            }
        }).entries(data.features);
      const svg = d3.select('#barplot')
          .attr("preserveAspectRatio", "xMinYMin meet")
          .append('svg')
          .attr("id", "svg_bar")
          //.attr('width',this.width)
          //.attr('height',this.height)
          .attr('viewBox', `0 0 ${this.width} ${this.height}`)
          .style('background-color', "#f5f5f5");
      // create margins & dimensions
      const margin = {top: 20, right: 40, bottom: 45, left: 120};
      const graphWidth = this.width - margin.left - margin.right;
      const graphHeight = this.height - margin.top - margin.bottom;
      const graph = svg.append('g')
        .attr("id", "bar_g")
        //.attr('width',this.width)
        //.attr('height',this.height)
        .attr('viewBox', `0 0 ${graphWidth} ${graphHeight}`)
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
      .html(d => {
        let content = `<p class=bubble_point style="margin-bottom: 0px; padding: 5px;">${'$ ' + d.value.avg_price.toFixed(0)}</p>`;
        return content;
      }).direction('e');
      graph.call(tip);

      // join the data to rects
        graph.selectAll('.bar')
          .data(priceAvg)
          .enter()
          .append('rect')
          .attr("class", "bar1")
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
      const xAxis = d3.axisBottom(x)
        .ticks(7)
        .tickFormat(d => '$' + d);
      const yAxis = d3.axisLeft(y)
      graph.append('g')
        .attr("class", "axis_x")
        .attr('transform', `translate(0, ${graphHeight})`)
        .call(xAxis);
      graph.append('g')
        .attr("class", "axis_y")
        .call(yAxis);
      
      // text label for the x axis
      svg.append("text")             
        .attr("transform", `translate(${graphWidth/2 + margin.left}, ${graphHeight + margin.top + 40})`)
        .attr('font-family', 'Arial')
        .attr('fill', '#767676')
        .text("Average Price")
        .style('font-size', '16px')
        .style("text-anchor", "middle");

    // resize();  //redraw in case we start small!
    // d3.select(window).on('resize', resize());
    // function resize() {
    //     var width = parseInt(d3.select('#svg_bar').style('width')) - margin.left - margin.right;
    //     var height = parseInt(d3.select('#svg_bar').style('height')) - margin.top - margin.bottom;
        
    // if(width < 300 || height < 200){            
    //     svg.select('.axis_x').style('display', 'none');  //hide
    //     svg.select('.axis_y').style('display', 'none');  //hide
    //   }
    //   else{        
    //      svg.select('.axis_x').style('display', 'initial');  //show
    //      svg.select('.axis_y').style('display', 'initial');  //show
    //   }
    // }
    //window.addEventListener("resize", resize);
    },
    update_plot(){
        // console.log("testing in bar",this.incomingpoint.properties)
      d3.selectAll('.bar2_identifier').remove();
      var data = this.hotel;
      var priceAvg = d3.nest().key(d => d.properties.room_type)
        .rollup(function(v) {
            return {
                avg_price: d3.mean(v, d => d.properties.price),
                cnt_house: v.length
            }
        }).entries(data.features);
      var margin = {top: 20, right: 40, bottom: 45, left: 120};
      var graphWidth = this.width - margin.left - margin.right;
      var graphHeight = this.height - margin.top - margin.bottom;
      const x = d3.scaleLinear()
        .domain([0, d3.max(priceAvg, d => d.value.avg_price)])
        .range([0, graphWidth]); 
      const y = d3.scaleBand()
        .domain(['Entire home/apt', 'Private room', 'Shared room']) // d3.map(new_data => new_data.properties.room_type)
        .range([0, graphHeight])
        .paddingInner(0.2)
        .paddingOuter(0.2);
      const new_coming = [{'properties':{'room_type':this.incomingpoint.properties.room_type, 
                          'price':this.incomingpoint.properties.price}}]    
      d3.select("#bar_g").selectAll('.bar1').style("opacity", '0.3');
      d3.select("#bar_g").append('g') 
        .attr("class", "bar2_identifier_text")
        .selectAll('.bar2')
        .append('g')
        .data(new_coming)
        .enter()
        .append('rect')
        .attr("class", "bar2_identifier")
        .attr('x', 0)
        .attr('y', d => y(d.properties.room_type))
        .attr('height', y.bandwidth())
        .attr('fill', function(d){
          if(d.properties.room_type == 'Entire home/apt'){
            return '#FF5A5F'
          } else if (d.properties.room_type == 'Private room'){
            return '#00A699'
          } else{
            return '#FC642D'
          }
        })
        .attr('stroke-width', '0px')
        .style("opacity", '1')
        .transition().duration(3000)
          .attr('x', 0)
          .attr("width", d => x(d.properties.price));    

      d3.select('body').select('#click_data_stats')
        .text('Your Selection Price: ' + this.incomingpoint.properties.price)
    }
  },
  watch:{
      incomingpoint: function() {
          // console.log("watch",newValue,oldValue)
          this.update_plot()
      },
      hotel: function(){
          this.drawbarplot()
      },
      width:function(){
          // console(this.width)
      }
  }
}
</script>