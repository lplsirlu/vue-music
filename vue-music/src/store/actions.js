// 异步操作
import * as types from './mutations-types'
export const queryPlay = function ({commit, state}, {list, index}){
    commit(types.GET_SEQUENCELIST, list) // 顺序播放
    commit(types.GET_PLAYLIST, list)
    commit(types.GET_CURRENTINDEX, index)
    commit(types.GET_FULLSCREEN, true)
    commit(types.GET_PLAYING, true)
}