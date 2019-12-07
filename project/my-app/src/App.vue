<template>
  <div id="app">
    <!-- <div id="nav"> -->
    <div id="start">
      <router-link to="/">About Us</router-link> |
      <router-link to="/home">Deep Trip in California</router-link>
      
    </div>

      <!-- <router-link to="/index">Index</router-link> -->
      
    <!-- </div> -->
    <router-view />
  </div>
</template>
<script>
    alert('Please wait few seconds to load the map and plots.\nPlease click the smallest point on the bubble map, statistical graphs on the right will change accordingly.')

</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #767676;
}

#start {
  padding: 30px;
  margin-top: 0px;
  margin-bottom: 0px;
  height: 10px;
}

#start a {
  font-weight: bold;
  color: #767676;
  font-size: 20px;
}

#start a.router-link-exact-active {
  color: #FF5A5F;
  font-size: 20px;
}

</style>
