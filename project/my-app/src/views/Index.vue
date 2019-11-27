<template>
  <div class="temp">
    <h1>Map and everything</h1>
    <mapbox mapWidth="800px" mapHeight="800px" @map-load="loaded"></mapbox>
    <new_map/>
    <h1></h1>
    <cluster mapWidth="800px" mapHeight="800px"/>

  </div>
</template>

<script>

import mapbox from "@/components/mapbox.vue";
import new_map from "@/components/new_map.vue";
import cluster from "@/components/cluster.vue";

//import * as d3 from "d3"
export default {
  name: "index",
  components: {
      mapbox,
      new_map,
      cluster

  }
};
</script>
