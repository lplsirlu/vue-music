<template>
  <!--歌手-->
  <div class="singer">
    <div class="singer_top">
      <top></top>
    </div>
    <div class="singer_content" ref="singer_content" v-if="sortList.length>0">
      <me-scroll
        :listenScroll="listenScroll"
        class="wrapper"
        ref="wrapper"
        @scroll="singerScroll"
        :probeType="probeType"
        :click="click"
      >
        <div class="content">
          <div class="second_content" v-for="(item, index) in sortList" :key="index" ref="Group">
            <p class="titP" v-text="item.title" ref="titP"></p>
            <ul class="content_firstUl">
              <li
                v-for="(lis, index) in item.items"
                :key="index"
                ref="ulli"
                @click="skipSingerList(lis)"
              >
                <img v-lazy="lis.meImg">
                <span v-text="lis.Fsinger_name"></span>
              </li>
            </ul>
          </div>
        </div>
        <div class="pushPiece" v-show="pushPieceTitle()" ref="pushPiece">
          <p v-text="pushPieceTitle()"></p>
        </div>
      </me-scroll>
    </div>
    <loading v-else class="load"></loading>
    <ul
      class="scond_ul"
      @touchstart="onShort"
      @touchmove.stop.prevent="onTouchMove"
      v-show="sortList.length>0"
    >
      <li
        v-for="(item, index) in sortList"
        :key="index"
        :class="{'color': currentIndex === index}"
        v-text="item.title.substr(0,1)"
        :li-list="index"
      ></li>
    </ul>
    <div class="bot"></div>
    <router-view/>
  </div>
</template>

<script>
import Top from "@/baseBar/topBar";
import { singerUrl } from "@/api/config";
import meScroll from "@/baseBar/miniScroll";
import loading from "@/baseBar/loading";
import {mapMutations} from 'vuex'
export default {
  data() {
    return {
      singerList: "",
      bb: 10,
      ttt: "",
      hotList: { title: "热门", items: [] }, // 热门
      sortList: [], // 排序后的list
      map: [], // 提炼a-z的list
      titLength: 0, // 熱門的高度個數
      itemsLength: 0, //items的高度个数
      ulScrollY: -1, // scroll插件监听的ul滑动距离位置
      currentIndex: 0, // 右边高亮index
      difference: 0, // 最后一根线和scrollY的比较
      click: true
    };
  },
  created() {
    this.arrAreaScroll = []; // 左边每个高度区域
    this.probeType = 3;
    this.touch = {};
    this.listenScroll = true;
    this.GetData();
  },
  mounted() {
    console.log(this.sortList);
  },
  components: {
    Top,
    meScroll,
    loading
  },
  methods: {
    // vue的mutatios映射 , getSinger是方法 , 后面是映射数据就是要传入的数据
    ...mapMutations({
      getSinger: 'GET_SINGER'
    }),
    // 跳转子singer
    skipSingerList(item) {
      this.$router.push({path: `/singer/${item.Fsinger_mid}`})
      this.noScroll()
      this.getSinger(item)
    },
    pushPieceTitle() {
      if (this.ulScrollY >= 0) {
        return false;
      }
      return this.sortList[this.currentIndex]
        ? this.sortList[this.currentIndex].title
        : "";
    },
    onShort(e) {
      // 点击右边
      let el = e.target.getAttribute("li-list");
      if (!el) {
        return;
      }
      this.touch.Y1 = e.touches[0].clientY;
      this.ulScrollY = -this.arrAreaScroll[Number(el)];
      this.touch.index = el;
      console.log(el);
      this.$refs.wrapper.scrollToElement(this.$refs.Group[el], 0); // 这里用scrollToElement可以
    },
    onTouchMove(e) {
      // 滑动右边
      this.touch.Y2 = e.touches[0].clientY;
      let delta = ((this.touch.Y2 - this.touch.Y1) / 19) | 0; // 获取开始到最后的个数差
      // console.log(delta, this.touch.index)
      this.$refs.wrapper.scrollToElement(
        this.$refs.Group[delta + Number(this.touch.index)],
        0
      );
    },
    singerScroll(pos) {
      this.ulScrollY = pos.y;
      // console.log(this.ulScrollY);
    },
    GetData() {
      let api = process.env.NODE_ENV === 'development' ? '/api' : ''
      this.$axios
        .get(`${api}${singerUrl}`)
        .then(pos => {
          this.singerList = pos.data.data.list;
          this.singerList.forEach((item, index) => {
            //002J4UUk29y8BY"
            item.meImg = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${
              item.Fsinger_mid
            }.jpg`;
            if (index < 10) {
              this.hotList.items.push(item);
            }
            // Findex
            if (!this.map[item.Findex]) {
              this.map[item.Findex] = {
                title: item.Findex,
                items: []
              };
            }
            this.map[item.Findex].items.push(item);
          });
          for (let i in this.map) {
            if (this.map[i].title.match(/[a-zA-Z]/)) {
              this.sortList.push(this.map[i]);
            }
          }
          this.sortList.sort((a, b) => {
            return a.title.charCodeAt(0) - b.title.charCodeAt(0);
          });
          this.sortList.unshift(this.hotList);
          // 这里计算scroll的高
          this.titLength = this.sortList.length;
          this.sortList.forEach((item, index) => {
            for (let i in item) {
              if (i === "items") {
                // console.log(item[i])
                this.itemsLength += item[i].length;
              }
            }
          });
          // console.log(this.itemsLength)
        })
        .then(() => {
          console.log("time");
          // let titHeight = this.$refs.titP[0].offsetHeight * this.titLength;
          // let listHeight = this.$refs.ulli[0].offsetHeight * this.itemsLength;
          // 获取滑动的区域
          const list = this.$refs.Group;
          let height = 0;
          this.arrAreaScroll.push(height);
          for (let i = 0; i < list.length; i++) {
            height += list[i].clientHeight;
            this.arrAreaScroll.push(height);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    data(newVal, oldVal) {
      console.log(newVal, oldVal);
    },
    ulScrollY(newY, oldY) {
      const listHeight = this.arrAreaScroll;
      for (let i = 0; i < listHeight.length; i++) {
        let height1 = listHeight[i];
        let height2 = listHeight[i + 1];
        if (!height2 || (-newY < height2 && -newY >= height1)) {
          this.currentIndex = i;
          this.difference = height2 + newY;
          // console.log(this.currentIndex);
          return;
        }
        if (newY >= 0) {
          this.currentIndex = 0;
          return;
        }
      }
      this.currentIndex = 0;
    },
    difference(newY) {
      let positionTop =
        newY > 0 && newY < this.$refs.titP[0].offsetHeight
          ? -(this.$refs.titP[0].offsetHeight - newY)
          : 0;
      this.$refs.pushPiece.style.transform = `translate3d(0,${positionTop}px,0)`;
    }
  }
};
</script>
<style lang="less" scoped>
.load {
  height: 100vh;
  background: #ffffff;
}
.singer {
  position: relative;
  .scond_ul {
    z-index: 2;
    position: fixed;
    top: 20%;
    right: 0%;
    background: #DAB031;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.2rem 0.2rem;
    color: black;
    li {
      padding: 0.1rem 0;
    }
  }
}
.singer_top {
  width: 100%;
  z-index: 5;
  position: fixed;
  height: 10.5vh;
  top: 0;
  left: 0;
  background: #DAB031;
}
.singer_content {
  width: 100%;
  margin-top: 10.5vh;
  .wrapper {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 89.5vh;
    .pushPiece {
      position: absolute;
      top: 0;
      width: 100%;
      p {
        background: #DAB031;
        padding: 0.5rem 0 0.5rem;
        box-sizing: border-box;
        padding-left: 0.5rem;
      }
    }
    .content {
      .titP {
        width: 100%;
        box-sizing: border-box;
        background: #DAB031;
        padding: 0.5rem 0 0.5rem;
        padding-left: 0.5rem;
        border-top: 1px solid #ffffff;
      }
      .content_firstUl {
        width: 100%;
        li {
          width: 100%;
          height: 10vh; // 高10vh
          display: flex;
          justify-content: left;
          align-items: center;
          box-sizing: border-box;
          border-bottom: 1px solid rgba(139, 69, 19, 0.2);
          img {
            width: 12vw;
            height: 12vw;
            border-radius: 50%;
            margin-left: 8vw;
          }
          span {
            padding-left: 4vw;
          }
        }
      }
    }
  }
}
.color {
  color: #ffffff;
}
</style>

