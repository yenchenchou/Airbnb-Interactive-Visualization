
d3.json("data/dataset/description_cnt_avg_df.json").then(data => {
    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 0, bottom: 0, left: 0},
        width = 400 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom,
        innerRadius = 90,
        outerRadius = Math.min(width, height) / 2;

    // append the svg object
    var svg = d3.select("#circular_bar")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + (200 + margin.left) + "," + (150 + margin.top) + ")");

    // Scales
    var x = d3.scaleBand()
        .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
        .domain(data.map(d => d.description)); 
    var y = d3.scaleRadial()
        .range([innerRadius, outerRadius])   // Domain will be define later.
        .domain([0, 14000]);
    // Add the bars
    svg.append("g")
        .selectAll("path")
        .data(data)
        .enter()
        .append("path")
        .attr("fill", "#FF5A5F")
        .attr("d", d3.arc()     // imagine your doing a part of a donut plot
            .innerRadius(innerRadius)
            .outerRadius(function(d) { return y(d['price']); })
            .startAngle(function(d) { return x(d.description); })
            .endAngle(function(d) { return x(d.description) + x.bandwidth(); })
            .padAngle(0.01)
            .padRadius(innerRadius))
    // Add the labels
    svg.append("g")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
            .attr("text-anchor", function(d) { return (x(d.description) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
            .attr("transform", function(d) { return "rotate(" + ((x(d.description) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d['price'])+10) + ",0)"; })
        .append("text")
            .text(function(d){return(d.description)})
            .attr("transform", function(d) { return (x(d.description) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
            .style("font-size", "11px")
            .attr("alignment-baseline", "middle")
});

