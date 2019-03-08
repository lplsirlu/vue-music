<template>
  <!--搜索-->
  <div class="search">
    <div class="search_top">
      <top></top>
    </div>
    <div class="content">

    </div>
    <div class="bot"></div>
  </div>
</template>

<script>
  import Top from '@/baseBar/topBar'
  export default {
    components: {
      Top
    },
    mounted(){

    }
  }
</script>

<style lang="less" scoped>
  .search_top{
    width:100%;
    position: fixed;
    top:0;
    left:0;
    background: saddlebrown;
  }
</style>
