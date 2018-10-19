<template>
  <div class="add" v-loading="loading">
    <el-form :model="ruleForm" :rules="rules" ref="cnodeAdd" label-width="100px">
      <el-form-item label="选择版块" prop="block">
        <el-select v-model="ruleForm.block" placeholder="请选择版块">
          <el-option v-for="tab in tabs" :key="tab.value" :label="tab.label" :value="tab.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="板块标题" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入板块标题"></el-input>
      </el-form-item>
      <el-form-item label="内容编辑" prop="content">
        <quill-editor ref="editor"
          v-model="ruleForm.content"
        >
        </quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('cnodeAdd')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import CNodeApi from '@/server/cnode/cnode-api'
import { mapState } from 'vuex'
const tabs = [
  {value: 'ask', label: '分享'},
  {value: 'share', label: '问答'},
  {value: 'job', label: '招聘'},
  {value: 'dev', label: '测试'}
]
export default {
  name: 'Add',
  components: {
    quillEditor
  },
  computed: {
    editor () {
      return this.$refs.editor.quillEditor
    },
    ...mapState({
      token: 'cnode_accessToken'
    })
  },
  data () {
    var validateContent = (rule, value, callback) => {
      if (!value) {
        this.$refs.editor.$el.setAttribute('style', 'border-color: #f56c6c;')
        return callback(new Error('请编辑内容'))
      } else {
        this.$refs.editor.$el.setAttribute('style', 'border-color: #67c23a;')
        callback()
      }
    }
    return {
      loading: false,
      tabs,
      ruleForm: {
        block: '',
        title: '',
        content: ''
      },
      rules: {
        block: [{ required: true, message: '请选择版块', trigger: 'blur' }],
        title: [
          { required: true, message: '请输入板块标题', trigger: 'blur' },
          { min: 10, message: '标题字数10字以上', trigger: 'blur' }
        ],
        content: [{ required: true, validator: validateContent, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        const data = {
          accesstoken: this.token,
          title: this.ruleForm.title,
          tab: this.ruleForm.block,
          content: this.ruleForm.content
        }
        CNodeApi.addTopics(data).then((res) => {
          if (res.success) {
            this.$message({
              showClose: true,
              message: '新建成功'
            })
          }
        })
      })
    },
    onEditorChange ({ editor, html, text }) {
      this.content = html
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/var';
.add {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: $white;
  border-radius: 5px;
  overflow-y: auto;
  padding: 22px 45px 22px 22px;
  box-sizing: border-box;
}
</style>
