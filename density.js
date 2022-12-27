DENSITY_PLOTS = ({ArraysOfObject=DATA, id="a", width=600, height=400} = {}) => {

    const colors = ['black','red','#9B3D36']
    
    const DataArray = ArraysOfObject.map(d=>d.density)


    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    
    const concatenated_data = [].concat(...DataArray); 
    const all_Xs = concatenated_data.map(concatenated_data => concatenated_data[0]).flat();
    const all_Ys = concatenated_data.map(concatenated_data => concatenated_data[1]).flat();
    var x = d3.scaleLinear().domain(d3.extent(all_Xs)).nice().range([margin.left, width - margin.right]);
    var y = d3.scaleLinear().domain(d3.extent(all_Ys)).range([height-margin.bottom, margin.top]);
    
    const chart = d3.select(id).append("svg").attr("viewBox", [0, 0, width, height]);
    
    chart.append("g")
         .attr("class", "x-axis")
         .call(d3.axisBottom(x)).attr("transform", `translate(0,${height - margin.bottom})`).call(g => g.select(".domain").remove())
    
    
    chart.append("g").attr("class", "y-axis")
         .attr("transform", "translate("+margin.left+",0)")
         .call(d3.axisLeft(y)).call(g => g.select(".domain").remove())
      
    
    var line = d3.line()
        .curve(d3.curveBasis)
        .x(d => x(d[0]))
        .y(d => y(d[1]))
      
    const path_joiner = (i)=>{
        let gradient_id = "gradient"+i
      console.log(gradient_id)
        let gradient = chart
                .append("linearGradient")
                .attr("y1", 0)
                .attr("y2", height)
                .attr("x1", "0")
                .attr("x2", "0")
                .attr("id", gradient_id)
                .attr("gradientUnits", "userSpaceOnUse")
        gradient
                .append("stop")
                .attr("offset", "0")
                .attr("stop-color", colors[i%3])
        gradient
                .append("stop")
                .attr("offset", "0.75")
                .attr("stop-color", "white")   
      
    
      chart.append("path")
          .datum(DataArray[i])
          .attr("fill", "url(#"+gradient_id+")")
          .attr("stroke", colors[i%3])
          .attr("stroke-width", 1)
          .attr("fill-opacity", 0.4)
          .attr("stroke-linejoin", "round")
          .attr("d", line);    
                   
      }
    
    
    for (let i = 0; i < DataArray.length; i++) {  
        path_joiner(i) 
    }

    return chart.node()
    }