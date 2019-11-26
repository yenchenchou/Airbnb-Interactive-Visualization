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
    const margin = {top: 20, right: 20, bottom: 30, left: 100};
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

    const myColor = d3.scaleSequential()
        .domain([0, 150])
        .interpolator(d3.interpolateHcl("#d66014", "#ff5a5a"));

    // event handler
    const handleMouserover = (d, i, n) => {
        d3.select(n[i])
        .transition().duration(10)
            .style('opacity', 1)
            .attr('stroke', '#808080')
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
        let content = `<p><strong>${d.key}</strong></p>`;
        content += `<p>avg reviews: ${d.value.avg_number_of_reviews.toFixed(0)}</p>`;
        content += `<p>days available: ${d.value.avg_availability_365.toFixed(0)}</p>`;
        content += `<p># of houses: ${d.value.cnt_house}</p>`;
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
        .attr("transform", `translate(${graphWidth/2 + margin.left}, ${graphHeight + margin.top + 40})`)
        .attr('fill', '#808080')
        .style('font-size', '20px')
        .style('font-style', 'italic')
        .style("text-anchor", "middle")
        .text("Reviews");
    // text label for the y axis
    svg.append("text")             
        .attr("transform", `translate(40, ${graphHeight/2 + margin.top})`)
        .attr('fill', '#808080')
        .style('font-size', '20px')
        .style('font-style', 'italic')
        .style("text-anchor", "middle")
        .text("Days");
});