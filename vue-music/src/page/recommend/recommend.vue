<template>
  <!--推荐-->
  <div class="recommend">
    <div class="Rtop">
      <Top></Top>
    </div>
    <is-scroll
      class="wrapper"
      :data="data"
      :listenScroll="listenScroll"
      :pullup="pullup"
      :pulldown="pulldown"
      @pulldown="loadData"
      ref="wrapper"
      :class="{isPlay:playing,noPlay:playing }"
    >
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
              <h3 v-text="item.title"></h3>
            </div>
          </div>
        </div>
        <loading v-show="hotRecommon.length<=0" class="meLoading"></loading>
      </div>
    </is-scroll>
  </div>
</template>

<script>
import Top from "@/baseBar/topBar";
import Slider from "@/baseBar/slider";
import { server } from "@/api/api";
import { urlImg, urlRecommon, remI } from "@/api/config";
import isScroll from "@/baseBar/miniScroll";
import Loading from "@/baseBar/loading";
import { mapState } from "vuex";

export default {
  data() {
    return {
      data: [],
      pulldown: true,
      listenScroll: true,
      imgList: [],
      hotRecommon: [],
      pullup: true
    };
  },
  components: {
    Top,
    Slider,
    isScroll,
    Loading
  },
  created() {
    this.loadData();
    let api = process.env.NODE_ENV === "development" ? "/api" : "";
    if (process.env.NODE_ENV === "development") {
      this.$axios
      .get(`${api}${urlImg}`)
      .then(pos => {
        this.imgList = pos.data.data.slider;
        console.log(this.imgList);
      })
      .catch(err => {
        console.log(err);
      });

      this.$axios
      .get(`/u${urlRecommon}`)
      .then(pos => {
        setTimeout(() => {
          this.hotRecommon = pos.data.recomPlaylist.data;
        }, 500);
        console.log(pos);
      })
      .catch(err => {
        console.log(err);
      });

      this.$axios.get(`/api/${remI}`).then(pos => {
        console.log(pos)
      }).catch(err => {
        console.log(err)
      })
      // 开发环境
    } else if (process.env.NODE_ENV === "production") {
      server.get(`${urlImg}`).then(pos => {
        this.imgList = pos.data.data.slider;
        console.log(this.imgList);
      })
      .catch(err => {
        console.log(err);
      });

      server.get(`${urlRecommon}`).then(pos => {
        this.imgList = pos.data.data.slider;
        console.log(this.imgList);
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
  mounted() {},
  computed: {},
  methods: {
    recommonListenNum(val) {
      if (val / 10000 >= 1) {
        return `播放量: ${(val / 10000).toFixed(1)}万`;
      } else {
        return `播放量: ${val}`;
      }
    },
    loadData() {},
    ...mapState(["playing"])
  }
};
</script>

<style lang="less" scoped>
.Rtop {
  width: 100%;
  height: 10.5vh;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  background: #dab031;
}
.meLoading {
  margin-top: 44%;
}
.img_content {
  margin-top: 10.5vh;
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
      color: #8b4513;
    }
  }
}
.wrapper {
  box-sizing: border-box;
  height: 85vh;
}
.isPlay {
  height: 80vh;
}
.noPlay {
  height: 85vh;
}
</style>
