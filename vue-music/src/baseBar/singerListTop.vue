<template>
  <div class="music_list">
    <div class="back" @click="quit">
      <i class="iconfont icon-fanhui">&#xe612;</i>
    </div>
    <span class="clickPlay"><i class="iconfont">&#xe737;</i>点击随机播放</span>
    <h1 class="title" v-text="title"></h1>
    <div class="bj_image" :style="bjStyle">
      <div class="filter"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SingerListTop',
  props: {
    bgImage: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  computed: {
    bjStyle() {
      return `background-image:url(${this.bgImage}?max_age=2592000)`;
    }
  },
  created() {
    // console.log(this.title, this.songs, this.bgImage);
  },
  mounted() {},
  methods: {
    quit() {
      this.$router.push("/singer");
    }
  }
};
</script>
<style lang="less" scoped>
.music_list {
  z-index: 50;
  height: 100%;
  width: 100%;
  .clickPlay{
    position: absolute;
    transition: all 0.2s;
    bottom: 5vh;
    display: block;
    color:#ffffff;
    z-index: 1;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5rem;
    border-radius: 1rem;
    background: #DAB031;
    i{
      padding: 0 0.2rem;
    }
  }
  .back {
    position: absolute;
    width: 3rem;
    height: 3rem;
    display: flex;
    z-index: 50;
    top: 0;
    left: 0;
    .icon-fanhui {
      justify-items: center;
      align-items: center;
      width: 100%;
      height: 100%;
      line-height: 3rem;
      color: #dab031;
      text-align: center;
      font-size: 1.5rem;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 50;
    color: #ffffff;
    transform: translateX(-50%);
    padding-top: 1rem;
    font-size: 18px;
    width: 50%;
    text-align: center;
    padding-bottom: 0.5rem;
  }
  .bj_image {
    width: 100%;
    position: relative;
    height: 0;
    padding-top: 40vh;
    background-size: cover;
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
}
</style>


