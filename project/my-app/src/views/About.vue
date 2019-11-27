<template>
  <div class="about">
    <h1>Intro of our project?</h1>
    <h1>basically the content from proposal?</h1>
    <test/>
    <test v-bind:user1="username"/> 
    <!--the username will be default-->
  </div>
</template>


<script>
import test from "@/components/test.vue";
//import form from "@/components/form.vue";

//import * as d3 from "d3"
export default {
  name: "index",
  components: {
      test,
    //   form
  },
  data: function(){
      return {
          username:'hero'
      }
  },
  
};
</script>
