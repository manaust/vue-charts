<template>
  <div class="text-xs text-green-300 text-center">
    {{ isPositive ? "+" : "-" }}{{ growth }}%
  </div>
</template>

<script>
export default {
  props: {
    trend: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const growth = computed(() => {
      const [start, end] = props.trend;
      const value = ((parseInt(end) - parseInt(start)) / parseInt(start)) * 100;
      return parseFloat(value.toFixed(2));
    });

    const isPositive = computed(() => Math.sign(growth.value) === 1);

    return {
      growth,
      isPositive,
    };
  },
};
</script>
