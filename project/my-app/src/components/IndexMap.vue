<template>
  <div class="index">
    <MglMap :accessToken="accessToken" :mapStyle="mapStyle" @load="onMapLoaded"/>
    <div id="map"></div>
  </div>
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap } from "vue-mapbox";
import * as d3 from "d3";
export default {
  name: "IndexMap",
  props: {
    msg: String
  },
  components: {
    MglMap
  },
  data(){
      return{
          accessToken: "pk.eyJ1Ijoid2VpZmFuY2giLCJhIjoiY2syM3p6NGZ5MDNqbDNtbW43MGd2dHhuYiJ9.ja_sOhkG72iVGI1eeyyRbw",
          mapStyle: "mapbox://styles/mapbox/streets-v11"
      };
  },
  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  },
  methods: {
    async onMapLoaded(event) {
      const asyncActions = event.component.actions;

      const newParams = await asyncActions.flyTo({
        center: [30, 30],
        zoom: 9,
        speed: 1
      })
      console.log(newParams);
    }},
  mounted(){
    d3.csv("./df_california_filtered_cleaned.csv").then(function(data) { 
        console.log(data);
    });
  }
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
