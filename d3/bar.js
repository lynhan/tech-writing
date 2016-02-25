// bar.js


// globals! sorry functional programming

var margin = {top: 20, right: 20, bottom: 40, left: 40},
width = 600 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

var dataset = [];
var zero = [];
var other = [];

var xAxis, yAxis;
var x, y;
var svg;

function init_data() {
    for (var i=50; i<=90; i+=5) {
        dataset.push(i);
    }
    for (var i=50; i<=90; i+=5) {
        zero.push(0);
        other.push(i*5280/(60*60));
    }
}

function init_scales() {
    x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

    y = d3.scale.linear()
    .range([height, 0]);

    x.domain(dataset.map(function(d) { return d; }));
    y.domain([0, d3.max(other)]);
}

function init_axis() {
    xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

    yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);
}

function init_chart() {
    svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
}

function draw_axis() {
    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .attr("x", width-70)
    .attr("y", 30)
    .attr("dy", "0.5em")
    .style("text-anchor", "right")
    .text("Miles per hour");

    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "1em")
    .style("text-anchor", "end")
    .text("Feet traveled");
}

function draw_bars() {
    svg.selectAll(".bar")
    .data(dataset)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d); })
    .attr("width", x.rangeBand())
    .attr("y", function(d, i) { return height; })
    .attr("height", function(d, i) { return 0});
}

function update_and_draw_bars() {
    svg.selectAll("rect")
    .data(dataset)
    .transition()
    .duration(1000)
    .delay(function(d, i) {
        return i / dataset.length * 1000;
    })
    .attr("y", function(d, i) { return y(other[i]); })
    .attr("height", function(d, i) { return height-y(other[i])});
}

function omg() {
    init_data();
    init_scales();
    init_axis();
    init_chart();
    draw_axis();
    draw_bars();
}

omg();
setTimeout(
    function()
    {
        update_and_draw_bars();
    }, 200
);
