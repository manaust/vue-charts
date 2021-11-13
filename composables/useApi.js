import multiline from "@/data/multiline.json";

export default function useApi() {
  const data = ref(multiline);
  const isFinished = ref(false);

  // Mock API call
  setTimeout(() => (isFinished.value = true), 1000);

  return {
    data,
    isFinished,
  };
}
