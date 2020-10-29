<template>
  <div id="g6-chart" />
</template>

<script>
import G6, { Minimap, Grid } from '@antv/g6'

export default {
  mounted() {
    this.initData()
    this.render()
  },
  methods: {
    initData() {
      const data = {
        /* 点集合 */
        nodes: [{
          id: 'node1',
          x: 100,
          y: 200,
          label: '起始点',
          size: 60,
          labelCfg: {
            position: 'center' /* 默认是居中显示 */,
            style: {
              fontSize: 14,
              // fill: '#f2740c',
              stroke: '#0f0',
              lineWidth: 5
            }
          },
          /* 圆形的样式 */
          style: {
            fill: '#74f20c',
            stroke: '#0c74f2',
            lineWidth: 4
          }
        }, {
          id: 'node4',
          x: 300,
          y: 400,
          label: '目标点3',
          size: 70
        }, {
          id: 'node2',
          x: 300,
          y: 200,
          label: '目标点1',
          size: 80
        },
        {
          id: 'node3',
          x: 500,
          y: 200,
          label: '目标点2',
          size: 100
        }
        ],
        /* 边(线)集合 */
        edges: [
          {
            source: 'node1', /* 出发点 */
            target: 'node2', /* 目标点 */
            label: '连接线1' /* 连接线上的文字 */
          },
          {
            source: 'node1', /* 出发点 */
            target: 'node4', /* 目标点 */
            label: '连接线3' /* 连接线上的文字 */
          },
          {
            source: 'node2',
            target: 'node3',
            label: '连接线2'
          }
        ]
      }

      this.result = data
    },
    render() {
      /* 完成G6的初始化 */
      const graph = new G6.Graph({
        container: 'g6-chart',
        width: 800,
        height: 500,
        renderer: 'svg',
        animate: true
      })

      graph.data(this.result)
      graph.render()

      this.graph = graph
    }
  }
}
</script>

<style>

</style>
