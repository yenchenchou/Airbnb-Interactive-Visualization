<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <barplot/>
    <distplot/>
    <bubbleplot/>
    <!-- <circularbar/> -->
  </div>
  
</template>

<script>
// @ is an alias to /src
import barplot from '@/components/barplot.vue'
import distplot from '@/components/distplot.vue'
import bubbleplot from '@/components/bubbleplot.vue'
// import circularbar from '@/components/circularbar.vue'

export default {
  name: 'home',
  components: {
    'barplot':barplot,
    'distplot':distplot,
    'bubbleplot': bubbleplot
    // 'circularbar':circularbar
  }
}

</script>
