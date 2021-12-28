import request from '@/utils/request'

export function check(data) {
  return request({
    url: '/hotel/check/add',
    method: 'post',
    data
  })
}

export function deleteById(check_id) {
  return request({
    url: '/hotel/check/deleted',
    method: 'post',
    params: { check_id: check_id }
  })
}

export function getlist(pageCurrent, pageSize) {
  return request({
    url: '/hotel/check/list',
    method: 'get',
    params: { pageCurrent: pageCurrent, pageSize: pageSize }
  })
}
