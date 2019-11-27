<template>
  <div class="form">
      <h1>form</h1>
      <label for="name">What's your name?</label> 
      <input v-model="user1" type="text" id="name">
      <h1>{{user1}} {{msg2}}</h1>

  </div>
</template>

<script>
export default {
  name: "form",
  data: function(){
      return{
          msg2:'hello'
      }
  },
  props: {
    user1: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
