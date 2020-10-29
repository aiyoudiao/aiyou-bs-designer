<!--
 * @Descripttion: 通用表格
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-08-26 00:49:22
 * @LastEditTime: 2020-08-30 20:44:20
 * @LastEditors: aiyoudiao
 * @FilePath: \code\src\components\common-components\common-table\index.vue
-->
<template>
  <div class="common-table">
    <dv-loading v-if="loading" class="my-loading">努力加载中...</dv-loading>
    <template v-if="isScroll">
      <!-- 可以自动滚动的表格 -->
      <dv-scroll-board
        :config="scrollBoardConfig"
        :style="getScrollTableHeight()"
      />
    </template>
    <template v-else>
      <!-- 带滚动条的普通表格 -->
      <el-table
        :data="tableData"
        :height="getTableHeight()"
        style="width: 100%"
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
          :resizable="false"
        />
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  name: 'CommonTable',
  props: {
    isScroll: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: true
    },
    headerHeight: {
      type: Number,
      default: 30
    },
    headerBGC: {
      type: String,
      default: '#fff' // 表头
    },
    oddRowBGC: {
      type: String,
      default: '#fff' // 奇数行
    },
    evenRowBGC: {
      type: String,
      default: '#ddd' // 偶数行
    },
    index: {
      type: Boolean,
      default: false
    },
    align: {
      type: [Array],
      default: () => ['center']
    },
    /* 列数据 */
    header: {
      type: [Array],
      default: () => []
    },
    /* 表格数据 */
    data: {
      type: [Array],
      default: () => []
    },
    rowHeight: {
      type: Number,
      default: 35
    },
    rowNum: {
      type: Number,
      default: 7
    }
  },
  data() {
    return {
      count: 0
    }
  },
  computed: {
    scrollBoardConfig() {
      const {
        index,
        align,
        header,
        data,
        height,
        rowNum,
        headerHeight,
        headerBGC,
        oddRowBGC,
        evenRowBGC
      } = this

      this.cleanLoading(data.length !== 0 && header.length !== 0)

      return {
        index,
        align,
        header,
        data: this.filterDataAddTitle(data),
        height,
        rowNum,
        headerHeight,
        headerBGC,
        oddRowBGC,
        evenRowBGC
      }
    },
    columnData() {
      const { header } = this
      const columnHeader = []
      header.forEach((column, index) => {
        if (header.indexOf(column) !== index) {
          columnHeader.push(column + ' '.repeat(index))
        } else {
          columnHeader.push(column)
        }
      })

      return columnHeader
    },
    tableData() {
      // console.log('触发了')
      const { header, data } = this

      const columnHeader = []
      header.forEach((column, index) => {
        if (header.indexOf(column) !== index) {
          columnHeader.push(column + ' '.repeat(index))
        } else {
          columnHeader.push(column)
        }
      })

      const tableBody = []
      data.forEach(element => {
        const obj = {}
        element.forEach((item, index) => {
          obj[columnHeader[index]] = item
        })
        tableBody.push(obj)
      })

      this.cleanLoading(tableBody.length !== 0)

      return tableBody
    }
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    /* 滚动表格组件的高度 */
    getScrollTableHeight() {
      return `min-height:calc(${this.rowHeight} * ${this.rowNum}px)`
    },
    /* 普通表格的高度 */
    getTableHeight() {
      return this.rowHeight * this.rowNum
    },

    /* 清空加载器 */
    cleanLoading(isClean) {
      if (isClean) {
        setTimeout(() => {
          this.$emit('cleanLoading')
        }, 1000)
      }
    },

    /* 将轮播列表中的数据过滤成有title提示 */
    filterDataAddTitle(data) {
      /* data是一个二维数组 */
      return data.map(item => {
        return item.map(text => {
          return `<span title="${text}">${text}</span>`
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/* 全局变量 */
$myTitle: 20px;
$myContent: 14px;
$tableHeight: 35px;

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

/* ===================element table end ==================== */

/* ===================datav scroll board start ==================== */

::v-deep .dv-scroll-board {
  color: #333;
  font-size: $myContent;
  text-align: center;
}

::v-deep .dv-scroll-board .header {
  font-size: $myContent;
  text-align: center;
  color: #000;
  line-height: $myTitle;
  position: relative;
}

::v-deep .dv-scroll-board .header::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #46bab1;
  left: 0px;
  bottom: 0px;
  z-index: 8;
}

::v-deep .dv-scroll-board .header .header-item {
  text-align: center;
}

::v-deep .dv-scroll-board .rows .row-item {
  font-size: $myContent;
  height: 50px;
  line-height: 50px;
}

::v-deep .dv-scroll-board .rows .ceil {
  text-align: center;
}

/* ===================datav scroll board end ==================== */

.common-table {
  position: relative;
}

.dv-loading.my-loading {
  position: absolute;
  z-index: 8;
  background-color: rgba(256, 256, 256, 0.75);
  width: 100%;
  height: 100%;
}

/* 全局样式 */
// ::v-deep ::-webkit-scrollbar {
//     width: 8px;
//     height: 8px;
//     // width: normal;
// }

/* 重置表格的滚动条 */
:v-deep .el-table__body-wrapper::-webkit-scrollbar {
  width: 11px !important;
  height: auto !important;
}

// :v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
// }

// :v-deep .el-table__body-wrapper::-webkit-scrollbar-button {
// }

// :v-deep .el-table__body-wrapper::-webkit-scrollbar-corner {
// }

// :v-deep .el-table__body-wrapper::-webkit-scrollbar-track {
// }

// :v-deep .el-table__body-wrapper::-webkit-scrollbar-track-piece {
// }
</style>
