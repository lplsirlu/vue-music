export const singer = state => state.singer
export const currentSong = state => state.playlist[state.currentIndex] || {}