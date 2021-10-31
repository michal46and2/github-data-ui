<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-row>
          <v-col cols="4">
            <v-card>
              <v-card-title>{{text}}</v-card-title>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card>
              <v-card-title>{{text}}</v-card-title>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card>
              <v-card-title>{{text}}</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-col>  
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HelloWorld",
  data: () => ({
    text: "Cafe Badilico"
  }),
});
</script>
