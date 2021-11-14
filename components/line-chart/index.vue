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
        <g v-if="chartConfig.showAxes" style="color: #7e84cb">
          <ChartAxisX
            :transform="`translate(${0 - chartConfig.margin.left}, ${height})`"
            :width="fullWidth"
            :xScale="x"
            :ticks="6"
            :margin="chartConfig.margin"
          />

          <ChartAxisY
            :height="fullHeight"
            :yScale="y"
            :ticks="5"
            :margin="chartConfig.margin"
          />
        </g>

        <ChartLine
          v-for="line in dataset"
          :key="line.meta.name"
          :name="line.meta.ticker"
          :values="line.values"
          :x="x"
          :y="y"
        />

        <ChartThreshold
          v-for="threshold in thresholds"
          :key="threshold.label"
          :label="threshold.label"
          :color="threshold.color"
          :offset="y(threshold.offset)"
          :width="width"
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

    // Combine data to extract min-max values for axes
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
