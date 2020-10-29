<template>
  <div class="match-view">
    <h2>匹配的内容</h2>
    <el-table
      border
      :data="tableData"
      style="width='inherit'"
      height="100%"
    >
      <el-table-column
        type="index"
        label="序号"
        width="50"
        fixed="left"
        align="center"
      />
      <el-table-column
        v-for="(items, index) in columnData"
        :key="items"
        fixed
        :label="items"
        :prop="items"
        align="center"
        :resizable="false"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="140"
        align="center"
      >
        <template slot-scope="scope">
          <template v-if="scope.row.state === 'added'">
            <el-button type="success" size="small" :disabled="scope.row.state === 'added'" round @click="handleAddClick(scope.row)">已添加</el-button>
          </template>
          <template v-else>
            <el-button type="primary" size="small" round :disabled="scope.row.state === 'added'" @click="handleAddClick(scope.row)">添加</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页条 -->
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      background
      :hide-on-single-page="true"
      :current-page="pageNumber"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handlePageNumberChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    columnData: {
      type: [Array],
      default: () => []
    },
    tableData: {
      type: [Array],
      default: () => []
    },
    pageNumber: {
      type: [Number],
      default: () => 1
    },
    pageSize: {
      type: [Number],
      default: () => 10
    },
    total: {
      type: [Number],
      default: () => 0
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handlePageSizeChange(value) {
      this.$emit('handlePageSizeChange', value)
    },
    handlePageNumberChange(value) {
      this.$emit('handlePageNumberChange', value)
    },
    handleAddClick(row) {
      this.$emit('handleAddClick', row)
    }
  }
}
</script>

<style lang="scss" scoped>
.match-view {
  padding: 0 20px;
  display: flex;
  height: 40vh;
  flex-direction: column;

  h2 {
    padding: 0;
    font-size: 14px;
    font-weight: 600;
  }

  .el-pagination {
    text-align: center;
    margin-top: 10px;
  }

}
</style>
