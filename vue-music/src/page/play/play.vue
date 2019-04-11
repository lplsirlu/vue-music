<template>
  <div class="player" v-show="playlist.length>0&&up" ref="a">
    <transition name="mormal">
      <div class="mormal_player" v-show="fullScreen">
        <div class="bj">
          <img :src="currentSong.image" width="100%" height="100%">
        </div>
        <div class="top">
          <div class="top_icDiv">
            <i class="iconfont" @click="up">&#xe612;</i>
          </div>
          <div class="text">
            <h1>{{currentSong.name}}</h1>
            <p>{{currentSong.singer}}</p>
          </div>
        </div>
        <div class="mid">
          <div class="cd">
            <div class="cd_image" :class="rotateImg">
              <img :src="currentSong.image">
            </div>
            <span>这是歌词这是歌词</span>
          </div>
          <div class="text" v-show="false"></div>
          <div class="time">
            <span class="time_left">{{format(currentTime)}}</span>
            <div class="planTime" @click="progressClick">
              <div class="planTime_plan" ref="planTime_plan">
                <div class="progress" ref="progress"></div>
                <div
                  class="btn_warpper"
                  ref="btn_warpper"
                  @touchstart.prevent="progressTouchStart"
                  @touchmove.prevent="progressTouchMove"
                  @touchend.prevent="progressTouchEnd"
                ></div>
              </div>
            </div>
            <span class="time_right">{{format(currentSong.duration)}}</span>
          </div>
        </div>
        <div class="bottom">
          <div class="options">
            <div class="left">
              <span class="one" :class="bjMode" @click="changeMode"></span>
            </div>
            <div class="left">
              <span @click="prev" class="two"></span>
            </div>
            <div class="center">
              <span @click="toPlaying" :class="playImg"></span>
            </div>
            <div class="right">
              <span @click="next" class="one"></span>
            </div>
            <div class="right">
              <span class="two"></span>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini_player" v-show="!fullScreen" @click="screen">
        <div class="mini_image">
          <img :src="currentSong.image" :class="rotateImg">
        </div>
        <div class="mini_text">
          <h1>{{currentSong.name}}</h1>
          <p>{{currentSong.singer}}</p>
        </div>
        <div class="mini_play">
          <span :class="miniPlayIcon" @click.stop="miniPlay">
            <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <circle
                data-v-5a1ec93d
                r="50"
                cx="50"
                cy="50"
                fill="transparent"
                stroke-dasharray="314.1592653589793"
                stroke-dashoffset="251.8734996301937"
                class="progress_bar"
              ></circle>
            </svg>
          </span>
        </div>
        <div class="mini_list">
          <i class="iconfont">&#xe640;</i>
        </div>
      </div>
    </transition>
    <audio
      ref="audio"
      :src="currentSong.url"
      @canplay="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
    ></audio>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { playMode } from "@/common/config";
import { shuffle } from "@/common/util";
export default {
  data() {
    return {
      songReady: "",
      currentTime: 0
    };
  },
  created() {
    this.touch = {};
  },
  computed: {
    bjMode() {
      return this.mode === playMode.sequence
        ? "bj_sequence"
        : this.mode === playMode.loop
        ? "bj_loop"
        : "bj_random";
    },
    playImg() {
      return this.playing ? "center_true" : "center_false";
    },
    miniPlayIcon() {
      return this.playing ? "mini_play_true" : "mini_play_false";
    },
    rotateImg() {
      return this.playing ? "play" : "play pause";
    },
    ...mapState([
      "fullScreen",
      "playlist",
      "playing",
      "currentIndex",
      "mode",
      "sequenceList"
    ]),
    ...mapGetters(["currentSong"])
  },
  mounted() {},
  methods: {
    up() {
      this.setFullScreen(false);
    },
    ...mapMutations({
      setFullScreen: "GET_FULLSCREEN",
      setPlayingState: "GET_PLAYING",
      setCurrentIndex: "GET_CURRENTINDEX",
      setMode: "GET_MODE",
      setPlayList: "GET_PLAYLIST"
    }),
    screen() {
      this.setFullScreen(true);
    },
    toPlaying() {
      this.setPlayingState(!this.playing);
    },
    miniPlay() {
      this.setPlayingState(!this.playing);
    },
    // 上下一曲
    next() {
      if (!this.songReady) {
        return;
      }
      let index = this.currentIndex + 1;
      if (index === this.playlist.length) {
        index = 0;
      }
      this.setCurrentIndex(index);
      if (!this.playing) {
        this.toPlaying();
      }
      this.songReady = false;
    },
    prev() {
      if (!this.songReady) {
        return;
      }
      let index = this.currentIndex - 1;
      if (index === -1) {
        index = this.playlist.length - 1;
      }
      this.setCurrentIndex(index);
      if (!this.playing) {
        this.toPlaying();
      }
      this.songReady = false;
    },
    ready() {
      this.songReady = true;
    },
    error() {
      // error表示网络原因等 , 那么就会干扰操作
      this.songReady = true;
    },
    // 自动播放下一曲
    end() {
      if (this.mode === playMode.loop) {
        this.loop();
      } else {
        this.next();
      }
    },
    loop(){
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play()
    },
    // 时间
    updateTime(e) {
      this.currentTime = e.target.currentTime;
    },
    // 时间条
    format(val) {
      val = val | 0;
      const minute = this._pad((val / 60) | 0); // 取分
      const second = this._pad(val % 60);
      return `${minute}:${second}`;
    },
    _pad(num, n = 2) {
      let len = num.toString().length;
      for (len; len < n; len++) {
        num = "0" + num;
      }
      return num;
    },
    progressTouchStart(e) {
      this.touch.initiated = true; // 表示初始化
      this.touch.startX = e.touches[0].pageX; // 获取事件x
      this.touch.left = this.$refs.progress.clientWidth;
    },
    progressTouchMove(e) {
      if (!this.touch.initiated) {
        return;
      }
      const deltaX = e.touches[0].pageX - this.touch.startX;
      // 算出拖动的长度
      const setoffwidth = Math.min(
        Math.max(this.touch.left + deltaX, 0),
        this.$refs.planTime_plan.clientWidth
      );
      // 算出拖动的时间
      const setoffwidthCurrentTime =
        this.currentSong.duration *
        (setoffwidth / this.$refs.planTime_plan.clientWidth);
      this.$refs.progress.style.width = `${setoffwidth}px`;
      this.$refs.btn_warpper.style.transform = `translate3d(${setoffwidth}px,0,0)`;
      this.$refs.audio.currentTime = setoffwidthCurrentTime;
      console.log(this.touch.startX, this.touch.left, e.touches[0].pageX);
    },
    progressTouchEnd(e) {
      this.touch.initiated = false;
    },
    // 点击进度条
    progressClick(e) {
      // 这里e要用offsetX , 查百度
      const setoffwidthCurrentTime =
        this.currentSong.duration *
        (e.offsetX / this.$refs.planTime_plan.clientWidth);
      this.$refs.audio.currentTime = setoffwidthCurrentTime;
      this.$refs.progress.style.width = `${e.offsetX}px`;
      this.$refs.btn_warpper.style.transform = `translate3d(${
        e.offsetX
      }px,0,0)`;
    },
    // 点击随机播放按钮
    changeMode() {
      const mode = (this.mode + 1) % 2;
      this.setMode(mode);
      let list = null;
      let arr = this.sequenceList
      if (mode === playMode.random) {
        list = shuffle(arr);
      } else {
        list = arr;
      }
      this.resetCurrentIndex(list);
      this.setPlayList(list);
    },
    // 点击随机播放重置歌曲的index
    resetCurrentIndex(lis) {
      let index = lis.findIndex(item => {
        return item.id === this.currentSong.id;
      });
      console.log(index)
      this.setCurrentIndex(index);
    }
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (newSong.id === oldSong.id) {
        return;
      }
      this.$nextTick(() => {
        this.$refs.audio.play();
      });
    },
    playing(newPlaying) {
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause();
      });
    },
    currentTime(newCurrentTime) {
      if (newCurrentTime >= 0 && !this.touch.initiated) {
        let planLeng = this.$refs.planTime_plan.clientWidth;
        let z = (planLeng * newCurrentTime) / this.currentSong.duration;
        // 这里的z是通过播放时间/duration * 总长度的 , 所以上面的拖动也是要先算播放的时间
        this.$refs.progress.style.width = `${z}px`;
        this.$refs.btn_warpper.style.transform = `translate3d(${z}px,0,0)`;
        // z/planLeng = new / this
      }
    }
  }
};
</script>
<style lang="less" scoped>
.player {
  position: relative;
  z-index: 9999;
  .mormal_player {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: #222;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .bj {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.6;
      z-index: -1;
      filter: blur(20px);
    }
    .top {
      position: relative;
      .top_icDiv {
        position: absolute;
        top: 0;
        left: 0;
        width: 3rem;
        height: 3rem;
        display: flex;
        i {
          justify-items: center;
          align-items: center;
          width: 100%;
          height: 100%;
          line-height: 3rem;
          color: #dab031;
          text-align: center;
          font-size: 1.5rem;
          transform: rotate(-90deg);
        }
      }
      .text {
        position: absolute;
        top: 0;
        left: 50%;
        color: #ffffff;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        padding-top: 1rem;
        font-size: 18px;
        width: 50%;
        text-align: center;
        h1,
        p {
          padding: 0.4rem 0;
        }
      }
    }
    .mid {
      position: fixed;
      top: 14vh;
      bottom: 15vh;
      // background: #dab031;
      width: 100%;
      .time {
        position: fixed;
        left: 50%;
        transform: translate(-50%);
        bottom: 5vh;
        // background: #dab031;
        width: 88%;
        display: flex;
        justify-content: space-between;
        .time_left {
          color: #ffffff;
          font-size: 12px;
          padding-right: 0.5rem;
          line-height: 20px;
        }
        .time_right {
          color: #ffffff;
          font-size: 12px;
          padding-left: 0.5rem;
          line-height: 20px;
        }
        .planTime {
          width: 80%;
          // background: #dab031;
          .planTime_plan {
            position: relative;
            height: 4px;
            background: rgba(0, 0, 0, 0.3);
            top: 8px;
            .progress {
              position: absolute;
              height: 100%;
              // width: 50px;
              background: #dab031;
            }
            .btn_warpper {
              // display: none;
              position: absolute;
              width: 16px;
              height: 16px;
              background: #dab031;
              border-radius: 50%;
              border: 4px solid #ffff;
              box-sizing: border-box;
              top: -6px;
              left: -5px;
            }
          }
        }
      }
      .cd {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        .cd_image {
          border-radius: 50%;
          &.play {
            animation: rotate 20s linear infinite;
          }
          &.pause {
            animation-play-state: paused;
          }
          img {
            border-radius: 50%;
            border: 10px solid hsla(0, 0%, 100%, 0.1);
          }
        }
        span {
          padding: 2rem 0;
          color: hsla(0, 0%, 100%, 0.5);
          font-size: 0.84rem;
        }
      }
    }
    .bottom {
      position: fixed;
      bottom: 10vh;
      // background: #dab031;
      width: 100%;
      .options {
        display: flex;
        justify-content: space-around;
        align-items: center;
        span {
          width: 1.6rem;
          height: 1.4rem;
          display: block;
          background: url("https://y.gtimg.cn/mediastyle/yqq/img/player.png?max_age=2592000&v=f051617d8e8291de481d89af94f0cdbd")
            no-repeat;
        }
        .left {
          .one {
            background-position: 0 -260px;
          }
          .bj_sequence {
            background-position: 0 -260px;
          }
          .bj_loop {
            background-position: 0 -232px;
          }
          .bj_random {
            background-position: 0 -74px;
          }
          .two {
            background-position: 0 -30px;
          }
        }
        .center {
          span {
            width: 1.7rem;
            height: 1.8rem;
            background-position: 0 0;
          }
          .center_true {
            background-position: -30px 0;
          }
          .center_false {
            background-position: 0 0;
          }
        }
        .right {
          .one {
            background-position: 0 -52px;
          }
          .two {
            background-position: 0 -96px;
          }
        }
      }
    }
    &.mormal-enter-active,
    &.mormal-leave-active {
      transition: all 0.4s;
      .top,
      .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }
    &.mormal-enter,
    &.mormal-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }
  .mini_player {
    width: 100%;
    height: 10vh;
    position: fixed;
    bottom: -1px;
    left: 0;
    background: #dab031;
    display: flex;
    align-items: center;
    .mini_image {
      // background: #acbdfe;
      // flex: 1;
      width: 12vw;
      height: 12vw;
      padding-left: 1.5rem;
      // border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        &.play {
          animation: rotate 20s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
    }
    .mini_text {
      padding: 0 0.5rem;
      flex: 4;
      h1,
      p {
        padding: 0.3rem 0;
      }
      h1 {
        color: #ffffff;
      }
      p {
        color: hsla(0, 0%, 100%, 0.6);
      }
    }
    .mini_play {
      flex: 1;
      span {
        width: 1.5rem;
        height: 1.8rem;
        display: block;
        background: url("https://y.gtimg.cn/mediastyle/yqq/img/player.png?max_age=2592000&v=f051617d8e8291de481d89af94f0cdbd")
          no-repeat;
        background-position: 0 0;
        position: relative;
        &::after {
          position: absolute;
          content: "";
          display: block;
          width: 2.5rem;
          height: 2.5rem;
          top: 0;
          left: 0;
        }
        circle {
          stroke-width: 8px;
          transform-origin: center;
          &.progress_bar {
            transform: scale(0.9) rotate(-90deg);
            stroke: #ffcd32;
          }
        }
      }
      .mini_play_true {
        background-position: -30px 0;
      }
      .mini_play_false {
        background-position: 0 0;
      }
    }
    .mini_list {
      flex: 1;
      i {
        color: #ffffff;
        font-size: 1.4rem;
        display: block;
      }
    }
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>


