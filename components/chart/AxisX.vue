<template>
  <g class="font-title text-xs" fill="none" text-anchor="middle">
    <path
      stroke="currentColor"
      :d="`M ${margin.left + 0.5} ${ticks} V 0.5 H ${
        width - margin.right - 0.5
      } V ${ticks}`"
    />

    <text>{{ xTicks }}</text>

    <g
      v-for="tick in xTicks"
      :key="tick"
      font-size="12"
      opacity="1"
      :transform="`translate(${xScale(tick)}, 0)`"
    >
      <line stroke="currentColor" :y1="ticks" :y2="1" />

      <text fill="currentColor" y="9" dy="0.71em">
        {{ formatDateTick(tick) }}
      </text>
    </g>
  </g>
</template>

<script>
import { formatDateTick } from "@/utils/chartUtils";

export default {
  props: {
    width: {
      type: Number,
      required: true,
    },
    xScale: {
      type: Function,
      required: true,
    },
    margin: {
      type: Object,
      required: true,
    },
    ticks: Number,
  },
  setup(props) {
    const xTicks = computed(() => props.xScale.ticks(props.ticks));

    return {
      xTicks,
      formatDateTick,
    };
  },
};
</script>
