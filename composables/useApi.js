import single from "@/data/single.json";
import multiline from "@/data/multiline.json";

export default function useApi(useMultiline = false) {
  const data = ref(single);
  const isFinished = ref(false);

  if (useMultiline) data.value = multiline;
  isFinished.value = true;

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
  };
}
