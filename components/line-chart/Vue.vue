<template>
  <LineChart
    v-if="isFinished"
    class="w-full"
    :width="800"
    :height="400"
    :dataset="dataset"
    :chartConfig="chartConfig"
    :thresholds="thresholds"
  />
</template>

<script>
import { max, min } from "d3";

import useApi from "@/composables/useApi";

export default {
  setup() {
    const { data, isFinished } = useApi();

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

    const flattenedData = computed(() =>
      data.value.map((item) => item.values).flat()
    );

    const ath = computed(() => max(flattenedData.value, (d) => d.value));
    const atl = computed(() => min(flattenedData.value, (d) => d.value));

    const thresholds = [
      { label: "All time high", offset: ath.value, color: "white" },
      { label: "All time low", offset: atl.value, color: "white" },
    ];

    // Convert x to Date
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
      chartConfig,
      thresholds,
      ath,
      atl,
    };
  },
};
</script>
