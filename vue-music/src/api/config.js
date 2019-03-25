export const urlImg = '/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
// 轮播图接口
export const urlRecommon = '/cgi-bin/musicu.fcg?-=recom8916479739195171&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B"comm"%3A%7B"ct"%3A24%7D%2C"recomPlaylist"%3A%7B"method"%3A"get_hot_recommend"%2C"param"%3A%7B"async"%3A1%2C"cmd"%3A2%7D%2C"module"%3A"playlist.HotRecommendServer"%7D%7D'
// 推荐列表

// 歌手列表
export const singerUrl = '/v8/fcg-bin/v8.fcg?channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&g_tk=1664029744&loginUin=280309453&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCodr=0'

// 歌手详情

export const singerList = (url) => `/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&ct=24&singermid=${url}&order=listen&begin=0&num=30&songstatus=1`
