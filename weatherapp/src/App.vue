<template>
  <div>
    <header-nav></header-nav>
    <section class="section">
      <div class="container">
        <weather-widget :location="location" v-if="location"></weather-widget>
        <div v-else>
          <p>Search for a location...</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import 'bulma/css/bulma.css'
import headerNav from './components/global/Header.vue'
import weatherWidget from './components/WeatherWidget.vue'
export default {
  name: 'app',
  components : {
    headerNav,
    weatherWidget,
  },
  created () {
    this.bus.$on('search-location' , (location) => {
      this.location = location;
    });
  },
  data () {
    return {
      location: 'Longueuil'
    }
  }
}
</script>

<style>

</style>
