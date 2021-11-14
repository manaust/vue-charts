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
    const { data, isFinished } = useApi();

    // Combine dataset values
    const flattenedData = computed(() =>
      data.value.map((item) => item.values).flat()
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

    // Convert x value to Date
    const dataset = computed(() => {
      return data.value.map((dataItem) => ({
        ...dataItem,
        values: dataItem.values.map((value) => ({
          ...value,
          date: new Date(value.date),
        })),
      }));
    });

    return {
      dataset,
      isFinished,
      thresholds,
      chartConfig,
    };
  },
};
</script>
