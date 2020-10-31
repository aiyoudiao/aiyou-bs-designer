import request from '@/utils/request'

export function getDataList(uid) {
  return request({
    url: '/connect',
    method: 'get',
    params: { uid: uid }
  })
}

export function getDataItem(id) {
  return request({
    url: '/connect/' + id,
    method: 'get',
    params: { }
  })
}

export function addDataItem(uid, name, data) {
  return request({
    url: '/connect',
    method: 'post',
    data: { uid: uid, name: name, data: data }
  })
}

export function updateDataItem(rowId, value) {
  return request({
    url: '/connect/' + rowId,
    method: 'put',
    data: { name: value }
  })
}

export function removeDataItem(id) {
  return request({
    url: '/connect/' + id,
    method: 'delete',
    params: { }
  })
}

