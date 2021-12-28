import request from '@/utils/request'

export function addOne(data) {
  return request({
    url: '/hotel/room/add',
    method: 'POST',
    data
  })
}

export function changeStatus(room_id) {
  return request({
    url: '/hotel/room/changeStatus',
    method: 'POST',
    params: { room_id }
  })
}

export function changeStatusEmpty(room_id) {
  return request({
    url: '/hotel/room/changeStatusEmpty',
    method: 'POST',
    params: { room_id }
  })
}

export function deleteById(room_id) {
  return request({
    url: '/hotel/room/delete',
    method: 'POST',
    params: { room_id }
  })
}

export function getList(pageCurrent, pageSize) {
  return request({
    url: '/hotel/room/getList',
    method: 'GET',
    params: { pageCurrent, pageSize }
  })
}

export function getListByStatus(pageCurrent, pageSize, room_status) {
  return request({
    url: '/hotel/room/getListByStatus',
    method: 'GET',
    params: { room_status, pageCurrent, pageSize }
  })
}

export function getListByType(pageCurrent, pageSize, type_id) {
  return request({
    url: '/hotel/room/getListByType',
    method: 'GET',
    params: { type_id, pageCurrent, pageSize }
  })
}

export function getListByWarpper(pageCurrent, pageSize, room_status, type_id) {
  return request({
    url: '/hotel/room/getListByWarpper',
    method: 'GET',
    params: { pageCurrent: pageCurrent, pageSize: pageSize, room_status: room_status, type_id: type_id }
  })
}

export function getEmptyRoomWithType(type_id) {
  return request({
    url: '/hotel/room/getEmptyRoomWithType',
    method: 'GET',
    params: { type_id: type_id }
  })
}

export function changeStatusBook(room_id) {
  return request({
    url: '/hotel/room/changeStatusBook',
    method: 'POST',
    params: { room_id }
  })
}
