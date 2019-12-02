<template>
  <div class="home" style="margin-top: 20px;">
    <!-- <h1>INF554 Project</h1>
    <h2>include the link to our paper and video</h2> -->
    <!-- <mainpage/> -->
    <!-- <header style="margin-top:0px;">Deep Trip in California</header> -->
    <!-- <h1 align="center">Deep Trip in California</h1> -->
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
                <!-- <div class="taskList" @click="handle1">  -->
                  <!-- <input class="filter" type="radio" name="condition1" value="0"> All
                  <input class="filter" type="radio" name="condition1" value="1"> Shared Room
                  <input class="filter" type="radio" name="condition1" value="2"> Private Room
                  <input class="filter" type="radio" name="condition1" value="3"> Entire Home/Apt -->
                  <input type="radio"  name="task1" value="0"  v-model='selectStatus1'> All
                  <input type="radio"  name="task1" value="1" v-model='selectStatus1'> Shared Room
                  <input type="radio"  name="task1" value="2" v-model='selectStatus1'> Private Room
                  <input type="radio"  name="task1" value="3" v-model='selectStatus1'> Entire Home/Apt
                  <input class="forSearch" type="button" value="Search" @click="search1(selectStatus1)"/>
                </div>
                <div>Instant Bookable</div>
                <div class="taskList" >
                <!-- <div class="taskList" @click="handle2">  -->
                  <!-- <input class="filter" type="radio" name="condition2" value="0"> All
                  <input class="filter" type="radio" name="condition2" value="1"> Bookable
                  <input class="filter" type="radio" name="condition2" value="2"> Not Bookable -->
                  <input type="radio"  name="task2" value="0" v-model='selectStatus2'> All
                  <input type="radio"  name="task2" value="1" v-model='selectStatus2'> Bookable
                  <input type="radio"  name="task2" value="2" v-model='selectStatus2'> Not Bookable
                  <input class="forSearch" type="button" value="Search" @click="search2(selectStatus2)"/>
                </div>
                <!-- <div class="taskList" @click="handle1">
                <label for="all">All</label>
                <input type="radio" value="1" v-model="picked">
                <label for="sharedroom">Shared Room</label>
                <input type="radio" value="2" v-model="picked">
                <label for="privateroom">Private Room</label>
                <input type="radio" value="3" v-model="picked">
                <label for="entirehomeapt">Entire Home/Apt</label>
                <input type="radio" value=4 v-model="picked">
                <span id='csv'>Picked: {{ picked }}</span>
                </div> -->
                <!-- filter function -->
                <!-- <div type="hidden" id="detectChange">
                  <input name="flag1" id="flag1"/>
                  <input type="hidden" name="flag2" id="flag2"/>
                </div> -->
          </td>
        </tr>
        <tr>
          <!-- <td class="right-part bottom"> -->
            <div style="height:700px;overflow:auto">
              <h3 class='plot_name_h3'>Room Type</h3><hr>
              <div class="room_type_words" style="float:left; margin-left: 20px;" >
                <strong style="font-size:20px;">63.2% </strong>
                <span style="font-size:12px">Entire home/apt</span>
              </div>
              <div class="room_type_words" style="display: inline-block;">
                <strong style="font-size: 20px;">33.0% </strong>
                <span style="font-size:12px">Private room</span>
              </div>
              <div class="room_type_words" style="float:right; margin-right: 20px;">
                <strong style="font-size: 20px;">3.8% </strong>
                <span style="font-size:12px">Shared room</span>
              </div>
              <div id="click_data_stats" style="margin-top: 20px;">
                Your Selection Price: NaN
              </div>
              <div class="plotmargin">
                <barplot v-if="dataIsReady" :pltwidth="plotswidth" :hotel="hotel" :incomingpoint="selectedpoint"/>
              </div>

              <h3 class='plot_name_h3'>Price Distribution</h3><hr>
              <div align="justify" style="font-size: 16px; color: #767676; margin-left: 20px; margin-right: 20px;">
                Price distribution of California. Remove Extreme button removes price larger than $1500, which occupies 1% of houses.
              </div>
              <div class="plotmargin" >
                <button id="btn1" type="button" class="btn btn-info btn-sm">Remove Extreme Price</button>
                <button id="btn2" type="button" class="btn btn-info btn-sm">Keep Extreme Price</button>
                <distplot v-if="dataIsReady" :pltwidth="plotswidth" :hotel="hotel"  :incomingpoint="selectedpoint"/>
              </div>

              <h3 class='plot_name_h3'>Available Days versus Number of Reviews</h3><hr>
              <div class="plotmargin">
                <bubbleplot v-if="dataIsReady" :pltwidth="plotswidth" :hotel="hotel" :incomingpoint="selectedpoint"/>
              </div>

              <h3 class='plot_name_h3'>House Style</h3><hr>   
              <div align="justify" style="font-size: 16px; color: #767676; margin-left: 20px; margin-right: 20px;">
                The distribution of house types and its corresponding average price. The longer bars represent the larger number of houses. Average price between house styles are specified in different colors.
              </div>           
              <div class="plotmargin"> 
                <circular_bar v-if="dataIsReady" :pltwidth="plotswidth"/>
              </div> 
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
import cluster_sep from "@/components/cluster_sep.vue";
import barplot from "@/components/barplot.vue";
import bubbleplot from "@/components/bubbleplot.vue";
import circular_bar from "@/components/circular_bar.vue";
import distplot from "@/components/distplot.vue";

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
    },
    search1(val){
        // room type
        if (val==0){
            // console.log("show all")
            this.hotel = this.all_hotel
        } else{
            var room_type_map = {1:"Shared room",2:"Private room",3:"Entire home/apt"}
            var data = this.all_hotel
            var temp = data.features.filter(d=>d.properties.room_type==room_type_map[val])
            this.hotel = {type:"FeatureCollection",features: temp }
        }
        // console.log(room_type_map[val])
        this.forceRerender()
    },
    search2(val){
        // bookable
        if (val==0){
            this.hotel = this.all_hotel;
        } else{
            var bookable_map = {1:"t",2:"f"}
            var data = this.all_hotel
            // console.log(data.features.filter(d=>d.properties.instant_bookable==bookable_map[val]))
            var temp = data.features.filter(d=>d.properties.instant_bookable==bookable_map[val])
            this.hotel = {type:"FeatureCollection",features: temp }
        }
        // console.log(bookable_map[val])
        this.forceRerender()

    },
    print_input(variable){
        // console.log("Home/print_input",variable)
        this.selectedpoint = variable
        //this.$emit("point_hometoplot",this.point)
        
      }
  },
computed:{
    // filter_data(){
    //     if (this.selectStatus1==0 & this.selectStatus2==0){
    //         this.hotel = this.all_hotel
    //     }
    //     else{

    //     }
    // }
}

}
</script>