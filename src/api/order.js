import request from '@/utils/request'

export function addOne(data) {
  return request({
    url: '/hotel/order/add',
    method: 'post',
    data
  })
}

export function getList(pageCurrent, pageSize) {
  return request({
    url: '/hotel/order/getList',
    method: 'GET',
    params: { pageCurrent: pageCurrent, pageSize: pageSize }
  })
}

export function deleteById(orders_id) {
  return request({
    url: '/hotel/order/delete',
    method: 'POST',
    params: { orders_id }
  })
}
