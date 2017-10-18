<template>
	<div class="ratings" ref="ratings">
	  <div class="ratings-content">
	  	<div class="overview">
	  	  <div class="overview-left">
	  	  	<h1 class="scroe">{{seller.score}}</h1>
	  	  	<div class="title">综合评分</div>
	  	  	<div class="rank">高于周边商家{{seller.rankRate}}%</div>
	  	  </div>
	  	  <div class="overview-right">
	  	  	<div class="scroe-wrapper">
	  	  	  <span class="scroe-title">服务态度</span>
	  	  	  <star :size="36" :score="seller.serviceScore"></star>
	  	  	  <span class="service-score">{{seller.serviceScore}}</span>
	  	  	</div>
	  	  	<div class="scroe-wrapper">
	  	  	  <span class="scroe-title">商品评分</span>
	  	  	  <star :size="36" :score="seller.foodScore"></star>
	  	  	  <span class="service-score">{{seller.foodScore}}</span>
	  	  	</div>
	  	  	<div class="delivery-wrapper">
	  	  	  <span class="delivery-title">送达时间</span>
	  	  	  <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
	  	  	  <span></span>
	  	  	</div>
	  	  </div>
	  	</div>
	  	<split></split>
	  	 <ratingselect :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings" v-on:only-content="handleOnlyContent" v-on:select-type="handleSelectType"></ratingselect>
	  	 <div class="ratings-wrapper">
	  	   <ul>
	  	     <li v-show="needShow(item.rateType,item.text)" v-for="item in ratings" class="ratings-item">
	  	     	<div class="avatar">
	  	     	  <img :src="item.avatar" width="28" height="28"/>
	  	     	</div>
	  	     	<div class="ratings-content">
	  	     	  <h1 class="rating-name">{{item.username}}</h1>
	  	     	  <div class="star-wrapper">
	  	     	  	<star :size="24" :score="item.score"></star>
	  	     	  	<span class="deliveryTime" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
	  	     	  </div>
	  	     	  <p class="rating-text">{{item.text}}</p>
	  	     	  <div class="recommend" v-show="item.recommend && item.recommend.length">
	  	     	  	<span class="icon-thumb_up"></span>
	  	     	  	<span v-for="recommend in item.recommend " class="recommend-item">{{recommend}}</span>
	  	     	  </div>
	  	     	  <div class="rating-time">{{item.rateTime | formatDate}}</div>
	  	     	</div>
	  	     </li>
	  	   </ul>
	  	 </div>
	  </div>
	</div>
</template>

<script>
import star from '../star/star.vue'
import split from '../split/split.vue'
import BScroll from 'better-scroll'
import {formatDate} from '../../common/js/date.js'
import ratingselect from '../ratingselect/ratingselect.vue'
const ALL = 2
const ERR_OK = 0
export default{
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true
    }
  },
  created () {
    this.$http.get('/api/ratings').then((res) => {
      res = res.body
      console.log(res)
      if (res.errno === ERR_OK) {
        this.ratings = res.data
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
    })
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    star,
    split,
    ratingselect
  },
  methods: {
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
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    handleOnlyContent (onlyContent) {
      console.log(onlyContent)
      this.onlyContent = onlyContent
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  }
}
</script>

<style scoped="scoped">
.ratings{
	position: absolute;
	top: 174px;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
}
.overview{
	display: flex;
	padding: 18px 0;
}
.overview-left{
	flex: 0 0 137px;
	padding: 6px 0;
	width: 137px;
	border-right: 1px solid rgba(7,17,27,0.2);
	text-align: center;
	font-size: 0px;
}
@media only screen and (max-width: 320px) {
  .overview-left{
  	flex: 0 0 120px;
  	width: 120px;
  }
}
.scroe{
	margin-bottom: 6px;
	line-height: 28px;
	font-size: 24px;
	color: rgb(255,153,0);
}
.title{
	margin-bottom: 8px;
	line-height: 12px;
	font-size: 12px;
	color: rgb(7,17,27);
}
.rank{
	line-height: 10px;
	font-size: 10px;
	color: rgb(147,153,159);
}
.overview-right{
	flex: 1;
	padding:6px 0px 6px 24px;
}
@media only screen and (max-width: 320px) {
  .overview-right{
  	padding-left: 6px;
  }
}
.scroe-wrapper{
	margin-bottom: 8px;
	font-size: 0;
}
.scroe-title{
	display: inline-block;
	line-height: 18px;
	vertical-align: top;
	font-size: 12px;
	color: rgb(7,17,27);
}
.scroe-wrapper .star{
	display: inline-block;
	vertical-align: top;
	margin: 0 10px;
}
@media only screen and (max-width: 320px) {
  .scroe-wrapper .star{
	margin: 0 6px;
  }
}
.service-score{
	display: inline-block;
	line-height: 18px;
	vertical-align: top;
	font-size: 12px;
	color: rgb(255,153,0);
}
.delivery-wrapper{
	font-size: 0;
}
.delivery-title{
	line-height: 18px;
	font-size: 12px;
	color: rgb(7,17,27);
}
.delivery-time{
	margin-left: 12px;
	font-size: 12px;
	color: rgb(147,153,159);
}
.ratings-wrapper{
	padding: 0 18px;
}
.ratings-item{
	display: flex;
	padding: 18px 0;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
.avatar{
	flex: 0 0 28px;
	width: 28px;
	margin-right: 12px;
	
}
img{
	border-radius: 50%;
}
.ratings-content{
	position: relative;
	flex: 1;
}
.rating-name{
	margin-bottom: 4px;
	line-height: 12px;
	font-size: 10px;
	color: rgb(7,17,27);
}
.star-wrapper{
	margin-bottom: 6px;
	font-size: 0px;
}
.star-wrapper .star{
	display: inline-block;
	margin-right: 6px;
	vertical-align: top;
}
.deliveryTime{
	display: inline-block;
	vertical-align: top;
	line-height: 12px;
	font-size: 10px;
	font-weight: 200;
	color: rgb(147,153,159);
}
.rating-text{
	margin-bottom: 8px;
	line-height: 18px;
	font-size: 12px;
	color: rgb(7,17,27);
}
.recommend{
	line-height: 16px;
	font-size: 0;
}
.icon-thumb_up, .recommend-item{
	display: inline-block;
	margin: 0 8px 4px 0;
	font-size: 9px;
}
.icon-thumb_up{
	color: rgb(0,160,220);
}
.recommend-item{
	padding: 0 6px;
	border: 1px solid rgba(7,17,27,0.1);
	border-radius: 1px;
	color: rgb(147,153,159);
	background: rgb(255,255,255);
}
.rating-time{
	position: absolute;
	top: 0;
	right: 0;
	line-height: 12px;
	font-size: 10px;
	font-weight: 200;
	color: rgb(147,153,159);
}
</style>
