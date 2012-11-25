
var draw=function(){


	var margin = {top: 20, right: 20, bottom: 30, left: 50},
	width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

	

	var x = d3.time.scale()
	    .range([0, width]);

	var y = d3.scale.linear()
	    .range([height,0]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");

	var line = d3.svg.line()
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.amount); });


	d3.select("#chart-div svg").remove();


	var svg = d3.select("#chart-div").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




    var groupBySum=function(arr){
		var group={};
		for (var i = arr.length; --i >= 0;) {
    		value = defaultDateFormat(arr[i].date);
    		group[value] = (group[value] || 0) + arr[i].amount;
		}
		return group;
	};


	// var datas=Emoney.repository.get("content").sort(function(a,b){
	// 	return a.date-b.date;
	// })

	var datas=[]
	$.each(groupBySum(Emoney.repository.get("content").sort(function(a,b){
		return a.date-b.date;
	})),function(index,item){
		console.log(index)
		console.log(typeof(index))
		datas.push({'date':defaultDateFormat.parse(index),'amount':item});
	});

	


	// d3.tsv("data.tsv", function(error, data) {
	//   data.forEach(function(d) {
	//     d.date = parseDate(d.date);
	//     d.close = +d.close;
	//   });

		console.log(datas)

		console.log(d3.extent(datas, function(d) { return d.amount; }))
	
	  x.domain(d3.extent(datas, function(d) { return d.date; }));
	  y.domain(d3.extent(datas, function(d) { return d.amount; }));

	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

	  svg.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)
	    .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text("Price ($)");

	  svg.append("path")
	      .datum(datas)
	      .attr("class", "line")
	      .attr("d", line);
	// });
}