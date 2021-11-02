<template>
  <v-card elevation="1" outlined>
    <slot></slot>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Card",
});
</script>
