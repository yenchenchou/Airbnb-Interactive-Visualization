<template>
  <div class="about">
    <h1>Intro of our project?</h1>
    <h1>basically the content from proposal?</h1>
    <d3map/>
  <div class="row" align = "center">
  <div class="column" style="float:left; margin-left: 100px; width: 300px; height: 500px;">
    <div class="card">
      <img src="renzo.jpg" alt="renzo" style="width: 300px; height: 400px">
      <div class="container">
        <h2>Runze Liu</h2>
        <p class="title">CEO &amp; Format Layout Designer</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>runzeliu@usc.edu</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div class="column" style="display: inline-block; margin-left: 0px; width: 300px; height: 500px;">
    <div class="card">
      <img src="weifan.jpg" alt="weifan" style="width: 300px; height: 400px">
      <div class="container">
        <h2>WeiFan Chen</h2>
        <p class="title">Map design and data connection</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>weifanch@usc.edu</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div class="column" style="float:right; margin-right: 50px; width: 300px; height: 500px;">
    <div class="card">
      <img src="yenchen.jpg" alt="yenchen" style="width: 300px; height: 400px">
      <div class="container">
        <h2>YenChen Chou</h2>
        <p class="title">Plot Designer</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>yenchenc@usc.edu</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>
</div>
    
  </div>

</template>


<script>
//import * as d3 from "d3"
import d3map from "@/components/d3map.vue";
export default {
  name: "about",
  components: {
      d3map
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