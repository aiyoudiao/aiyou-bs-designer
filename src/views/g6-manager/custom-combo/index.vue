<template>
  <div class="wrapper-container">
    <div id="g6-chart" />
  </div>
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
    regCombo() {
      /**
 * The demo shows customing a combo type by extending the built-in circle combo
 * by Shiwu
 *
 */

      // The symbols for the marker inside the combo
      const collapseIcon = (x, y, r) => {
        return [
          ['M', x - r, y],
          ['a', r, r, 0, 1, 0, r * 2, 0],
          ['a', r, r, 0, 1, 0, -r * 2, 0],
          ['M', x - r + 4, y],
          ['L', x - r + 2 * r - 4, y]
        ]
      }
      const expandIcon = (x, y, r) => {
        return [
          ['M', x - r, y],
          ['a', r, r, 0, 1, 0, r * 2, 0],
          ['a', r, r, 0, 1, 0, -r * 2, 0],
          ['M', x - r + 4, y],
          ['L', x - r + 2 * r - 4, y],
          ['M', x - r + r, y - r + 4],
          ['L', x, y + r - 4]
        ]
      }

      G6.registerCombo(
        'cCircle',
        {
          drawShape: function draw(cfg, group) {
            const self = this
            // Get the shape style, where the style.r corresponds to the R in the Illustration of Built-in Rect Combo
            const style = self.getShapeStyle(cfg)
            // Add a circle shape as keyShape which is the same as the extended 'circle' type Combo
            const circle = group.addShape('circle', {
              attrs: {
                ...style,
                x: 0,
                y: 0,
                r: style.r
              },
              draggable: true,
              name: 'combo-keyShape'
            })
            // Add the marker on the bottom
            group.addShape('marker', {
              attrs: {
                ...style,
                fill: '#fff',
                opacity: 1,
                x: 0,
                y: style.r,
                r: 10,
                symbol: collapseIcon
              },
              draggable: true,
              name: 'combo-marker-shape'
            })

            return circle
          },
          // Define the updating logic for the marker
          afterUpdate: function afterUpdate(cfg, combo) {
            const self = this
            // Get the shape style, where the style.r corresponds to the R in the Illustration of Built-in Rect Combo
            const style = self.getShapeStyle(cfg)
            const group = combo.get('group')
            // Find the marker shape in the graphics group of the Combo
            const marker = group.find((ele) => ele.get('name') === 'combo-marker-shape')
            // Update the marker shape
            marker.attr({
              x: 0,
              y: style.r,
              // The property 'collapsed' in the combo data represents the collapsing state of the Combo
              // Update the symbol according to 'collapsed'
              symbol: cfg.collapsed ? expandIcon : collapseIcon
            })
          }
        },
        'circle'
      )
    },
    regCombo2() {
      /**
 * The demo shows customing a combo type by extending the built-in circle combo
 * by Shiwu
 *
 */

      // The symbols for the marker inside the combo
      const collapseIcon = (x, y, r) => {
        return [
          ['M', x - r, y],
          ['a', r, r, 0, 1, 0, r * 2, 0],
          ['a', r, r, 0, 1, 0, -r * 2, 0],
          ['M', x - r + 4, y],
          ['L', x - r + 2 * r - 4, y]
        ]
      }
      const expandIcon = (x, y, r) => {
        return [
          ['M', x - r, y],
          ['a', r, r, 0, 1, 0, r * 2, 0],
          ['a', r, r, 0, 1, 0, -r * 2, 0],
          ['M', x - r + 4, y],
          ['L', x - r + 2 * r - 4, y],
          ['M', x - r + r, y - r + 4],
          ['L', x, y + r - 4]
        ]
      }

      G6.registerCombo(
        'cRect',
        {
          drawShape: function drawShape(cfg, group) {
            const self = this
            // Get the padding from the configuration
            cfg.padding = cfg.padding || [50, 20, 20, 20]
            // Get the shape's style, where the style.width and style.height correspond to the width and height in the figure of Illustration of Built-in Rect Combo
            const style = self.getShapeStyle(cfg)
            // Add a rect shape as the keyShape which is the same as the extended rect Combo
            const rect = group.addShape('rect', {
              attrs: {
                ...style,
                x: -style.width / 2 - (cfg.padding[3] - cfg.padding[1]) / 2,
                y: -style.height / 2 - (cfg.padding[0] - cfg.padding[2]) / 2,
                width: style.width,
                height: style.height
              },
              draggable: true,
              name: 'combo-keyShape'
            })
            // Add the circle on the right
            group.addShape('marker', {
              attrs: {
                ...style,
                fill: '#fff',
                opacity: 1,
                // cfg.style.width and cfg.style.heigth correspond to the innerWidth and innerHeight in the figure of Illustration of Built-in Rect Combo
                x: cfg.style.width / 2 + cfg.padding[1],
                y: (cfg.padding[2] - cfg.padding[0]) / 2,
                r: 10,
                symbol: collapseIcon
              },
              draggable: true,
              name: 'combo-marker-shape'
            })
            return rect
          },
          // Define the updating logic of the right circle
          afterUpdate: function afterUpdate(cfg, combo) {
            const group = combo.get('group')
            // Find the circle shape in the graphics group of the Combo by name
            const marker = group.find((ele) => ele.get('name') === 'combo-marker-shape')
            // Update the position of the right circle
            marker.attr({
              // cfg.style.width and cfg.style.heigth correspond to the innerWidth and innerHeight in the figure of Illustration of Built-in Rect Combo
              x: cfg.style.width / 2 + cfg.padding[1],
              y: (cfg.padding[2] - cfg.padding[0]) / 2,
              // The property 'collapsed' in the combo data represents the collapsing state of the Combo
              // Update the symbol according to 'collapsed'
              symbol: cfg.collapsed ? expandIcon : collapseIcon
            })
          }
        },
        'rect'
      )
    },
    regBehavior() {
      const Util = G6.Util
      const abs = Math.abs
      const DRAG_OFFSET = 10
      const body = document.body
      const ALLOW_EVENTS = [16, 17, 18]

      G6.registerBehavior('drag-canvas-exclude-lockedNode', {
        getDefaultCfg() {
          return {
            direction: 'both'
          }
        },
        getEvents() {
          return {
            'canvas:mousedown': 'onMouseDown',
            'canvas:mousemove': 'onMouseMove',
            'canvas:mouseup': 'onMouseUp',
            'canvas:click': 'onMouseUp',
            'canvas:mouseleave': 'onOutOfRange',
            keyup: 'onKeyUp',
            keydown: 'onKeyDown'
          }
        },
        updateViewport(e) {
          const origin = this.origin
          const clientX = +e.clientX
          const clientY = +e.clientY
          if (isNaN(clientX) || isNaN(clientY)) {
            return
          }
          let dx = clientX - origin.x
          let dy = clientY - origin.y
          if (this.get('direction') === 'x') {
            dy = 0
          } else if (this.get('direction') === 'y') {
            dx = 0
          }
          this.origin = {
            x: clientX,
            y: clientY
          }
          // 和内置 drag-canvas 不同的地方是在这里
          const lockedNodes = this.graph.findAll('node', (node) => !node.hasLocked())
          lockedNodes.forEach((node) => {
            node.get('group').translate(dx, dy)
          })
          this.graph.paint()
        },
        onMouseDown(e) {
          if (this.keydown) {
            return
          }

          this.origin = { x: e.clientX, y: e.clientY }
          this.dragging = false
        },
        onMouseMove(e) {
          if (this.keydown) {
            return
          }

          e = Util.cloneEvent(e)
          const graph = this.graph
          if (!this.origin) {
            return
          }
          if (this.origin && !this.dragging) {
            if (abs(this.origin.x - e.clientX) + abs(this.origin.y - e.clientY) < DRAG_OFFSET) {
              return
            }
            if (this.shouldBegin.call(this, e)) {
              e.type = 'dragstart'
              graph.emit('canvas:dragstart', e)
              this.dragging = true
            }
          }
          if (this.dragging) {
            e.type = 'drag'
            graph.emit('canvas:drag', e)
          }
          if (this.shouldUpdate.call(this, e)) {
            this.updateViewport(e)
          }
        },
        onMouseUp(e) {
          if (this.keydown) {
            return
          }

          if (!this.dragging) {
            this.origin = null
            return
          }
          e = Util.cloneEvent(e)
          const graph = this.graph
          if (this.shouldEnd.call(this, e)) {
            this.updateViewport(e)
          }
          e.type = 'dragend'
          graph.emit('canvas:dragend', e)
          this.endDrag()
        },
        endDrag() {
          if (this.dragging) {
            this.origin = null
            this.dragging = false
            // 终止时需要判断此时是否在监听画布外的 mouseup 事件，若有则解绑
            const fn = this.fn
            if (fn) {
              body.removeEventListener('mouseup', fn, false)
              this.fn = null
            }
          }
        },
        // 若在拖拽时，鼠标移出画布区域，此时放开鼠标无法终止 drag 行为。在画布外监听 mouseup 事件，放开则终止
        onOutOfRange(e) {
          if (this.dragging) {
            const self = this
            const canvasElement = self.graph.get('canvas').get('el')
            const fn = (ev) => {
              if (ev.target !== canvasElement) {
                self.onMouseUp(e)
              }
            }
            this.fn = fn
            body.addEventListener('mouseup', fn, false)
          }
        },
        onKeyDown(e) {
          const code = e.keyCode || e.which
          if (!code) {
            return
          }
          if (ALLOW_EVENTS.indexOf(code) > -1) {
            this.keydown = true
          } else {
            this.keydown = false
          }
        },
        onKeyUp() {
          this.keydown = false
        }
      })
    },
    regBehavior2() {
      const Util = G6.Util
      const DELTA = 0.05

      G6.registerBehavior('zoom-canvas-exclude-lockedNode', {
        getDefaultCfg() {
          return {
            sensitivity: 2,
            minZoom: 0.1,
            maxZoom: 10
          }
        },
        getEvents() {
          return {
            wheel: 'onWheel'
          }
        },
        onWheel(e) {
          e.preventDefault()
          // eslint-disable-next-line no-useless-call
          if (!this.shouldUpdate.call(this, e)) {
            return
          }
          const graph = this.graph
          const canvas = graph.get('canvas')
          const point = canvas.getPointByClient(e.clientX, e.clientY)
          const sensitivity = this.get('sensitivity')
          let ratio = graph.getZoom()
          // 兼容 IE、Firefox 及 Chrome
          if (e.wheelDelta < 0) {
            ratio = 1 - DELTA * sensitivity
          } else {
            ratio = 1 + DELTA * sensitivity
          }
          const zoom = ratio * graph.getZoom()
          if (zoom > this.get('maxZoom') || zoom < this.get('minZoom')) {
            return
          }
          graph.zoom(ratio, { x: point.x, y: point.y })
          const lockedNodes = this.graph.findAll('node', (node) => !node.hasLocked())
          lockedNodes.forEach((node) => {
            const matrix = Util.clone(node.get('group').getMatrix())
            const center = node.getModel()
            Util.mat3.translate(matrix, matrix, [-center.x, -center.y])
            Util.mat3.scale(matrix, matrix, [ratio, ratio])
            Util.mat3.translate(matrix, matrix, [center.x, center.y])
            node.get('group').setMatrix(matrix)
          })
          graph.paint()
          graph.emit('wheelzoom', e)
        }
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
            label: '起始点',
            size: 60,
            // type: 'rect',
            anchorPoints: [
              [0, 0.5],
              [1, 0.5]
            ],
            style: {
              stroke: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
              fill: 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff',
              background: {
                fill: '#ffffff',
                stroke: 'green',
                padding: [3, 2, 3, 2],
                radius: 2,
                lineWidth: 3
              }
            }
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
            // type: 'line-growth' /* 自定义边 */,
            // style: {
            //   endArrow: true,
            //   startArrow: true
            // },
            autoRotate: true,
            style: {
              stroke: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
              background: {
                fill: '#ffffff',
                stroke: '#000000',
                padding: [2, 2, 2, 2],
                radius: 2
              }
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
          },
          {
            id: 'custom-combo',
            label: '自定义分组',
            type: 'cCircle'
          },
          {
            id: 'custom-combo2',
            label: '自定义分组2',
            type: 'cRect'
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
      const tc = document.createElement('div')
      tc.id = 'toolbarContainer'
      document.querySelector('.wrapper-container').appendChild(tc)

      const toolbar = new G6.ToolBar({
        container: tc
        //     getContent: () => {
        //       return `
        //   <ul>
        //     <li code='add'>测试</li>
        //     <li code='undo'>撤销</li>
        //   </ul>
        // `
        //     },
        //     handleClick: (code, graph) => {
        //       if (code === 'add') {
        //         graph.addItem('node', {
        //           id: 'node2',
        //           label: 'node2',
        //           x: 300,
        //           y: 150
        //         })
        //       } else if (code === 'undo') {
        //         toolbar.undo()
        //       }
        //     }
      })

      const timebar = new G6.TimeBar({
        width: 600,
        timebar: {
          width: 600,
          backgroundStyle: {
            fill: '#08979c',
            opacity: 0.3
          },
          foregroundStyle: {
            fill: '#40a9ff',
            opacity: 0.4
          },
          trend: {
            data: [],
            isArea: false,
            smooth: true,
            lineStyle: {
              stroke: '#9254de'
            }
          }
        },
        rangeChange: (graph, min, max) => {
          // 拿到 Graph 实例和 timebar 上范围，自己可以控制图上的渲染逻辑
          console.log(graph, min, max)
        }
      })

      const fisheye = new G6.Fisheye({
        trigger: 'mousemove',
        d: 1.5,
        r: 300,
        showLabel: false
      })

      const filterLens = new G6.EdgeFilterLens({
        trigger: 'mousemove',
        r: 300,
        shouldShow: d => {
          return d.size > 10
        }
      })

      /* 完成G6的初始化 */
      const graph = new G6.Graph({
        container: 'g6-chart',
        width: document.querySelector('#g6-chart').scrollWidth,
        height: document.querySelector('#g6-chart').scrollHeight,
        groupByTypes: false,
        // renderer: 'svg',
        layout: {
          type: 'force',
          workerEnabled: true,
          linkDistance: 200, /* 节点之间的距离 */
          preventOverlap: true, /* 节点之间不层叠 */
          nodeStrength: -30, /* 节点之间的吸引力强度，负数表示排斥力强度 */
          edgeStrength: 0.05, /* 边之间的吸引力强度，负数表示排斥力强度 */
          nodeSize: 50
        },
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
            'drag-canvas-exclude-lockedNode',
            'zoom-canvas-exclude-lockedNode',
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
          ],
          edit: ['click-select']
        },
        plugins: [minimap, grid, toolbar, timebar, fisheye, filterLens] // 将 Minimap 和 Grid 插件的实例配置到图上
      })

      this.graph = graph

      /* 自定义节点和边 */

      this.regNode()
      this.regNode2()
      this.regEdge()
      this.regEdge2()
      this.regEdge3()
      this.regCombo()
      this.regCombo2()
      this.regBehavior()
      this.regBehavior2()

      graph.data(this.result)
      graph.render()

      this.graph.findAll('node', (node) => {
        console.log('find node', node)
        node.lock()
      })

      this.graph.findAll('edge', (edge) => {
        console.log('find edge', edge)
      })

      this.graph.findAll('combo', combo => {
        console.log('find combo', combo)
        combo.lock()
      })

      console.log(this.graph)

      // collapse/expand when click the marker
      this.graph.on('combo:click', (e) => {
        if (e.target.get('name') === 'combo-marker-shape') {
          // this.graph.collapseExpandCombo(e.item.getModel().id);
          this.graph.collapseExpandCombo(e.item)
          if (this.graph.get('layout')) this.graph.layout()
          else this.graph.refreshPositions()
        }
      })
    } }
}
</script>

<style>
#g6-chart {
  width: 100%;
  height: calc(100vh - 230px);
}

#toolbarContainer {
  position: relative;
}
</style>
