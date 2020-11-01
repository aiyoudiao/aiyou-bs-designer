import request from '@/utils/request'

export function getChartList(uid) {
  return request({
    url: '/chart',
    method: 'get',
    params: { uid: uid }
  })
}

export function getChartItem(id) {
  return request({
    url: '/chart/' + id,
    method: 'get',
    params: { }
  })
}

export function getChartView(id) {
  return request({
    url: '/chart/view/' + id,
    method: 'get',
    params: { }
  })
}

export function addChartItem(uid, title) {
  return request({
    url: '/chart',
    method: 'post',
    data: { uid: uid, title: title }
  })
}

export function cloneChartItem(rowId, uid, title) {
  return request({
    url: '/chart/import/' + rowId,
    method: 'post',
    data: { uid: uid, title: title }
  })
}

export function updateChartItem(id, img, chartData) {
  return request({
    url: '/chart/' + id,
    method: 'put',
    data: { img: img, chartData: chartData }
  })
}

export function updateChartItemTitle(id, title) {
  return request({
    url: '/chart/' + id,
    method: 'put',
    data: { title: title }
  })
}

export function removeChartItem(id) {
  return request({
    url: '/chart/' + id,
    method: 'delete',
    params: { }
  })
}

