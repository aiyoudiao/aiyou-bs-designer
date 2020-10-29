<template>
  <div class="nav-view">
    <div class="left-box">
      <el-input
        v-model="input"
        placeholder="请输入内容"
        size="large"
        clearable
      />
      <el-button type="primary" size="mesium" round @click="handleSearchChange">搜 索</el-button>
    </div>
    <div class="right-box">
      <!-- <el-radio-group
        v-model="radio1"
        size="medium"
      >
        <el-radio-button label="图表" />
        <el-radio-button label="表格" />
      </el-radio-group> -->
      <el-select v-model="value" placeholder="请选择" @change="handleSelectChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      value: 'icon',
      options: [
        {
          value: 'icon',
          label: '图标'
        },
        {
          value: 'table',
          label: '表格'
        }
      ]
    }
  },
  methods: {
    handleSelectChange(value) {
      this.$emit('handleSelectChange', value)
    },
    handleSearchChange() {
      this.$emit('handleSearchChange', this.input)
    }
  }
}
</script>

<style lang="scss">
.nav-view {
  padding: 20px;
  display: flex;
  // flex-direction: row;
  // justify-content: space-between;
  // align-items: center;
  .left-box {
    flex: 9;
    .el-input {
      max-width: 70%;
      width: 60%;
      min-width: 50%;
      border-width: 4px;
    }
    .el-input__inner {
      border-width: 2px;
    }
    .el-button {
      margin-left: 2%;
      width: 100px;
    }
  }
  .right-box {
    flex: 1;
    text-align: right;
  }
}
</style>
