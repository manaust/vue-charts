<template>
  <div class="flex flex-row items-center justify-center">
    <div
      v-for="item in dataset"
      :key="item.meta.name"
      class="ml-4 text-xs flex flex-row items-center justify-end"
      :style="`color: ${lineColor(item.values)}`"
    >
      <span class="rounded-full inline-block h-1 w-4 mr-2 bg-current" />

      {{ item.meta.name }}
    </div>
  </div>
</template>

<script>
import { lineColor } from "@/utils/chartUtils";

export default {
  props: {
    dataset: Array,
  },
  setup() {
    return {
      lineColor,
    };
  },
};
</script>
