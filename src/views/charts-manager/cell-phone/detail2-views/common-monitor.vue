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
        :picker-options="{format:'HH:mm', start:'00:00', end:'23:50', step:'00:10'}"
        :disabled-date="disabledDate"
        @change="changeDateTimeRange"
      />
    </div>
    <div class="onoff-wrapper">
      <el-radio-group
        v-model="radioSelect"
        :size="size"
        @change="changeRadioValue"
      >
        <el-radio-button label="开" border />
        <el-radio-button label="关" border />
      </el-radio-group>
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
      radioSelect: '开',
      dateValue: [start, end],
      disabledDate(date) {
        console.log('date', date)
      }
      // pickerOptions: {
      // selectableRange: ['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']

      // disableDate: (time) => {
      //   console.log('time', time)
      // }
      // }
    }
  },
  watch: {
    onoff() {
      this.radioSelect = this.onoff
    },
    date() {
      this.dateValue = [...this.date]
    }
  },
  methods: {
    // 初始化数据
    initData() {},
    /* 处理复选框的切换 */
    changeRadioValue(value) {
      this.$emit('changeRadioValue', {
        id: this.monitorId,
        value
      })
    },
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
::v-deep .el-time-panel.el-popper {
  width: 150px;
  background: red;
}

.monitor-wrapper {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .date-wrapper {
    position: relative;
    // z-index: 999999999;
    margin-right: 20px;
  }
}
</style>
