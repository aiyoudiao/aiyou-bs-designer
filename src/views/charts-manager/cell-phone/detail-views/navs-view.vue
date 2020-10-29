<template>
  <div class="navs-wrapper">
    <div class="navs-left">
      <el-radio-group v-model="radioSelect" size="small" @change="changeRadioValue">
        <el-radio-button label="设备总数明细" border />
        <el-radio-button label="设备变更明细" border />
        <el-radio-button label="运行中设备明细" border />
        <el-radio-button label="运行中设备变量明细" border />
      </el-radio-group>
    </div>
    <div class="search-right">
      <el-button
        type="primary"
        round
        size="small"
        @click="dialogVisible = true"
      >搜索</el-button>
      <!-- 对话框 -->
      <!-- <el-dialog title="收货地址" :visible.sync="dialogVisible" /> -->
      <common-dialog
        v-model="dialogVisible"
        :confirm-func="confirmBtn"
        title="设备明细搜索"
      >
        <template v-slot:dialog-body>
          <search-form ref="searchForm" @searchFormSubmit="handleSearchForm" />
        </template>
      </common-dialog>
    </div>
  </div>
</template>

<script>
import CommonDialog from '@/zph-components/common-components/common-dialog'
import SearchForm from './search-form.vue'

export default {
  name: 'NavsView',
  components: {
    CommonDialog,
    SearchForm
  },
  data() {
    return {
      radioSelect: '设备总数明细',
      dialogVisible: false
    }
  },
  methods: {
    /* 处理复选框的切换 */
    changeRadioValue(value) {
      this.$emit('changeRadioValue', value)
    },
    /* 对话框的确定按钮 */
    confirmBtn() {
      this.dialogVisible = !this.$refs.searchForm.submitForm('ruleForm')
      console.log('提交，回调')
    },
    /* 处理表单的搜索提交 */
    handleSearchForm(value) {
      this.$emit('handleSearchForm', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.navs-wrapper {
  box-sizing: border-box;
  margin-top: 20px;
  height: 50px;
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  position: relative;

  .navs-left {
    position: absolute;
    top: 0px;
    left: 0px;
  }

  .search-right {
    position: absolute;
    top: 0px;
    right: 0px;
  }

  .form-wrapper {
    height: 200px;
    overflow: auto;
  }
}
</style>
