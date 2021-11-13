<template>
  <h2 class="text-pink-500 font-semibold tracking-wider text-3xl py-2">
    {{ text }}
  </h2>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
