// 定义函数操作
import * as types from './mutations-types'

const matutaions = {
    [types.GET_SINGER](state, singer) {
        state.singer = singer
    },
    [types.GET_PLAYING](state, bol) {
        state.playing = bol
    },
    [types.GET_FULLSCREEN](state, bol) {
        state.fullScreen = bol
    },
    [types.GET_PLAYLIST](state, list) {
        state.playlist = list
    },
    //sequenceList
    [types.GET_SEQUENCELIST](state, list) {
        state.sequenceList = list
    },
    [types.GET_MODE](state, mode) {
        state.mode = mode
    },
    [types.GET_CURRENTINDEX](state, index) {
        state.currentIndex = index
    }
}
export default matutaions