import { Message, Notification, MessageBox } from 'element-ui'
export function showNotify(data) {
  Notification({
    title: data,
    type: 'success',
    duration: 2 * 1000
  })
}

export function showMessage(data) {
  Message({
    message: data,
    type: 'error',
    duration: 5 * 1000
  })
}

export function showMessageBox(data) {
  MessageBox({
    title: '提示',
    message: data,
    center: true
  })
}
