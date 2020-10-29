<template>
  <div class="monitor-wrapper">
    <div class="date-wrapper">
      <el-date-picker
        v-model="dateValue"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :size="size"
        unlink-panels
        value-format="yyyy-MM-dd HH:mm:ss"
        @change="changeDateTimeRange"
      />
    </div>
  </div>
</template>

<script>
const start = new Date()
const end = new Date()

start.setTime(start.getTime() - 1000 * 60 * 60 * 2)

export default {
  name: 'MonitorWrapper',
  props: {
    size: {
      type: String,
      default: 'small'
    },
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
    },
    monitorId: {
      type: String,
      default: 'all'
    }
  },
  data() {
    return {
      dateValue: [start, end]
    }
  },
  watch: {
    date() {
      this.dateValue = [...this.date]
    }
  },
  methods: {
    // 初始化数据
    initData() {},

    /* 处理日期框中数据的改变 */
    changeDateTimeRange(value) {
      this.$emit('changeDateTimeRange', {
        id: this.monitorId,
        value
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.monitor-wrapper {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .date-wrapper {
    margin-right: 20px;
  }
}
</style>
