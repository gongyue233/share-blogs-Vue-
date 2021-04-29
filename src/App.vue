<template>
  <div id="app">
    <Header id="header"></Header>
    <main id="main">      
      <router-view></router-view>
    </main>    
    <Footer id="footer"></Footer>
  </div>
</template>

<script>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
export default {
  name:'App',
  components:{
    Header,Footer
  }
}
</script>
<style>
body,#app{  
  height: 100%;
  width: 100%;
  position: absolute;
  margin: 0;
  padding: 0;
}
#app #header{
  grid-area: header;
  padding-left: 12%;
  padding-right: 12%;
  z-index: 2;
}
#app #footer{
  grid-area:foot;  
  text-align: center;
}
#app #main{
  text-align: center;
  grid-area: main;
}
#app{
  display: grid;  
  grid-auto-columns: 12% auto 12%;
  grid-auto-rows: auto 1fr auto;
  grid-template-areas:"header header header"
                      " .       main    .  "
                      "foot   foot   foot"
}
@media(max-width:500px){
  #app{
    grid-template-columns: 10px auto 10px;
  }
  #app #header{
    padding-left: 10px;
    padding-right: 10px;
  }
}

</style>