
d3.json("data/dataset/description_cnt_avg_df.json").then(data => {
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#scatter_plot")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
            
    // Add X axis
    var x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.price)])
        .range([ 0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.countword)])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.price); } )
        .attr("cy", function (d) { return y(d.countword); } )
        .attr("r", 3)
        .style("fill", "#FF5A5F")
});

