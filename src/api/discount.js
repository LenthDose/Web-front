import request from '@/utils/request'

export function getDiscount() {
  return request({
    url: '/hotel/discount/getDiscount',
    method: 'GET'
  })
}

export function deleteById(discount_id) {
  return request({
    url: '/hotel/discount/delete',
    method: 'POST',
    params: { discount_id }
  })
}

export function listBypage(pageCurrent, pageSize) {
  return request({
    url: '/hotel/discount/listByPage',
    method: 'GET',
    params: { pageCurrent, pageSize }
  })
}

export function create(discount) {
  return request({
    url: '/hotel/discount/add',
    method: 'POST',
    discount
  })
}
