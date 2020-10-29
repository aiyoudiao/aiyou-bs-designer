<template>
  <div class="cell-phone-detail">
    <navs-view
      :onoff="onoff"
      :date="date"
      @changeRadioValue="handleGlobalRadioValue"
      @changeDateTimeRange="handleGlobalDateTimeRange"
    />
    <div class="split-line" />
    <content-view
      :onoff="onoff"
      :date="date"
      @changeRadioValue="handleRadioValue"
      @changeDateTimeRange="handleDateTimeRange"
    />
  </div>
</template>

<script>
import NavsView from './detail2-views/navs-view.vue'
import ContentView from './detail2-views/content-view.vue'

const start = new Date()
const end = new Date()

start.setTime(start.getTime() - 1000 * 60 * 60 * 2)

export default {
  name: 'CellPhoneDetail2',
  components: {
    NavsView,
    ContentView
  },
  data() {
    return {
      /* 全局开关 */
      onoff: '开',
      /* 时间控件 */
      date: [start, end]
    }
  },
  methods: {
    /* 处理导航条的单选按钮 */
    handleGlobalRadioValue(data) {
      console.log('handleGlobalRadioValue', data)
      const { id, value } = data
      this.onoff = value

      /* 切换源数据 */
    },
    /* 处理日期框中数据的改变 */
    handleGlobalDateTimeRange(data) {
      console.log('handleGlobalDateTimeRange', data)
      const { id, value } = data
      this.date = value

      /* 发送请求，渲染数据 */
    },

    /* 处理导航条的单选按钮 */
    handleRadioValue(data) {
      console.log('handleRadioValue', data)

      // const { id, value } = data
      // this.onoff = value

      /* 切换源数据 */
    },
    /* 处理日期框中数据的改变 */
    handleDateTimeRange(data) {
      console.log('changeDateTimeRange', data)

      // const { id, value } = data
      // this.date = value

      /* 发送请求，渲染数据 */
    },
    /* 初始化数据 */
    initPageData() {}
  }
}
</script>

<style lang="scss" scoped>
.cell-phone-detail {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0 20px 0;
  .split-line {
    width: 100%;
    height: 0;
    border: 1px solid #999;
  }
}
</style>
