<template>
  <div class="top">
    <div class="firstBox">
      <div class="firstBox_logo">
        <i class="iconfont">&#xe650;</i>
      </div>
      <div class="ic_user">
        <i class="iconfont">&#xe658;</i>
      </div>
    </div>
    <div class="secondBox">
      <div>
        <span
          v-for="(item, index) in title"
          @click="skip(item.path)"
          :key="index"
          :class="{color:$route.path==GetPath(item.path)}"
        >{{item.tit}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: [
        { tit: "推荐", path: "/" },
        { tit: "歌手", path: "singer" },
        { tit: "排行", path: "rank" },
        { tit: "搜索", path: "search" }
      ]
    };
  },
  methods: {
    skip(path) {
      this.$router.push(path);
      console.log(this.$route.path);
    },
    GetPath(val) {
      if (val == "/") {
        return "/";
      } else {
        return "/" + val;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.top {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .firstBox {
    width: 100%;
    position: relative;
    .firstBox_logo {
      margin-top: 0.5rem;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      i {
        padding: 0.5rem 0.7rem 0.5rem 0.7rem;
        font-size: 2rem;
        font-weight: bold;
      }
    }
    .ic_user {
      float: left;
      margin-top: 0.7rem;
      margin-left: 0.7rem;
      i {
        font-size: 1.5rem;
        font-weight: 600;
      }
    }
  }
  .secondBox {
    margin-top: 0.8vh;
    margin-bottom: 0.8vh;
    width: 100%;
    div {
      display: flex;
      justify-content: space-around;
    }
  }
}
.color {
  color: #ffffff;
  position: relative;
  &:after {
    content: "";
    display: block;
    position: absolute;
    bottom: -50%;
    width: 100%;
    height: 0.1rem;
    background: #cccccc;
    border-radius: 0.1rem;
  }
}
</style>
