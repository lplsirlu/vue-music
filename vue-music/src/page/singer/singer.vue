<template>
  <!--歌手-->
  <div class="singer">
    <div class="singer_top">
      <top></top>
    </div>
    <div class="singer_content">
      <me-scroll class="wrapper" :listenScroll="listenScroll">
        <div class="content" v-for="(item, index) in sortList" :key="index">
          <p class="titP" v-text="item.title"></p>
          <ul class="content_firstUl">
            <li v-for="(lis, index) in item.items" :key="index">
              <img :src="lis.meImg">
              <span v-text="lis.Fsinger_name"></span>
            </li>
          </ul>
        </div>
      </me-scroll>
    </div>
    <ul class="scond_ul">
      <li v-for="(item, index) in sortList" :key="index" v-text="item.title.substr(0,1)"></li>
    </ul>
    <div class="bot"></div>
  </div>
</template>

<script>
import Top from "@/baseBar/topBar";
import { singerUrl } from "@/api/config";
import meScroll from "@/baseBar/miniScroll";
export default {
  data() {
    return {
      singerList: "",
      listenScroll: true,
      bb: 10,
      ttt: "",
      hotList: { title: "热门", items: [] }, // 热门
      sortList: [], // 排序后的list
      map: [], // 提炼a-z的list
      titLength: 0, // 熱門的高度個數
      itemsLength:0, //items的高度个数
    };
  },
  created() {
    this.GetData()
  },
  mounted() {
  },
  components: {
    Top,
    meScroll
  },
  methods: {
    GetData(){
      this.$axios
      .get(`/api${singerUrl}`)
      .then(pos => {
        this.singerList = pos.data.data.list;
        this.singerList.forEach((item, index) => {
          //002J4UUk29y8BY"
          item.meImg = `http://y.gtimg.cn/music/photo_new/T001R150x150M000${
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
        this.titLength = this.sortList.length
        this.sortList.forEach((item, index) => {
          for(let i in item){
            if(i === 'items'){
              console.log(item[i])
            }
          }
        })
      })
      .catch(err => {
        console.log(err);
      });
      
    },
  }
};
</script>
<style lang="less" scoped>
.singer{
  position: relative;
  .scond_ul {
      z-index: 2;
      position: fixed;
      top: 20%;
      right: 0%;
      background: #E95426;
      border-radius: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.2rem .2rem;
      color: #ffffff;
      li{
        padding: 0.1rem 0;
      }
    }
}
.singer_top {
  width: 100%;
  z-index: 2;
  position: fixed;
  height: 12vh;
  top: 0;
  left: 0;
  background: saddlebrown;
}
.singer_content {
  width: 100%;
  margin-top: 12vh;
  .wrapper {
    box-sizing: border-box;
    width: 100%;
    // height: 85vh;
    .content {
      .titP {
        width: 100%;
        box-sizing: border-box;
        background: #8b4513;
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
</style>

