<template>
  <div class="nav-view">
    <div class="left-box">
      <el-button type="primary" @click="handleAddClick">新增模板</el-button>
    </div>
    <div class="right-box">
      <el-input v-model="searchValue" clearable placeholder="请输出搜索内容" @keyup.native.enter="handleSearchEvent">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearchEvent" />
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: ''
    }
  },
  methods: {
    handleSearchEvent() {
      this.$emit('handleSearchEvent', this.searchValue)
    },
    handleAddClick() {
      this.$emit('handleAddClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-view {
  padding: 0 20px;
  margin: 20px auto 20px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .right-box {
    width: 20%;
  }

  .left-box {
    .el-button {
      margin-left: 0px;
      width: 100px;
    }
  }
}
</style>
