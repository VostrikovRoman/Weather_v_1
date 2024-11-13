<template>
  <h1 class="title">Погода</h1>
  <forecast_card></forecast_card>
  <div class="background">
    <p class="text">Выберите город: </p>
    <select class="city_list" v-model="city" @change="SelectCity"> 
      <option v-for="city in cities" :key="city" selected="selected" v-bind:value="city" >{{city}}</option>
    </select>
    <div > 
      <p v-if="!weather_data" class="loader"><br>Загрузка...</p> 
      <div class="weather" v-else> 
        <div class="temp_box weather_box">
          <img class="image_weather" :src="getImagePath(LoadImage(weather_data.weather[0].icon))">
          <p class="text temp">{{ Math.round(weather_data.main.temp) }}&deg;C</p>
        </div>
        <div class="description_box weather_box">
          <p class="text block">{{ weather_data.weather[0].description.replace(weather_data.weather[0].description[0], weather_data.weather[0].description[0].toUpperCase()) }}</p> 
          <p class="text block">Ощущается как {{ Math.round(weather_data.main.feels_like) }}&deg;C</p> 
        </div>
        <div class="others_box weather_box">
          <div class="other_elem block">
            <img class="other_icon" src="../src/assets/barometer.png">
            <p class="text">{{ weather_data.main.pressure }} гПА</p> 
          </div>
          <div class="other_elem block">
            <img class="other_icon" src="../src/assets/humidity.png">
            <p class="text">{{ weather_data.main.humidity }}%</p> 
          </div>
          <div class="other_elem block">
            <img class="other_icon" src="../src/assets/wind.png">
            <p class="text">{{ weather_data.wind.speed }} м/с</p> 
          </div>
        </div>
      </div>
    </div>
  </div>
  <div >
    <h1 class="title" v-if="weather_data">Прогноз (5 дней)</h1> 
    <div class="background forecast" v-if="forecast_data">
      <forecast_elem v-for="forecast in forecast_data.list" 
      :key="forecast" 
      :icon_src='getImagePath(LoadImage(forecast.weather[0].icon))' 
      :date='forecast.dt_txt' 
      :temp='forecast.main.temp' 
      :feels_like_temp="forecast.main.feels_like" 
      :pressure="forecast.main.pressure" 
      :humidity="forecast.main.humidity" 
      :wind_speed="forecast.wind.speed" 
      ></forecast_elem>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import forecast_elem from './components/forecast_elem.vue';

let weather_data = ref(null)
let forecast_data = ref(null)



const cities = ref([
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
])
const weathers = ref([
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
])

function SelectCity(){
  let city_result = cities.value[document.querySelector('.city_list').selectedIndex];
  
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_result}&appid=a06d5389c363dc0143a775466aef9cb3&lang=ru&units=metric`)
    .then(resp=>resp.json())
    .then(json=>{
      weather_data.value=json;
    })
  
      
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city_result}&appid=a06d5389c363dc0143a775466aef9cb3&lang=ru&units=metric`)
    .then(resp=>resp.json())
    .then(json=>{
      forecast_data.value=json;
    })
}
function LoadImage(weather_code){
  let weather_logo;
  let i = 0;
  while (i< weathers.value.length){
    if (weather_code == weathers.value[i].code){
      weather_logo = weathers.value[i].src
    }
    i++;
  }
  return weather_logo
}

function getImagePath(imageFileName) {
  const images = require.context('@/assets/', false, /\.png$/);
  return images(`./${imageFileName}.png`);
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
