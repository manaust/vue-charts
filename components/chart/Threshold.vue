<template>
  <g :style="`color: ${color}`" class="text-gray-500">
    <line
      class="stroke-current stroke-1"
      style="stroke-dasharray: 3"
      x1="0"
      :x2="width"
      :y1="offset"
      :y2="offset"
    />

    <text
      class="fill-current text-xs"
      text-anchor="end"
      :x="width"
      :y="offset - 2"
    >
      {{ label }}
    </text>
  </g>
</template>

<script>
export default {
  props: {
    label: String,
    color: String,
    width: {
      type: Number,
      required: true,
    },
    offset: {
      type: Number,
      required: true,
    },
  },
};
</script>
