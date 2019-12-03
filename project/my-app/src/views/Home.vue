<template>
  <div class="home">
    <h1 align="center">Deep Trip in California</h1>
    <table border="0">
      <tbody>
        <tr>
          <td class="left-part" rowspan="2">
              <cluster_sep v-if="dataIsReady" :hotel="hotel" :thekey="dataIsReady" @point_maptohome="print_input"/>
            <!-- Used to draw map! -->
          </td>
          <td class="right-part top">
                <div>Room Type</div>
                <div class="taskList" >
                  <input type="radio"  name="task1" value=0  v-model='selectStatus1'> All
                  <input type="radio"  name="task1" value=1 v-model='selectStatus1'> Shared Room
                  <input type="radio"  name="task1" value=2 v-model='selectStatus1'> Private Room
                  <input type="radio"  name="task1" value=3 v-model='selectStatus1'> Entire Home/Apt
                  <!-- <input class="forSearch" type="button" value="Search" @click="search1(selectStatus1)"/> -->
                </div>
                <div>Instant Bookable</div>
                <div class="taskList" >
                  <input type="radio"  name="task2" value=0 v-model='selectStatus2'> All
                  <input type="radio"  name="task2" value=1 v-model='selectStatus2'> Bookable
                  <input type="radio"  name="task2" value=2 v-model='selectStatus2'> Not Bookable
                  <!-- <input class="forSearch" type="button" value="Search" @click="search2(selectStatus2)"/> -->
                </div>
          </td>
        </tr>
        <tr>
          <!-- <td class="right-part bottom"> -->
            <div style="height:700px;overflow:auto">
              <barplot v-if="dataIsReady" :pltwidth="plotswidth" :hotel="hotel" :incomingpoint="selectedpoint"/>
              <distplot v-if="dataIsReady" :pltwidth="plotswidth" :hotel="hotel"  :incomingpoint="selectedpoint"/>
              <bubbleplot v-if="dataIsReady" :pltwidth="plotswidth" :hotel="hotel" :incomingpoint="selectedpoint"/>
              <circular_bar v-if="dataIsReady" :pltwidth="plotswidth"/>
            </div>
          <!-- </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
import * as d3 from 'd3'
import barplot from "@/components/barplot.vue";
import bubbleplot from "@/components/bubbleplot.vue";
import circular_bar from "@/components/circular_bar.vue";
import distplot from "@/components/distplot.vue";
import cluster_sep from "@/components/cluster_sep.vue";

export default {
  name: "home",
  components: {
      cluster_sep,
      barplot,
      bubbleplot,
      circular_bar,
      distplot,
  },
  data(){
      return{
          plotswidth:600,
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
        //console.log(data)
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
        console.log(this.selectStatus1,this.selectStatus2,this.hotel.features.length)
    },
    print_input(variable){
        this.selectedpoint = variable        
      },
    filter_data(){
        var room_type_map = {1:"Shared room",2:"Private room",3:"Entire home/apt"}
        var bookable_map = {1:"t",2:"f"}
        var data = this.all_hotel
        var temp=[];
        if (this.selectStatus1==0 & this.selectStatus2==0){
            temp = data.features
        } else if(this.selectStatus1==0) {
            temp = data.features.filter(d=>d.properties.instant_bookable==bookable_map[this.selectStatus2])
        } else if(this.selectStatus2==0){
            temp = data.features.filter(d=>d.properties.room_type==room_type_map[this.selectStatus1])
        } else{
            temp = data.features.filter(d=>d.properties.room_type==room_type_map[this.selectStatus1])
            temp = temp.filter(d=>d.properties.instant_bookable==bookable_map[this.selectStatus2])
            
        }
        this.hotel = {type:"FeatureCollection",features: temp }
        this.forceRerender()

    }
    
  },
watch:{
    selectStatus1: function(newValue,oldValue){
        console.log("select1",newValue,oldValue)
        this.filter_data()
    },
    selectStatus2: function(newValue,oldValue){
        console.log("select2",newValue,oldValue)
        this.filter_data()
    },
    }
}
</script>
