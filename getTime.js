/**
 * eason 2018/09/02/ 页面加载各关键点时间差函数 performanceApi&&
 * DNS查询耗时 ：domainLookupEnd - domainLookupStart
 * TCP链接耗时 ：connectEnd - connectStart
 * request请求耗时 ：responseEnd - responseStart
 * 解析dom树耗时 ： domComplete - domInteractive
 * 白屏时间 ：responseStart - navigationStart
 * domready时间 ：domContentLoadedEventEnd - navigationStart
 * onload时间 ：loadEventEnd - navigationStart
*/
import {getTime} from './utils.js'
var timingObj = performance.timing;
var dnsTime
var tcpTime
var requestTime
var renderTime
var whiteTime
var onloadTime

// with可以节省一个timingObj,但每个属性都要检验是否为timingObj底下的属性会导致函数执行效率变慢
// 但当前性能监控函数只在开发阶段使用，生产阶段会去掉就随意了
with (timingObj) {
  dnsTime = `${domainLookupEnd - domainLookupStart}ms`
  tcpTime = `${connectEnd - connectStart}ms`
  requestTime = `${responseEnd - responseStart}ms`
  renderTime = `${domComplete - domInteractive}ms`
  whiteTime = `${responseStart - navigationStart}ms`
  onloadTime = `${loadEventEnd - navigationStart}ms`
  var thisTime = {}
  var thisTimeYMD = getTime()
  var timeList = localStorage.getItem('lastTimeYMD')
  // 如果之前有储存过就取出
  if (timeList) {
    thisTime = JSON.parse(timeList)
  }
  thisTime[thisTimeYMD] = new TimLineTable(dnsTime, tcpTime, requestTime, renderTime, whiteTime, onloadTime)
  localStorage.setItem('lastTimeYMD', JSON.stringify(thisTime))
  console.table(thisTime)
}

// table使用需要对象
function TimLineTable (dnsTime, tcpTime, requestTime, renderTime, whiteTime, onloadTime) {
  this.dnsTime = dnsTime
  this.tcpTime = tcpTime
  this.requestTime = requestTime
  this.renderTime = renderTime
  this.whiteTime = whiteTime
  this.onloadTime = onloadTime
}


var resourcesObjList = performance.getEntries();
var timeList = []

// 获取每一项资源请求时间，并进行排列
resourcesObjList.forEach((item, index) => {
  item.myDuringTime = item.responseEnd-item.requestStart
  timeList.push(item.responseEnd-item.requestStart)
})
function compare(val1,val2){
  return val1-val2;
};
var resourceList = []
timeList.sort(compare)
timeList.forEach((time) => {
  resourcesObjList.forEach((resourceTimeObj) => {
    if (resourceTimeObj.myDuringTime === time) {
      resourceList.push(resourceTimeObj.name)
    }
  })
})
console.log(resourcesObjList)