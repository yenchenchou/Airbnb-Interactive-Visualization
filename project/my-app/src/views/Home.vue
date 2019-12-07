<template>
  <div class="home" style="margin-top: 20px;">
    <!-- <h1>INF554 Project</h1>
    <h2>include the link to our paper and video</h2> -->
    <!-- <mainpage/> -->
    <!-- <header style="margin-top:0px;">Deep Trip in California</header> -->
    <!-- <h1 align="center">Deep Trip in California</h1> -->
    <div>Note: Click the smallest point on the bubble map, statistical graphs on the right will change accordingly.</div>
  <div class="container-fluid">
  <div class="row">
    <div class="col-sm-7" style="min-height:300px;">
      <cluster_sep v-if="dataIsReady" :hotel="hotel" :thekey="dataIsReady" @point_maptohome="print_input"/>
    </div>
    <div class="col-sm-5">
      <div style="overflow:auto">
        <div style='font-weight:bold'>Room Type</div>
        <div class="taskList" >
          <input type="radio"  name="task1" value="0"  v-model='selectStatus1'> All
          <input type="radio"  name="task1" value="1" v-model='selectStatus1'> Shared Room
          <input type="radio"  name="task1" value="2" v-model='selectStatus1'> Private Room
          <input type="radio"  name="task1" value="3" v-model='selectStatus1'> Entire Home/Apt
        </div>
        <div style='font-weight:bold'>Instant Bookable</div>
        <div class="taskList" >
          <input type="radio"  name="task2" value="0" v-model='selectStatus2'> All
          <input type="radio"  name="task2" value="1" v-model='selectStatus2'> Bookable
          <input type="radio"  name="task2" value="2" v-model='selectStatus2'> Not Bookable
        </div>
      </div>
      <div style="height:700px;overflow:auto">
        <!-- bar plot -->
      <div style="height:700px;overflow-x:hidden; overflow-y:auto">
        <h3 class='plot_name_h3' style="margin-left: 0px;">Average Price of Each Room Type</h3><hr style="margin-left: 0px;">
        <div class="room_type_words" style="float:left; margin-left: 0px;" >
          <strong style="font-size:20px;">63.2% </strong>
          <span style="font-size:12px">Entire home/apt</span>
        </div>
        <div class="room_type_words" style="display: inline-block;">
          <strong style="font-size: 20px;">33.0% </strong>
          <span style="font-size:12px">Private room</span>
        </div>
        <div class="room_type_words" style="float:right; margin-right: 0px;">
          <strong style="font-size: 20px;">3.8% </strong>
          <span style="font-size:12px">Shared room</span>
        </div>
        <div id="click_data_stats" style="margin-top: 20px;">
          Your Selection Price: NaN
        </div>
        <div class="plotmargin">
          <barplot v-if="dataIsReady" :pltwidth="plotswidth" :hotel="hotel" :incomingpoint="selectedpoint"/>
        </div>
        <!-- histogram -->
        <h3 class='plot_name_h3' style="margin-left: 0px;">Price Distribution</h3><hr style="margin-left: 0px;">
        <div align="justify" style="font-size: 16px; color: #767676; margin-left: 0px; margin-right: 20px;">
          Price distribution of California. Remove Extreme button removes price larger than $1500, which occupies 1% of houses.
        </div>
        <div class="plotmargin" >
          <button id="btn1" type="button" class="btn btn-info btn-sm" style="margin:5px;">Remove Extreme Price</button>
          <button id="btn2" type="button" class="btn btn-info btn-sm" style="margin:5px;">Keep Extreme Price</button>
          <distplot v-if="dataIsReady" :pltwidth="plotswidth" :hotel="hotel"  :incomingpoint="selectedpoint"/>
        </div>
        <!-- bubble plot-->
        <h3 class='plot_name_h3' style="margin-left: 0px;">Available Days versus Number of Reviews</h3><hr style="margin-left: 0px;">
        <div class="plotmargin">
          <bubbleplot v-if="dataIsReady" :pltwidth="plotswidth" :hotel="hotel" :incomingpoint="selectedpoint"/>
        </div>
        <!-- map -->
        <h3 class='plot_name_h3' style="margin-left: 0px;">House Density Map</h3><hr style="margin-left: 0px;">
        <div align="justify" style="font-size: 16px; color: #767676; margin-left: 0px; margin-right: 20px;">
          Showing house density through choropleth
        </div>
        <div class="plotmargin" >
          <d3map v-if="dataIsReady" :pltwidth="plotswidth" :hotel="hotel"  :incomingpoint="selectedpoint"/>
        </div>
        <!-- circular plot -->
        <h3 class='plot_name_h3' style="margin-left: 0px;">House Style</h3><hr style="margin-left: 0px;">   
        <div align="justify" style="font-size: 16px; color: #767676; margin-left: 0px; margin-right: 20px;">
          The distribution of house types and its corresponding average price. The longer bars represent the larger number of houses. Average price between house styles are specified in different colors.
        </div>           
        <div class="plotmargin"> 
          <circular_bar v-if="dataIsReady" :pltwidth="plotswidth"/>
        </div> 
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
// @ is an alias to /src
import * as d3 from 'd3'
import cluster_sep from "@/components/cluster_sep.vue";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import d3map from "@/components/d3map.vue";
import barplot from "@/components/barplot.vue";
import bubbleplot from "@/components/bubbleplot.vue";
import circular_bar from "@/components/circular_bar.vue";
import distplot from "@/components/distplot.vue";

export default {
  name: "home",
  components: {
      cluster_sep,
      d3map,
      barplot,
      bubbleplot,
      circular_bar,
      distplot,
  },
  data(){
      return{
          plotswidth:500,
          hotel:{},
          all_hotel:{},
          dataIsReady:0,
          selectedpoint :{},
          selectStatus1: 0, // Room type
          selectStatus2: 0 // Instant bookable
      }
  },
  beforeMount(){

    var self = this;
    d3.json('test_geo.json').then(data=>{
        self.all_hotel = data;
        self.hotel = data;
        self.dataIsReady+=1

    });
  },
  Mounted(){

      //all_hotelconsole.log(this.)
  },
  methods:{
    forceRerender(){
        this.dataIsReady+=1
        // console.log(this.selectStatus1,this.selectStatus2,this.hotel.features.length)
    },
    filter_data(){
        // console.log(this.hotel)
        // console.log('filter_function',this.selectStatus1,this.selectStatus2,this.hotel.features.length)
        var room_type_map = {1:"Shared room",2:"Private room",3:"Entire home/apt"}
        var bookable_map = {1:'t',2:'f'}
        var data = this.all_hotel
        var temp = []
        if (this.selectStatus1==0 & this.selectStatus2==0){
            temp = data.features
        }else if (this.selectStatus1==0){
            temp = data.features.filter(d=>d.properties.instant_bookable==bookable_map[this.selectStatus2])
        }else if (this.selectStatus2==0){
            temp = data.features.filter(d=>d.properties.room_type==room_type_map[this.selectStatus1])

        }else{
            temp  = data.features.filter(d=>d.properties.instant_bookable==bookable_map[this.selectStatus2])
            temp = temp.filter(d=>d.properties.room_type==room_type_map[this.selectStatus1])

        }
        this.hotel = {type:"FeatureCollection",features: temp }
        this.forceRerender()
    },
    print_input(variable){
        // console.log("Home/print_input",variable)
        this.selectedpoint = variable
        //this.$emit("point_hometoplot",this.point)
        
      }

    
  },
watch:{
    selectStatus1: function(){
        // console.log("select1",newValue,oldValue)
        this.filter_data()
    },
    selectStatus2: function(){
        // console.log("select2",newValue,oldValue)
        this.filter_data()
    }
  },
computed:{
    
}

}
</script>