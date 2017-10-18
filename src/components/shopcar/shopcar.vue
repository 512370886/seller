<template>
   <div>
   	 <div class="shopcar">
		<div class="car-content" @click="toggleList">
			<div class="car-content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'heighlight':totalCount>0}">
						<i class="icon-shopping_cart" :class="{'heighlight':totalCount>0}">购物车</i>
					</div>
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="total-price" :class="{'heighlight1':totalPrice>0}">￥{{totalPrice}}元</div>
				<div class="deliver-price">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="car-content-right" @click.stop.prevent="pay">
				<div class="minPay" :class="payStatus">{{payDes}}</div>
			</div>
		</div>
		<div class="shopcar-list" v-show="listShow">
			<div class="list-header">
				<h1 class="shoptitle">购物车</h1>
				<span class="empty" @click="empty">清空</span>
			</div>
			<div class="list-content" ref='listContent'>
				<ul>
				   <li class="food" v-for="food in selectFoods">
				   	 <span class="foodName">{{food.name}}</span>
				   	 <div class="foodPrice">
				   	 	<span>￥{{food.price*food.count}}</span>
				   	 </div>
				   	 <div class="carcontrol-wrapper">
				   	 	<carcontrol :food="food"></carcontrol>
				   	 </div>
				   </li>
				</ul>
			</div>
		</div>
	</div>
	<div class="list-mask" v-show="listShow"></div>
   </div>
	
	
</template>

<script>
import carcontrol from '../carcontrol/carcontrol.vue'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      fold: true
    }
  },
  props: {
    selectFoods: {
      type: Array,
      default () {
        return []
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        console.log(food)
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDes () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payStatus () {
      if (this.totalPrice < this.minPrice) {
        return 'no-enough'
      } else {
        return 'enough'
      }
    },
    listShow () {
      if (!this.totalCount) {
        this.fold = true
        return false
      }
      let show = !this.fold
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    }
  },
  components: {
    carcontrol
  },
  methods: {
    toggleList () {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    empty () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    pay () {
      if (this.totalPrice < this.minPrice) {
        return
      }
      window.alert(`需支付${this.totalPrice}元`)
    }
  }
}
</script>

<style scoped="scoped">
.shopcar{
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 50;
	width: 100%;
	height: 48px;
}
.car-content{
	display: flex;
	background: #141d27;
	font-size: 0;
}
.car-content-left{
	flex: 1;
}
.logo-wrapper{
	display: inline-block;
	position: relative;
	top: -10px;
	margin: 0 10px;
	padding: 6px;
	width: 56px;
	height: 56px;
	box-sizing: border-box;
	vertical-align: top;
	border-radius: 50%;
	background: #141d27;
}
.logo-wrapper .heighlight{
	background: rgb(0,160,220);
	color: rgb(255,255,255);
}
.num{
	position: absolute;
	top: 0;
	right: 0;
	width: 24px;
	height: 16px;
	line-height: 16px;
	text-align: center;
	border-radius: 16px;
	font-size: 9px;
	font-weight: 700;
	color: #FFFFFF;
	background: rgb(240,20,20);
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
}
.logo{
	width: 100%;
	height: 100%;
	border-radius: 50%;
	text-align: center;
	background: #2b343c;
}
.icon-shopping_cart{
	font-size: 12px;
	font-weight: 700;
	line-height: 44px;
	color: #80858a;
	
}
.total-price{
	display: inline-block;
	vertical-align: top;
	margin-top: 12px;
	padding-right: 12px;
	line-height: 24px;
	box-sizing: border-box;
	border-right: 1px solid rgba(255,255,255,0.1);
	font-size: 12px;
	font-weight: 700;
	color: rgba(255,255,255,0.4);
}
.heighlight1{
	color: rgb(255,255,255);
}
.deliver-price{
	display: inline-block;
	vertical-align: top;
	margin: 12px 0 0 12px;
	line-height: 24px;
	font-size: 12px;
	font-weight: 200;
	color: rgba(255,255,255,0.4);
}
.car-content-right{
	flex: 0 0 105px;
	width: 105px;
}
.minPay{
	height: 48px;
	line-height: 48px;
	text-align: center;
	font-size: 12px;
	color: rgba(255,255,255,0.4);
	font-weight: 700;
}
.car-content-right .no-enough{
	background: #2b333b;
}
.car-content-right .enough{
	background: #00b43c;
	color: #fff;
}
.shopcar-list{
	position: absolute;
	bottom: 48px;
	left: 0;
	z-index: -1;
	width: 100%;
}
.list-header{
	height: 40px;
	line-height: 40px;
	padding: 0 18px;
	background: #F3F5F7;
	border-bottom: 2px solid rgba(7,17,27,0.2);
}
.shoptitle{
	float: left;
	font-size: 14px;
	color: rgb(7,17,27);
}
.empty{
	float: right;
	font-size: 12px;
	color: rgb(0,160,220);
}
.list-content{
	padding: 0 18px;
	max-height: 217px;
	overflow: hidden;
	background: #FFFFFF;
}
.food{
	position: relative;
	padding: 12px 0;
	box-sizing: border-box;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
.foodName{
	line-height: 24px;
	font-size: 14px;
	color: rgb(7.17.27);
}
.foodPrice{
	position: absolute;
	right: 90px;
	bottom: 12px;
	line-height: 24px;
	font-size: 14px;
	font-weight: 700;
	color: rgb(240,20,20);
}
.carcontrol-wrapper{
	position: absolute;
	right: 0;
	bottom: 6px;
	
}
.list-mask{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 40;
	background: rgba(7,17,27,0.6);
	filter: blur(5px);
}
</style>
