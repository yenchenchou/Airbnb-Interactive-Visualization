<template>
  <div class="home">
    <!-- <h1>INF554 Project</h1>
    <h2>include the link to our paper and video</h2> -->
    <!-- <mainpage/> -->
    <h1 align="center">Deep Trip in California</h1>
    <table border="0">
      <tbody>
        <tr>
          <td class="left-part" rowspan="2">
              <cluster_sep/>
            <!-- Used to draw map! -->
          </td>
          <td class="right-part top">
                <div>Room Type</div>
                <div class="taskList" @click="handle1"> 
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
                <div class="taskList" @click="handle2"> 
                  <!-- <input class="filter" type="radio" name="condition2" value="0"> All
                  <input class="filter" type="radio" name="condition2" value="1"> Bookable
                  <input class="filter" type="radio" name="condition2" value="2"> Not Bookable -->
                  <input type="radio"  name="task2" value="0"  v-model='selectStatus2'> All
                  <input type="radio"  name="task2" value="1" v-model='selectStatus2'> Bookable
                  <input type="radio"  name="task2" value="2" v-model='selectStatus2'> Not Bookable
                  <input class="forSearch" type="button" value="Search" @click="searc2(selectStatus2)"/>
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
              <barplot>
              </barplot>
              <distplot/>
              <bubbleplot/>
              <circular_bar/>
            </div>
          <!-- </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
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
      distplot
  },
  data(){
      return{
          selectStatus1: 0, // Room type
          selectStatus2: 0 // Instant bookable
      }
  },
  methods:{
    handle1(){
      console.log("取到的值是"+this.selectStatus1);
    },
    handle2(){
      console.log("取到的值是"+this.selectStatus2);
    },

    //////////////////////// Filter API for weifan
    search1(val){
      console.log("Search1取到的值是"+val);
    },
    searc2(val){
      console.log("Search2取到的值是"+val);
    }
  }
};

</script>
<style scoped>
/*
    table {
    position: relative;
    top: 5px;
    left: 130px;
    }
    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
        font-weight: 600;
    }
    .left-part {
    width: 950px;
    height: 900px;
    }
    .right-part {
    width: 500px;
    }
    .top {
    height: 100px;
    }
    .tip_card {
    padding: 3px;
    background-color: #808080;
    color: "#fff";
    border-radius: 10px;
    font-size: 14px;
    text-align: center;
    font-family: "Arial";
    opacity: 0.5;
    line-height: 10px;
    }
    .axis_x line{
    stroke: #808080;
    stroke-width: 2px;
    }
    .axis_y line{
    stroke: #808080;
    stroke-width: 2px;
    }
    .axis_x path{
    stroke: #808080;
    stroke-width: 2px;
    }
    .axis_y path{
    stroke: #808080;
    stroke-width: 2px;
    }
    .axis_x text{
    fill: #808080;
    font-size: 14px;
    }
    .axis_y text{
    fill: #808080;
    font-size: 14px;
    }
    */
</style>