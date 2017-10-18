<template>
  <div class="ratingSelect">
    <div class="rating-type">
      <span @click="select(2,$event)" class="block positive" :class="{'active2':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{'active0':selectType===0}">{{desc.positive}}<span class="count">{{positive.length}}</span></span>
      <span @click="select(1,$event)" class="block negative" :class="{'active1':selectType===1}">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
    </div>
    <div @click="toggleContent" class="switch" >
      <span class="icon-check_circle" :class="{'on':onlyContent}">★</span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const ALL = 2
const POSITIVE = 0
const NEGATIVE = 1
export default {
  data () {
    return {
    }
  },
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  computed: {
    positive () {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    negative () {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  },
  methods: {
    select (type, event) {
      if (!event._constructed) {
        return
      }
      this.selectType = type
      this.$emit('select-type', type)
    },
    toggleContent (event) {
      if (!event._constructed) {
        return
      }
      this.onlyContent = !this.onlyContent
      this.$emit('only-content', this.onlyContent)
    }
  }
}
</script>

<style scoped="scoped">
.rating-type{
	padding: 18px 0;
	margin: 0 18px;
	font-size: 0;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
.block{
	display: inline-block;
	padding: 8px 12px;
	margin-right: 8px;
	font-size: 12px;
	border-radius: 2px;
	color: rgb(77,85,93);
}
.block .count{
	margin-left: 2px;
	font-size: 8px;
	line-height: 16px;
	
}
.positive{
	background: rgba(0,160,220,0.2);
}
.negative{
	background: rgba(77,85,93,0.2);
}
.active0{
	background: rgb(0,160,220);
	color: #FFFFFF;
}
.active1{
	background: rgb(77,85,93);
	color: #FFFFFF;
}
.active2{
	background: rgb(0,160,220);
	color: #FFFFFF;
}
.switch{
	padding: 12px 18px;
	line-height: 24px;
	border-bottom: 1px solid rgba(7,17,27,0.1);
	color: rgb(147,153,159);
	font-size: 0;
}
.icon-check_circle{
	display: inline-block;
	vertical-align: top;
	margin-right: 4px;
	font-size: 24px;
	
}
.text{
	display: inline-block;
	vertical-align: top;
	font-size: 12px;
}
.on{
	color: #00c850;
}
</style>
