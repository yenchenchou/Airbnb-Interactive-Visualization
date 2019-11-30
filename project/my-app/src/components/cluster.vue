<template>
  <div style="height:100%;width:100%;text-align:left;">
    <div ref="clustermap" style='width:800px;height:800px;'></div>
  </div>
</template>
<script>
import mapboxgl from 'mapbox-gl'
export default {
  name: "cluster",
  props: {
    mapWidth: {
      type: String
    },
    mapHeight: {
      type: String
    }
  },
  data:function() {
    return {
        IamMap: {}
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
        container: this.$refs.clustermap,
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [-119, 35.8],
        zoom: 5
      })
      this.IamMap=map

        map.on('load', function() {
        // Add a new source from our GeoJSON data and set the
        // 'cluster' option to true. GL-JS will add the point_count property to your source data.
        map.addSource("hotels", {
        type: "geojson",
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: "test_geo.json",
        cluster: true,
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
            map.getCanvas().style.cursor = 'pointer';
            
            var coordinates = h.features[0].geometry.coordinates.slice();
            var hotel_name = h.features[0].properties.name +'\n' +h.features[0].properties.price;

            while (Math.abs(h.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += h.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            console.log(hotel_name)
            popup.setLngLat(coordinates)
                .setHTML(hotel_name)
                .addTo(map)
        });

        map.on('mouseleave', 'unclustered-point', function () {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });

        map.on('mouseenter', 'clusters', function () {
            map.getCanvas().style.cursor = 'pointer';

        });
        map.on('mouseleave', 'clusters', function () {
            map.getCanvas().style.cursor = '';
        });
      });

  },
  returnSelectedPoint(){

  }
}
}
</script>
<style>
@import url('https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css');
</style>