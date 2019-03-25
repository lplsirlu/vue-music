<template>
  <!--排行-->
  <div class="rank">
    <div class="rank_top">
      <top></top>
    </div>
    <div class="rank_content">
      <me-scroll class="mescroll" @scroll="scrollme" :listenScroll="listenScroll" :probeType="probeType" >
        <div class="content" @touchmove.prevent="d" >
          <p v-for="(item, index) in 200" :key="index" v-text="item + '水水水水是是是'" ></p>
        </div>
      </me-scroll>
    </div>
    <div class="bot" ref="bot">

    </div>
  </div>
</template>

<script>
  import Top from '@/baseBar/topBar'
  import MeScroll from '@/baseBar/miniScroll'
  export default {
    components: {
      Top, MeScroll
    },
    data(){
      return{
        scrollY: '',
        listenScroll: true,
        probeType: 3
      }
    },
    methods: {
      d(){

      },
      scrollme(pos){
        this.scrollY = pos.y
        this.$refs.bot.style["height"] = `${-pos.y}px`
        this.$refs.bot.style["transfrom"] = 'scale(0.2)'
        console.log(pos.y, this.$refs.bot.style)
      }
    }
  }
</script>

<style lang="less" scoped>
  .rank_top{
    width:100%;
    position: fixed;
    z-index: 2;
    top:0;
    left:0;
    background: saddlebrown;
  }
  .rank_content{
    margin-top: 12vh;
  }
  .mescroll{
    width: 100%;
    background: #acbdef;
    height: 88vh;
    .content{
      width: 100%;
      // background: yellow;
    }
  }
  .bot{
    width: 100%;
    height: 10vh;
    background: yellow;
    position: fixed;
    right:0;
    bottom: 0;
  }
</style>
