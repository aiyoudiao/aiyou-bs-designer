<template>
  <div class="cell-phone-detail">
    <navs-view
      @changeRadioValue="handleRadioValue"
      @handleSearchForm="handleSearchForm"
    />
    <table-view :table-data="tableData" @handleCellEvent="handleCellEvent" />
    <detail-view :table-detail-data="tableDetailData" @checkoutTableData="checkoutTableData" />
  </div>
</template>

<script>
import NavsView from './detail-views/navs-view.vue'
import TableView from './detail-views/table-view.vue'
import DetailView from './detail-views/detail-view.vue'

export default {
  name: 'CellPhoneDetail',
  components: {
    NavsView,
    TableView,
    DetailView
  },
  data() {
    return {
      tableData: [],
      tableDetailData: []
    }
  },
  methods: {
    /* 处理导航条的单选按钮 */
    handleRadioValue(data) {
      console.log('handleRadioValue', data)
      /* 发送请求，拿到数据，更新tableData和tableDetailData */
    },
    /* 处理表单的搜索提交 */
    handleSearchForm(data) {
      console.log('handleSearchForm', data)
      /* 发送请求，拿到数据，更新tableData和tableDetailData */
    },
    /* 处理表中每个可点击的单元格 */
    handleCellEvent(data) {
      console.log('handleCellEvent', data)
      /* 发送请求，拿到数据，更新tableDetailData */
    },
    /* 处理分页按钮 */
    checkoutTableData(data) {
      console.log('checkoutTableData', data)
      /* 发送请求，拿到数据，更新tableDetailData */
    },
    /* 初始化数据 */
    initPageData() {
      const tableData = this.getTableData()
      const tableDetailData = this.getTableDetailData()
      this.tableData = [...tableData]
      this.tableDetailData = [...tableDetailData]
    },

    /* 获取第二排table的数据 */
    getTableData() {

    },
    /* 获取第三排table的数据 */
    getTableDetailData() {

    }
  }
}
</script>

<style lang="scss" scoped>
.cell-phone-detail {
  width:100%;
  height: 100%;
  margin: 0;
  padding: 0 20px 0;
}
</style>
