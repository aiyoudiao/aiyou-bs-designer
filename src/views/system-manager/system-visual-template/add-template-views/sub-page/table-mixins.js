export default {
  props: {
    /* 父组件传递过来的 页面配置数据 */
    settingData: {
      type: [Array, Object],
      default: () => ({
        name: '', /* 名称 */
        table: [], /* 已添加的数据表格 */
        date: new Date(), /* 操作的时间 */
        submmitter: '' /* 操作人 */
      })
    }
  },
  watch: {
    matchTableData() {
      this.matchTableData.forEach(rowData => {
        if (this.isAddedExitisData(rowData)) {
          this.$set(rowData, 'state', 'added')
        } else {
          this.$set(rowData, 'state', null)
        }
      })
    },
    settingData() {
      this.matchTableData = this.settingData.table
    }
  },
  data() {
    return {
      matchTableData: Array(10)
        .fill(0)
        .map((value, index) => {
          return {
            id: 10 + 'match - ' + index,
            设备CI: '设备CI' + index,
            设备名称: '设备名称' + index,
            设备管理IP: new Date().toLocaleDateString()
          }
        }),
      matchPageNumber: 1,
      matchPageSize: 10,
      matchTotal: 200,
      addedTableData: Array(10)
        .fill(0)
        .map((value, index) => {
          return {
            id: 10 + 'added - ' + index,
            设备CI: '设备CI' + index,
            设备名称: '设备名称' + index,
            设备管理IP: new Date().toLocaleDateString(),
            state: 'added'
          }
        })
    }
  },

  methods: {
    /**
     * 处理 匹配到的内容表 中操作栏的`添加按钮`
     */
    handleMatchAddClick(rowData) {
      if (this.isAddedExitisData(rowData)) {
        return alert('已经有了哟')
      }
      this.changeRowData(rowData, 'added')
      this.addedTableData.push(rowData)
    },
    /**
     * 判断 已经添加的内容表 是否 存在这行数据
     */
    isAddedExitisData(rowData) {
      return this.addedTableData.findIndex(data => data.id === rowData.id) !== -1
    },
    /**
     * 处理 已添加的内容表 中操作栏的`删除按钮`
     */
    handleAddedDeleteClick(rowData) {
      const index = this.addedTableData.findIndex(data => data.id === rowData.id)
      const data = this.addedTableData.splice(index, 1)

      /* 找到当前匹配表中的对应数据 */
      // const result = []
      // data.forEach(value => {
      //   const temp = this.matchTableData.find(item => item.id === value.id)
      //   if (temp !== undefined) result.push(temp)
      // })

      /* 一般需要外面定义变量，就可以使用数组的reduce API */
      const result = data.reduce((monitor, value) => {
        const temp = this.matchTableData.find(item => item.id === value.id)
        if (temp !== undefined) monitor.push(temp)
        return monitor
      }, [])
      this.changeRowData(result, null)
    },
    /**
     * 变更 某个表格中 某一行或者多行数据的状态
     */
    changeRowData(rowData, state) {
      if (Object.prototype.toString.call(rowData) !== '[object Array]') {
        rowData = [rowData]
      }
      rowData.forEach(item => this.$set(item, 'state', state))
      return rowData
    },

    /**
     * 保存数据并展示
     */
    handleSaveAndView() {
      this.$emit('handleSaveAndView', this.addedTableData)
    }
  }
}
