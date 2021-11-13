<template>
  <g :style="`color: ${lineColor(values)}`">
    <defs>
      <linearGradient :id="name" x1="0%" x2="0%" y1="0%" y2="100%">
        <stop
          offset="0%"
          :style="`stop-color: ${fillColor(values)}; stop-opacity: 0.9`"
        />
        <stop
          offset="100%"
          :style="`stop-color: ${fillColor(values)}; stop-opacity: 0`"
        />
      </linearGradient>
    </defs>

    <path :fill="`url(#${name})`" :d="fill(values)" />
    <path fill="none" class="stroke-current stroke-2" :d="stroke(values)" />
  </g>
</template>

<script>
import { area, line } from "d3";

import { lineColor, fillColor } from "@/utils/chartUtils";

export default {
  props: {
    name: String,
    values: {
      type: Array,
      required: true,
    },
    x: Function,
    y: Function,
  },
  setup(props) {
    const fill = area()
      .x((d) => props.x(d.date))
      .y0(() => props.y(0))
      .y1((d) => props.y(d.value));

    const stroke = line()
      .x((d) => props.x(d.date))
      .y((d) => props.y(d.value));

    return {
      fill,
      stroke,
      fillColor,
      lineColor,
    };
  },
};
</script>
