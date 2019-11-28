d3.json('data/dataset/room_type_price.json').then(data => {
    // select the svg container first
    const svg = d3.select('#barplot')
        // .attr("preserveAspectRatio", "xMinYMin meet")
        .append('svg')
        .attr('viewBox', `0 0 800 300`)
        // .attr('width', 800)
        // .attr('height', 300)
        .style('background-color', "#f0f4f5");

    // create margins & dimensions
    const margin = {top: 20, right: 20, bottom: 45, left: 120};
    const graphWidth = 800 - margin.left - margin.right;
    const graphHeight = 300 - margin.top - margin.bottom;
    const graph = svg.append('g')
        .attr('width', graphWidth)
        .attr('height', graphHeight)
        // .attr('viewBox', `0 0 ${graphWidth} ${graphHeight}`)
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
    // prepare scale for rect/color
    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.price)])
        .range([0, graphWidth]); 
    const y = d3.scaleBand()
        .domain(data.map(item => item.room_type))
        .range([0, graphHeight])
        .paddingInner(0.2)
        .paddingOuter(0.2);
    const myColor = d3.scaleOrdinal().domain(data.map(item => item.room_type))
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
    const tip = d3.tip()
    .attr('class', 'tip_card')
    .html((d, i, n) => {
        let content = `<p class=bubble_point>${'$' + d.price.toFixed(2)}</p>`;;
        return content;
    }).direction('se');
    graph.call(tip);

    // join the data to rects
    const rects = graph.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('height', y.bandwidth())
        .attr('fill', d => myColor(d.room_type))
        .attr('x', 0)
        .attr('y', d => y(d.room_type))
        .attr('stroke-width', '0px')
        .style("opacity", '1')
        .transition().duration(3000)
            .attr('x', 0)
            .attr("width", d => x(d.price));
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
        .ticks(7)
        .tickFormat(d => '$' + d);
    const yAxis = d3.axisLeft(y)
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);
    // text label for the x axis
    svg.append("text")             
        .attr("transform", `translate(${graphWidth/2 + margin.left}, ${graphHeight + margin.top + 40})`)
        .attr('font-family', 'Arial')
        .attr('fill', '#767676')
        .text("Average Price")
        .style('font-size', '16px')
        .style("text-anchor", "middle");
});