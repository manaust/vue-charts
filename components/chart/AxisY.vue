<template>
  <g class="font-title text-xs" fill="none" text-anchor="start">
    <path
      stroke="currentColor"
      :d="`M 0.5 ${height - margin.bottom + 0.5} H 0.5 V ${
        margin.top + 0.5
      } H -${ticks}`"
    />

    <g
      v-for="tick in yTicks"
      :key="tick"
      text-anchor="end"
      font-size="10"
      :transform="`translate(0, ${yScale(tick) + 0.5})`"
    >
      <line stroke="currentColor" :x1="-ticks" :x2="1" />

      <text fill="currentColor" x="-9" dy="0.32em">
        {{ tick }}
      </text>
    </g>
  </g>
</template>

<script>
export default {
  props: {
    height: Number,
    yScale: {
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
    const yTicks = computed(() => props.yScale.ticks(props.ticks));

    return {
      yTicks,
    };
  },
};
</script>
