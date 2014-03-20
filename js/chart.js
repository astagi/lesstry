function Chart() {
    this._element = "";
    this._width = 0;
    this._barHeight = 0;
    this._data = [];
    return this;
};

Chart.prototype.setElement = function(element) {
    this._element = element;
    return this;
};

Chart.prototype.setWidth = function(width) {
    this._width = width;
    return this;
};

Chart.prototype.setBarHeight = function(barHeight) {
    this._barHeight = barHeight;
    return this;
};

Chart.prototype.setData = function(data) {
    this._data = data;
    return this;
};

Chart.prototype.getMaxElement = function(field)  {
    var max = this._data[0][field];
    for(var i = 1 ; i < this._data.length ; i++) {
        if(this._data[i][field] > max) {
            max = this._data[i][field];
        }
    }
    return max;
};

Chart.prototype.draw  = function(labelvalue) {
    if(typeof(labelvalue)==='undefined')
        labelvalue = ['label','value'];
    var label = labelvalue[0];
    var value = labelvalue[1];
    var element = this._element;
    var width = this._width;
    var barHeight = this._barHeight;
    var data = this._data;
    var x = d3.scale.linear()
        .domain([0, this.getMaxElement(value)])
        .range([0, width]);

    var chart = d3.select(element)
        .attr("width", width)
        .attr("height", barHeight * data.length);

    var bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

    bar.append("rect")
        .attr("width", function(d) { return x(d[value])})
        .attr("height", barHeight - 1);

    bar.append("text")
        .attr("x", function(d) { return x(d[value]) - 3; })
        .attr("y", barHeight / 2)
        .attr("dy", ".30em")
        .text(function(d, i) { return "(" + (d[label]) + ")" + d[value]; });
};