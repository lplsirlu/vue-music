<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    props: {
          // 1滚动的时候会派发scroll事件,会截留
          // 2 不会截留 3 除了实时派发scroll事件,在swipe的情况下仍然能派发scroll事件
          probeType: { type: Number, default: 1},
          // 点击列表是否派发click事件
          click: {type: Boolean,default: false},
          // 是否开启横向滚动
          scrollX: { type: Boolean, default: false},
          //是否派发滚动事件
          listenScroll: {type: Boolean,default: false},
          // 列表数据
          data: {type: Array, default: null},
          // 是否派发滚动到底部的事件,用于上拉加载
          pullup: {type: Boolean, default: false},
          // 是否派发顶部事件,下拉加载
          pulldown:{type: Boolean, default: false},
          // 是否派发列表滚动开始的事件
          beforeScroll: {type: Boolean,default: false},
          // 当数据更新后,刷新scroll的延时
          refreshDelay: {type: Number,default: 20}
        },
        mounted(){
          // 保证在DOM渲染完后初始化better-scroll
          setTimeout(() => {
            this._initScroll()
          },20)
        },
        methods: {
          _initScroll(){
            if(!this.$refs.wrapper){
              return
            }
            // better-scroll的初始化
            this.scroll = new BScroll(this.$refs.wrapper, {
              probeType: this.probeType,
              click: this.click,
              scrollX: this.scrollX
            })
            // 是否派发滚动事件
            if(this.listenScroll){
              this.scroll.on('scroll', (pos) => {
                this.$emit('scroll', pos)
              })
            }
            // 是否加载上拉
            if(this.pullup){
              this.scroll.on('scrollEnd', () => {
                // 滚动到底部
                if(this.scroll.y <= (this.scroll.maxScrollY+50)){
                  this.$emit('pullup')
                }
              })
            }
            // 下拉
            if(this.pulldown){
              this.scroll.on('touchend', (pos) => {
                // 下拉动作
                if(pos.y>50){
                  this.$emit('pulldowm')
                }
              })
            }
            // 是否派发列表滚动开始事件
            if(this.beforeScroll){
              this.scroll.on('beforeScrollStart',() => {
                this.$emit('beforeScroll')
              })
            }
          },
          disable(){
            // 代理better-scroll的disable方法
            this.scroll && this.scroll.disable()
          },
          enable(){
            this.scroll && this.scroll.enable()
          },
          refresh(){
            this.scroll && this.scroll.refresh()
          },
          scrollTo(){
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
          },
          scrollToElement(){
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
          }
        },
        watch: {
          // 监听数据的变化,延时refreshDelay时间后调用refresh方法重新计算,保证滚动效果正常
          data(){
            setTimeout(() => {
              this.refresh()
            }, this.refreshDelay)
          }
        }
  }
</script>

<style lang="less" scoped>

</style>
