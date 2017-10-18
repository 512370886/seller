<template>
  <div id="app">
  	<myHeader :seller='seller'></myHeader>
    <div class="tab border-top">
      <div class="tab-item">
      	<router-link to='/goods'>商品</router-link>
      </div>
      <div class="tab-item">
      	<router-link to='/ratings'>评论</router-link>
      </div>
      <div class="tab-item">
      	<router-link to='/seller'>商家</router-link>
      </div>
    </div>
    <keep-alive><router-view :seller="seller"></router-view></keep-alive>
  </div>
 
</template>

<script>
import header from './components/header/header.vue'
import {urlParse} from './common/js/utils.js'
const ERR_OK = 0
export default {
  name: 'app',
  data () {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse()
          console.log(queryParam)
          return queryParam.id
        })()
      }
    }
  },
  components: {
    'myHeader': header
  },
  created () {
    this.$http.get('/api/seller?id=' + this.seller.id, {emulateJSON: true}).then((res) => {
      res = res.body
      console.log(res)
      if (res.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, res.data)
        console.log(this.seller.id)
      }
    })
  }
}
</script>

<style>
	#app .tab{
		display: flex;
		width: 100%;
		height: 40px;
		line-height: 40px;
		/*border-bottom: 1px solid rgba(7,17,27,0.1);*/
	}
	.border-top{
		position: relative;
		border-top: none;
	}
	.border-top:after{
		content: '';
		position: absolute;
		left:0;
		bottom: 0;
		width: 100%;
		border-top: 1px solid rgba(7,17,27,0.1);
		-webkit-transform-origin: 0 0;
		-ms-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scaleY(0.5);
		-ms-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}
	.tab-item{
		flex: 1;
		text-align: center;
		font-size: 14px;
		color:rgb(77,85,93)
	}
	.tab-item .current{
		color: red;
	}
	
</style>

