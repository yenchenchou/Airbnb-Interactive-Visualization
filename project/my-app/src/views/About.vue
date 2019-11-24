<template>
  <div class="about">
    <h1>Intro of our project?</h1>
    <h1>basically the content from proposal?</h1>
    <mapbox mapWidth="950px" mapHeight="900px" @map-load="loaded"></mapbox>

  </div>
</template>


<script>
import mapbox from "@/components/mapbox.vue";

//import * as d3 from "d3"
export default {
  name: "index",
  components: {
      mapbox
  }
};
</script>
