<template>
  <div  class="forecast_elem" >
    <p class="text forecast time">{{date.split(' ')[0].split('-')[2] + '.' + date.split(' ')[0].split('-')[1]}}</p>
    <p class="text forecast time_2">{{date.split(' ')[1].split(':')[0] + ':' + date.split(' ')[1].split(':')[1]}}</p>
    <div class="forecast_temp_box">
      <img class="image_weather forecast" :src="icon_src">
      <p class="text forecast_temp">{{Math.round(temp)}}&deg;C &nbsp;/&nbsp;{{Math.round(feels_like_temp)}}&deg;C</p>
    </div>
    <div class="forecast_others_box">
      <div class="other_elem block">
        <img class="other_icon forecast" src="../assets/barometer.png">
        <p class="text forecast">{{ pressure }} гПа</p>
      </div>
      <div class="other_elem block">
        <img class="other_icon forecast" src="../assets/humidity.png">
        <p class="text forecast">{{humidity}}%</p>
      </div>
      <div class="other_elem block">
        <img class="other_icon forecast" src="../assets/wind.png">
        <p class="text forecast">{{wind_speed}} м/с</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from 'vue'

defineProps({
  icon_src: String,
  date: String,
  temp: Number,
  feels_like_temp: Number,
  pressure: Number,
  humidity: Number,
  wind_speed: Number,
})

</script>

<style scoped>

</style>
