<template>
  <!--推荐-->
  <div class="recommend">
    <div class="Rtop">
      <Top></Top>
    </div>
    <is-scroll class="wrapper" :data="data" :listenScroll="listenScroll" :pullup="pullup"
               :pulldown="pulldown" @pulldown="loadData">
      <div class="content">
        <div class="img_content">
          <div class="img">
            <slider :imgData="imgList"></slider>
          </div>
        </div>
        <div class="bot">
          <p class="bot_h">为你推荐</p>
          <div class="bot_list" v-for="(item, index) in hotRecommon.v_hot" :key="index">
            <img v-lazy="item.cover">
            <div class="list_tit">
              <p v-text="recommonListenNum(item.listen_num)"></p>
              <h3 v-text='item.title'></h3>
            </div>
          </div>
        </div>
        <loading v-show="hotRecommon.length<=0"></loading>
      </div>
      
    </is-scroll>
  </div>
</template>

<script>
  import Top from '@/baseBar/topBar'
  import Slider from '@/baseBar/slider'
  import {GetImg} from "@/api/api"
  import {urlImg, urlRecommon} from "@/api/config"
  import isScroll from '@/baseBar/miniScroll'
  import Loading from '@/baseBar/loading'

  export default {
    data() {
      return {
        data: [],
        pulldown: true,
        listenScroll: true,
        imgList: [],
        hotRecommon: [],
        pullup: true,
      }
    },
    components: {
      Top, Slider, isScroll, Loading
    },
    created() {
      this.loadData()
      this.$axios.get(`/api${urlImg}`).then(pos => {
        this.imgList = pos.data.data.slider
        console.log(this.imgList)
      }).catch(err => {
        console.log(err)
      })

      this.$axios.get(`/u${urlRecommon}`).then(pos => {
        setTimeout(() => {
          this.hotRecommon = pos.data.recomPlaylist.data
        },500)
        console.log(pos)
      }).catch(err => {
        console.log(err)
      })
    },
    mounted() {

    },
    methods: {
      recommonListenNum(val) {
        if (val / 10000 >= 1) {
          return `播放量: ${ (val / 10000).toFixed(1) }万`
        } else {
          return `播放量: ${val}`
        }
      },
      loadData() {

      }
    }
  }
</script>

<style lang="less" scoped>
  .Rtop {
    width: 100%;
    height: 12vh;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    background: saddlebrown;
  }

  .img_content {
    margin-top: 12vh;
    width: 100%;
  }

  .bot {
    .bot_h {
      font-weight: 600;
      margin: 0.5rem 0;
      text-align: center;
      color: #df5000;
    }
    .bot_list {
      width: 100%;
      display: flex;
      justify-content: left;
      box-sizing: border-box;
      padding: 0.8rem 1.2rem;
      img {
        width: 20vw;
        height: 20vw;
      }
      .list_tit {
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: space-around;
        padding-left: 1.2rem;
        color: #8B4513;
      }
    }
  }
  .wrapper {
    box-sizing: border-box;
    height: 85vh;
  }
</style>
