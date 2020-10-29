<template>
  <div class="wrapper">
    <dv-loading v-if="loading" class="my-loading">努力加载中...</dv-loading>
    <div class="table-wrapper">
      <el-table
        :data="tableData"
        :stripe="false"
        :border="false"
        :highlight-current-row="false"
      >
        <el-table-column
          v-for="(items, index) in columnData"
          :key="items"
          :label="index > 0 ? items : ''"
          :prop="items+'12345'"
          align="center"
          :resizable="false"
          :width="index === 0 ? 180 : 'auto'"
        >
          <template slot-scope="scope">
            <el-button v-if="index > 0" type="text" @click="handleCellEvent([ scope.row[items], scope.row.厂商, scope.column.property])">{{
              scope.row[items]
            }}</el-button>
            <span v-else>
              {{ scope.row[items] }}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableView',
  data() {
    return {
      loading: false,
      columnData: [
        '厂商',
        '路由器',
        '交换机',
        '防火墙',
        '负载均衡',
        'SSL',
        '统计'
      ],
      tableData: Array(10)
        .fill(0)
        .map((value, index) => {
          return {
            id: index + 1,
            厂商: '北京' + index,
            路由器: index + 1,
            交换机: 100 - index,
            防火墙: 90 - index,
            负载均衡: 10,
            SSL: 20 - index,
            统计: 55 + index
          }
        })
    }
  },
  methods: {
    handleCellEvent(value) {
      this.$emit('handleCellEvent', value)
    }
  }
}
</script>

<style lang="scss" scoped>
/* ===================element table start ==================== */

::v-deep .el-table td,
.el-table th.is-leaf {
  border-bottom: none;
}

::v-deep .el-table::before {
  left: 0;
  bottom: 0;
  width: 0%;
  height: 0px;
}

::v-deep .el-table td,
::v-deep .el-table th.is-leaf {
  border: none;
}

::v-deep .el-table tr:nth-child(odd) {
  background: #ddd;
}

::v-deep .el-table tr:nth-child(even) {
  background: #fff;
}

::v-deep .el-table thead {
  font-size: 14px;
  text-align: center;
  color: #000;
  line-height: 20px;
  font-weight: 400;
}

::v-deep .el-table td {
  padding: 0;
  height: 35px;
}

::v-deep .el-table th {
  padding: 0;
  height: 30px;
}

::v-deep .el-table .cell {
  font-size: 14px;
  color: #333;
  font-weight: 400;
  line-height: 14px;
}

::v-deep .el-table__header-wrapper {
  position: relative;
}

::v-deep .el-table__header .has-gutter > tr {
  background-color: #fff;
}

::v-deep .el-table__header::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #46bab1;
  left: 0px;
  bottom: 0px;
  z-index: 8;
}

::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: inherit !important;
}

/* 重置表格的滚动条 */
// ::v-deep .el-table__body-wrapper::-webkit-scrollbar {
//   width: 11px !important;
//   height: auto !important;
// }

/* ===================element table end ==================== */

.table-wrapper {
  flex: 1;
  margin-top: 20px;
  padding: 0 0 0 5px;
  border: 1px solid #000;
  // padding: 5px;
  box-sizing: border-box;

  // .el-table {
  //   height: 235px;
  //   overflow: auto;
  // }

  ::v-deep .el-table__body-wrapper {
    height: 235px;
    overflow-y: auto;
  }

  /* 二维表格首列的斜线 start */

  ::v-deep .el-table .el-table__header th:first-child {
    background: #fff;
  }
  ::v-deep .el-table .el-table__header th:first-child:before {
    content: "类型";
    text-align: center;
    position: absolute;
    width: 50%;
    top: 0;
    right: 0;
    font-weight: 500;
  }

  ::v-deep .el-table .el-table__header th:first-child:after {
    content: "厂商";
    text-align: center;
    position: absolute;
    width: 50%;
    bottom: 0;
    left: 0;
    font-weight: 500;
  }

  ::v-deep .el-table .el-table__header th:first-child .cell {
    position: absolute;
    top: 1px;
    left: 0;
    width: 200%;
    height: 1px;
    background-color: #666;
    display: block;
    text-align: center;
    transform: rotate(8deg);
    transform-origin: top left;
  }

  /* 二维表格首列的斜线 end */

  .el-pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }
}
</style>
