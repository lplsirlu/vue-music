import Vue from 'vue'
Vue.prototype.noScroll = function () {
  var mo = function (e) { e.preventDefault() }
  document.body.style.overflow = "hidden"
  document.addEventListener("touchmove", mo, false)// 禁止页面滑动
}
Vue.prototype.canScroll = function () {
  var mo = function (e) {
    e.preventDefault()
  }
  document.body.style.overflow = ""// 出现滚动条
  document.removeEventListener("touchmove", mo, false)
}