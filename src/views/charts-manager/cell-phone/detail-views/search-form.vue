<template>
  <div class="form-wrapper">
    <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
      <div
        v-for="(item, index) in ruleForm.equipmentDetails"
        :key="item.key"
        class="custom-item"
      >
        <el-form-item
          label="字段名称:"
          :prop="'equipmentDetails.' + index + '.filedName'"
        >
          <el-select
            v-model="item.filedName"
            clearable
            placeholder="请输入字段名称"
            size="small"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="字段值:"
          :prop="'equipmentDetails.' + index + '.filedValue'"
        >
          <el-input
            v-model="item.filedValue"
            placeholder="请输入字段值"
            clearable
            :inline-message="true"
            :status-icon="true"
            size="small"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="small"
            @click="appendRules(item, index)"
          />
          <el-button
            v-if="index > 0 || ruleForm.equipmentDetails.length > 1"
            icon="el-icon-minus"
            size="small"
            @click="deleteRules(item, index)"
          />
        </el-form-item>
      </div>

      <div class="custom-item">
        <el-form-item>
          <el-button
            type="text"
            class="addRules"
            @click="addRules"
          ><i class="iconfont icon-tianjialianxiren" />添加更多字段</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SearchForm',
  data() {
    return {
      ruleForm: {
        equipmentDetails: [
          {
            filedName: '',
            filedValue: ''
          }
        ]
      },
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ]
    }
  },
  methods: {
    addRules() {
      this.ruleForm.equipmentDetails.push({
        filedName: '',
        filedValue: ''
      })
    },

    deleteRules(item, index) {
      this.index = this.ruleForm.equipmentDetails.indexOf(item)
      if (index !== -1) {
        this.ruleForm.equipmentDetails.splice(index, 1)
      }
    },

    appendRules(item, index) {
      this.index = this.ruleForm.equipmentDetails.indexOf(item)
      if (index !== -1) {
        this.ruleForm.equipmentDetails.splice(index + 1, 0, {
          filedName: '',
          filedValue: ''
        })
      }
    },
    // 初始化数据
    initData() {
      this.ruleFrom.equipmentDetails = []
    },
    submitForm(formName) {
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     // alert('submit!')
      //     this.$emit('searchFormSubmit', this.ruleForm)
      //     return true
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
      this.$emit('searchFormSubmit', this.ruleForm)
      return true
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-item {
  height: 50px;
  margin-left: 50px;
  .el-form-item {
    width: 33.33%;
    display: inline-block;
    margin-bottom: 0;
  }
  .el-select {
    width: 230px;
  }

  .el-input {
    width: 230px;
  }
}
</style>
