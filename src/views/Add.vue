<template>
  <div class="add" v-loading="loading">
    <el-form :model="ruleForm" :rules="rules" ref="cnodeAdd" label-width="100px">
      <el-form-item label="选择版块" prop="block">
        <el-select v-model="ruleForm.block" placeholder="请选择版块">
          <el-option
            v-for="tab in tabs"
            :key="tab.value"
            :label="tab.label"
            :value="tab.value"
            v-if="isEdit ? tab.edit : true"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="板块标题" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入板块标题"></el-input>
      </el-form-item>
      <el-form-item label="内容编辑" prop="content">
        <quill-editor ref="editor"
          v-model="ruleForm.content"
          @change="onEditorChange($event)"
        >
        </quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button :type="!isEdit ? 'primary' : 'warning'" @click="submitForm('cnodeAdd')">
          {{!isEdit ? '立即创建' : '立即编辑'}}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import CNodeApi from '@/server/cnode/cnode-api'
import { mapState } from 'vuex'
const tabs = [
  {edit: true, value: 'ask', label: '问答'},
  {edit: true, value: 'share', label: '分享'},
  {edit: true, value: 'job', label: '招聘'},
  {edit: false, value: 'dev', label: '测试'}
]
export default {
  name: 'Add',
  computed: {
    editor () {
      return this.$refs.editor.quillEditor
    },
    ...mapState({
      token: 'cnode_accessToken'
    })
  },
  mounted () {
    const { id } = this.$route.params
    id && this.getDetail(id)
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
      isEdit: false,
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
      this.loading = true
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          this.loading = false
          return false
        }
        const data = {
          accesstoken: this.token,
          title: this.ruleForm.title,
          tab: this.ruleForm.block,
          content: this.ruleForm.content
        }
        if (!this.isEdit) {
          CNodeApi.addTopics(data).then((res) => {
            if (res.success) {
              this.$message({
                showClose: true,
                message: '新建成功'
              })
              this.loading = false
            }
          })
        } else {
          this.updateTopics(data)
        }
      })
    },
    onEditorChange ({ editor, html, text }) {
      this.content = html
    },
    getDetail (id) {
      this.isEdit = true
      this.loading = true
      const data = {
        mdrender: true,
        accesstoken: this.token
      }
      CNodeApi.getDetails({id, data}).then(res => {
        const { title, tab, content } = res.data
        this.ruleForm.title = title
        this.ruleForm.block = tab
        this.ruleForm.content = content
        this.loading = false
      })
    },
    updateTopics (params) {
      const data = {
        ...params,
        topic_id: this.$route.params.id
      }
      CNodeApi.updateTopics(data).then((res) => {
        if (res.success) {
          this.$message({
            showClose: true,
            message: '编辑成功',
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: res.error_msg,
            type: 'danger'
          })
        }
        this.loading = false
      })
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
