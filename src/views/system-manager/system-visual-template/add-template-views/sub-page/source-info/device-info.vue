<template>
  <div class="device-info">
    <nav-view
      :input-value="searchInput"
      :value="selectValue"
      :options="selectList"
      @handleSelectChange="handleSelectChange"
      @handleSearchChange="handleSearchChange"
    />
    <match-view
      :column-data="matchColumnData"
      :table-data="matchTableData"
      :page-number="matchPageNumber"
      :page-size="matchPageSize"
      :total="matchTotal"
      @handlePageSizeChange="handleMatchPageSizeChange"
      @handlePageNumberChange="handleMatchPageNumberChange"
      @handleAddClick="handleMatchAddClick"
    />
    <added-view
      :column-data="addedColumnData"
      :table-data="addedTableData"
      @handleDeleteClick="handleAddedDeleteClick"
    />
    <el-row>
      <el-button type="primary" @click="handleSaveAndView">确认</el-button>
    </el-row>
  </div>
</template>

<script>

import NavView from '../sub-page-views/nav-view'
import MatchView from '../sub-page-views/match-view'
import AddedView from '../sub-page-views/added-view'
import tableMixins from '../table-mixins.js'

export default {
  components: {
    'nav-view': NavView,
    'match-view': MatchView,
    'added-view': AddedView
  },
  mixins: [tableMixins],
  data() {
    return {
      selectValue: 'device-name',
      selectList: [
        {
          value: 'device-name',
          label: '设备名称'
        },
        {
          value: 'region-name',
          label: '区域名称'
        },
        {
          value: 'device-manager',
          label: '设备管理人'
        }
      ],
      searchInput: '',

      matchColumnData: [
        '设备CI',
        '设备名称',
        '设备管理IP'
      ],
      addedColumnData: [
        '设备CI',
        '设备名称',
        '设备管理IP'
      ],
      matachTableURL: ''
    }
  },
  methods: {
    handleSelectChange(value) {
      this.selectValue = value

      /* TODO 发送请求，拿到数据，填充数据 */
    },
    handleSearchChange(value) {
      this.searchInput = value
      /* TODO 发送请求，拿到数据，填充数据 */
    },

    /**
     * 处理 匹配到的内容表 中的pagesize变更
     */
    handleMatchPageSizeChange(pageSize) {
      this.matchPageSize = pageSize

      /* TODO 发送请求，拿到数据，填充数据 */
    },
    /**
     * 处理 匹配到的内容表 中的pageNumber变更
     */
    handleMatchPageNumberChange(pageNumber) {
      this.matchPageNumber = pageNumber
      const count = 10 * pageNumber
      this.matchTableData = Array(10)
        .fill(0)
        .map((value, index) => {
          return {
            id: count + 'match - ' + index,
            设备CI: '设备CI' + index,
            设备名称: '设备名称' + index,
            设备管理IP: new Date().toLocaleDateString()
          }
        })

      /* TODO 发送请求，拿到数据，填充数据 */
    }
  }
}
</script>

<style lang="scss">
.device-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  .el-row {
    padding: 15px 20px 0px 0px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
  }
}
</style>
