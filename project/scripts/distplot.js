d3.csv('data/dataset/df.csv').then(data => {
    // select the svg container first
    const svg = d3.select('#distplot')
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

    // console.log(data.length);

    var x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.price)])
        .range([0, graphWidth])

    var histogram = d3.histogram()
        .value(function(d) { return d.price; })   // I need to give the vector of value
        .domain(x.domain())  // then the domain of the graphic
        .thresholds(x.ticks(200)); // then the numbers of bins
    var bins = histogram(data);

    var y = d3.scaleLinear()
        .domain([0, d3.max(bins, d => d.length)])
        .range([graphHeight, 0]);

    // append the enter selection to the DOM
    // join the data to circs
    const rects = graph.selectAll('rect')
        .data(bins)
        .enter()
        .append('rect')
        .attr("x", 0.7)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) - 0.7 ; })
        .attr("height", function(d) { return graphHeight - y(d.length); })
        .style("fill", "#FF5A5F")

    // create axes groups
    const xAxisGroup = graph.append('g')
        .attr("class", "axis_x")
        .attr('transform', `translate(0, ${graphHeight})`)
    const yAxisGroup = graph.append('g')
        .attr("class", "axis_y")

    // create & call axesit
    const xAxis = d3.axisBottom(x)
        .ticks(20);
    const yAxis = d3.axisLeft(y)

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    xAxisGroup.selectAll('text')
    // .style('fill', '#69b3a2')
    .attr('transform', 'rotate(-40)')
    .attr('text-anchor', 'end')

    // text label for the x axis
    svg.append("text")             
        .attr("transform", `translate(${graphWidth/2 + margin.left}, ${graphHeight + margin.top + 50})`)
        .attr('fill', '#808080')
        .style('font-size', '20px')
        .style('font-style', 'italic')
        .style("text-anchor", "middle")
        .text("Price");
    // text label for the y axis
    svg.append("text")             
        .attr("transform", `translate(25, ${graphHeight/2 + margin.top})`)
        .attr('fill', '#808080')
        .style('font-size', '20px')
        .style('font-style', 'italic')
        .style("text-anchor", "middle")
        .text("Count");
});