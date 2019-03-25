// 人口文件

import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger' // vuex的调试插件没修改一条记录会在console下打印
import { playMode } from '@/common/config'
// 在下方应用
Vue.use(Vuex)

const state = {
    singer: {},
    playing: false,
    fullScreen: false, //是否全屏
    playlist: [], // 播放列表
    sequenceList: [],
    mode: playMode.sequence, // 三种播放形式
    currentIndex: -1,//当前索引
    currentSong: (state) => state.playlist[state.currentIndex] || {}
}

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations,
    plugins: [createLogger()] 
})