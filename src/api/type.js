import request from '@/utils/request'

export function add(data) {
  return request({
    url: '/hotel/type/add',
    method: 'POST',
    data
  })
}

export function deleteType(type_id) {
  return request({
    url: '/hotel/type/delete',
    method: 'POST',
    params: { type_id }
  })
}

export function getTypeList(pageCurrent, pageSize) {
  return request({
    url: '/hotel/type/list',
    method: 'GET',
    params: { pageCurrent, pageSize }
  })
}

export function ChangeType(data) {
  return request({
    url: '/hotel/type/change',
    method: 'POST',
    data
  })
}

export function getTypeOtherList() {
  return request({
    url: '/hotel/type/OtherList',
    method: 'GET'
  })
}
