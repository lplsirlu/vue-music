export default class Song {
    constructor({id, mid, singer, name, album, duration, image, url}){
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image 
        this.url = url
    }
}
    let t = (new Date).getUTCMilliseconds()
    let _guid = Math.round(2147483647 * Math.random()) * t % 1e10
export function createSong(musicData){
    return new Song({
        id: musicData.songid, // 这个暂时不晓得
        mid: musicData.songmid,  // 拿到这首歌的播放id
        singer: filterSinger(musicData.singer), // 拿到歌手原唱
        name: musicData.songname, // 歌曲名
        album: musicData.albumname, // 歌曲专辑名
        duration: musicData.interval, // 歌曲播放时间长度
        image:  `http://y.gtimg.cn/music/photo_new/T002R90x90M000${musicData.albummid}.jpg?max_age=2592000`,
        // http://dl.stream.qqmusic.qq.com/
        // url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=6361017792&vkey=362F54A65C796A55D05E160332E254D54C5E8592889FAC6BF3B35D8A67F2AC25EB48442C6F3C61C2EF8F4A4FE5485F278B688D9902E20A3C&uin=0&fromtag=38`,
        url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=2134948704&vkey=A8A05856EC3E9FA2CC6BFC45D3CC1515296C9E8B3A00AB83D87F8322C988C33BB6AE10C9E4DFC9D4EEA7A92691515AB5557B392E9DF6FADC&uin=0&fromtag=38`,
    })
}

function filterSinger(singer){
    let arr = []
    if(!singer){
        return ''
    }
    singer.forEach(item => {
        arr.push(item.name)
    })
    return arr.join('/')
}