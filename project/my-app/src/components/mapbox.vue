<template>
  <div style="height:100%;width:100%;text-align:left;">
    <div ref="basicMapbox" :style="mapSize"></div>
  </div>
</template>
<script>
import mapboxgl from 'mapbox-gl'
export default {
  name: "mapbox",
  props: {
    mapWidth: {
      type: String
    },
    mapHeight: {
      type: String
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 初始化
    init () {
      mapboxgl.accessToken = 'pk.eyJ1Ijoid2VpZmFuY2giLCJhIjoiY2syM3p6NGZ5MDNqbDNtbW43MGd2dHhuYiJ9.ja_sOhkG72iVGI1eeyyRbw';
      var map = new mapboxgl.Map({
        container: this.$refs.basicMapbox,
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [-119, 35.8],
        zoom: 5
      })
      var geojson = {
            "type": "FeatureCollection",
            "features": [
            {
            "type": "Feature",
            "properties": {
            "message": "Foo",
            "iconSize": [60, 60]
            },
            "geometry": {
            "type": "Point",
            "coordinates": [
            -119.324462890625,
            35.024695711685304
            ]
            }
            },
            {
            "type": "Feature",
            "properties": {
            "message": "Bar",
            "iconSize": [50, 50]
            },
            "geometry": {
            "type": "Point",
            "coordinates": [
            -118.2158203125,
            36.97189158092897]
            }
            },
            {
            "type": "Feature",
            "properties": {
            "message": "Baz",
            "iconSize": [40, 40]
            },
            "geometry": {
            "type": "Point",
            "coordinates": [
            -120.29223632812499,
            38.28151823530889]
            }
            }
            ]
            };
        
      geojson.features.forEach(function(marker) {
        // create a DOM element for the marker
        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = 'url(https://placekitten.com/g/' + marker.properties.iconSize.join('/') + '/)';
        el.style.width = marker.properties.iconSize[0] + 'px';
        el.style.height = marker.properties.iconSize[1] + 'px';
        
        el.addEventListener('click', function() {
        window.alert(marker.properties.message);
        });
        
        // add marker to map
        new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
        });
      }
  },
  computed: {
    mapSize () {
      let styleObj = {
        width: this.mapWidth,
        height: this.mapHeight
      }
      return styleObj
    }
  }
}
</script>
<style>
@import url('https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css');
</style>