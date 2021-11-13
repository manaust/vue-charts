<template>
  <LineChart
    class="w-full"
    v-if="isFinished"
    :width="800"
    :height="400"
    :dataset="dataset"
    :chartConfig="chartConfig"
    :thresholds="[
      { label: 'All time high', offset: ath, color: 'white' },
      { label: 'All time low', offset: atl, color: 'white' },
    ]"
  />
</template>

<script>
import { max, min } from "d3";

import useApi from "@/composables/useApi";
import { generateDefaultChartConfig } from "@/utils/chartUtils";

export default {
  setup() {
    const { data, isFinished } = useApi();
    const chartConfig = generateDefaultChartConfig();

    const flattenedData = computed(() =>
      data.value.map((item) => item.values).flat()
    );

    const ath = computed(() => max(flattenedData.value, (d) => d.value));
    const atl = computed(() => min(flattenedData.value, (d) => d.value));

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
      ath,
      atl,
    };
  },
};
</script>
