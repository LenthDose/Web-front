import request from '@/utils/request'

/** 登录 */
export function login(data) {
  return request({
    url: '/hotel/login',
    method: 'POST',
    data
  })
}

/** 详细信息 */
export function getInfo(token) {
  return request({
    url: '/hotel/staff/getDetails',
    method: 'get',
    params: { token }
  })
}

/** 登出 */
export function logout() {
  return request({
    url: '/hotel/logout',
    method: 'POST'
  })
}

/** 获取员工列表 */
export function getList(pageCurrent, pageSize) {
  return request({
    url: '/hotel/staff/getList',
    method: 'get',
    params: { pageCurrent, pageSize }
  })
}

/** 修改员工信息 */
export function change(data) {
  return request({
    url: '/hotel/staff/change',
    method: 'POST',
    data
  })
}

/** 逻辑删除员工信息 */
export function deleteStaff(staff_id) {
  return request({
    url: '/hotel/staff/deleteStaff',
    method: 'POST',
    params: { staff_id }
  })
}

/** 添加员工 */
export function add(data) {
  return request({
    url: '/hotel/staff/register',
    method: 'POST',
    data
  })
}
/** 设置是否有效 */
export function setEnabled(staff_id, is_enabled) {
  return request({
    url: '/hotel/staff/setEnabled',
    method: 'POST',
    params: { staff_id, is_enabled }
  })
}

export function search(queryparam, pageCurrent, pageSize) {
  return request({
    url: '/hotel/staff/search',
    method: 'GET',
    params: { queryparam: queryparam, pageCurrent: pageCurrent, pageSize: pageSize }
  })
}

export function Userlogin(user_name, user_pwd) {
  return request({
    url: '/hotel/user/login',
    method: 'POST',
    params: { user_name: user_name, user_pwd: user_pwd }
  })
}

export function register(data) {
  return request({
    url: '/hotel/user/register',
    method: 'POST',
    data
  })
}
