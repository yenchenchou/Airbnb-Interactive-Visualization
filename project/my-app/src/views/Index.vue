<template>
  <div class="temp">
    <h1>Map and everything</h1>
    <IndexMap/>
  </div>
</template>

<script>
// @ is an alias to /src
import IndexMap from "@/components/IndexMap.vue";
//import * as d3 from "d3"
export default {
  name: "index",
  components: {
    IndexMap
  }
};
</script>
