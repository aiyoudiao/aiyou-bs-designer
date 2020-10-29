<template>
  <div class="content-wrapper">
    <div v-for="item in list" :key="item" class="content-item">
      <one-line
        :onoff="onoff"
        :date="date"
        @changeRadioValue="handleRadioValue"
        @changeDateTimeRange="handleDateTimeRange"
      />
      <two-line
        :onoff="onoff"
        :date="date"
        @changeRadioValue="handleRadioValue"
        @changeDateTimeRange="handleDateTimeRange"
      />
    </div>
  </div>
</template>

<script>
import OneLine from './one-line.vue'
import TwoLine from './two-line.vue'

export default {
  name: 'ContentView',
  components: {
    OneLine,
    TwoLine
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
      list: Array(1)
        .fill(1)
        .map((value, index) => {
          return 'item' + (index + 1)
        })
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
/* 全局变量 */
$myTitle: 20px;

.content-wrapper {
  width: 100%;
  overflow: hidden;

}
</style>
