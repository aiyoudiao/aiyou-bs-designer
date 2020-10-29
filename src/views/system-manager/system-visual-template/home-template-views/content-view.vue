<template>
  <div class="content-view">
    <el-table
      border
      :data="tableData"
      style="width='inherit'"
      height="81vh"
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
          <el-button type="text" size="small" @click="handleViewClick(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="handleEditClick(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDeleteClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页条 -->
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      background
      :hide-on-single-page="true"
      :current-page="pageNumber"
      :page-sizes="[36, 72, 108, 216]"
      :page-size="pageSize"
      :total="216"
      @size-change="handlePageSizeChange"
      @current-change="handlePageNumberChange"
    />
  </div>
</template>

<script>

export default {
  props: {
  },
  data() {
    return {
      pageNumber: 1,
      pageSize: 50,
      columnData: [
        '模板名称',
        '创建人',
        '创建时间',
        '修改人',
        '修改时间'
      ],
      tableData: Array(100)
        .fill(0)
        .map((value, index) => {
          return {
            id: index + 1,
            模板名称: '模板名称' + index,
            创建人: '创建人' + index,
            创建时间: new Date().toLocaleDateString(),
            修改人: '修改人' + index,
            修改时间: new Date().toLocaleDateString()
          }
        })
    }
  },
  methods: {
    handlePageSizeChange(value) {
      this.$emit('handlePageSizeChange', value)
    },
    handlePageNumberChange(value) {
      this.$emit('handlePageNumberChange', value)
    },
    handleViewClick(row) {},
    handleEditClick(row) {},
    handleDeleteClick(row) {}
  }
}
</script>

<style lang="scss" scoped>
.content-view {
  padding: 0 20px;
  margin: 0px auto 0px auto;
  .el-pagination {
    text-align: center;
    margin-top: 10px;
  }
}
</style>
