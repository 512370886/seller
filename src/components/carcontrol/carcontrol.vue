<template>
	<div class="carcontrol">
	<transition name="slide-fade">
		<div class="car-minus" @click.stop.prevent="minusfood($event)" v-show="food.count>0">-</div>
	</transition>
	  <div class="car-count" v-show="food.count>0">{{food.count}}</div>
	  <div class="car-add" @click.stop.prevent="addfood($event)">+</div>
	</div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addfood (event) {
      if (!event._constructed) {
        return
      }
      console.log('click')
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    minusfood (event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style>
.carcontrol{
	font-size: 0;
}
.car-minus,.car-add{
	display: inline-block;
	padding: 6px;
	line-height: 24px;
	font-size: 24px;
	color: rgb(0,160,220);
}
.car-count{
	display: inline-block;
	vertical-align: top;
	width: 12px;
	padding-top: 6px;
	line-height: 24px;
	text-align: center;
	font-size: 10px;
	color: rgb(147,153,149);
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  transform: translateX(12px);
  opacity: 0;
}
</style>
