<template>
  <div class="home">
    <!-- <h1>INF554 Project</h1>
    <h2>include the link to our paper and video</h2> -->
    <!-- <mainpage/> -->
    <h1 align="center">Deep Trip in California</h1>
    <table border="1">
      <tbody>
        <tr>
          <td class="left-part" rowspan="2">
              <!-- <cluster_sep @clicked=""/> -->
            <!-- Used to draw map! -->
          </td>
          <td class="right-part top">
              <form action="" method=""> Room Type
                <div>
                  <input class="filter" type="radio" name="condition1" value="0"> All
                  <input class="filter" type="radio" name="condition1" value="1"> Shared Room
                  <input class="filter" type="radio" name="condition1" value="2"> Private Room
                  <input class="filter" type="radio" name="condition1" value="3"> Entire Home/Apt
                </div>
              </form>
              <form action="" method=""> Instant Bookable
                <div>
                  <input class="filter" type="radio" name="condition2" value="0"> All
                  <input class="filter" type="radio" name="condition2" value="1"> Bookable
                  <input class="filter" type="radio" name="condition2" value="2"> Not Bookable
                </div>
              </form>
          </td>
        </tr>
        <tr>
          <td class="right-part bottom">
            <!-- Used to draw graph! -->
            <!-- <barplot/>
            <bubbleplot/>-->
            <!-- <circular_bar/> -->
            <distplot v-if="dataIsReady" :width="pltwidth" :height="pltheight" :test="test" :hotel="hotel"/>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- filter function -->
    <div type="hidden" id="detectChange">
      <input type="hidden" name="flag1" id="flag1"/>
      <input type="hidden" name="flag2" id="flag2"/>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
// import barplot from "@/components/barplot.vue";
// import bubbleplot from "@/components/bubbleplot.vue";
// import circular_bar from "@/components/circular_bar.vue";
// import distplot from "@/components/distplot.vue";
import cluster_sep from "@/components/cluster_sep.vue";
import * as d3 from 'd3'


export default {
  name: "home",
  components: {
    //   cluster_sep,
    //   barplot,
    //   bubbleplot,
    //   circular_bar,
      distplot
  },
  data(){
      return{
          pltwidth:800,
          pltheight:300,
          hotel:[],
          test:[1,33,55],
          dataIsReady:false,
          selectedpoint :{}
      }
  },
  created() {
    this.fetchData();
  },
  mounted() {
      //alert('mounted');
    //this.readData()
  },
  methods:{
  fetchData(){
    var self = this;
    d3.csv('df.csv').then(data=>{
        //console.log(data)
        self.hotel = data;
        console.log('load',self.hotel.length)
        self.readData()

    });
},
readData(){
        console.log('read',this.hotel.length)
        self.dataIsReady=true
    }
}
}
</script>
<style scoped>
/* body {
  position:absolute;
  background-image: url('background.jpg');
  background-size: cover;
} */
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
    background: #808080;
    color: #fff;
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

</style>