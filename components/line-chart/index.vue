<template>
  <div>
    <ChartLegend
      v-if="chartConfig.showLegend"
      class="mb-8"
      :dataset="dataset"
    />

    <svg :viewBox="`0 0 ${fullWidth} ${fullHeight}`">
      <g
        :transform="`translate(${chartConfig.margin.left}, ${chartConfig.margin.top})`"
      >
        <!-- Axes -->
        <g v-if="chartConfig.showAxes" style="color: #7e84cb">
          <!-- X Axis  -->
          <ChartAxisX
            :transform="`translate(${0 - chartConfig.margin.left}, ${height})`"
            :width="fullWidth"
            :margin="chartConfig.margin"
            :xScale="x"
            :ticks="6"
          />

          <!-- Y Axis -->
          <ChartAxisY
            :height="fullHeight"
            :margin="chartConfig.margin"
            :yScale="y"
            :ticks="5"
          />
        </g>

        <!-- Lines -->
        <ChartLine
          v-for="line in dataset"
          :key="line.meta.name"
          :name="line.meta.ticker"
          :values="line.values"
          :x="x"
          :y="y"
        />

        <!-- Thresholds -->
        <ChartThreshold
          v-for="threshold in thresholds"
          :key="threshold.label"
          :width="width"
          :label="threshold.label"
          :offset="y(threshold.offset)"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import { extent, max, scaleLinear, scaleTime } from "d3";

export default {
  props: {
    width: Number,
    height: Number,
    dataset: {
      type: Array,
      required: true,
    },
    chartConfig: {
      type: Object,
      required: true,
    },
    thresholds: Array,
  },
  setup(props) {
    const fullWidth = computed(
      () =>
        props.width +
        props.chartConfig.margin.left +
        props.chartConfig.margin.right
    );

    const fullHeight = computed(
      () =>
        props.height +
        props.chartConfig.margin.top +
        props.chartConfig.margin.bottom
    );

    // Combine dataset values to extract min-max values
    const flattenedData = computed(() =>
      props.dataset.map((item) => item.values).flat()
    );

    const x = computed(() =>
      scaleTime()
        .range([0, props.width])
        .domain(extent(flattenedData.value, (d) => d.date))
    );

    const y = computed(() =>
      scaleLinear()
        .range([props.height, 0])
        .domain([0, max(flattenedData.value, (d) => d.value)])
    );

    return {
      x,
      y,
      fullWidth,
      fullHeight,
    };
  },
};
</script>
