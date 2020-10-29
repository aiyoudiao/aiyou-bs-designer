<template>
  <div v-loading="loading" class="topology">
    <!-- container -->
    <el-row :class="graphBg" style="height: 100%" @contextmenu.native.prevent>
      <!-- toolbar -->
      <div v-if="toolbarShow && graphMode === 'edit'">
        <toolbar-edit />
      </div>
      <div v-else-if="toolbarShow">
        <toolbar-preview ref="toolbarPreview" />
      </div>
      <!-- graph-container -->
      <el-col
        ref="graphContainer"
        class="graph-container"
        :span="graphMode === 'edit' && graphPanelShow === true ? 19 : 24"
      >
        <div
          id="mount-topology"
          :style="{overflow: 'hidden'}"
          @dragenter="dragenterHandler"
          @dragover="dragoverHandler"
          @drop="dropHandler"
        />
        <div
          v-show="rightMenuShow"
          ref="rightMenu"
          class="right-menu"
          @contextmenu.prevent
        >
          <ul v-if="currentFocus === 'node' && selectedNodes.length > 1">
            <li @click="alignHandler('horizontal')">水平对齐</li>
            <li @click="alignHandler('vertical')">垂直对齐</li>
            <li @click="createComboHandler">创建分组</li>
          </ul>
          <ul v-else-if="currentFocus === 'combo'">
            <li @click="removeComboHandler">移除分组</li>
          </ul>
        </div>
        <div
          v-if="graphMode === 'edit'"
          :class="graphPanelShow ? 'collapse-opened' : 'collapse-closed'"
          @click="toggleCollapse"
        >
          <div class="collapse-bg"><span /></div>
          <div class="collapse">
            <span class="el-icon-d-arrow-left" />
            <span class="el-icon-d-arrow-right" />
          </div>
        </div>
      </el-col>
      <!-- graph-pannel -->
      <el-col
        v-if="graphMode === 'edit' && graphPanelShow === true"
        class="graph-pannel"
        :span="5"
      >
        <!-- 聚焦到节点处 -->
        <div v-if="currentFocus === 'node'">
          <div class="pannel-title">节点</div>
          <div class="pannel-body">
            <span>节点标签</span>
            <el-input
              v-model="selectedNodeParams.label"
              class="params-input"
              size="mini"
            />
            <!--<input class="params-input" type="text" autocomplete="off" v-model="selectedNodeParams.label"/>-->
            <div v-for="(value, key) in nodeAppConfig" :key="key">
              <span>{{ value }}</span>
              <el-input
                v-model="selectedNodeParams.appConfig[key]"
                class="params-input"
                size="mini"
              />
              <!--<input class="params-input" type="text" autocomplete="off" v-model="selectedNodeParams.appConfig[key]"/>-->
            </div>
          </div>
        </div>
        <!-- 聚焦到边上 -->
        <div v-else-if="currentFocus === 'edge'">
          <div class="pannel-title">连线</div>
          <div class="pannel-body">
            <span>连线标签</span>
            <el-input
              v-model="selectedEdgeParams.label"
              class="params-input"
              size="mini"
            />
            <!--<input class="params-input" type="text" autocomplete="off" v-model="selectedEdgeParams.label"/>-->
            <div v-for="(value, key) in edgeAppConfig" :key="key">
              <span>{{ value }}</span>
              <el-input
                v-model="selectedEdgeParams.appConfig[key]"
                class="params-input"
                size="mini"
              />
              <!--<input class="params-input" type="text" autocomplete="off" v-model="selectedEdgeParams.appConfig[key]"/>-->
            </div>
          </div>
        </div>
        <!-- 聚焦到联合体上 -->
        <div v-else-if="currentFocus === 'combo'">
          <div class="pannel-title">分组</div>
          <div class="pannel-body">
            <span>分组标签</span>
            <el-input
              v-model="selectedComboParams.label"
              class="params-input"
              size="mini"
            />
            <span>标签位置</span>
            <el-select
              v-model="selectedComboParams.labelPosition"
              class="params-select"
              placeholder="请选择"
              size="mini"
            >
              <el-option label="top" value="top" />
              <el-option label="left" value="left" />
              <el-option label="right" value="right" />
              <el-option label="bottom" value="bottom" />
              <el-option label="center" value="center" />
            </el-select>
            <span>水平偏移</span>
            <el-input-number
              v-model="selectedComboParams.labelRefX"
              class="params-input-number"
              :controls="false"
              :min="-100"
              :max="100"
              label="标签水平方向偏移"
              size="mini"
            />
            <span>垂直偏移</span>
            <el-input-number
              v-model="selectedComboParams.labelRefY"
              class="params-input-number"
              :controls="false"
              :min="-100"
              :max="100"
              label="标签水平方向偏移"
              size="mini"
            />
            <span>分组形状</span>
            <el-select
              v-model="selectedComboParams.type"
              class="params-select"
              placeholder="请选择"
              size="mini"
            >
              <el-option label="circle" value="circle" />
              <el-option label="rect" value="rect" />
            </el-select>
          </div>
        </div>
        <!-- 聚焦到画布上 -->
        <div v-else>
          <div class="pannel-title">画布</div>
          <div class="pannel-body">
            <div
              v-for="nodeType in nodeTypeList"
              :key="nodeType.guid"
              class="node-type"
            >
              <img
                :src="nodeType.imgSrc"
                :alt="nodeType.label"
                :title="nodeType.desc"
                :draggable="true"
                @dragstart="dragstartHandler($event, nodeType)"
                @dragend="dragendHandler"
              >
              <label>{{ nodeType.label }}</label>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from 'lodash'
import G6 from '@antv/g6'
import ToolbarPreview from './toolbar-preview'
import ToolbarEdit from './toolbar-edit'
import registerEdge from './edge'
import ccNode from './node'
import ccBehavior from './behavior'
import config from './config'
import theme from './theme'
import initGraph from './graph'
import utils from './utils'

registerEdge(G6)
ccNode.register(G6)
ccBehavior.register(G6)

export default {
  name: 'Topology',
  components: {
    'toolbar-preview': ToolbarPreview,
    'toolbar-edit': ToolbarEdit
  },
  props: {
    nodeTypeList: {
      type: Array,
      default: () => {
        return [
          { guid: 'blue', label: '服务器', desc: '服务器', imgSrc: require('@/assets/images/server.png') },
          { guid: 'green', label: '数据库', desc: '数据库', imgSrc: require('@/assets/images/database.png') },
          { guid: 'purple', label: '防火墙', desc: '防火墙', imgSrc: require('@/assets/images/firewall.png') },
          { guid: 'yellow', label: '客户端', desc: '客户端', imgSrc: require('@/assets/images/client.png') }
        ]
      }
    },
    nodeAppConfig: {
      type: Object,
      default: () => {
        return {}
      }
    },
    edgeAppConfig: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      graphPanelShow: true,
      graphBg: 'default-style',
      toolbarShow: true,
      rightMenuShow: false,
      graphData: {
        nodes: [],
        edges: []
      },
      loading: false,
      clientWidth:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
      clientHeight:
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight,
      edgeShapeList: [
        { guid: 'cc-line', label: '直线', class: 'iconfont icon-flow-line' },
        {
          guid: 'cc-brokenline',
          label: '折线',
          class: 'iconfont icon-flow-broken'
        },
        {
          guid: 'cc-polyline',
          label: '多段线',
          class: 'iconfont icon-flow-broken'
        },
        { guid: 'cc-cubic', label: '曲线', class: 'iconfont icon-flow-curve' }
      ],
      graph: null,
      minimap: null,
      graphMode: 'preview',
      currentEdgeShape: {
        guid: 'cc-line',
        label: '直线'
      },
      currentFocus: 'canvas',
      selectedNode: null,
      selectedNodeParams: {
        label: '',
        appConfig: this.nodeAppConfig
      },
      selectedNodeParamsTimeout: null,
      selectedEdge: null,
      selectedEdgeParams: {
        label: '',
        appConfig: this.edgeAppConfig
      },
      selectedEdgeParamsTimeout: null,
      selectedCombo: null,
      selectedComboParams: {
        label: '',
        labelPosition: '',
        labelRefX: 0,
        labelRefY: 0,
        type: ''
      },
      selectedComboParamsTimeout: null,
      zoomValue: 1,
      nodesInClipboard: [],
      historyIndex: 0,
      undoCount: 0,
      onresizeTimeout: null,
      pasteCount: 0
    }
  },
  computed: {
    disableUndo: function() {
      return (
        this.historyIndex === 0 || this.historyIndex - (this.undoCount + 1) < 0
      )
    },
    disableRedo: function() {
      return (
        this.historyIndex === 0 ||
        this.historyIndex === 10 ||
        this.undoCount < 1
      )
    },
    disableCopy: function() {
      return this.selectedNodes.length === 0
    },
    disablePaste: function() {
      return this.nodesInClipboard.length === 0
    },
    disableDelete: function() {
      return this.selectedNodes.length === 0 && this.selectedEdges.length === 0
    },
    selectedNodes: function() {
      const self = this
      const graph = self.graph
      if (graph && !graph.destroyed) {
        return graph.findAllByState('node', 'selected')
      } else {
        return []
      }
    },
    selectedEdges: function() {
      const graph = this.graph
      if (graph && !graph.destroyed) {
        return graph.findAllByState('edge', 'selected')
      } else {
        return []
      }
    }
  },
  watch: {
    layoutType() {
      this.initTopo(this.graphData)
    },
    graphPanelShow() {
      this.onresizeHandler()
    },
    selectedNodeParams: {
      deep: true,
      handler: function(newVal, oldVal) {
        const selectedNodeModel = this.selectedNode.getModel()
        if (
          utils.isObjectValueEqual(
            selectedNodeModel.appConfig,
            newVal.appConfig
          ) &&
          selectedNodeModel.label === newVal.label
        ) {
          return
        }
        // 实时监听input值的变化，停止输入500ms后执行update，而不是时时update
        clearTimeout(this.selectedNodeParamsTimeout)
        this.selectedNodeParamsTimeout = setTimeout(() => {
          selectedNodeModel.label = newVal.label
          selectedNodeModel.appConfig = newVal.appConfig
          this.selectedNode.update(selectedNodeModel)
        }, 500)
      }
    },
    selectedEdgeParams: {
      deep: true,
      handler: function(newVal, oldVal) {
        const selectedEdgeModel = this.selectedEdge.getModel()
        if (
          utils.isObjectValueEqual(
            selectedEdgeModel.appConfig,
            newVal.appConfig
          ) &&
          selectedEdgeModel.label === newVal.label
        ) {
          return
        }
        // 实时监听input值的变化，停止输入500ms后执行update，而不是时时update
        clearTimeout(this.selectedEdgeParamsTimeout)
        this.selectedEdgeParamsTimeout = setTimeout(() => {
          const selectedEdgeModel = this.selectedEdge.getModel()
          selectedEdgeModel.label = newVal.label
          selectedEdgeModel.appConfig = newVal.appConfig
          this.selectedEdge.update(selectedEdgeModel)
        }, 500)
      }
    },
    selectedComboParams: {
      deep: true,
      handler: function(newVal, oldVal) {
        const selectedComboModel = this.selectedCombo.getModel()
        if (
          selectedComboModel.label === newVal.label &&
          selectedComboModel.labelCfg.position === newVal.labelPosition &&
          selectedComboModel.labelCfg.refX === newVal.labelRefX &&
          selectedComboModel.labelCfg.refY === newVal.labelRefY &&
          selectedComboModel.type === newVal.type
        ) {
          return
        }
        // 实时监听input值的变化，停止输入500ms后执行update，而不是时时update
        clearTimeout(this.selectedComboParamsTimeout)
        this.selectedComboParamsTimeout = setTimeout(() => {
          const selectedComboModel = this.selectedCombo.getModel()
          selectedComboModel.label = newVal.label
          selectedComboModel.labelCfg.position = newVal.labelPosition
            ? newVal.labelPosition
            : 'top'
          selectedComboModel.labelCfg.refX = newVal.labelRefX
            ? newVal.labelRefX
            : 0
          selectedComboModel.labelCfg.refY = newVal.labelRefY
            ? newVal.labelRefY
            : 0
          selectedComboModel.type = newVal.type ? newVal.type : 'circle'
          this.selectedCombo.update(selectedComboModel)
        }, 500)
      }
    }
  },
  created() {},
  mounted() {
    ccNode.obj.ccImage.sendThis(this)
    ccBehavior.obj.clickEventEdit.sendThis(this)
    ccBehavior.obj.dragAddEdge.sendThis(this)
    ccBehavior.obj.dragEventEdit.sendThis(this)
    ccBehavior.obj.keyupEventEdit.sendThis(this)
    this.clearHistoryData()
    // this.initTopo(this.graphData)
    this.autoZoomHandler()
    window.onresize = () => {
      return (() => {
        this.onresizeHandler()
      })()
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.clearHistoryData()
    next()
  },
  beforeRouteLeave(to, from, next) {
    this.clearHistoryData()
    next()
  },
  beforeDestroy() {
    this.clearHistoryData()
  },
  methods: {
    toggleCollapse() {
      this.graphPanelShow = !this.graphPanelShow
    },
    openFullScreenLoading() {
      this.loading = true
    },
    closeFullScreenLoading() {
      const self = this
      self.$nextTick(() => {
        self.loading = false
      })
    },
    dragstartHandler(event, nodeType) {
      // console.log('event', event)
      event.dataTransfer.setData('text', JSON.stringify(nodeType))
    },
    dragenterHandler(event) {
      event.preventDefault()
    },
    dragoverHandler(event) {
      event.preventDefault()
    },
    dropHandler(event) {
      const nodeTypeStr = event.dataTransfer.getData('text')
      const nodeType = JSON.parse(nodeTypeStr)
      const clientX = event.clientX
      const clientY = event.clientY
      this.addNode(clientX, clientY, nodeType)
    },
    dragendHandler(e) {
      e.cancelBubble = true
      e.returnValue = false
      e.preventDefault && e.preventDefault()
      return false
    },
    initTopo(graphData) {
      const self = this
      if (self.graph) {
        self.graph.destroy()
      }
      // 图画布的定义
      const graphContainer = self.$refs.graphContainer.$el
      const graphWidth = graphContainer.clientWidth - 20
      const graphHeight = graphContainer.clientHeight - 20
      // Plugins
      const plugins = []
      const modes = {
        default: [
          'drag-canvas',
          'drag-node',
          {
            type: 'click-select',
            trigger: 'ctrl',
            multiple: true
          }
        ],
        preview: [
          'drag-canvas',
          // 'zoom-canvas',
          // "drag-node",
          // 'click-select',
          {
            type: 'tooltip',
            formatText(model) {
              return model.description || model.label
            }
          },
          {
            type: 'edge-tooltip',
            formatText(model) {
              return (
                model.description ||
                'source:' +
                  self.graph.findById(model.source).getModel().label +
                  ' target:' +
                  self.graph.findById(model.target).getModel().label
              )
            }
          }
          // 自定义Behavior
          // 'my-collapse-expand'
        ],
        edit: [
          'drag-node',
          'drag-canvas',
          {
            type: 'click-select',
            trigger: 'ctrl',
            multiple: true
          },
          {
            type: 'brush-select',
            trigger: 'control', // FIXME... G6 bug: ['ctrl', 'control'] only 'control' effetcs
            includeEdges: false
          },
          'right-click-node',
          'right-click-edge',
          // Group Behavior
          'drag-combo',
          'collapse-expand-combo',
          // 自定义Behavior
          'hover-event-edit',
          'click-event-edit',
          'keyup-event',
          'drag-event-edit',
          'keyup-event-edit',
          'drag-add-edge'
        ],
        addEdge: [
          'drag-canvas',
          // 自定义Behavior
          'click-add-edge'
        ],
        multiSelect: [
          {
            type: 'brush-select',
            trigger: 'drag',
            onSelect() {
              this.graph.setMode('edit')
              window.document.getElementById(
                'multi-select'
              ).style.backgroundColor = 'transparent'
            }
          }
        ]
      }
      /* 生成图 */
      self.graph = initGraph.commonGraph(G6, {
        plugins: plugins,
        container: 'mount-topology',
        width: graphWidth,
        height: graphHeight,
        modes: modes,
        graphData: graphData,
        graphMode: self.graphMode
      })
      self.graph.$C = config
      self.graph.setMode(self.graphMode)
      self.graph.refresh()
      self.autoZoomHandler()
    },
    /* 自动布局 */
    forceLayoutHandler() {
      const graph = this.graph
      if (graph && !graph.destroyed) {
        this.openFullScreenLoading()
        graph.updateLayout({
          type: 'force',
          center: [200, 200],
          preventOverlap: true,
          linkDistance: 150,
          nodeStrength: -200,
          onLayoutEnd: () => {
            this.closeFullScreenLoading()
          }
        })
      }
    },
    changeEdgeShapeHandler(edgeShape) {
      this.currentEdgeShape = _.find(this.edgeShapeList, { guid: edgeShape })
      this.graph.$C.edge.type = this.currentEdgeShape['guid']
    },
    undoHandler() {
      if (
        this.historyIndex > 0 &&
        this.historyIndex - (this.undoCount + 1) >= 0
      ) {
        this.undoCount += 1
        const key = `graph_history_${this.historyIndex - this.undoCount}`
        const historyData = this.getHistoryData(key)
        this.changeGraphData(JSON.parse(historyData))
        this.refreshGraph()
      }
    },
    redoHandler() {
      if (this.undoCount > 0) {
        const key = `graph_history_${this.historyIndex - this.undoCount + 1}`
        const historyData = this.getHistoryData(key)
        this.changeGraphData(JSON.parse(historyData))
        this.undoCount -= 1
        this.refreshGraph()
      }
    },
    copyHandler() {
      this.nodesInClipboard = this.selectedNodes
      this.pasteCount = 0
    },
    pasteHandler() {
      this.pasteCount += 1 // 连续paste次数统计
      const graph = this.graph
      const nodesInClipboard = this.nodesInClipboard
      if (graph && !graph.destroyed && nodesInClipboard.length > 0) {
        // ************** 记录【粘贴】前的数据状态 start **************
        const historyData = JSON.stringify(graph.save())
        let key = `graph_history_${this.historyIndex}`
        this.addHistoryData(key, historyData)
        // ************** 记录【粘贴】前的数据状态 end **************
        // 开始粘贴
        for (let i = 0; i < nodesInClipboard.length; i++) {
          const node = nodesInClipboard[i]
          const model = node.getModel()
          const newModel = {
            ...model,
            id: utils.generateUUID(),
            x: model.x + 10 * this.pasteCount,
            y: model.y + 10 * this.pasteCount
          }
          graph.addItem('node', newModel)
        }
        // ************** 记录【粘贴】后的数据状态 start **************
        // 如果当前点过【撤销】了，【粘贴】后将取消【重做】功能
        // 重置undoCount，【粘贴】后的数据状态给(当前所在historyIndex + 1)，且清空这个时间点之后的记录
        if (this.undoCount > 0) {
          this.historyIndex = this.historyIndex - this.undoCount // 此时的historyIndex应当更新为【撤销】后所在的索引位置
          for (let i = 1; i <= this.undoCount; i++) {
            const key = `graph_history_${this.historyIndex + i}`
            this.removeHistoryData(key)
          }
          this.undoCount = 0
        }
        // 存储【粘贴】后的数据状态
        this.historyIndex += 1
        key = `graph_history_${this.historyIndex}`
        const currentData = JSON.stringify(graph.save())
        this.addHistoryData(key, currentData)
        // ************** 记录【粘贴】后的数据状态 end **************
      }
    },
    deleteHandler() {
      const graph = this.graph
      const selectedNodes = graph.findAllByState('node', 'selected')
      const selectedEdges = graph.findAllByState('edge', 'selected')
      if (this.selectedNodes.length > 0 || this.selectedEdges.length > 0) {
        // ************** 记录【删除】前的数据状态 start **************
        const historyData = JSON.stringify(graph.save())
        let key = `graph_history_${this.historyIndex}`
        this.addHistoryData(key, historyData)
        // ************** 记录【删除】前的数据状态 end **************
        // 开始删除
        for (let i = 0; i < selectedNodes.length; i++) {
          graph.removeItem(selectedNodes[i])
        }
        for (let i = 0; i < selectedEdges.length; i++) {
          graph.removeItem(selectedEdges[i])
        }
        // ************** 记录【删除】后的数据状态 start **************
        // 如果当前点过【撤销】了，拖拽节点后将取消【重做】功能
        // 重置undoCount，【删除】后的数据状态给(当前所在historyIndex + 1)，且清空这个时间点之后的记录
        if (this.undoCount > 0) {
          this.historyIndex = this.historyIndex - this.undoCount // 此时的historyIndex应当更新为【撤销】后所在的索引位置
          for (let i = 1; i <= this.undoCount; i++) {
            const key = `graph_history_${this.historyIndex + i}`
            this.removeHistoryData(key)
          }
          this.undoCount = 0
        }
        // 记录【删除】后的数据状态
        this.historyIndex += 1
        key = `graph_history_${this.historyIndex}`
        const currentData = JSON.stringify(graph.save())
        this.addHistoryData(key, currentData)
        // ************** 记录【删除】后的数据状态 end **************
      }
    },
    zoomInHandler() {
      const graph = this.graph
      if (graph && !graph.destroyed) {
        graph.zoom(1.2)
      }
    },
    zoomOutHandler() {
      const graph = this.graph
      if (graph && !graph.destroyed) {
        graph.zoom(0.8)
      }
    },
    autoZoomHandler() {
      const graph = this.graph
      if (graph && !graph.destroyed && graph.save().nodes.length > 0) {
        graph.fitView(10)
      }
    },
    resetZoomHandler() {
      const graph = this.graph
      if (graph && !graph.destroyed) {
        graph.zoomTo(1)
      }
    },
    multiSelectHandler(event) {
      event.target.style.backgroundColor = '#EEEEEE'
      this.graph.setMode('multiSelect')
    },
    enableMinimapHandler(enableMinimap) {
      if (enableMinimap) {
        this.minimap = new G6.Minimap({
          size: [200, 120],
          type: 'default',
          className: 'g6-minimap'
        })
        this.graph.addPlugin(this.minimap)
      } else {
        this.graph.removePlugin(this.minimap)
      }
    },
    // 右键菜单
    alignHandler(coordinate) {
      const graph = this.graph
      if (this.selectedNodes.length > 1 && this.selectedNode) {
        // ************** 记录【节点对齐】前的数据状态 start **************
        const historyData = JSON.stringify(graph.save())
        let key = `graph_history_${this.historyIndex}`
        this.addHistoryData(key, historyData)
        // ************** 记录【节点对齐】前的数据状态 end **************
        // 开始节点对齐
        const cfg =
          coordinate === 'horizontal'
            ? { y: this.selectedNode.getModel().y }
            : { x: this.selectedNode.getModel().x }
        for (let i = 0, len = this.selectedNodes.length; i < len; i++) {
          this.selectedNodes[i].updatePosition(cfg)
        }
        graph.refresh()
        // ************** 记录【节点对齐】后的数据状态 start **************
        // 如果当前点过【撤销】了，节点对齐后将取消【重做】功能
        // 重置undoCount，【节点对齐】后的数据状态给(当前所在historyIndex + 1)，且清空这个时间点之后的记录
        if (this.undoCount > 0) {
          this.historyIndex = this.historyIndex - this.undoCount // 此时的historyIndex应当更新为【撤销】后所在的索引位置
          for (let i = 1; i <= this.undoCount; i++) {
            const key = `graph_history_${this.historyIndex + i}`
            this.removeHistoryData(key)
          }
          this.undoCount = 0
        }
        // 记录【节点对齐】后的数据状态
        this.historyIndex += 1
        key = `graph_history_${this.historyIndex}`
        const currentData = JSON.stringify(graph.save())
        this.addHistoryData(key, currentData)
        // ************** 记录【节点对齐】后的数据状态 end **************
      }
      this.rightMenuShow = false
    },
    createComboHandler() {
      const graph = this.graph
      if (
        graph &&
        !graph.destroyed &&
        this.selectedNodes.length > 1 &&
        this.selectedNode
      ) {
        // ************** 记录【添加分组】前的数据状态 start **************
        const historyData = JSON.stringify(graph.save())
        const key = `graph_history_${this.historyIndex}`
        this.addHistoryData(key, historyData)
        // ************** 记录【添加分组】前的数据状态 end **************
        const nodeIds = this.selectedNodes.map(item => {
          return item._cfg.id
        })
        // 创建分组
        const combo = graph.createCombo(
          {
            id: utils.generateUUID()
          },
          nodeIds
        )
        // ************** 记录【添加分组】后的数据状态 start **************
        if (combo) {
          // 如果当前点过【撤销】了，【添加分组】后将取消【重做】功能
          // 重置undoCount，【添加分组】后的数据状态给(当前所在historyIndex + 1)，且清空这个时间点之后的记录
          if (this.undoCount > 0) {
            this.historyIndex = this.historyIndex - this.undoCount // 此时的historyIndex应当更新为【撤销】后所在的索引位置
            for (let i = 1; i <= this.undoCount; i++) {
              const key = `graph_history_${this.historyIndex + i}`
              this.removeHistoryData(key)
            }
            this.undoCount = 0
          }
          // 记录【添加分组】后的数据状态
          this.historyIndex += 1
          const key = `graph_history_${this.historyIndex}`
          const currentData = JSON.stringify(graph.save())
          this.addHistoryData(key, currentData)
        }
        // ************** 记录【添加分组】后的数据状态 end **************
        this.rightMenuShow = false
      }
    },
    removeComboHandler() {
      const graph = this.graph
      if (this.selectedCombo) {
        // ************** 记录【删除】前的数据状态 start **************
        const historyData = JSON.stringify(graph.save())
        let key = `graph_history_${this.historyIndex}`
        this.addHistoryData(key, historyData)
        // ************** 记录【删除】前的数据状态 end **************
        // 开始删除
        // FIXME... graph.uncombo() 后，combos 依旧存在 graph.save() 中。
        const {
          nodes: subNodes,
          combos: subCombos
        } = this.selectedCombo.getChildren()
        subNodes.forEach(subNode => {
          const subNodeModel = subNode.getModel()
          subNodeModel.comboId = undefined
          subNode.update(subNodeModel)
        })
        subCombos.forEach(subCombo => {
          const subComboModel = subCombo.getModel()
          subComboModel.comboId = undefined
          subCombo.update(subComboModel)
        })
        graph.uncombo(this.selectedCombo)
        // ************** 记录【删除】后的数据状态 start **************
        // 如果当前点过【撤销】了，删除分组后将取消【重做】功能
        // 重置undoCount，【删除】后的数据状态给(当前所在historyIndex + 1)，且清空这个时间点之后的记录
        if (this.undoCount > 0) {
          this.historyIndex = this.historyIndex - this.undoCount // 此时的historyIndex应当更新为【撤销】后所在的索引位置
          for (let i = 1; i <= this.undoCount; i++) {
            const key = `graph_history_${this.historyIndex + i}`
            this.removeHistoryData(key)
          }
          this.undoCount = 0
        }
        // 记录【删除】后的数据状态
        this.historyIndex += 1
        key = `graph_history_${this.historyIndex}`
        const currentData = JSON.stringify(graph.save())
        this.addHistoryData(key, currentData)
        // ************** 记录【删除】后的数据状态 end **************
        this.rightMenuShow = false
      }
    },
    addNode(clientX, clientY, nodeType) {
      const graph = this.graph
      if (graph && !graph.destroyed) {
        // ************** 记录【添加节点】前的数据状态 start **************
        const historyData = JSON.stringify(graph.save())
        const key = `graph_history_${this.historyIndex}`
        this.addHistoryData(key, historyData)
        // ************** 记录【添加节点】前的数据状态 end **************
        // 开始添加
        const droppoint = graph.getPointByClient(clientX, clientY)
        const node = graph.addItem('node', {
          id: utils.generateUUID(),
          x: droppoint.x,
          y: droppoint.y,
          label: nodeType.label,
          labelCfg: {
            position: 'bottom'
          },
          type: 'cc-image',
          img: nodeType.imgSrc,
          size: [40, 40],
          width: 40,
          height: 40,
          anchorPoints: [
            [0.5, 0], // top
            [1, 0.5], // right
            [0.5, 1], // bottom
            [0, 0.5] // left
          ],
          // 自定义属性
          appState: {
            alert: false
          }
        })
        // ************** 记录【添加节点】后的数据状态 start **************
        if (node) {
          // 如果当前点过【撤销】了，【添加节点】后将取消【重做】功能
          // 重置undoCount，【添加节点】后的数据状态给(当前所在historyIndex + 1)，且清空这个时间点之后的记录
          if (this.undoCount > 0) {
            this.historyIndex = this.historyIndex - this.undoCount // 此时的historyIndex应当更新为【撤销】后所在的索引位置
            for (let i = 1; i <= this.undoCount; i++) {
              const key = `graph_history_${this.historyIndex + i}`
              this.removeHistoryData(key)
            }
            this.undoCount = 0
          }
          // 记录【添加节点】后的数据状态
          this.historyIndex += 1
          const key = `graph_history_${this.historyIndex}`
          const currentData = JSON.stringify(graph.save())
          this.addHistoryData(key, currentData)
        }
        // ************** 记录【添加节点】后的数据状态 end **************
      }
    },
    unselectAllNodes() {},
    addHistoryData(key, value) {
      try {
        sessionStorage.setItem(key, value)
      } catch (oException) {
        if (oException.name === 'QuotaExceededError') {
          console.warn('已经超出本地存储限定大小，清空历史记录！')
          // 可进行超出限定大小之后的操作，如下面可以先清除记录，再次保存
          // sessionStorage.clear()
          this.clearHistoryData()
          this.historyIndex = 0
          this.undoCount = 0
          sessionStorage.setItem(key, value)
        }
      }
    },
    getHistoryData(key) {
      return sessionStorage.getItem(key)
    },
    removeHistoryData(key) {
      sessionStorage.removeItem(key)
    },
    clearHistoryData() {
      const keys = Object.keys(sessionStorage)
      keys.forEach(key => {
        if (key.startsWith('graph_history')) {
          sessionStorage.removeItem(key)
        }
      })
    },
    onresizeHandler() {
      // 实时监听窗口大小变化
      const self = this
      clearTimeout(this.onresizeTimeout)
      this.onresizeTimeout = setTimeout(() => {
        const graph = self.graph
        if (graph && !graph.destroyed) {
          const graphContainer = self.$refs.graphContainer.$el
          const graphWidth = graphContainer.clientWidth - 20
          const graphHeight = graphContainer.clientHeight - 20
          graph.changeSize(graphWidth, graphHeight)
        }
      }, 1000)
    },
    /* 暴露给外部的接口 */
    refreshGraph() {
      const graph = this.graph
      if (graph && !graph.destroyed) {
        graph.refresh()
      }
    },
    getGraphData() {
      const graph = this.graph
      if (graph && !graph.destroyed) {
        // FIXME... graph.uncombo() 后，combos 依旧存在 graph.save() 中。
        const { nodes, edges, groups, combos } = graph.save()
        const nodeComboIds = []
        // debugger

        combos.forEach(combo => {
          /* NOTE 当combos中右children时，就与相关的节点进行关联 */
          if (combo.children && combo.children.length) {
            // console.log('通过右键菜单添加的节点')

            combo.children.forEach(node => {
              const targetNode = graph.find('node', item => {
                return item.get('model').id === node.id
              })
              targetNode.comboId = node.comboId
            })
          }
        })

        // console.log('nodes', nodes)

        nodes.forEach(node => {
          const nodeComboId = node.comboId
          if (
            typeof nodeComboId !== 'undefined' &&
            nodeComboIds.indexOf(nodeComboId) < 0
          ) {
            nodeComboIds.push(nodeComboId)
          }
        })

        graph.findAll('combo', combo => {
          const comboId = combo.get('model').id
          if (nodeComboIds.indexOf(comboId) < 0) {
            console.log('G6 bug')
            _.remove(combos, combo => {
              return combo.id === comboId
            })
          }
        })
        return { nodes: nodes, edges: edges, groups: groups, combos: combos }
      } else {
        return { nodes: [], edges: [], groups: [], combos: [] }
      }
    },
    changeGraphData(data) {
      const graph = this.graph
      if (graph && !graph.destroyed) {
        graph.changeData(data)
      }
    },
    changeGraphSize(graphWidth = 0, graphHeight = 0) {
      const graph = this.graph
      if (graph && !graph.destroyed) {
        const graphContainer = this.$refs.graphContainer.$el
        graphWidth = graphWidth || graphContainer.clientWidth - 20
        graphHeight = graphHeight || graphContainer.clientHeight - 20
        graph.changeSize(graphWidth, graphHeight)
      }
    },
    changeGraphMode(graphData, graphMode) {
      this.graphMode = graphMode
      this.initTopo(graphData)
    },
    changeGraphTheme(themeValue) {
      const graph = this.graph
      if (graph && !graph.destroyed) {
        const nodes = graph.getNodes()
        const edges = graph.getEdges()
        switch (themeValue) {
          case 'darkStyle':
            this.graphBg = 'dark-style'
            graph.$T = theme.darkStyle
            for (let i = 0, len = edges.length; i < len; i++) {
              const edge = edges[i]
              const edgeModel = edge.getModel()
              edgeModel.style = graph.$T.edgeStyle.default
              edge.update(edgeModel)
            }
            for (let i = 0, len = nodes.length; i < len; i++) {
              const node = nodes[i]
              const nodeModel = node.getModel()
              nodeModel.labelCfg = graph.$T.nodeLabelCfg
              node.update(nodeModel)
            }
            graph.paint()
            break
          case 'officeStyle':
            this.graphBg = 'office-style'
            graph.$T = theme.officeStyle
            for (let i = 0, len = edges.length; i < len; i++) {
              const edge = edges[i]
              const edgeModel = edge.getModel()
              edgeModel.style = graph.$T.edgeStyle.default
              edge.update(edgeModel)
            }
            for (let i = 0, len = nodes.length; i < len; i++) {
              const node = nodes[i]
              const nodeModel = node.getModel()
              nodeModel.labelCfg = graph.$T.nodeLabelCfg
              node.update(nodeModel)
            }
            graph.paint()
            break
          default:
            this.graphBg = 'default-style'
            graph.$T = theme.defaultStyle
            for (let i = 0, len = edges.length; i < len; i++) {
              const edge = edges[i]
              const edgeModel = edge.getModel()
              edgeModel.style = graph.$T.edgeStyle.default
              edge.update(edgeModel)
            }
            for (let i = 0, len = nodes.length; i < len; i++) {
              const node = nodes[i]
              const nodeModel = node.getModel()
              nodeModel.labelCfg = graph.$T.nodeLabelCfg
              node.update(nodeModel)
            }
            graph.paint()
        }
      }
    },
    downloadFullImage() {
      const graph = this.graph
      if (graph && !graph.destroyed) {
        const name = 'graph_' + _.now()
        graph.downloadFullImage(name, 'image/png', {
          backgroundColor: 'transparent',
          padding: [30, 15, 15, 15]
        })
      }
    },
    downloadImage() {
      const graph = this.graph
      if (graph && !graph.destroyed) {
        const name = 'graph_' + _.now()
        graph.downloadImage(name, 'image/png', 'transparent')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/iconfont/iconfont.css";

*[draggable="true"] {
  -khtml-user-drag: element;
}

.topology {
  height: 100%;
  margin: 0;
  padding: 0;
}

.graph-container {
  position: relative;
  height: 100%;

  .collapse-opened {
    position: absolute;
    top: 40%;
    right: -16px;
    width: 16px;
    height: 50px;

    .collapse-bg {
      height: 50px;
      border-top: 10px solid transparent;
      border-bottom: 9px solid transparent;
      border-left: 13px solid #dae8ee;

      span {
        position: absolute;
        top: 0;
        left: 1px;
        display: block;
        width: 0;
        height: 50px;
        border-top: 10px solid transparent;
        border-bottom: 9px solid transparent;
        border-left: 11px solid #f7fafb;
      }
    }

    .collapse {
      position: relative;
      top: -50px;
      left: -2px;
      height: 50px;
      text-align: center;
      cursor: pointer;

      span {
        display: inline;
        color: #9bb3bb;
        font-size: 14px;
        line-height: 50px;
      }

      .el-icon-d-arrow-right {
        display: inline;
      }

      .el-icon-d-arrow-left {
        display: none;
      }
    }
  }

  .collapse-closed {
    position: absolute;
    top: 40%;
    right: 0;
    width: 16px;
    height: 50px;

    .collapse-bg {
      height: 50px;
      border-top: 11px solid transparent;
      border-right: 13px solid #dae8ee;
      border-bottom: 11px solid transparent;

      span {
        position: absolute;
        display: block;
        top: 0;
        right: 0;
        width: 0;
        height: 50px;
        border-top: 11px solid transparent;
        border-right: 12px solid #f7fafb;
        border-bottom: 11px solid transparent;
        border-left: none;
      }
    }

    .collapse {
      position: relative;
      top: -50px;
      right: 0;
      height: 50px;
      text-align: center;
      cursor: pointer;

      span {
        display: inline;
        color: #9bb3bb;
        font-size: 14px;
        line-height: 50px;
      }

      .el-icon-d-arrow-right {
        display: none;
      }

      .el-icon-d-arrow-left {
        display: inline;
      }
    }
  }
}

.graph-pannel {
  margin-top: 50px;
  height: 80%;
  color: #333;
  font-size: 12px;
  text-align: left;
  border-left: 0.1px solid #e6e9ed;
  border-bottom: 0.1px solid #e6e9ed;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  .node-type {
    display: inline-block;
    width: 65px;
    height: 65px;
    text-align: center;
    vertical-align: middle;
    border: 0.1px solid transparent;
    margin: 6px;

    img {
      height: 46px;
      width: 46px;
    }

    label {
      width: 60px;
      white-space: nowrap;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .node-type:hover {
    cursor: move;
    border: 1px solid #ccc;
  }

  .pannel-title {
    padding-left: 12px;
    height: 32px;
    color: #000;
    line-height: 32px;
    border-top: 0.1px solid #dce3e8;
    border-bottom: 0.1px solid #dce3e8;
  }

  .pannel-body {
    padding: 16px 18px;

    span {
      display: block;
    }

    .params-input,
    .params-select,
    .params-input-number {
      margin: 5px 0 10px 0;
    }

    .params-input-number {
      width: 60px;
    }

    .el-input__inner {
      padding: 0 8px !important;
    }
  }
}

.right-menu {
  position: fixed;
  padding: 10px 5px;
  list-style: none;
  background-color: #fff;
  opacity: 1;
  border: 1px solid #dcdfe6;
  border-radius: 10px;

  li {
    padding: 5px;
    list-style-type: none;
    cursor: pointer;
  }

  li:hover {
    color: #409eff;
  }
}

// 背景主题
.default-style {
  background: #fff;
}

.dark-style {
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(0, 0, 0, 0.15) 100%
    ),
    radial-gradient(
        at top center,
        rgba(255, 255, 255, 0.4) 0%,
        rgba(0, 0, 0, 0.4) 120%
      )
      #989898;
  background-blend-mode: multiply, multiply;
}

.office-style {
  background-image: linear-gradient(to right, #fef6de 0%, #f3ebd3 100%);
}
</style>

<style lang="scss">
.g6-tooltip {
  padding: 10px 6px;
  color: #444;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #e2e2e2;
  border-radius: 4px;
}

// 预览模式自动生成的节点
.graph-container {
  #mount-topology .g6-minimap {
    position: absolute;
    right: 10px;
    bottom: 60px;
    border: 1px solid #e2e2e2;
  }
}
</style>
