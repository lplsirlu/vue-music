<template>
  <div class="music_content">
    <is-scroll
      class="wrapper"
      :probeType="probeType"
      :click="click"
      :listenScroll="listenScroll"
      @scroll="singerScroll"
      v-if="songs.length>0"
    >
      <div class="content">
        <!--  @touchmove.prevent="onShort" -->
        <ul>
          <li v-for="(item,index) in songs" :key="index" @click="selectItem(songs, index)">
            <div class="ic">
              <span></span>
            </div>
            <div class="text">
              <p v-text="item.name"></p>
              <span v-text="item.singer+'·'+item.album"></span>
            </div>
          </li>
        </ul>
      </div>
    </is-scroll>
    <loading v-else class="load"></loading>
  </div>
</template>
<script>
import isScroll from "@/baseBar/miniScroll";
import loading from "@/baseBar/loading";
export default {
  name: "SingerListContent",
  props: {
    songs: {
      type: Array,
      default: []
    }
  },
  created() {
    this.probeType = 3;
    this.click = true;
    this.listenScroll = true;
  },
  data() {
    return {
      scrollY: ""
    };
  },
  mounted() {
    console.log(this.songs);
  },
  methods: {
    // 通过scroll的@scroll监听滚动事件 , pos是它自带的x和y的偏移量
    singerScroll(pos) {
      // console.log(pos.y)
      this.scrollY = pos.y;
    },
    selectItem(item, index) {
      console.log(item, index)
      this.$emit("select", item, index);
    }
  },
  watch: {
    scrollY(newY) {
      this.$emit("onShort", this.scrollY);
    }
  },
  components: {
    isScroll,
    loading
  }
};
</script>
<style lang="less" scoped>
.music_content {
  width: 100%;
  height: 100%;
  .wrapper {
    width: 100%;
    height: 100%;
    .content {
      padding: 20px 30px;
      ul {
        li {
          display: flex;
          align-items: center;
          justify-items: center;
          padding: 0.6rem 0;
          .ic {
            width: 2vh;
            height: 2vh;
            background: yellow;
            margin-right: 2rem;
            display: none;
          }
          .text {
            flex: 1;
            overflow: hidden;
            p {
              padding: 0.5rem 0;
              color: #dab031;
            }
            span {
              padding: 0.5rem 0;
              display: block;
              color: #37474f;
              max-width: 100%;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
  .load {
    height: 100%;
  }
}
</style>


