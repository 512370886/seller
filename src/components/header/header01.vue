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
	    	<i class="icon-keyboard_arrow_right"></i>
	    </div>
	  </div>
	  <div class="bulletin-wrapper" @click="showDetail">
	  	<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
	  	<i class="icon-keyboard_arrow_right"></i>
	  </div>
	  <div class="background">
	  	<img :src="seller.avatar" width="100%" height="100%"/>
	  </div>
	  <div v-show='detailShow' class="detail">
	  	<div class="detail-wrapper clearfix">
	  		<div class="detail-main"></div>
	  	</div>
	  	<div class="detail-close">
	  		<i class="icon-close">X</i>
	  	</div>
	  </div>
	</div>
</template>

<script>
	const ERR_OK = 0
export default {
  data () {
    return {
      seller: {},
      detailShow: false,
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  mounted () {
    this.$http.get('/api/seller', {emulateJSON: true}).then((res) => {
      res = res.body
      console.log(res)
      if (res.errno === ERR_OK) {
        this.seller = res.data
        console.log(this.seller)
      }
    })
  },
  methods: {
    showDetail () {
      this.detailShow = true
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import url("../../common/stylus/mixin.styl");
@import url("../../common/stylus/icon.styl");

</style>
