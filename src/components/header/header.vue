<template>
	<div class="header">
	  <div class="content-wrapper">
	  	<div class="avatar">
	  		<img width="64" height="64" :src="seller.avatar"/>
	  	</div>
	  	<div class="content">
	  		<div class="title">
	  			<span class="brand"></span>
	  			<span class="name">{{seller.name}}</span>
	  		</div>
	  		<div class="description">
	  			{{seller.description}}/{{seller.deliveryTime}}分钟送达
	  		</div>
	  		<div v-if='seller.supports' class="support">
	  			<span class="icon" 					:class='classMap[seller.supports[0].type]'></span>
	  			<span class="text">
	  				{{seller.supports[0].description}}
	  			</span>
	  		</div>
	  	</div>
	    <div v-if='seller.supports' class="support-count" @click="showDetail">
	    	<span class="count">{{seller.supports.length}}个</span>
	    	<span class="icon-keyboard_arrow_right"></span>
	    </div>
	  </div>
	  <div class="bulletin-wrapper" @click="showDetail">
	  	<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
	  	<i class="icon-keyboard_arrow_right"></i>
	  </div>
	  <div class="background">
	  	<img :src="seller.avatar" width="100%" height="100%"/>
	  </div>
	  <transition name="fade">
	  	<div v-show='detailShow' class="detail">
	  	<div class="detail-wrapper clearfix">
	  		<div class="detail-main">
	  			<h1 class="name">{{seller.name}}</h1>
	  			<div class="star-wrapper">
	  			  <star :size="48" :score="seller.score"></star>
	  			</div>
	  			<div class="favTitle">
	  				<div class="line"></div>
	  				<div class="text">优惠信息</div>
	  				<div class="line"></div>
	  			</div>
	  			<ul v-if="seller.supports" class="supports">
	  				<li class="support-item" v-for="(item,index) in seller.supports">
	  			<span class="favIcon" :class="classMap[seller.supports[index].type]"></span>
	  			<span class="favText">{{seller.supports[index].description}}</span>
	  				</li>
	  			</ul>
	  			<div class="favTitle">
	  				<div class="line"></div>
	  				<div class="text">商家公告</div>
	  				<div class="line"></div>
	  			</div>
	  			<div class="bulletin">
	  				<p class="shopContent">{{seller.bulletin}}</p>
	  			</div>
	  		</div>
	  	</div>
	  	<div class="detail-close" @click="hiddenDetail">
	  		<i class="icon-close"></i>
	  	</div>
	  </div>
	  </transition>
	</div>
</template>

<script>
import star from '../star/star.vue'
export default {
  data () {
    return {
      detailShow: false,
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  components: {
    star
  },
  props: {
    seller: {
      type: Object
    }
  },
  methods: {
    showDetail () {
      this.detailShow = true
    },
    hiddenDetail () {
      this.detailShow = false
    }
  }
}
</script>
<style scoped="scoped">
.header{
	position: relative;
	color: #fff;
	background: rgba(7,17,27,0.5);
	overflow: hidden;
}
.content-wrapper{
	position: relative;
	padding: 24px 12px 18px 24px;
	font-size: 0;
}
.avatar{
	display: inline-block;
	vertical-align: top;
}
.avatar img{
	border-radius: 2px;
}
.content{
	display: inline-block;
	margin-left: 16px;
	font-size: 14px;
}
.title{
	margin: 2px 0 8px 0;
}
.brand{
	display: inline-block;
	vertical-align: top;
	width: 30px;
	height: 18px;
	background: url(brand@2x.png);
	background-size: 30px 18px;
}
@media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
	.brand{
		background: url(brand@3x.png);
	    background-size: 30px 18px;
	}
}
.name{
	margin-left: 6px;
	font-size: 16px;
	line-height: 18px;
	font-weight: bold;
}
.description{
	margin-bottom: 10px;
	line-height: 12px;
	font-size: 12px;
	font-weight: 200px;
}
.support .icon{
	display: inline-block;
	vertical-align: top;
	width: 12px;
	height: 12px;
	margin-right: 4px;
	background-repeat: no-repeat;
	background-size: 12px 12px;
}
.support .text{
	display: inline-block;
	line-height: 12px;
	font-size: 10px;
}
.decrease{
	background: url(decrease_1@2x.png);
	
}
.discount{
	background: url(discount_1@2x.png);
	
}
.special{
	background: url(special_1@2x.png);
	
}
.invoice{
	background: url(invoice_1@2x.png);
	
}
.guarantee{
	background: url(guarantee_1@2x.png);
	
}
.support-count{
	position: absolute;
	right: 12px;
	bottom: 14px;
	padding: 0 8px;
	height: 24px;
	line-height: 24px;
	border-radius: 14px;
	background: rgba(0,0,0,0.2);
	text-align: center;
	
}
.support-count .count{
	font-size: 10px;
}
.icon-keyboard_arrow_right{
	font-size: 10px;
}
.bulletin-wrapper{
	position: relative;
	height: 28px;
	line-height: 28px;
	padding: 0 22px 0 12px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	background: rgba(7,17,27,0.2);
}
.bulletin-title{
	display: inline-block;
	vertical-align: top;
	margin-top: 8px;
	width: 22px;
	height: 12px;
	background: url(bulletin@2x.png);
	background-size: 22px 12px;
	background-repeat: no-repeat;
}
@media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
	.bulletin-title{
		background: url(bulletin@3x.png);
	    background-size: 22px 12px;
	    background-repeat: no-repeat;
	}
}
.bulletin-text{
	margin: 0 4px;
	font-size: 10px;
	vertical-align: top;
}
.icon-keyboard_arrow_right{
	position: absolute;
	font-size: 10px;
	right: 12px;
	top: 8px;
}
.background{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
	filter: blur(10px);
}
.detail{
	position: fixed;
	z-index: 100;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background: rgba(7,17,27,0.8);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
.detail-wrapper{
	min-height: 100%;
	width: 100%;
}
.clearfix{
	display: inline-block;
}
.detail:after{
	display: block;
	content: '';
	height: 0;
	line-height: 0;
	clear: both;
	visibility: hidden;
}
.detail-main{
	margin-top: 64px;
	padding-bottom: 64px;
}
.name{
	line-height: 16px;
	text-align: center;
	font-size: 16px;
	font-weight: 700;
}
.star-wrapper{
	margin-top: 18px;
	text-align: center;
	padding: 2px 0;
}
.favTitle{
	display: flex;
	width: 80%;
	margin: 28px auto 24px auto;
}
.line{
	flex: 1;
	position: relative;
	top: -6px;
	border-bottom: 1px solid rgba(255,255,255,0.2);
}
.text{
	padding: 0 12px;
	font-weight: 200;
	font-size: 14px;
}
.supports{
	width: 80%;
	margin: 0 auto;
}
.support-item{
	padding: 0 12px;
	margin-bottom: 12px;
	font-size: 0;
}
.supports:last-child{
	margin-bottom: 0;
}
.favIcon{
	display: inline-block;
	width: 16px;
	height: 16px;
	vertical-align: top;
	margin-right: 6px;
	background-size: 16px 16px;
	background-repeat: no-repeat;
}
.favText{
	line-height: 16px;
	font-size: 12px;
}
.bulletin{
	width: 80%;
	margin: 0 auto;
}
.shopContent{
	padding: 12px;
	line-height: 24px;
	font-size: 12px;
	font-weight: 200;
}
.detail-close{
	position: relative;
	width: 32px;
	height: 32px;
	margin: -64px auto 0 auto;
	clear: both;
	font-size: 32px;
}
.icon-close:before {
  content: "\e903";
}

</style>
