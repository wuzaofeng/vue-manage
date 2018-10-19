<template>
  <div class="add" v-loading="loading">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="选择版块" prop="block">
        <el-select v-model="ruleForm.region" placeholder="请选择版块">
          <el-option v-for="tab in tabs" :key="tab.value" :label="tab.label" :value="tab.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="板块标题" prop="title" placeholder="请输入板块标题">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import CNodeApi from '@/server/cnode/cnode-api'
const tabs = [
  {value: 'ask', label: '分享'},
  {value: 'share', label: '问答'},
  {value: 'job', label: '招聘'},
  {value: 'dev', label: '测试'}
]
export default {
  name: 'Add',
  data () {
    return {
      loading: false,
      tabs,
      ruleForm: {
        block: 'ask',
        title: '567'
      },
      rules: {
        block: [
          { required: true, message: '请选择版块', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入板块标题', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
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
