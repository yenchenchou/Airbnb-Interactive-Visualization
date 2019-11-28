d3.csv('data/dataset/df.csv').then(data => {
    // select the svg container first
    const svg = d3.select('#distplot')
        .append('svg')
        .attr('viewBox', `0 0 800 300`)
        .style('background-color', "#f0f4f5");

    // create margins & dimensions
    const margin = {top: 20, right: 20, bottom: 100, left: 120};
    const graphWidth = 800 - margin.left - margin.right;
    const graphHeight = 300 - margin.top - margin.bottom;
    const graph = svg.append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // prepare scale for histogram
    var x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.price)])
        .range([0, graphWidth]);
    var histogram = d3.histogram()
        .value(d => d.price)   // I need to give the vector of value
        .domain(x.domain())  // then the domain of the graphic
        .thresholds(x.ticks(200)); // then the numbers of bins
    var bins = histogram(data);
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
    const tip = d3.tip()
    .attr('class', 'tip_card')
    .html((d, i, n) => {
        let content = `<p>${'price range: ' + d.x0.toFixed(0) + '-' + d.x1.toFixed(0)}</p>`;
        content += `<p>${'houses count: ' + d.length}</p>`;
        return content;
    }).direction('ne');
    graph.call(tip);  

    // join the data to rects
    const rects = graph.selectAll('rect')
        .data(bins)
        .enter()
        .append('rect')
        .attr("transform", d => `translate(${x(d.x0)},0)`)
        .attr("x", 0.7)
        .attr('y', graphHeight)
        .attr("width", d => x(d.x1) - x(d.x0) - 0.7)
        .style("fill", "#FF5A5F")
        .transition().duration(2000)
            .attr('y', d => y(d.length))
            .attr("height", d => graphHeight - y(d.length));
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