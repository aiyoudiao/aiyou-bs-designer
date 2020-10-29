<template>
  <div class="added-view">
    <h2>已添加的内容</h2>
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
          <el-button type="danger" size="small" round @click="handleDeleteClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    }
  },
  data() {
    return {
    //   columnData: [
    //     '模板名称',
    //     '创建人',
    //     '创建时间',
    //     '修改人',
    //     '修改时间'
    //   ],
    //   tableData: Array(10)
    //     .fill(0)
    //     .map((value, index) => {
    //       return {
    //         id: index + 1,
    //         模板名称: '模板名称' + index,
    //         创建人: '创建人' + index,
    //         创建时间: new Date().toLocaleDateString(),
    //         修改人: '修改人' + index,
    //         修改时间: new Date().toLocaleDateString()
    //       }
    //     })
    }
  },
  methods: {
    handleDeleteClick(row) {
      this.$emit('handleDeleteClick', row)
    }
  }
}
</script>

<style lang="scss">
.added-view {
  padding: 0 20px;
  display: flex;
  height: 40vh;
  flex-direction: column;

  h2 {
    padding: 0;
    font-size: 14px;
    font-weight: 600;
  }

}
</style>
