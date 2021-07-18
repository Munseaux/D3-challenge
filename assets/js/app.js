// @TODO make this beautiful and lovely. 
const svgWidth = 940;
const svgHeight = 660;

const chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
};

const chartWidth = svgWidth - chartMargin.left - chartMargin.right;
const chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

let svg = d3.select("#scatter").append("svg").attr("height", svgHeight).attr("width", svgWidth);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

d3.csv("assets/data/data.csv").then( data => {

     // Add X axis
    let x = d3.scaleLinear()
        .domain([0, 40])
        .range([ 0, chartWidth ]);
    svg.append("g")
        .attr("transform", "translate(0," + chartHeight + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    let y = d3.scaleLinear()
        .domain([0,40])
        .range([ chartHeight, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("g").selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", d => {return x(d.healthcare);})
            .attr("cy", d => {return y(d.obesity);})
            .attr("r", 3)
            .style("fill", "#69b3a2");


}).catch(error => {
    console.log(error);
});