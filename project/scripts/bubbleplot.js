d3.csv('data/dataset/df.csv').then(data => {
    const priceAvgAmount = d3.nest()
        .key(d => d.city)
        .rollup(function(v) {
            return {
                avg_number_of_reviews: d3.mean(v, d => d.number_of_reviews),
                avg_price: d3.mean(v, d => d.price),
                avg_availability_365: d3.mean(v, d => d.availability_365),
                cnt_house: v.length
            }
        })
        .entries(data);

    // select the svg container first
    const svg = d3.select('#bubbleplot')
        .append('svg')
        .attr('width', 800)
        .attr('height', 600)
        .style('background-color', "#f0f4f5");

    // create margins & dimensions
    const margin = {top: 20, right: 20, bottom: 50, left: 120};
    const graphWidth = 800 - margin.left - margin.right;
    const graphHeight = 600 - margin.top - margin.bottom;

    const graph = svg.append('g')
        .attr('width', graphWidth)
        .attr('height', graphHeight)
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // prepare for the bubble 
    const x = d3.scaleLinear()
    .domain([0, d3.max(priceAvgAmount, d => d.value.avg_number_of_reviews)])
    .range([0, graphWidth]);

    const y = d3.scaleLinear()
    .domain([0, d3.max(priceAvgAmount, d => d.value.avg_availability_365)])
    .range([graphHeight, 0]);

    const z = d3.scaleLinear()
    .domain([0, d3.max(priceAvgAmount, d => d.value.cnt_house)])
    .range([4, 30]);

    const legend_size = d3.scaleSqrt()
    .domain([0, d3.max(priceAvgAmount, d => d.value.cnt_house)])
    .range([4, 30]);

    const myColor = d3.scaleLinear()
        .domain([20, 300])
        .range(["#00ccbb", "#FF5A5F"]); // ["#00A699", "#FF5A5F"]

    // event handler
    const handleMouserover = (d, i, n) => {
        d3.select(n[i])
        .transition().duration(10)
            .style('opacity', 1)
            .attr('stroke', '#767676')
            .attr('stroke-width', '3.5px')
    }
    const handleMouseout = (d, i, n) => {
        d3.select(n[i])
        .transition().duration(10)
            .attr('stroke','white')
            .attr('stroke-width', '1px')
            .style("opacity", 0.5)      
    } 

    // Tooltip setup
    const tip = d3.tip()
    .attr('class', 'tip_card')
    .html((d, i, n) => {
        let content = `<p style='color:#fda281;'><strong>${d.key}</strong></p>`;
        content += `<p>avg reviews: ${d.value.avg_number_of_reviews.toFixed(0)}</p>`;
        content += `<p>days available: ${d.value.avg_availability_365.toFixed(0)}</p>`;
        content += `<p style='color:#fff;'>avg price: ${d.value.avg_price.toFixed(0)}</p>`;
        return content;
    }).direction('se')
    graph.call(tip)

    // join the data to circs
    const circ = graph.selectAll('circle')
        .data(priceAvgAmount)
        .enter()
        .append('circle')
        .attr("class", "bubbles")
        .attr("cx", function (d) { return x(d.value.avg_number_of_reviews); } )
        .attr("cy", function (d) { return y(d.value.avg_availability_365); } )
        .attr("r", function (d) { return z(d.value.cnt_house); } )
        .attr('stroke','white')
        .attr('stroke-width', '1px')
        .style("fill", function (d) { return myColor(d.value.avg_price); })
        .style("opacity", 0.5 )

    graph.selectAll('circle')
        .on("mouseover", (d, i, n) => {
            tip.show(d, n[i]);
            handleMouserover(d, i, n);
        })
        .on("mouseout", (d, i, n) => {
            tip.hide();
            handleMouseout(d, i, n);
        })

    //// legend setup
    const legendData = [1,5000,20000]
    graph.selectAll("legend")
        .data(legendData)
        .enter()
        .append("circle")
        .attr("cx", graphWidth - 100)
        .attr("cy", function(d){ return 60 - legend_size(d) } )
        .attr("r", function(d){ return legend_size(d) })
        .style("fill", "none")
        .attr("stroke", "#767676")
        .attr('stroke-width', '2px')
        .style("opacity", 0.5)
    // Add legend: segments
    svg.selectAll("legend")
        .data(legendData)
        .enter()
        .append("line")
            .attr('x1', graphWidth + 70)
            .attr('x2', function(d){ return graphWidth + legend_size(d) + 20})
            .attr('y1', function(d){ return 80 - legend_size(d) } )
            .attr('y2', function(d){ return 80 - legend_size(d) } )
            .attr('stroke', '#767676')
            .attr('stroke-width', '2px')
            .style('stroke-dasharray', ('2,2'))
    // Add legend: labels
    svg.selectAll("legend")
        .data(legendData)
        .enter()
        .append("text")
            .attr('x', graphWidth + 80)
            .attr('y', function(d){ return 80 - legend_size(d) })
            .text( function(d){ return d } )
            .style("font-size", 12)
            .attr('alignment-baseline', 'middle')
            .attr('font-family', 'Arial')
            .attr("fill", "#767676")
    // Add square
    svg.selectAll("legend")
        .data(legendData)
        .enter()
        .append("rect")
            .attr('x', graphWidth - 20)
            .attr('y', margin.top)
            .attr("width", 150)
            .attr("height", 160)
            .attr('stroke', '#767676')
            .attr('stroke-width', '1.5px')
            .style('stroke-dasharray', ('2,2'))
            .attr("fill", "none")
    // Add legend text
    svg.append("text")             
        .attr("transform", `translate(${graphWidth - 20}, ${margin.top - 1})`)
        .attr('fill', '#767676')
        .style('font-size', '12px')
        .text("House Counts")
        .attr('font-family', 'Arial');
    // Color legend.
    data_for_legend = [
        {"color":"#ff5a5f","value":0,"price":1000},
        {"color":"#ffb3b5","value":20,"price":300},
        {"color":"#a28481","value":40,"price":100},
        {"color":"#00A699","value":60,"price":50}
    ]
    graph.append('g')
        .selectAll('rect')
        .data(data_for_legend)
        .enter()
        .append('rect')
        .attr('width', 45)
        .attr('height', 10)
        .attr('fill', d => d.color)
        .attr('x', graphWidth - 122)
        .attr('y', d => d.value + 80)
        .attr('stroke-width', '0px')
        .style("anchor", "middle")
        .style("opacity", '0.6');

    svg.selectAll("legend")
        .data(data_for_legend)
        .enter()
        .append("line")
            .attr('x1', graphWidth + 50)
            .attr('x2', graphWidth + 70)
            .attr('y1', function(d){ return 105 + d.value } )
            .attr('y2', function(d){ return 105 + d.value } )
            .attr('stroke', '#767676')
            .attr('stroke-width', '2px')
            .style('stroke-dasharray', ('2,2'))
    // Add legend: labels
    svg.selectAll("legend")
        .data(data_for_legend)
        .enter()
        .append("text")
            .attr('x', graphWidth + 80)
            .attr('y', function(d){ return 105 + d.value })
            .text(d => '$' + d.price)
            .style("font-size", 12)
            .attr('alignment-baseline', 'middle')
            .attr('font-family', 'Arial')
            .attr("fill", "#767676")
  
    // create axes groups
    const xAxisGroup = graph.append('g')
        .attr("class", "axis_x")
        .attr('transform', `translate(0, ${graphHeight})`)
    const yAxisGroup = graph.append('g')
        .attr("class", "axis_y");
    xAxisGroup.call(d3.axisBottom(x));
    yAxisGroup.call(d3.axisLeft(y));

    // text label for the x axis
    svg.append("text")             
        .attr("transform", `translate(${graphWidth/2 + margin.left -5}, ${graphHeight + margin.top + 40})`)
        .attr('fill', '#767676')
        .style('font-size', '16px')
        .style("text-anchor", "middle")
        .text("Reviews")
        .attr('font-family', 'Arial');
    // text label for the y axis
    svg.append("text")             
        .attr("transform", `translate(40, ${graphHeight/2 + margin.top + 5})`)
        .attr('fill', '#767676')
        .style('font-size', '16px')
        .style("text-anchor", "middle")
        .text("Days")
        .attr('font-family', 'Arial');
});