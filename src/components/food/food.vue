<template>
<transition name="slide-fade">
	<div class="food-main" v-show="showFlag" ref="foodscroll">
	  	 <div class="food">
	  	 	<div class="food-content">
	  	 	  <div class="image-header">
	  	 	  	<img :src="food.image"/>
	  	 	  	<div class="back" @click="hide">
	  	 	  	  <i class="icon-arrow_lift">×</i>
	  	 	  	</div>
	  	 	  </div>
	  	 	  <div class="content">
	  	 	  	<h1 class="food-title">{{food.name}}</h1>
	  	 	  	<div class="food-detail">
	  	 	  	  <span class="sell-count">月售{{food.sellCount}}份</span>
	  	 	  	  <span class="rating">好评率{{food.rating}}%</span>
	  	 	  	</div>
	  	 	  	<div class="food-price">
	  	 	  	  <span class="nowPrice">￥{{food.price}}</span>
	  	 	  	  <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
	  	 	  	</div>
	  	 	  	<div class="carcontrol-wrapper">
	  	 	  	  <carcontrol :food="food"></carcontrol>
	  	 	    </div>
	  	 	    <div class="buy" v-show="!food.count||food.count===0" @click.stop.prevent="addFirst">加入购物车</div>
	  	 	  </div>
	  	 	</div>
	  	 	<split v-show="food.info"></split>
	  	 	<div class="infor" v-show="food.info">
	  	 		<h1 class="title">商品介绍</h1>
	  	 		<p class="food-des">{{food.info}}</p>
	  	 	</div>
	  	 	<split></split>
	  	 	<div class="ratings">
	  	 	  <h1 class="ratings-title">商品评价</h1>
	  	 	  <ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings" v-on:only-content="handleOnlyContent" v-on:select-type="handleSelectType"></ratingselect>
	  	 	  <div class="rating-wrapper">
	  	 	  	<ul v-show="food.ratings && food.ratings.length">
	  	 	  	  <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
	  	 	  	  	<div class="user">
	  	 	  	  	  <span class="user-name">{{rating.username}}</span>
	  	 	  	  	  <img class="avatar" :src="rating.avatar" width="12" height="12"/>
	  	 	  	  	</div>
	  	 	  	  	<div class="rating-time">{{rating.rateTime | formatDate}}</div>
	  	 	  	  	<p class="rating-text">
	  	 	  	  	  <span :class="{'icon-thumb_up':selectType===0,'icon-thumb_down':selectType===1}"></span>
	  	 	  	  	  {{rating.text}}
	  	 	  	  	</p>
	  	 	  	  </li>
	  	 	  	</ul>
	  	 	  	<div class="no-rating" v-show="!food.ratings && !food.ratings.length">暂无评价</div>
	  	 	  </div>
	  	 	</div>
	  	 </div>
	</div>
</transition>
 
</template>

<script>
import Vue from 'vue'
import {formatDate} from '../../common/js/date.js'
import BScroll from 'better-scroll'
import carcontrol from '../carcontrol/carcontrol.vue'
import split from '../split/split.vue'
import ratingselect from '../ratingselect/ratingselect.vue'
const ALL = 2
export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  components: {
    carcontrol,
    split,
    ratingselect
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    show () {
      this.showFlag = true
      this.selectTyte = ALL
      this.onlyContent = false
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodscroll, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide () {
      this.showFlag = false
    },
    addFirst (event) {
      console.log('click')
      if (!event._constructed) {
        return
      }
      Vue.set(this.food, 'count', 1)
    },
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectTyte === ALL) {
        return true
      } else {
        return type === this.selectTyte
      }
    },
    handleSelectType (type) {
      console.log(type)
      this.selectTyte = type
    },
    handleOnlyContent (onlyContent) {
      console.log(onlyContent)
      this.onlyContent = onlyContent
    }
  }
}
</script>

<style scoped="scoped">
.food-main{
	position: fixed;
	bottom: 48px;
	left: 0px;
	top: 0;
	z-index: 30px;
	width: 100%;
	overflow: hidden;
	background: #fff;
}




.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.image-header{
	position: relative;
	width: 100%;
	height: 0;
	padding-top: 100%;
}
.image-header img{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.back{
	position: absolute;
	top: 0px;
	left: 0px;
}
.icon-arrow_lift{
	display: block;
	padding: 18px;
	font-size: 30px;
	color: #fff;
}
.content{
	position: relative;
	padding: 18px;
}
.food-title{
	font-size: 14px;
	line-height: 14px;
	margin-bottom: 8px;
	font-weight: 700;
	color: rgb(7,17,27);
}
.food-detail{
	margin-bottom: 18px;
	line-height: 10px;
	font-size: 0px;
}
.sell-count,.rating{
	font-size: 10px;
	color: rgb(147,153,159);
}
.sell-count{
	margin-right: 12px;
}
.food-price{
	font-weight: 700;
	line-height: 24px;
}
.nowPrice{
	margin-right: 8px;
	font-size: 14px;
	color: rgb(240,20,20);
}
.oldPrice{
	text-decoration: line-through;
	font-size: 10px;
	color: rgb(147,153,159);
}
.carcontrol-wrapper{
	position: absolute;
	right: 12px;
	bottom: 12px;
}
.buy{
	position: absolute;
	right: 18px;
	bottom: 18px;
	z-index: 10;
	height: 24px;
	line-height: 24px;
	padding: 0 12px;
	box-sizing: border-box;
	border-radius: 12px;
	font-size: 10px;
	color: #fff;
	background: rgb(0,160,220);
}
.infor{
	padding: 18px;
}
.title{
	line-height: 14px;
	margin-bottom: 6px;
	font-size: 14px;
	color: rgb(7,17,27);
}
.food-des{
	line-height: 24px;
	padding: 0 8px;
	font-size: 12px;
	color: rgb(77,85,93);
}
.ratings{
	padding-top: 18px;
}
.ratings-title{
	line-height: 14px;
	margin-left: 18px;
	font-size: 14px;
	color: rgb(7,17,27);
}
.rating-wrapper{
	padding: 0 18px;
}
.rating-item{
	position: relative;
	padding: 16px 0;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
.user{
	position: absolute;
	right: 0;
	top: 16px;
	line-height: 12px;
	font-size: 0;
}
.user-name{
	display: inline-block;
	margin-right: 6px;
	vertical-align: top;
	font-size: 10px;
	color: rgb(147,153,159);
}
.rating-time{
	margin-bottom: 6px;
	line-height: 12px;
	font-size: 10px;
	color: rgb(147,153,159);
}
.rating-text{
	line-height: 16px;
	font-size: 12px;
	color: rgb(7.17.27);
}
.icon-thumb_up,.icon-thumb_down{
	margin-right: 4px;
	line-height: 16px;
	font-size: 12px;
}
.icon-thumb_up{
	color: rgb(0,160,220);
}
.icon-thumb_down{
	color: rgb(147,153,159);
}
.no-rating{
	padding: 16px 0;
	font-size: 12px;
	color: rgb(147,153,159);
	
}
</style>
