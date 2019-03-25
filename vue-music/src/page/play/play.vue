<template>
    <div class="player" v-show="playlist.length>0">
        <div class="mormal_player" v-show="fullScreen">播放器</div>
        <div class="mini_player" v-show="!fullScreen"></div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    computed: {
        ...mapState(['fullScreen','playlist'])
    }
}
</script>
<style lang="less" scoped>
.player{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ffffff;
    width: 100%;
    height: 100%;
    z-index: 99;
}
</style>


