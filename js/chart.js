function Chart() {
    this._element = "";
    this._width = 0;
    this._barHeight = 0;
    this._data = [];
    return this;
};

Chart.prototype.element = function(element) {
    this._element = element;
    return this;
};

Chart.prototype.width = function(width) {
    this._width = width;
    return this;
};

Chart.prototype.barHeight = function(barHeight) {
    this._barHeight = barHeight;
    return this;
};

Chart.prototype.data = function(data) {
    this._data = data;
    return this;
};

Chart.prototype.draw  = function() {
    var element = this._element;
    var width = this._width;
    var barHeight = this._barHeight;
    var data = this._data;
    var x = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0, width]);

    var chart = d3.select(element)
        .attr("width", width)
        .attr("height", barHeight * data.length);

    var bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

    bar.append("rect")
        .attr("width", x)
        .attr("height", barHeight - 1);

    bar.append("text")
        .attr("x", function(d) { return x(d) - 3; })
        .attr("y", barHeight / 2)
        .attr("dy", ".30em")
        .text(function(d, i) { return "(" + (i + 1) + ")" + d; });
};