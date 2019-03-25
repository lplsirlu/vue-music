<template>
  <div id="app">
    <keep-alive>
       <router-view/>
    </keep-alive>
    <play></play>
  </div>
</template>

<script>
import play from '@/page/play/play'
export default {
  name: 'App',
  components: {
    play
  }
}
</script>

<style>

</style>
