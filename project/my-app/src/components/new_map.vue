<template>
  <div class="new_map">
    <h1>new_map</h1>
    <div ref="basicMapbox" style='width:500px;height:500px;'></div>
    <!-- <div id='map'></div> -->
      </div>
</template>


<script>
import mapboxgl from 'mapbox-gl'
//import csv2geojson from 'csv2geojson'
require('../../node_modules/mapbox-gl/dist/mapbox-gl.css')
import * as d3 from "d3"
export default {
  name: "new_map",
  components: {

  },
  data: function(){
      return {
          apiKey:'pk.eyJ1Ijoid2VpZmFuY2giLCJhIjoiY2syM3p6NGZ5MDNqbDNtbW43MGd2dHhuYiJ9.ja_sOhkG72iVGI1eeyyRbw',
          loadData:[]
      }
  },
  mounted(){
      this.createMap();
      this.fetchData(); //????
      d3.select('#map').text('test')
  },
  methods:{
      async fetchData(){
          let data = await d3.csv('./df.csv');
          this.loadData=data
      },
      createMap(){
        mapboxgl.accessToken = this.apiKey;
        var map = new mapboxgl.Map({
            container:this.$refs.basicMapbox,
            //container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
            center: [-118.285, 34.021796], // starting position [lng, lat]
            zoom: 10 // starting zoom
            });
    //Add marker

        // d3.json('test_geo.json').then(function(data){
        //     data.features.forEach(function(marker){
        //         new mapboxgl.Marker()
        //     .setLngLat(marker.geometry.coordinates)
        //     .addTo(map);
        //     })
        // });


        // d3.csv('./df(2).csv').then(function(data){
        //     var geoj = csv2geojson.csv2geojson(data.slice(0,100),{
        //     latfield:'latitude',
        //     logfield:'longitude'
        // },function(err,geodata){
        //     console.log(geodata);
        //     geodata.features.forEach(function(marker){
        //         new mapboxgl.Marker()
        //     .setLngLat(marker.geometry.coordinates)
        //     .addTo(map);
        //     })

        // })
        // console.log(geoj)
        // });


        
        
        var geojson={
          "type": "FeatureCollection",
          "features":[
              {
        "type": "Feature",
        "properties": {
        "marker-color": "#3bb2d0",
        "marker-size": "small",
        "marker-symbol": "rocket"
        },
        "geometry": {
        "type": "Point",
        coordinates:[
            -118.285,
            34.021796
        ]
        }
        }]
      }

        geojson.features.forEach(function(marker){
            //var el=document.createElement('div');
            //el.className = 'marker';

        new mapboxgl.Marker() //(el) if customize
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
        })
  },
  }
}
      
    

</script>

<style scoped>
.marker {
  /* background-image: url('mapbox-icon.png'); */
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
