// 得到格式化日期
export function getTime (time) {
  let date = time ? new Date(time) : new Date()
  const y = date.getFullYear()
  const M = date.getMonth() + 1
  const d = date.getDate()
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()
  const value = {
    y: y,
    M: M < 10 ? `0${M}` : M,
    d: d < 10 ? `0${d}` : d,
    h: h < 10 ? `0${h}` : h,
    m: m < 10 ? `0${m}` : m,
    s: s < 10 ? `0${s}` : s
  }
  return `${value.M}-${value.d} ${value.h}:${value.m}`
}