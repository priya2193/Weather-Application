<template>
    <div class="header">
        <section class="hero is-primary is-bold is-medium">
            <div class="hero-head">
                 <nav class="container nav">
                    <div class="nav-left">
                        <a class="nav-item is-brand" href="#" @click="toggleSeen">
                            <img src="../../assets/logo.png" alt="North Park Innovations">
                            <span>Click to check Weather</span>
                        </a>
                    </div>

                    <span class="nav-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </nav>
            </div>
            <div class="hero-body" v-if="seen">
                <p v-if="seen">
                <div class="container has-text-centered">
                    <h1 class="title is-1">
                        Your own Weather App
                    </h1>
                    <h2 class="subtitle is-3">
                        It's always better to keep a track of the weather!!!
                    </h2>
                    <div id = "app" >
                    <p class="control has-addons is-flex">
                        <input class="input is-medium" type="text" placeholder="Find a zipcode/city" v-model="city" @keyup.13="getWeatherForCity">
                            <a class="button is-info is-medium" @click="getWeatherForCity">
                            Search
                        </a>
                        <a class="button is-warning is-medium" @click="locateMe">
                            <i class="icon is-medium fa fa-location-arrow" aria-hidden="true"></i>
                            Find me
                        </a>
                    </p>
                    </div>
                </div>
                </p>
            </div>
          <!--   <div class="hero-foot">
              <h2 class="title has-text-centered is-4">
                  Weather alerts
              </h2>
          </div> -->
        </section>
    </div>
</template>
<script>
export default {
    name: 'headerNav',
    data () {
        return {
            seen : true
        }
    },
    created () {
        this.getWeatherForCity(this.city);
        this.bus.$emit('search-location', this.city);
    },
    methods : {
        getWeatherForCity(){
            this.bus.$emit('search-location', this.city);
            this.axios.get(this.urlWeatherFor(this.city))
                .then((response) => {
                    this.bus.$emit('weather-found', response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
            this.axios.get(this.urlForeCastFor(this.city))
                .then((response) => {
                    this.bus.$emit('forecast-found', response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
                this.seen = !this.seen;
        },
        locateMe(){
            const options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };
           let error = function error(err) {
                console.warn(`ERROR(${err.code}): ${err.message}`);
            };

            navigator.geolocation.getCurrentPosition((pos) =>
            {
                 let { latitude , longitude } = pos.coords;

                this.axios.get(this.urlWeatherForByGeoLocation(latitude, longitude))
                .then((response) => {
                    this.city = response.data.name;
                    this.bus.$emit('search-location', this.city);
                    this.bus.$emit('weather-found', response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            , error, options);
},
    toggleSeen(){
    this.seen = true;

        }
    }
}
</script>
<style scoped>
.control {
    margin-top: 10px;
    align-content: center;
    justify-content: center;
}
</style>
