<template>
    <div class="seller" ref="seller">
      <div class="seller-content">
      	<div class="overview">
      	  <h1 class="seller-title">{{seller.name}}</h1>
      	  <div class="seller-des">
      	    <star :size="36" :score="seller.score"></star>
      	    <span class="text1">({{seller.ratingCount}})</span>
      	    <span class="text1">月销售{{seller.sellCount}}单</span>
      	  </div>
      	  <ul class="remark">
      	    <li class="block">
      	      <h1 class="remark-title">起送价</h1>
      	      <div class="remark-content">
      	      	<span class="stress">{{seller.minPrice}}</span>元
      	      </div>
      	    </li>
      	    <li class="block">
      	      <h1 class="remark-title">商家配送</h1>
      	      <div class="remark-content">
      	      	<span class="stress">{{seller.deliveryPrice}}</span>元
      	      </div>
      	    </li>
      	    <li class="block">
      	      <h1 class="remark-title">平均配送时间</h1>
      	      <div class="remark-content">
      	      	<span class="stress">{{seller.deliveryTime}}</span>元
      	      </div>
      	    </li>
      	  </ul>
      	  <div class="favorite" @click="toggleFavorite($event)">
      	  	<span class="icon-favorite" :class="{'active': iconFavorite}">❤</span>
      	  	<span class="favorite-text">{{favoriteText}}</span>
      	  	<span ></span>
      	  </div>
      	</div>
      	<split></split>
      	<div class="seller-bulletin">
      	  <h1 class="bulletin-title">公告与活动</h1>
      	  <div class="content-wrapper">
      	  	<p class="bulletin-content">{{seller.bulletin}}</p>
      	  </div>
      	  <ul v-if="seller.supports" class="supports">
	  	    <li class="support-item" v-for="(item,index) in seller.supports">
	  			<span class="favIcon" :class="classMap[seller.supports[index].type]"></span>
	  			<span class="favText">{{seller.supports[index].description}}</span>
	  		</li>
	  	   </ul>
      	</div>
      	<split></split>
      	<div class="pics">
      	  <h1 class="pics-title">商家实景</h1>
      	  <div class="pics-wrapper" ref="picsWrapper">
      	  	<ul class="pics-list" ref="picsList">
      	  	  <li class="pics-item" v-for="item in seller.pics">
      	  	  	<img :src="item" width="120" height="90"/>
      	  	  </li>
      	  	</ul>
      	  </div>
      	</div>
      	<split></split>
      	<div class="seller-info">
      	  <h1 class="sellerTitle">商家信息</h1>
      	  <ul>
      	  	<li class="info-item" v-for="item in seller.infos">{{item}}</li>
      	  </ul>
      	</div>
      </div>
    </div>
</template>

<script>
import star from '../star/star.vue'
import split from '../split/split.vue'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      iconFavorite: false
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  watch: {
    'seller' () {
      this._initScroll()
      this._initPicScroll()
    }
  },
  mounted () {
    this._initScroll()
    this._initPicScroll()
  },
  computed: {
    favoriteText () {
      return this.iconFavorite === true ? '已收藏' : '收藏'
    }
  },
  methods: {
    _initScroll () {
      if (!this.scroll) {
        this.$nextTick(() => {
          this.menuScroll = new BScroll(this.$refs.seller, {
            click: true
          })
        })
      } else {
        this.scroll.refresh()
      }
    },
    _initPicScroll () {
      if (this.seller.pics) {
        let picWidth = 120
        let margin = 6
        let ulWidth = (picWidth + margin) * this.seller.pics.length - margin
        this.$refs.picsList.style.width = ulWidth + 'px'
        if (!this.scroll) {
          this.$nextTick(() => {
            this.picScroll = new BScroll(this.$refs.picsWrapper, {
              scrollX: true,
              eventPassThrough: 'vertical'
            })
          })
        } else {
          this.scroll.refresh()
        }
      }
    },
    toggleFavorite (event) {
      if (!event._constructed) {
        return
      }
      this.iconFavorite = !this.iconFavorite
    }
  },
  components: {
    star,
    split
  }
}
</script>

<style scoped="scoped">
.seller{
	position: absolute;
	top: 174px;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
}
.overview{
	position: relative;
	padding: 18px;
}
.seller-title{
	margin-bottom: 8px;
	line-height: 14px;
	color: rgb(7,17,27);
	font-size: 14px;
}
.seller-des{
	padding-bottom: 18px;
	font-size: 0;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
.star{
	display: inline-block;
	margin-right: 8px;
	vertical-align: top;
}
.text1{
	display: inline-block;
	margin-right: 12px;
	line-height: 18px;
	vertical-align: top;
	color: rgb(77,85,93);
	font-size: 10px;
}
.remark{
	display: flex;
	padding-top: 18px;
}
.favorite{
	position: absolute;
	width: 50px;
	right: 11px;
	top: 18px;
	text-align: center;
}
.icon-favorite{
	display: block;
	margin-bottom: 4px;
	line-height: 24px;
	font-size: 24px;
	color: #d4d6d9;
}
.active{
	color: rgb(240,20,20);
}
.favorite-text{
	line-height: 10px;
	font-size: 10px;
	color: rgb(77,85,93);
}
.block{
	flex: 1;
	text-align: center;
	border-right: 1px solid rgba(7,17,27,0.1);
}
.block:last-child{
	border-right: none;
}
.remark-title{
	margin-bottom: 4px;
	line-height: 10px;
	color: rgb(147,153,159);
	font-size: 10px;
}
.remark-content{
	line-height: 24px;
	font-size: 10px;
	color: rgb(7,17,27);
}
.stress{
	font-size: 24px;
}
.seller-bulletin{
	padding: 18px 18px 0 18px;
}
.bulletin-title{
	margin-bottom: 8px;
	line-height: 14px;
	color: rgb(7,17,27);
	font-size: 14px;
}
.content-wrapper{
	padding: 0 12px 16px 12px;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
.bulletin-content{
	line-height: 24px;
	font-size: 12px;
	font-weight: 200;
	color: rgb(240,20,20);
}
.support-item{
	padding: 16px 12px;
	font-size: 0;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
.support-item:last-child{
	border-bottom: none;
}
.decrease{
	background: url(decrease_4@2x.png);
	
}
.discount{
	background: url(discount_4@2x.png);
	
}
.special{
	background: url(special_4@2x.png);
	
}
.invoice{
	background: url(invoice_4@2x.png);
	
}
.guarantee{
	background: url(guarantee_4@2x.png);
	
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
	font-weight: 200;
	color: rgb(7,17,27);
}
.pics{
	padding: 18px;
	
}
.pics-title{
	margin-bottom: 12px;
	line-height: 14px;
	color: rgb(7,17,27);
	font-size: 14px;
}
.pics-wrapper{
	width: 100%;
	overflow: hidden;
	white-space: nowrap;
	
}
.pics-list{
	font-size: 0;
	
}
.pics-item{
	display: inline-block;
	margin-right: 6px;
	width: 120px;
	height: 90px;
	
}
.pics-item:last-child{
	margin-right: 0;
}
.seller-info{
	padding: 18px 18px 0 18px;
	
}
.sellerTitle{
	padding-bottom: 12px;
	line-height: 14px;
	border-bottom: 1px solid rgba(7,17,27,0.1);
	color: rgb(7,17,27);
	font-size: 14px;
}
.info-item{
	padding: 16px 12px;
	line-height: 16px;
	border-bottom: 1px solid rgba(7,17,27,0.1);
	color: rgb(7,17,27);
	font-size: 12px;
	
}
.info-item:last-child{
	border-bottom: none;
}
</style>
