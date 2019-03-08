<template>
  <!--排行-->
  <div class="rank">
    <div class="rank_top">
      <top></top>
    </div>
    <div class="content">

    </div>
    <div class="bot">

    </div>
  </div>
</template>

<script>
  import Top from '@/baseBar/topBar'
  export default {
    components: {
      Top
    }
  }
</script>

<style lang="less" scoped>
  .rank_top{
    width:100%;
    position: fixed;
    top:0;
    left:0;
    background: saddlebrown;
  }
</style>
