<template>
  <div style="height:100%;width:100%;text-align:left;">
    <!-- <h1>Seperate the function</h1> -->
    <div ref="clustermap_2" style='height:100%;width:100%;'></div>
  </div>
</template>
<script>
import mapboxgl from 'mapbox-gl'
export default {
  name: "cluster_sep",
  props: {
      hotel:Object,
      thekey: Number
  },
  data () {
    return {
        IamMap:{},
        selectedpoint:{}
    }
  },
  mounted () {
    this.init()
    this.layers()
    this.cluster()
  },
  methods: {
    init () {
      mapboxgl.accessToken = 'pk.eyJ1Ijoid2VpZmFuY2giLCJhIjoiY2syM3p6NGZ5MDNqbDNtbW43MGd2dHhuYiJ9.ja_sOhkG72iVGI1eeyyRbw';
      var map = new mapboxgl.Map({
        container: this.$refs.clustermap_2,
        // style: 'mapbox://styles/mapbox/streets-v9',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [-118.6, 33],
        zoom: 5
      })
      this.IamMap = map
    },
    layers(){
        var map = this.IamMap
        var self = this
        // console.log('in the layer function')
        map.on('load', function() {
        // console.log("in map on load",self.hotel.features.length)
        map.addSource("hotels", {
            type: "geojson",
            data: self.hotel,
            cluster: true,
            tolerance:3.5,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
            });
        
        map.addLayer({
        id: "clusters",
        type: "circle",
        source: "hotels",
        filter: ["has", "point_count"],
        paint: {
        // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
        // with three steps to implement three types of circles:
        //   * Blue, 20px circles when point count is less than 100
        //   * Yellow, 30px circles when point count is between 100 and 750
        //   * Pink, 40px circles when point count is greater than or equal to 750
        "circle-color": [
        "step",["get", "point_count"],
        "#51bbd6", //blue
        100,
        "#f1f075", //yellow
        1500,
        "#f28cb1" //pink
        ],
        "circle-radius": [
        "step",
        ["get", "point_count"],
        20,100,30,1500,40
        ]
        }
        });
        
        map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "hotels",
        filter: ["has", "point_count"],
        layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12
        }
        });
        
        map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "hotels",
        filter: ["!", ["has", "point_count"]],
        paint: {
        "circle-color": "#11b4da",
        "circle-radius": 4,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff"
        }
        });
        
      });
    },
    cluster(){
        var map = this.IamMap
        var self = this
        // inspect a cluster on click
        map.on('click', 'clusters', function (e) {
            var features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
            var clusterId = features[0].properties.cluster_id;
            map.getSource('hotels').getClusterExpansionZoom(clusterId, function (err, zoom) {
            if (err)
            return;
            map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom
                });
        });
        });
        
        var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
            });
        map.on('mouseenter','unclustered-point',function(h){
            // console.log('on point')
            map.getCanvas().style.cursor = 'pointer';
            
            var coordinates = h.features[0].geometry.coordinates.slice();
            var hotel_name = h.features[0].properties.name +'<br>'+ h.features[0].properties.room_type+'<br> $' +h.features[0].properties.price + ' per night';
            while (Math.abs(h.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += h.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            
            popup.setLngLat(coordinates)
                .setHTML(hotel_name)
                .addTo(map)
        });
        map.on('mouseleave', 'unclustered-point', function () {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });
        map.on('click', 'unclustered-point', function (h) {
            // console.log("selected",h.features[0])
            self.selectedpoint = h.features[0]
            self.whileclick()
            
        });
        map.on('mouseenter', 'clusters', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'clusters', function () {
            map.getCanvas().style.cursor = '';
        });
  },
    whileclick(){
        this.$emit('point_maptohome',this.selectedpoint)
        // console.log("map/whileclick",this.selectedpoint)
        this.selectedpoint = {}; // clear out the variable
  },
},
watch:{
    thekey: function(){
        // console.log(newV,oldV)
        this.IamMap.getSource('hotels').setData(this.hotel)
    }
}
}
</script>
<style>
@import url('https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css');
.mapboxgl-popup-content{
max-width: 150px;
font: 12px sans-serif;
border-radius: 5px;
}
</style>