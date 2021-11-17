<template>
  <p class="text-xs text-green-300 text-center">
    {{ trend }}
  </p>
</template>

<script>
export default {
  props: {
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const growth = computed(() => {
      const value =
        ((parseInt(props.end) - parseInt(props.start)) /
          parseInt(props.start)) *
        100;

      return parseFloat(value.toFixed(2));
    });

    const isPositive = computed(() => Math.sign(growth.value) === 1);

    const trend = computed(() => `${isPositive ? "+" : "-"}${growth.value}%`);

    return {
      trend,
    };
  },
};
</script>
