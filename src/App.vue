<template>
  <h1 class="title">Погода</h1>
  <div class="background">
    <p class="text">Выберите город: </p>
    <select class="city_list" v-model="city_result" @change="SelectCity" @blur="LoadImage">
      <option v-for="city in cities" :key="city.name" selected="selected" v-bind:value="city" >{{city.name}}</option>
    </select>
    <div v-if="city_result"> <!---->
      <p v-if="!weather_data" class="loader"><br>Загрузка...</p> 
      <div class="weather" v-else> <!---->
        <div class="temp_box weather_box">
          <img class="image_weather" :src="getImagePath(weather_logo)">
          <p class="text temp">{{ Math.round(weather_data.main.temp) }}&deg;C</p> <!---->
        </div>
        <div class="description_box weather_box">
          <p class="text block">{{ weather_data.weather[0].description.replace(weather_data.weather[0].description[0], weather_data.weather[0].description[0].toUpperCase()) }}</p> <!-- -->
          <p class="text block">Ощущается как {{ Math.round(weather_data.main.feels_like) }}&deg;C</p> <!-- -->
        </div>
        <div class="others_box weather_box">
          <div class="other_elem block">
            <img class="other_icon" src="../src/assets/barometer.png">
            <p class="text">{{ weather_data.main.pressure }} гПА</p> <!---->
          </div>
          <div class="other_elem block">
            <img class="other_icon" src="../src/assets/humidity.png">
            <p class="text">{{ weather_data.main.humidity }}%</p> <!---->
          </div>
          <div class="other_elem block">
            <img class="other_icon" src="../src/assets/wind.png">
            <p class="text">{{ weather_data.wind.speed }} м/с</p> <!---->
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="city_result"><!---->
    <h1 class="title" v-if="weather_data">Прогноз (5 дней)</h1> <!---->
    <div class="background forecast" v-if="forecast_data" @mouseover="LoadImageForecast">
      <div  class="forecast_elem" v-for="forecast in forecast_data.list" :key="forecast">
        <p class="hidden weather_code">{{ forecast.weather[0].icon }}</p>
        <p class="text forecast time">{{forecast.dt_txt.split(' ')[0].split('-')[2] + '.' + forecast.dt_txt.split(' ')[0].split('-')[1]}}</p>
        <p class="text forecast time_2">{{forecast.dt_txt.split(' ')[1].split(':')[0] + ':' + forecast.dt_txt.split(' ')[1].split(':')[1]}}</p>
        <div class="forecast_temp_box">
          <img class="image_weather forecast" :src="getImagePath(weather_logo)">
          <p class="text forecast_temp">{{Math.round(forecast.main.temp)}}&deg;C &nbsp;/&nbsp;{{Math.round(forecast.main.feels_like)}}&deg;C</p>
        </div>
        <div class="forecast_others_box">
          <div class="other_elem block">
            <img class="other_icon forecast" src="../src/assets/barometer.png">
            <p class="text forecast">{{ forecast.main.pressure }} гПа</p>
          </div>
          <div class="other_elem block">
            <img class="other_icon forecast" src="../src/assets/humidity.png">
            <p class="text forecast">{{forecast.main.humidity}}%</p>
          </div>
          <div class="other_elem block">
            <img class="other_icon forecast" src="../src/assets/wind.png">
            <p class="text forecast">{{forecast.wind.speed}} м/с</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
// import { jsx } from 'vue/jsx-runtime';
let cities = [
    'Нижний Тагил',
    'Москва',
    'Владивосток',
    'Екатеринбург',
    'Сочи',
    'Мурманск',
    'Верхоянск',
    'Санкт-Петербург',
    'Лондон',
    'Нью-Йорк',
    'Париж',
    'Каир',
    'Сидней'
]
let weathers = [
  {code: '01d', src:'sun'},
  {code: '01n', src:'moon'},
  {code: '02d', src:'small_clouds_d'},
  {code: '02n', src:'small_clouds_n'},
  {code: '03d', src:'clouds_d'},
  {code: '03n', src:'clouds_n'},
  {code: '04d', src:'clouds_d'},
  {code: '04n', src:'clouds_n'},
  {code: '09d', src:'rain_d'},
  {code: '09n', src:'rain_n'},
  {code: '10d', src:'rain_d'},
  {code: '10n', src:'rain_n'},
  {code: '11d', src:'thunder'},
  {code: '11n', src:'thunder'},
  {code: '13d', src:'snow'},
  {code: '13n', src:'snow'},
  {code: '50d', src:'haze_d'},
  {code: '50n', src:'haze_n'}
]



export default {
  name: 'App',
  data(){
    return{
      weather_data:null,
      forecast_data:null,
      cities:[
        {name:'Нижний Тагил'},
        {name:'Москва'},
        {name:'Владивосток'},
        {name:'Екатеринбург'},
        {name:'Сочи'},
        {name:'Мурманск'},
        {name:'Верхоянск'},
        {name:'Санкт-Петербург'},
        {name:'Лондон'},
        {name:'Нью-Йорк'},
        {name:'Париж'},
        {name:'Каир'},
        {name:'Сидней'},
      ],
      city_result:null,
      weather_logo: "sun"

    }
  },
  mounted(){
  },
  components: {
    
  },
  methods: {
    SelectCity(){
      let city = cities[document.querySelector('.city_list').selectedIndex];
      
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a06d5389c363dc0143a775466aef9cb3&lang=ru&units=metric`)
          .then(resp=>resp.json())
          .then(json=>{
            this.weather_data=json;
          });
      
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=a06d5389c363dc0143a775466aef9cb3&lang=ru&units=metric`)
          .then(resp=>resp.json())
          .then(json=>{
            this.forecast_data=json;
          });
    },
    LoadImage(){
      let weather_code = this.weather_data["weather"][0]["icon"];

      let i = 0;
      while (i< weathers.length){
        if (weather_code == weathers[i].code){
          this.weather_logo = weathers[i].src
        }
        i++;
      }
    },
    LoadImageForecast(){
      let weather_codes = document.querySelectorAll('.weather_code.hidden');
      let images = document.querySelectorAll('.image_weather.forecast');

      let i = 0;
      while (i< weathers.length){
        let j = 0;
        while (j < weather_codes.length){
          if (weather_codes[j].textContent == weathers[i].code){
            images[j].src = this.getImagePath(weathers[i].src);
          }

          j++;
        }
        i++;
      }
    },
    getImagePath(imageFileName) {
      const images = require.context('@/assets/', false, /\.png$/);
      return images(`./${imageFileName}.png`);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #d8d8d8;
}
.hidden{
  display: none;
}
.city_list{
  font-size: 30px;
  margin-left: 30px;
  background: #0b1529;
  border: solid 2px #d8d8d8;
  border-radius: 10px;
  color: #d8d8d8;
  display: inline;
  margin-right: 30px;
}
.date_list{
  font-size: 35px;
  margin: 30px;
  background: #0b1529;
  border: solid 2px #d8d8d8;
  border-radius: 10px;
  color: #d8d8d8;
  display: inline;
}
.weather{
  margin-right: 30px;
}
.background{
  background: linear-gradient(270deg, #3a50ab, #0b1529);
  border-radius: 10px;
  margin:40px 20px 20px 20px;
  padding-top: 10px;
  box-shadow: black 0px 0px 10px 0px;
  padding-bottom: 20px;
}
.background.forecast{
  padding-top: 30px;
  padding-right: 20px;
}
.forecast_elem{
  border-radius: 10px;
  box-shadow: black 0px 0px 10px 0px;
  display: inline-block;
  margin: 0px 0px 30px 20px;
  padding: 15px;
}
.title{
  font-size: 50px;
  margin-left: 30px;
  color: #0b1529;
  margin-right: 30px;
}
.text{
  font-size: 35px;
  display: inline-block;
  margin-left: 30px;
  vertical-align: middle;
}
.text.forecast{
  font-size: 25px;
}
.text.forecast.time{
  font-size: 35px;
  font-weight: bold;
  border: solid 2px #d8d8d8;
  border-radius: 10px;
  padding: 5px 10px 5px 10px;
}
.text.forecast.time_2{
  font-size: 35px;
}
.text.forecast_temp{
  margin-left: auto;
  margin-right: auto;
  display: block;
  font-size: 40px;
}
.block{
  display: block !important;
}
.temp{
  font-size: 80px !important;
  vertical-align: middle;
}
.image_weather{
  width: 100px;
  display: inline-block;
  vertical-align: middle;
}
.image_weather.forecast{
  margin-left: auto;
  margin-right: auto;
  display: block;
  width: 100px;

}
.forecast_others_box{
  margin-left: 30px;
}
.weather_box{
  margin: 30px;
  display: inline-block;
  vertical-align: middle;
}
.other_icon{
  width: 45px;
  vertical-align: middle;
}
.other_icon.forecast{
  width: 35px;
}
.loader{
  font-size: 35px;
  margin: 0px 0px 30px 30px;
  display: inline-block;
}
</style>
