<template>
  <transition name="slider">
    <div class="singer_list">
      <div class="singer_list_top">
        <singer-list-top :title="title" :bg-image="bjImage" ref="bjImage"></singer-list-top>
      </div>
      <!-- 背景层 -->
      <div class="bg_layer" ref="bg_layer"></div>
      <div class="singer_list_bot" ref="singer_list_bot">
        <singer-list-content :songs="songs" @onShort="onShort" @select="selectItem"></singer-list-content>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapState } from "vuex";
import { singerList } from "@/api/config";
import { createSong } from "@/common/song";
import SingerListTop from "@/baseBar/singerListTop";
import SingerListContent from "@/baseBar/singerListContent";
import { mapActions } from "vuex";
export default {
  name: "singer_list",
  components: {
    SingerListTop,
    SingerListContent
  },
  data() {
    return {
      songerList: [] // 详情歌曲list
    };
  },
  computed: {
    title() {
      return this.singer.Fsinger_name;
    },
    bjImage() {
      return this.singer.meImg;
    },
    songs() {
      return this.songerList;
    },
    // State , 这里的singer就State中的singer
    ...mapState(["singer"])
  },
  created() {
    console.log(this.songerList);
    this.getSingerListInfo();
  },
  methods: {
    selectItem(item, index) {
      console.log(item, index)
      this.queryPlay({
        list: this.songs,
        index: index
      })
    },
    ...mapActions(["queryPlay"]), // 调用action里面的函数
    onShort(y) {
      this.$refs.singer_list_bot.style.transfrom = `translate3d(0,${y}px,0)`;
      this.$refs.bg_layer.style.height = `${-y}px`;
      let zIndex = 0;
      let scale = 1;
      let imgDom = this.$refs.bjImage.$el.getElementsByClassName("bj_image")[0];
      let playBtn = this.$refs.bjImage.$el.getElementsByClassName(
        "clickPlay"
      )[0];
      if (-y >= 230) {
        zIndex = 40;
        imgDom.style.paddingTop = `0%`;
        imgDom.style.height = "45px";
        imgDom.style.zIndex = zIndex;
      } else if (-y >= 0 && -y <= 230) {
        imgDom.style.paddingTop = `70%`;
        imgDom.style.height = "0px";
        if (-y >= 45 && -y <= 75) {
          playBtn.style.zIndex = 0;
          playBtn.style.opacity = 0;
        } else if (y > -45) {
          playBtn.style.zIndex = 1;
          playBtn.style.opacity = 1;
        }
      }
      const percent = Math.abs(y / imgDom.offsetHeight);
      if (y > 0) {
        scale = 1 + percent;
        console.log(scale, imgDom.style.transfrom);
        // imgDom.style.transfrom = `scale(${scale})`
        imgDom.style.transfrom = `scale(1.2)`;
        playBtn.style.zIndex = 1;
        playBtn.style.opacity = 1;
      }
      imgDom.style.zIndex = zIndex;
      console.log(y, imgDom.offsetHeight);
    },
    getSingerListInfo() {
      if (!this.singer.Fsinger_mid) {
        this.$router.push({ path: "/singer" });
        return;
      }
      this.$axios
        .get(`/api${singerList(this.singer.Fsinger_mid)}`)
        .then(pos => {
          // console.log(pos); // pos.data.data.list
          this.songerList = this.requireSingerList(pos.data.data.list);
          console.log(this.songerList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    requireSingerList(list) {
      let arr = [];
      if (!list) {
        return;
      }
      list.forEach(item => {
        let { musicData } = item;
        if (musicData.songid && musicData.albummid) {
          arr.push(createSong(musicData));
        }
      });
      return arr;
    }
  }
};
</script>
<style lang="less" scoped>
.slider-enter-active,
.slider-leave-active {
  transition: all 0.5s;
}
.slider-enter,
.slider-leave-to {
  transform: translate3d(100%, 0, 0);
}
.singer_list {
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  background: #ffffff;
  .singer_list_top {
    position: absolute;
    top: 0;
    left: 0;
    height: 40%;
    width: 100%;
  }
  .singer_list_bot {
    position: absolute;
    top: 40vh;
    left: 0;
    width: 100%;
    height: 60%;
  }
  .bg_layer {
    width: 100%;
    // height: 100%;
    position: absolute;
    // top: 40vh;
    bottom: 59vh;
    background: #ffffff;
  }
}
</style>


