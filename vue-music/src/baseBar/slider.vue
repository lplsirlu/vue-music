<template>
  <swiper :options="swiperOption" v-if="imgData.length>0">
    <swiper-slide v-for="(item, index) in imgData" :key="index">
        <div class="swiper-slide">
          <a :href="item.linkUrl">
            <img :src="item.picUrl" class="img">
          </a>
        </div>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  export default {
    props: {
      imgData: Array
    },
    data(){
      return{
        swiperOption: {
          pagination: {
            el: '.swiper-pagination' // 绑定分页的class
          },
          loop: true, // 就是无缝滚动
          autoplay: { // 播放
            delay: 2000,
            disableOnInteraction: false,
            // 如果设置为false，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay。
            // 操作包括触碰，拖动，点击pagination等。
          },
        }
      }
    },
    mounted() {

    }
  }
</script>

<style lang="less" scoped>
  .img{
    width: 100%;
  }
  .loading{
    width: 100%;
    min-height: 10vh;
    position: relative;
    img{
      position: absolute;
      width: 2.5rem;height:2.5rem;
      top: 50%;left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }
</style>
