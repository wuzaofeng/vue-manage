import SockJS from 'sockjs-client'
export default class Socket {
  constructor (url) {
    this.sock = new SockJS(url)
  }
  static onopen () {
    this.sock.onopen = function () {
      console.log('open')
      this.sock.send('test')
    }
  }

  static onmessage () {
    this.sock.onmessage = function (e) {
      console.log('message', e.data)
      this.sock.close()
    }
  }

  static onclose () {
    this.sock.onclose = function () {
      console.log('close')
    }
  }
}
