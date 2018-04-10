export default class OpenWeatherApi {
    constructor() {
        this.baseUrl = 'http://api.openweathermap.org/data/2.5/'
        this.apiKey = '8180aaea24a71d43a5d20ae721fd586d'
        this.api = 'weather'
        this.query = 'q='
        this.apiUrl = `${this.baseUrl}${this.api}?${this.query}&APPID=${this.apiKey}&units=metric`;
    }
    
    rebuildApiUrl () {
        this.apiUrl = `${this.baseUrl}${this.api}?${this.query}&APPID=${this.apiKey}&units=metric`;
    }

    weatherFor (cityName){
        this.query= 'q=' + cityName;
        this.api = 'weather'
        this.rebuildApiUrl();
        return this.apiUrl;
    }

    foreCastFor (cityName){
        this.query= 'q=' + cityName;
        this.api = "forecast"
        this.rebuildApiUrl();
        return this.apiUrl;
    }

    weatherForByGeoLocation(lat, lon) {
        this.query = `lat=${lat}&lon=${lon}`;
        this.api = 'weather';
        this.rebuildApiUrl();
        return this.apiUrl;
    }
}