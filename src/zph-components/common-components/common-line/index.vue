<!--
 * @Descripttion: 通用折线图
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-08-26 00:49:22
 * @LastEditTime: 2020-08-30 20:17:50
 * @LastEditors: aiyoudiao
 * @FilePath: \code\src\components\common-components\common-line\index.vue
-->
<template>
  <div ref="lineContainer" class="common-line">
    <dv-loading
      v-if="loading"
      class="my-line-loading"
    >努力加载中...</dv-loading>
    <template v-if="normal">
      <!-- 普通折线图 -->
      <ve-line
        ref="chart"
        :data="chartData"
        :extend="extendsData"
        :theme="theme"
      />
    </template>
    <template v-else>
      <!-- 带阴影面积的折线图 -->
      <ve-line
        ref="chart"
        :data="chartData"
        :settings="chartSettings"
        :theme="theme"
        :extend="extendsData"
      />
    </template>
  </div>
</template>

<script>
import theme from '../walden.json'

export default {
  name: 'CommonLine',
  props: {
    normal: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: true
    },
    /* 哪些图例不显示 */
    legendHides: {
      type: [Array],
      default: () => []
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
    settings: {
      type: [Object],
      default: () => ({
        stack: {
          'this.header[0]': ['this.header[this.header.length - 1']
        },
        area: true
      })
    },
    extendConfig: {
      type: [Object],
      default: () => ({
        legend: {
          // 可查看官方配置文档，left：'center'的意思是居中
          left: 'center',
          // 垂直排列
          orient: 'horizontal',
          // 设置高度
          width: '80%'
        },

        series: {
          label: {
            normal: {
              show: false
            }
          },
          connectNulls: true
        },
        visualMap: {
          show: true,
          min: 0, // 最小值
          max: 10, // 最大值
          calculable: true, // 是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
          inRange: {
            color: [
              '#0487ED',

              '#C7C52C',

              '#E26B5B',

              '#3EB177',

              '#794EDC',

              '#B46B2A'
            ] // 颜色
          },

          textStyle: {
            color: '#fff'
          }
        }
      })
    }
  },
  data() {
    return {
      theme
    }
  },
  computed: {
    chartData() {
      const { header, data } = this

      this.cleanLoading(data.length !== 0 && header.length !== 0)

      return {
        columns: header,
        rows: data
      }
    },

    chartSettings() {
      const { settings } = this

      return settings
    },

    extendsData() {
      const { extendConfig } = this

      const customExtends = {
        grid: {
          left: '2%',
          right: '2%',
          top: '15%',
          botom: '0',
          width: 'auto',
          containLabel: true
        }
      }

      const data = Object.assign(customExtends, extendConfig)
      data.legend.selected = this.legendHides.reduce((prev, name) => {
        prev[name] = false
        return prev
      }, {})
      console.log(data)

      return data
    },

    isResize() {
      return this.$store.state.app.sidebar.opened
    }
  },
  watch: {
    isResize() {
      setTimeout(() => {
        this.$refs.chart.echarts.resize()
      }, 500)
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    /* 重置图表 */
    /* 清空加载器 */
    cleanLoading(isClean) {
      if (isClean) {
        setTimeout(() => {
          this.$emit('cleanLoading')
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/* 全局变量 */
$myTitle: 20px;
$myContent: 14px;
$tableHeight: 35px;

.common-line {
  position: relative;
}

.dv-loading.my-line-loading {
  position: absolute;
  z-index: 999999;
  background-color: rgba(256, 256, 256, 0.75);
  width: 100%;
  height: 100%;
}
</style>
