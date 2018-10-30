<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="输入内容">
        <el-input v-model="value"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <div v-html="content" />
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  data () {
    return {
      socket: '',
      url: 'ws://localhost:3001',
      content: '',
      value: ''
    }
  },
  methods: {
    initWebSocket () {
      this.connection()
    },
    connection () {
      try {
        this.socket = io(this.url)
        this.socket.on('connect', this.onconnect)
        this.socket.on('message', this.onmessage)
        this.socket.on('enter', this.onmessage)
        this.socket.on('leave', this.onmessage)
        this.socket.on('disconnect', this.ondisconnect)
      } catch (e) {
        console.log(e)
      }
    }, // 连接后台
    onconnect () {
      console.log('websocket connect')
    },
    ondisconnect () {
      console.log('websocket onclose')
    },
    onmessage (mes) {
      console.log(mes)
      this.content += `<p>${mes}</p>`
    },
    onSubmit () {
      this.socket.emit('message', this.value)
    }
  },
  mounted () {
    this.initWebSocket()
  },
  beforeDestroy () {
    this.socket.emit('disconnect')
  }
}
</script>

<style scoped>

</style>
