<template>
  <main
    class="text-white min-h-screen bg-center bg-cover"
    :style="{
      backgroundImage: `url(${bg})`,
    }"
  >
    <div class="pt-8 container grid grid-cols-1 lg:grid-cols-2 mx-auto gap-8">
      <section>
        <ChartTitle class="text-center" text="D3 Example" />
        <LineChartD3 />
      </section>

      <section>
        <ChartTitle class="text-center" text="Vue Example" />
        <LineChartVue />
      </section>
    </div>
  </main>
</template>

<script>
import "@/assets/tailwind.css";
import bg from "@/assets/bg.png";

export default {
  setup() {
    useMeta({ title: "The art of rendering a chart" });

    return {
      bg,
    };
  },
};
</script>
