<template>
  <LineChart
    v-if="isFinished"
    class="w-full"
    :width="800"
    :height="400"
    :dataset="dataset"
    :thresholds="thresholds"
    :chartConfig="chartConfig"
  />
</template>

<script>
import { max, min } from "d3";

import useApi from "@/composables/useApi";

export default {
  setup() {
    // Mocked data
    const { dataset, isFinished } = useApi(true);

    // Combine dataset values to extract min-max values
    const flattenedData = computed(() =>
      dataset.value.map((item) => item.values).flat()
    );

    const ath = computed(() => max(flattenedData.value, (d) => d.value));
    const atl = computed(() => min(flattenedData.value, (d) => d.value));

    const thresholds = [
      { label: "All time high", offset: ath.value },
      { label: "All time low", offset: atl.value },
    ];

    const chartConfig = {
      showLegend: true,
      showAxes: true,
      margin: {
        top: 10,
        right: 30,
        bottom: 30,
        left: 60,
      },
    };

    return {
      flattenedData,
      dataset,
      isFinished,
      thresholds,
      chartConfig,
    };
  },
};
</script>
