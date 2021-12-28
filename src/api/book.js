import request from '@/utils/request'

export function add(data) {
  return request({
    url: '/hotel/book/add',
    method: 'POST',
    data
  })
}

export function update(book_id, staff_id) {
  return request({
    url: '/hotel/book/update',
    method: 'POST',
    params: { book_id: book_id, staff_id: staff_id }
  })
}

export function deleteById(book_id) {
  return request({
    url: '/hotel/book/delete',
    method: 'POST',
    params: { book_id: book_id }
  })
}

export function getBookNotCommit(pageCurrent, pageSize) {
  return request({
    url: '/hotel/book/getBookNotCommit',
    method: 'GET',
    params: { pageCurrent, pageSize }
  })
}

export function getCommitBook(pageCurrent, pageSize) {
  return request({
    url: '/hotel/book/getCommitBook',
    method: 'GET',
    params: { pageCurrent, pageSize }
  })
}

export function chooseRoom(book_id, room_id) {
  return request({
    url: '/hotel/book/chooseRoom',
    method: 'POST',
    params: { book_id: book_id, room_id: room_id }
  })
}

export function getBookByUser(user_id) {
  return request({
    url: '/hotel/book/getBookByUser',
    method: 'GET',
    params: { user_id: user_id }
  })
}

export function getListByUser(user_id) {
  return request({
    url: '/hotel/book/getListByUser',
    method: 'GET',
    params: { user_id: user_id }
  })
}

