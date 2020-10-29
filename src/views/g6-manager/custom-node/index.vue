<template>
  <div id="g6-chart" />
</template>

<script>
import G6, { Minimap, Grid } from '@antv/g6'

export default {
  data() {
    return {

    }
  },
  mounted() {
    this.initData()
    this.render()
  },
  methods: {
    regNode2() {
      const percentageBar = ({ width, used, height = 12 }) => `
          <rect style={{
            marginLeft: 10,
            marginTop: 3,
            width: ${width},
            height: ${height},
            fill: '#fff',
            stroke: '#1890ff'
          }} name="body" >
            <rect style={{
              marginLeft: 10,
              width: ${(width / 100) * used},
              height: ${height},
              fill: '#1890ff',
              stroke: '#1890ff'
            }}/>
          </rect>
        `

      const textXML = cfg => `
          <group>
            <rect style={{
              width: 100, height: 20, fill: '#1890ff', stroke: '#1890ff', radius: [6, 6, 0, 0]
            }}>
              <text style={{ marginTop: 2, marginLeft: 50,
                textAlign: 'center',
                fontWeight: 'bold',
                fill: '#fff' }}>${cfg.id}</text>
            </rect>
            <rect style={{ width: 100, height: 80, fill: 'rgba(24,144,255,0.15)',
              radius: [0, 0, 6, 6] }}
              keyshape="true"
              cursor="move">
              <text style={{marginLeft: 10 ,fill: "red"}}>FULL</text>
              <text style={{ marginTop: 5, marginLeft: 10, fill: '#333'}}>${cfg.metric}: </text>
              <text style={{
                marginTop: 1,
                marginLeft: 0,
                fontSize: 10,
                fill: '#1890ff',
              }}>${cfg.cpuUsage}%</text>
              ${percentageBar({ width: 80, used: cfg.cpuUsage })}
            </rect>
          </group>
        `

      G6.registerNode('test', {
        jsx: textXML
      })
    },
    regNode() {
      G6.registerNode(
        'rect-xml',
        cfg => `
          <rect style={{
            width: 100, height: 20, fill: '#1890ff', stroke: '#1890ff', radius: [6, 6, 0, 0]
          }} keyshape="true" name="test">
            <text style={{
              marginTop: 2,
              marginLeft: 50,
              textAlign: 'center',
              fontWeight: 'bold',
              fill: '#fff' }}
              name="title">${cfg.label || cfg.id}</text>
            <polygon style={{
              points:[[ 30, 30 ], [ 40, 20 ], [ 30, 50 ], [ 60, 100 ]],
                  fill: 'red'
            }} />
                <polyline style={{ points: [[ 30, 30 ], [ 40, 20 ], [ 60, 100 ]] }} />
                <image style={{ img: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png', width: 48, height: 48, marginTop: 100 }} />
          </rect>
        `
      )
    },
    regEdge() {
      G6.registerEdge('hvh', {
        draw(cfg, group) {
          const startPoint = cfg.startPoint
          const endPoint = cfg.endPoint
          const shape = group.addShape('path', {
            attrs: {
              stroke: '#333',
              path: [
                ['M', startPoint.x, startPoint.y],
                ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y], // 三分之一处
                ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y], // 三分之二处
                ['L', endPoint.x, endPoint.y]
              ]
            },
            // must be assigned in G6 3.3 and later versions. it can be any value you want
            name: 'path-shape'
          })
          return shape
        }
      })
    },
    /* 继承三次贝塞尔曲线的边，实现自己的边 */
    regEdge2() {
      G6.registerEdge(
        'line-growth',
        {
          afterDraw(cfg, group) {
            const shape = group.get('children')[0]
            const length = shape.getTotalLength()
            shape.animate(
              (ratio) => {
                const startLen = ratio * length
                const cfg = {
                  lineDash: [startLen, length - startLen]
                }
                return cfg
              },
              {
                repeat: true,
                duration: 2000
              }
            )
          }
        },
        'cubic'
      )
    },
    regEdge3() {
      G6.registerEdge(
        'custom-edge',
        {
          // 响应状态变化
          setState(name, value, item) {
            const group = item.getContainer()
            const shape = group.get('children')[0] // 顺序根据 draw 时确定
            if (name === 'active') {
              if (value) {
                shape.attr('stroke', 'red')
              } else {
                shape.attr('stroke', '#333')
              }
            }
            if (name === 'selected') {
              if (value) {
                shape.attr('lineWidth', 3)
              } else {
                shape.attr('lineWidth', 2)
              }
            }
          }
        },
        'line'
      )

      // 点击时选中，再点击时取消
      this.graph.on('edge:click', (ev) => {
        console.log('ev', ev)
        const edge = ev.item
        this.graph.setItemState(edge, 'selected', !edge.hasState('selected')) // 切换选中
      })

      this.graph.on('edge:mouseenter', (ev) => {
        const edge = ev.item
        this.graph.setItemState(edge, 'active', true)
      })

      this.graph.on('edge:mouseleave', (ev) => {
        const edge = ev.item
        this.graph.setItemState(edge, 'active', false)
      })
    },
    initData() {
      const data = {
        /* 点集合 */
        nodes: [
          {
            id: 'node1',
            x: 100,
            y: 200,
            // label: '起始点',
            // size: 60,
            type: 'test',
            anchorPoints: [
              [0, 0.5],
              [1, 0.5]
            ]
          },
          {
            id: 'node4',
            x: 300,
            y: 400,
            label: '目标点3',
            size: 70,
            type: 'test',
            anchorPoints: [
              [0, 0.5],
              [1, 0.5]
            ],

            comboId: 'combo'
          },
          {
            id: 'node2',
            x: 300,
            y: 200,
            label: '目标点1',
            size: 80,
            type: 'test',
            comboId: 'combo'
          },
          {
            id: 'node3',
            x: 500,
            y: 200,
            label: '目标点2',
            size: 100,
            type: 'test'
          }
        ],
        /* 边(线)集合 */
        edges: [
          {
            source: 'node1' /* 出发点 */,
            target: 'node2' /* 目标点 */,
            label: '连接线1' /* 连接线上的文字 */,
            type: 'line-growth' /* 自定义边 */,
            style: {
              endArrow: true,
              startArrow: true
            }
          },
          {
            source: 'node1' /* 出发点 */,
            target: 'node4' /* 目标点 */,
            label: '连接线3' /* 连接线上的文字 */,
            type: 'custom-edge' /* 自定义边 */,
            style: {
              endArrow: true,
              startArrow: true
            }
          },
          {
            source: 'node2',
            target: 'node3',
            label: '连接线2',
            type: 'hvh' /* 自定义边 */,
            style: {
              endArrow: true,
              startArrow: true
            }
          }
        ],
        /* 联合点的集合 */
        combos: [
          {
            id: 'combo',
            label: '简单分组 '
          },
          {
            id: 'comboParent',
            label: '简单分组 rect',
            type: 'rect',
            labelCfg: {
              position: 'bottom',
              refX: 5,
              refY: -12,
              style: {
                fill: '#fff'
              }
            },
            style: {
              fill: '#fa8c16',
              stroke: '#000',
              lineWidth: 2
            }
          },
          {
            id: 'combo2',
            label: '简单分组2 rect',
            type: 'rect',
            style: {
              fill: '#eaff8f',
              stroke: '#bae637',
              lineWidth: 5
            },
            labelCfg: {
              position: 'bottom',
              refX: -12,
              style: {
                fill: '#bae637',
                fontSize: 15
                // ... 其他文本样式的配置
              }
            }
          }
        ]
      }

      this.result = data
    },
    render() {
      // 实例化 Minimap 插件
      const minimap = new Minimap({
        size: [100, 100],
        className: 'minimap',
        type: 'delegate'
      })

      // 实例化 Grid 插件
      const grid = new Grid()
      /* 完成G6的初始化 */
      const graph = new G6.Graph({
        container: 'g6-chart',
        width: document.querySelector('#g6-chart').scrollWidth,
        height: document.querySelector('#g6-chart').scrollHeight,
        groupByTypes: false,
        // renderer: 'svg',
        animate: true,
        defaultCombo: {
          // ... Combo 其他属性
          labelCfg: {
            position: 'left',
            refX: 5,
            style: {
              fill: '#bae637',
              fontSize: 15
              // ... 其他文本样式的配置
            }
          },
          style: {
            fill: '#eaff8f',
            stroke: '#bae637',
            lineWidth: 5
          }
        },
        defaultEdge: {
          style: {
            endArrow: {
              // 自定义箭头指向(0, 0)，尾部朝向 x 轴正方向的 path
              path: 'M 0,0 L 20,10 L 20,-10 Z',
              // 箭头的偏移量，负值代表向 x 轴正方向移动
              // d: -10,
              // v3.4.1 后支持各样式属性
              fill: '#333',
              stroke: '#666',
              opacity: 0.8
              // ...
            }
          }
        },
        modes: {
          default: [
            'drag-node',
            'drag-canvas',
            'zoom-canvas',
            'drag-combo',
            'collapse-expand-combo',
            /*  {
              type: 'brush-select',
              trigger: 'drag'
            }, */
            // 点提示框交互工具的配置
            {
              type: 'tooltip',
              formatText(model) {
                const text =
                  'label: ' + model.label
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
                  model.target
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

      /* 自定义节点和边 */

      this.regNode()
      this.regNode2()
      this.regEdge()
      this.regEdge2()
      this.regEdge3()
      graph.data(this.result)
      graph.render()
    }
  }
}
</script>

<style>
#g6-chart {
  width: 100%;
  height: calc(100vh - 230px);
}
</style>
