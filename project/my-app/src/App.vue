<template>
  <div id="app">
    <div id="nav">
      <h1 align="center">Deep Trip in California</h1>
      <table border="1">
      <tbody>
        <tr>
          <td class="left-part" rowspan="2">
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
            <div id="barplot"></div>
            <div id="distplot"></div>
            <div id="bubbleplot"></div>
            <div id="circular_bar"></div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- filter function -->
    <div type="hidden" id="detectChange" onchange="rerender(this.id)">
      <input type="hidden" name="flag1" id="flag1"/>
      <input type="hidden" name="flag2" id="flag2"/>
    </div>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
  // var flag1 = 0;
  // $(document).ready(function() {
  //   $('input[type=radio][name=condition1]').change(function() {
  //     flag1 = $(this).val();
  //     console.log("Selected flag:" + flag1);
  //     $("#flag1").val(flag1);
  //     console.log($("#flag1").val());
  //   });
  // });
  // var flag2 = 0;
  // $(document).ready(function() {
  //   $('input[type=radio][name=condition2]').change(function() {
  //     flag2 = $(this).val();
  //     console.log("Selected flag:" + flag2);
  //     $("#flag2").val(flag2);
  //     console.log($("#flag2").val());
  //   });
  // });
</script>
