<template>
  <div class="wrapper">
    <el-radio-group v-model="radioSelect" size="small" @change="changeRadioValue">
      <el-radio-button v-for="item of selectList" :key="item" :label="item" border />
    </el-radio-group>
    <div id="mountNode" />

  </div>
</template>

<script>
import G6, { Minimap, Grid } from '@antv/g6'

export default {
  data() {
    return {
      selectList: [
        `Random Layout：随机布局`,
        `Force Layout：经典力导向布局`,
        `Circular Layout：环形布局`,
        `Radial Layout：辐射状布局`,
        `MDS Layout：高维数据降维算法布局`,
        `Fruchterman Layout：Fruchterman 布局，一种力导布局`,
        `Dagre Layout：层次布局`,
        `Concentric Layout：同心圆布局，将重要（默认以度数为度量）的节点放置在布局中心`,
        `Grid Layout：格子布局，将节点有序（默认是数据顺序）排列在格子上`,
        `Combo Force Layout：V3.5 新增。适用于带有 combo 图的力导向布局，推荐有 combo 的图使用该布局`
      ],
      kernelList: [
        'random',
        'force',
        'circular',
        'radial',
        'mds',
        'fruchterman',
        'dagre',
        'concentric',
        'grid',
        'comboForce'
      ],
      radioSelect: 'Force Layout：经典力导向布局',
      graph: {},
      result: {}
    }
  },
  async mounted() {
    this.initData()
    await this.render()
  },

  methods: {
    changeRadioValue(val) {
      const index = this.selectList.findIndex(value => value === val)
      const layout = this.kernelList[index]
      // this.graph.updateLayout(layout)
      this.graph.updateLayout({
        type: layout,
        linkDistance: 200, /* 节点之间的距离 */
        preventOverlap: true, /* 节点之间不层叠 */
        nodeStrength: -30, /* 节点之间的吸引力强度，负数表示排斥力强度 */
        edgeStrength: 0.05, /* 边之间的吸引力强度，负数表示排斥力强度 */
        nodeSize: 50
      })

      /* 切换另一组新数据 */
      // this.graph.changeData(data2)
    },
    initData() {
      // 实例化 Minimap 插件
      const minimap = new Minimap({
        size: [100, 100],
        className: 'minimap',
        type: 'delegate'
      })

      // 实例化 Grid 插件
      const grid = new Grid()
      const graph = new G6.Graph({
        container: 'mountNode',
        animate: true,
        width: document.querySelector('#mountNode').scrollWidth,
        height: document.querySelector('#mountNode').scrollHeight,
        defaultNode: {
          labelCfg: {
            style: {
              fill: '#fff'
            }
          }
        },
        defaultEdge: {
          labelCfg: {
            autoRotate: true
          }
        },
        nodeStateStyles: {
          hover: {
            fill: 'lightsteelblue'
          },
          click: {
            stroke: '#000',
            lineWidth: 3
          }
        },
        edgeStateStyles: {
          click: {
            stroke: 'steelblue'
          }
        },
        layout: {
          type: 'force',
          linkDistance: 200, /* 节点之间的距离 */
          preventOverlap: true, /* 节点之间不层叠 */
          nodeStrength: -30, /* 节点之间的吸引力强度，负数表示排斥力强度 */
          edgeStrength: 0.05, /* 边之间的吸引力强度，负数表示排斥力强度 */
          nodeSize: 50
        },
        modes: {
          default: [
            'drag-node',
            'drag-canvas',
            'zoom-canvas',
            /*  {
              type: 'brush-select',
              trigger: 'drag'
            }, */
            // 点提示框交互工具的配置
            {
              type: 'tooltip',
              formatText(model) {
                const text =
                  'label: ' + model.label + '<br/> class: ' + model.class
                return text
              },
              shouldUpdate: e => {
                return true
              }
            },
            // 边提示框交互工具的配置
            {
              type: 'edge-tooltip',
              formatText(model) {
                const text =
                  'source: ' +
                  model.source +
                  '<br/> target: ' +
                  model.target +
                  '<br/> weight: ' +
                  model.weight
                return text
              },
              shouldUpdate: e => {
                return true
              }
            }
          ]
        },
        plugins: [minimap, grid] // 将 Minimap 和 Grid 插件的实例配置到图上
      })

      this.graph = graph
      this.result = {
        nodes: [
          { id: '0', label: 'n0', class: 'c0', x: 1000, y: -100 },
          { id: '1', label: 'n1', class: 'c0', x: 300, y: -10 },
          { id: '2', label: 'n2', class: 'c0', x: 10, y: 10 },
          { id: '3', label: 'n3', class: 'c0', x: 320, y: -100 },
          { id: '4', label: 'n4', class: 'c0', x: 100, y: 900 },
          { id: '5', label: 'n5', class: 'c0', x: 120, y: 213 },
          { id: '6', label: 'n6', class: 'c1', x: 543, y: 12 },
          { id: '7', label: 'n7', class: 'c1', x: 543, y: -100 },
          { id: '8', label: 'n8', class: 'c1', x: 1, y: 0 },
          { id: '9', label: 'n9', class: 'c1', x: 0, y: -222 },
          { id: '10', label: 'n10', class: 'c1', x: 435, y: 69 },
          { id: '11', label: 'n11', class: 'c1', x: 23, y: 10 },
          { id: '12', label: 'n12', class: 'c1', x: -129, y: 39 },
          { id: '13', label: 'n13', class: 'c2', x: 234, y: 843 },
          { id: '14', label: 'n14', class: 'c2', x: -301, y: 129 },
          { id: '15', label: 'n15', class: 'c2', x: -20, y: -76 },
          { id: '16', label: 'n16', class: 'c2', x: 1220, y: -34 },
          { id: '17', label: 'n17', class: 'c2', x: -10, y: 954 },
          { id: '18', label: 'n18', class: 'c2', x: 492, y: 123 },
          { id: '19', label: 'n19', class: 'c2', x: 123, y: -241 }
        ],
        edges: [
          { source: '0', target: '1', label: 'e0-1', weight: 1 },
          { source: '0', target: '2', label: 'e0-2', weight: 2 },
          { source: '0', target: '3', label: 'e0-3', weight: 3 },
          { source: '0', target: '4', label: 'e0-4', weight: 1.4 },
          { source: '0', target: '5', label: 'e0-5', weight: 2 },
          { source: '0', target: '7', label: 'e0-7', weight: 2 },
          { source: '0', target: '8', label: 'e0-8', weight: 2 },
          { source: '0', target: '9', label: 'e0-9', weight: 1.3 },
          { source: '0', target: '10', label: 'e0-10', weight: 1.5 },
          { source: '0', target: '11', label: 'e0-11', weight: 1 },
          { source: '0', target: '13', label: 'e0-13', weight: 10 },
          { source: '0', target: '14', label: 'e0-14', weight: 2 },
          { source: '0', target: '15', label: 'e0-15', weight: 0.5 },
          { source: '0', target: '16', label: 'e0-16', weight: 0.8 },
          { source: '2', target: '3', label: 'e2-3', weight: 1 },
          { source: '4', target: '5', label: 'e4-5', weight: 1.4 },
          { source: '4', target: '6', label: 'e4-6', weight: 2.1 },
          { source: '5', target: '6', label: 'e5-6', weight: 1.9 },
          { source: '7', target: '13', label: 'e7-13', weight: 0.5 },
          { source: '8', target: '14', label: 'e8-14', weight: 0.8 },
          { source: '9', target: '10', label: 'e9-10', weight: 0.2 },
          { source: '10', target: '14', label: 'e10-14', weight: 1 },
          { source: '10', target: '12', label: 'e10-12', weight: 1.2 },
          { source: '11', target: '14', label: 'e11-14', weight: 1.2 },
          { source: '12', target: '13', label: 'e12-13', weight: 2.1 },
          { source: '16', target: '17', label: 'e16-17', weight: 2.5 },
          { source: '16', target: '18', label: 'e16-18', weight: 3 },
          { source: '17', target: '18', label: 'e17-18', weight: 2.6 },
          { source: '18', target: '19', label: 'e18-19', weight: 1.6 }
        ]
      }
    },
    async render() {
      // const response = await fetch('https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json')
      // const data = await response.json()
      const data = this.result
      console.log(data)
      const nodes = data.nodes
      const edges = data.edges
      nodes.forEach(node => {
        if (!node.style) {
          node.style = {}
        }
        node.style.lineWidth = 1
        node.style.stroke = '#666'
        node.style.fill = 'steelblue'
        switch (node.class) {
          case 'c0': {
            node.type = 'circle'
            node.size = 30
            break
          }
          case 'c1': {
            node.type = 'rect'
            node.size = [35, 20]
            break
          }
          case 'c2': {
            node.type = 'ellipse'
            node.size = [35, 20]
            break
          }
        }
      })
      edges.forEach(edge => {
        if (!edge.style) {
          edge.style = {}
        }
        edge.style.lineWidth = edge.weight
        edge.style.opacity = 0.6
        edge.style.stroke = 'grey'
      })

      this.graph.data(data)
      this.graph.render()

      this.graph.on('node:mouseenter', e => {
        const nodeItem = e.item
        this.graph.setItemState(nodeItem, 'hover', true)
      })
      this.graph.on('node:mouseleave', e => {
        const nodeItem = e.item
        this.graph.setItemState(nodeItem, 'hover', false)
      })
      this.graph.on('node:click', e => {
        const clickNodes = this.graph.findAllByState('node', 'click')
        clickNodes.forEach(cn => {
          this.graph.setItemState(cn, 'click', false)
        })
        const nodeItem = e.item
        this.graph.setItemState(nodeItem, 'click', true)
      })
      this.graph.on('edge:click', e => {
        const clickEdges = this.graph.findAllByState('edge', 'click')
        clickEdges.forEach(ce => {
          this.graph.setItemState(ce, 'click', false)
        })
        const edgeItem = e.item
        this.graph.setItemState(edgeItem, 'click', true)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#mountNode {
  width: 100%;
  height: calc(100vh - 270px);
}

::v-deep .g6-tooltip {
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  font-size: 12px;
  color: #545454;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 8px;
  box-shadow: rgb(174, 174, 174) 0px 0px 10px;
}
</style>
