
d3.json("data/dataset/description_cnt_avg_df.json").then(data => {
    // select the svg container first
    const svg = d3.select('#circular_bar')
        .append('svg')
        .attr('width', 800)
        .attr('height', 600)
        .style('background-color', "#f0f4f5");

    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 120, bottom: 20, left: 0},
        graphWidth = 800 - margin.left - margin.right,
        graphHeight = 600 - margin.top - margin.bottom,
        innerRadius = 180,
        outerRadius = Math.min(graphWidth, graphHeight);

    // append the svg object
    const graph = svg.append('g')
        .attr('width', graphWidth)
        .attr('height', graphHeight)
        .attr('transform', `translate(${graphWidth/2}, ${graphHeight/2 + 40})`);

    // Scales
    var x = d3.scaleBand()
        .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
        .domain(data.map(d => d.description)); 
    var y = d3.scaleRadial()
        .range([innerRadius, outerRadius])   // Domain will be define later.
        .domain([0, d3.max(data, d => d.countword)]);


    // event handler
    const handleMouserover = (d, i, n) => {
        d3.select(n[i])
        .transition().duration(10)
            .attr('stroke', '#808080')
            .attr('stroke-width', '3px')
    }
    const handleMouseout = (d, i, n) => {
        d3.select(n[i])
        .transition().duration(10)
            .attr('stroke','#ffd1d2')
            .attr('stroke-width', '0px')   
    } 


    // Tooltip setupb order-radius: 25px;
    const tip = d3.tip()
    .attr('class', 'tip_card')
    .html((d, i, n) => {
        let content = `<p>${'avg price: $' + d.price.toFixed(0)}</p>`;
        content += `<p>${'# of house available: ' + d.countword}</p>`;
        return content;
    }).direction('se')
    graph.call(tip)

    // Add the bars
    graph.append("g")
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
        .on("mouseover", (d, i, n) => {
            tip.show(d, n[i]);
            handleMouserover(d, i, n);
        })
        .on("mouseout", (d, i, n) => {
            tip.hide();
            handleMouseout(d, i, n);
        })
    // Add the labels
    graph.append("g")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
            .attr("text-anchor", function(d) { return (x(d.description) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
            .attr("transform", function(d) { return "rotate(" + ((x(d.description) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d['price'])+10) + ",0)"; })
        .append("text")
            .text(function(d){return(d.description)})
            .attr("transform", function(d) { return (x(d.description) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
            .style("font-size", "14px")
            .attr("alignment-baseline", "middle")
            .attr('font-family', "Arial")
            .attr('fill', '#808080');

});

