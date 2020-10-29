<template>
  <div class="detail-wrapper">
    <dv-loading v-if="loading" class="my-loading">努力加载中...</dv-loading>

    <div class="table-wrapper">
      <el-cascader
        ref="listBox"
        v-model="selectList"
        :options="options"
        :props="{ multiple: true, checkStrictly: true }"
        placeholder="请选择要显示的列"
        size="small"
        @change="handleSelectEvent"
        @remove-tag="removeTagEvent"
      />
      <el-table
        :data="tableData"
        :stripe="false"
        :border="false"
        :highlight-current-row="false"
      >
        <el-table-column
          v-for="items in columnData"
          :key="items"
          :label="items"
          :prop="items"
          align="center"
          :min-width="200"
          :resizable="false"
          :formatter="filterColumnData"
        />
      </el-table>
      <el-pagination
        layout="total, sizes, prev, pager, next"
        :page-sizes="[20, 30, 40, 50]"
        :total="100"
        :page-size="pageCount"
        background
        @current-change="onPageChange"
        @size-change="onSizeChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailView',
  data() {
    return {
      loading: false,
      columnData: [
        '设备名',
        '管理IP',
        '厂商',
        '类型',
        '机房编号',
        '数据中心',
        '区域'
      ],
      originTableData: Array(100)
        .fill(0)
        .map((value, index) => {
          return {
            id: index + 1,
            设备名: 'WHDRGFA2299-TX-1' + index,
            管理IP: '10.666.23.1' + index,
            厂商: '华为',
            类型: '运维平台服务器',
            机房编号: 'WHTX',
            数据中心: '武汉',
            区域: 'WHDRTRS'
          }
        }),
      /* 当前页码 */
      pageIndex: 0,
      /* 每页条数 */
      pageCount: 20,
      tableData: [],
      options: [
        {
          value: 'zhinan-00',
          label: '指南-00'
        },
        {
          value: 'zhinan-01',
          label: '指南-01'
        },
        {
          value: 'zhinan-02',
          label: '指南-02'
        },
        {
          value: 'zhinan-03',
          label: '指南-03'
        }
      ],
      abandonedTag: '',
      selectList: []
    }
  },
  mounted() {
    this.checkoutTableData()

    this.options = [...this.columnData].map(value => {
      return {
        value: value + 1,
        label: value,
        checked: false
      }
    })

    this.selectList = [...this.options].map(item => item.value)
    this.selectList.splice(3)
    this.columnData.splice(3)
  },
  methods: {
    onPageChange(page) {
      this.pageIndex = page - 1
      this.checkoutTableData()
      console.log(page)
    },
    onSizeChange(size) {
      this.pageCount = size
      this.checkoutTableData()
      console.log('size', size)
    },
    filterColumnData(row, columns, cellValue, index) {
      return cellValue
    },
    checkoutTableData() {
      this.tableData = this.originTableData.slice(
        this.pageCount * this.pageIndex,
        this.pageCount * (this.pageIndex + 1)
      )

      // NOTE 翻页，往上一级发送信息
      this.$emit('checkoutTableData', {})
    },
    handleSelectEvent() {
      const data = this.$refs.listBox.getCheckedNodes()
      const value = data.map(item => item.data).filter(item => item.value !== this.abandonedTag)

      this.columnData = [...[...value].reduce((previous, current) => {
        previous.push(current.label)
        return previous
      }, [])]
    },
    removeTagEvent(tag) {
      this.abandonedTag = tag
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

::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: inherit !important;
}

/* 重置表格的滚动条 */
// ::v-deep .el-table__body-wrapper::-webkit-scrollbar {
//   width: 11px !important;
//   height: auto !important;
// }

/* ===================element table end ==================== */

/* 重置 下拉选择框 */
::v-deep .el-input__inner {
  border: none;
  border-radius: initial;
  border-bottom: 1px solid #666;
  background: transparent;
}

.detail-wrapper {
  flex: 1;
  margin-top: 20px;
  padding: 0 5px 5px 5px;
  border: 1px solid #000;
  // padding: 5px;
  box-sizing: border-box;
  .el-cascader {
    width: 100%;
  }
  // .el-table {
  //   height: 385px;
  //   overflow: auto;
  // }

::v-deep .el-table__header::after {
  content: "";
  position: absolute;
  // width: 100%;
  width: inherit;

  height: 2px;
  background-color: #46bab1;
  left: 0px;
  bottom: 0px;
  z-index: 8;
}

  ::v-deep .el-table__body-wrapper {
    height: 385px;
    overflow: auto;
  }

  .el-pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }
}
</style>
