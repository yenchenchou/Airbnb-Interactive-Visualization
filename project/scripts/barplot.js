d3.json('data/dataset/room_type_price.json').then(data => {
    // select the svg container first
    const svg = d3.select('#barplot')
        .append('svg')
        .attr('width', 800)
        .attr('height', 300);

    // create margins & dimensions
    const margin = {top: 20, right: 20, bottom: 100, left: 120};
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

    // join the data to circs
    const rects = graph.selectAll('rect')
    .data(data);

    // append the enter selection to the DOM
    rects.enter()
    .append('rect')
        .attr('height', y.bandwidth())
        .attr("width", d => d.price)
        .attr('fill', '#FF5A5F')
        .attr('x', 0)
        .attr('y', d => y(d.room_type))
        .style("opacity", '1');

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
        // .attr('fill', '#808080')
    yAxisGroup.selectAll('text')
        // .attr('fill', '#808080')
        .attr('transform', 'rotate(-40)')
        .attr('text-anchor', 'end')

    // text label for the x axis
    svg.append("text")             
        .attr("transform", `translate(${graphWidth/2 + margin.left}, ${graphHeight + margin.top + 40})`)
        .attr('fill', '#808080')
        .style('font-size', '20px')
        .style('font-style', 'italic')
        .style("text-anchor", "middle")
        .text("Avg. Price");
});