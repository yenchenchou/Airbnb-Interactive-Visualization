d3.csv('data/dataset/df.csv').then(data => {
    var priceAvgAmount = d3.nest()
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
        .attr('height', 600);

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

    // var myColor = d3.scaleSequential()
    // .domain([0, 200])
    // .interpolator(d3.interpolateOrRd);
    // console.log(myColor)
    // d3.scale.linear().domain([1,length])
    //   .interpolate(d3.interpolateHcl)
    //   .range([d3.rgb("#007AFF"), d3.rgb('#FFF500')])

    var myColor = d3.scaleSequential()
        .domain([0, 150])
        .interpolator(d3.interpolateHcl("#d66014", "#ff5a5a"));

    var myOpacity = d3.scaleLinear()
    .domain([0, d3.max(priceAvgAmount, d => d.value.avg_price)])
    .range([0.5, 1]);

    // -1- Create a tooltip div that is hidden by default:
    var tooltip = d3.select("#bubbleplot")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "black")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("color", "white")
    // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
    var showTooltip = function(d) {
        tooltip
            .transition()
            .duration(200)
        tooltip
            .style("opacity", 1)
            .html("City: " + d.key)
            .style("left", (d3.mouse(this)[0]+30) + "px")
            .style("top", (d3.mouse(this)[1]) + "px")
    }
    var moveTooltip = function(d) {
        tooltip
            .style("opacity", 0.5)
            .style("left", (d3.mouse(this)[0]+30) + "px")
            .style("top", (d3.mouse(this)[1]) + "px")
    }
    var hideTooltip = function(d) {
        tooltip
            .transition()
            .duration(200)
            .style("opacity", 0)
    }

    // join the data to circs
    const circ = graph.selectAll('circle')
        .data(priceAvgAmount)
        .enter()
        .append('circle')
        .attr("class", "bubbles")
        .attr("cx", function (d) { return x(d.value.avg_number_of_reviews); } )
        .attr("cy", function (d) { return y(d.value.avg_availability_365); } )
        .attr("r", function (d) { return z(d.value.cnt_house); } )
        .style("fill", function (d) { return myColor(d.value.avg_price); })
        .style("opacity", 0.5 )
        .on("mouseover", showTooltip )
        .on("mousemove", moveTooltip )
        .on("mouseleave", hideTooltip )
        
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

    // xAxisGroup.selectAll('text')
    // .attr('fill', 'orange')
    // .attr('transform', 'rotate(-40)')
    // .attr('text-anchor', 'end')
});