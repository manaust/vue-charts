<template>
  <ChartTrend class="mb-8" v-if="trend.length" :trend="trend" />

  <div id="my_dataviz" style="color: #7e84cb" />
</template>

<script>
import {
  area,
  axisBottom,
  axisLeft,
  csv,
  extent,
  line,
  max,
  scaleLinear,
  scaleTime,
  select,
  timeParse,
} from "d3";

export default {
  setup() {
    const trend = ref([]);
    // Wait for element to be added to DOM
    onBeforeMount(() => {
      // set the dimensions and margins of the graph
      const margin = { top: 10, right: 30, bottom: 30, left: 60 };
      const width = 800 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      const svg = select("#my_dataviz")
        .append("svg")
        .attr(
          "viewBox",
          `0 0 ${width + margin.left + margin.right} ${
            height + margin.top + margin.bottom
          }`
        )
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      //Read the data
      csv(
        "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

        // When reading the csv, I must format variables:
        (d) => ({ date: timeParse("%Y-%m-%d")(d.date), value: d.value })
      ).then(
        // Now I can use this dataset:
        (data) => {
          trend.value = extent(data, (d) => d.value);
          // Add X axis --> it is a date format
          const x = scaleTime()
            .domain(extent(data, (d) => d.date))
            .range([0, width]);

          svg
            .append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(axisBottom(x));

          // Add Y axis
          const y = scaleLinear()
            .domain([0, max(data, (d) => +d.value)])
            .range([height, 0]);

          svg.append("g").call(axisLeft(y));

          // Add gradient fill
          const gradientId = "d3-area";
          const gradient = svg
            .append("defs")
            .append("linearGradient")
            .attr("id", gradientId)
            .attr("x1", "0%")
            .attr("x2", "0%")
            .attr("y1", "0%")
            .attr("y2", "100%"); // vertical linear gradient

          gradient
            .append("stop")
            .attr("offset", "0%")
            .style("stop-color", "#E41BFF")
            .style("stop-opacity", 1);

          gradient
            .append("stop")
            .attr("offset", "100%")
            .style("stop-color", "#801AFA")
            .style("stop-opacity", 0);

          // Add the area
          svg
            .append("path")
            .datum(data)
            .attr("fill", `url(#${gradientId})`)
            .attr("stroke", "transparent")
            .attr("stroke-width", 1.5)
            .attr(
              "d",
              area()
                .x((d) => x(d.date))
                .y0(y(0))
                .y1((d) => y(d.value))
            );

          // Add the line
          svg
            .append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#DD6EE2")
            .attr("stroke-width", 1.5)
            .attr(
              "d",
              line()
                .x((d) => x(d.date))
                .y((d) => y(d.value))
            );
        }
      );
    });

    return {
      trend,
    };
  },
};
</script>
