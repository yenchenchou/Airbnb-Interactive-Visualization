<template>
  <div class="about" style="width:100%; height:100%">
    <div class="container" style="align: center;">
    <div class="row align-items-center">
        <div class="col">
        <!-- <img src='quote.png' class="img-fluid" alt="Responsive image" style='width:1000px; height: 400px;'> -->
        </div>
    </div>
    <div class="row justify-content-center align-items-center">
        <div class="col-sm">
        <img src="renzo.jpg" alt="renzo" style="width: 300px; height: 400px">
        <h2>Runze Liu</h2>
        <p class="title">Format Layout Designer</p>
        <p>Runze's job was to design the architecture of the system and the layout of our website, and he helped do some tasks about data exploring and visualization.</p>
        <p>runzeliu@usc.edu</p>
        </div>
        <div class="col-sm">
        <img src="weifan.jpg" alt="weifan" style="width: 300px; height: 400px">
        <h2>WeiFan Chen</h2>
        <p class="title">Map design and Vue interation</p>
        <p>Wei-Fan was responsible for data preprocessing and built a bubble map by maxbox which can interact with the plots that draw by D3. And she built the filter function as well.</p>
        <p>weifanch@usc.edu</p>
        </div>
        <div class="col-sm">
        <img src="yenchen.jpg" alt="yenchen" style="width: 300px; height: 400px">
        <h2>YenChen Chou</h2>
        <p class="title">Plot Designer</p>
        <p>Yen-Chen preprocessed them and designed four statistics graphs using D3 after analyzing all data. And he deployed our web on server.</p>
        <p>yenchenc@usc.edu</p>
        </div>
    </div>
    </div>
</div>


</template>


<script>
//import * as d3 from "d3"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
export default {
  name: "index",
  components: {
  },
  data: function(){
      return {
          username:'hero'
      }
  },
  
};
</script>
  
<style>
/* Three columns side by side */
.column {
  float: left;
  width: 33.3%;
  margin-bottom: 16px;
  padding: 0 8px;
}

/* Display the columns below each other instead of side by side on small screens */
@media screen and (max-width: 650px) {
  .column {
    width: 100%;
    display: block;
  }
}

/* Add some shadows to create a card effect */
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

/* Some left and right padding inside the container */
.container {
  padding: 0 16px;
}

/* Clear floats */
.container::after, .row::after {
  content: "";
  clear: both;
  display: table;
}

.title {
  color: grey;
}

.button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
}

.button:hover {
  background-color: #555;
}
</style>