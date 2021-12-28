import request from '@/utils/request'

export function addCustomer(data) {
  return request({
    url: '/hotel/customer/add',
    method: 'POST',
    data
  })
}

export function getList(pageCurrent, pageSize, customer_status) {
  return request({
    url: '/hotel/customer/getList',
    method: 'GET',
    params: { pageCurrent: pageCurrent, pageSize: pageSize, customer_status: customer_status }
  })
}

export function changStatus(customer_id) {
  return request({
    url: '/hotel/customer/changStatus',
    method: 'POST',
    params: { customer_id: customer_id }
  })
}
