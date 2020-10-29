<template>
  <div class="navs-wrapper">
    <div class="back-left">
      <el-button type="text" icon="el-icon-arrow-left" size="large">返回</el-button>
    </div>
    <div class="navs-right">
      <common-monitor size="large" :onoff="onoff" :date="date" @changeRadioValue="handleRadioValue" @changeDateTimeRange="handleDateTimeRange" />
    </div>
  </div>
</template>

<script>

import CommonMonitor from './common-monitor.vue'

export default {
  name: 'NavsView',
  components: {
    CommonMonitor
  },
  props: {
    onoff: {
      type: String,
      default: '开'
    },
    date: {
      type: [Array],
      default: () => {
        const start = new Date()
        const end = new Date()

        start.setTime(start.getTime() - 1000 * 60 * 60 * 2)
        return [start, end]
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleRadioValue(value) {
      this.$emit('changeRadioValue', value)
    },
    handleDateTimeRange(value) {
      this.$emit('changeDateTimeRange', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.navs-wrapper {
  box-sizing: border-box;
  margin-top: 20px;
  height: 50px;
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  position: relative;

  .back-left {
    position: absolute;
    // top: 0px;
    left: 0px;
  }

  .navs-right {
    position: absolute;
    top: 0px;
    right: 0px;
  }
}
</style>
