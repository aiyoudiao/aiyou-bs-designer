/**
 * @author: winyuan
 * @data: 2019/07/16
 * @repository: https://github.com/winyuan
 * @description: edit mode: 鼠标点击交互
 */

// 用来获取调用此js的vue组件实例（this）
let vm = null

const sendThis = (_this) => {
  vm = _this
}

export default {
  sendThis, // 暴露函数
  name: 'click-event-edit',
  options: {
    getEvents() {
      return {
        'node:click': 'onNodeClick',
        'node:contextmenu': 'onNodeRightClick',
        'edge:click': 'onEdgeClick',
        'edge:contextmenu': 'onEdgeRightClick',
        'combo:click': 'onComboClick',
        'combo:contextmenu': 'onComboRightClick',
        'canvas:click': 'onCanvasClick'
      }
    },
    onNodeClick(event) {
      // todo..."selected"是g6自带的状态，在"drag-add-edge"中的"node:mouseup"事件也会触发，故此处不需要设置"selected"状态
      // let clickNode = event.item;
      // clickNode.setState('selected', !clickNode.hasState('selected'));
      vm.currentFocus = 'node'
      vm.rightMenuShow = false
      // console.log('我左键点击了节点')
      this.updateVmData(event)
    },
    onNodeRightClick(event) {
      // console.log('我右键点击了节点')

      const graph = vm.graph
      const clickNode = event.item
      const clickNodeModel = clickNode.getModel()
      const selectedNodes = graph.findAllByState('node', 'selected')
      const selectedNodeIds = selectedNodes.map(item => {
        return item.getModel().id
      })
      vm.selectedNode = clickNode

      debugger
      // 如果当前点击节点是之前选中的某个节点，就进行下面的处理
      if (selectedNodes.length > 1 && selectedNodeIds.indexOf(clickNodeModel.id) > -1) {
        vm.rightMenuShow = true
        const rightMenu = vm.$refs.rightMenu
        rightMenu.style.left = event.clientX + 'px'
        rightMenu.style.top = event.clientY + 'px'
      } else {
        // 隐藏右键菜单
        vm.rightMenuShow = false
        // 先取消所有节点的选中状态
        selectedNodes.forEach(node => {
          node.setState('selected', false)
        })
        // 再添加该节点的选中状态
        clickNode.setState('selected', true)
        vm.currentFocus = 'node'
        this.updateVmData(event)
      }
      graph.paint()
    },
    onEdgeClick(event) {
      const clickEdge = event.item
      clickEdge.setState('selected', !clickEdge.hasState('selected'))
      vm.currentFocus = 'edge'
      this.updateVmData(event)
    },
    onEdgeRightClick(event) {
      const graph = vm.graph
      const clickEdge = event.item
      const clickEdgeModel = clickEdge.getModel()
      const selectedEdges = graph.findAllByState('edge', 'selected')
      // 如果当前点击节点不是之前选中的单个节点，才进行下面的处理
      if (!(selectedEdges.length === 1 && clickEdgeModel.id === selectedEdges[0].getModel().id)) {
        // 先取消所有节点的选中状态
        graph.findAllByState('edge', 'selected').forEach(edge => {
          edge.setState('selected', false)
        })
        // 再添加该节点的选中状态
        clickEdge.setState('selected', true)
        vm.currentFocus = 'edge'
        this.updateVmData(event)
      }
      // let point = { x: event.x, y: event.y }
    },
    onComboClick(event) {
      vm.currentFocus = 'combo'
      this.updateVmData(event)
    },
    onComboRightClick(event) {
      vm.rightMenuShow = true
      const rightMenu = vm.$refs.rightMenu
      rightMenu.style.left = event.clientX + 'px'
      rightMenu.style.top = event.clientY + 'px'
      vm.currentFocus = 'combo'
      this.updateVmData(event)
    },
    onCanvasClick() {
      vm.currentFocus = 'canvas'
      vm.rightMenuShow = false
    },
    updateVmData(event) {
      if (event.item._cfg.type === 'node') {
        // 更新vm的data: selectedNode 和 selectedNodeParams
        const clickNode = event.item
        if (clickNode.hasState('selected')) {
          const clickNodeModel = clickNode.getModel()
          vm.selectedNode = clickNode
          const nodeAppConfig = { ...vm.nodeAppConfig }
          Object.keys(nodeAppConfig).forEach(function(key) {
            nodeAppConfig[key] = ''
          })
          vm.selectedNodeParams = {
            label: clickNodeModel.label || '',
            appConfig: { ...nodeAppConfig, ...clickNodeModel.appConfig }
          }
        }
      } else if (event.item._cfg.type === 'edge') {
        // 更新vm的data: selectedEdge 和 selectedEdgeParams
        const clickEdge = event.item
        if (clickEdge.hasState('selected')) {
          const clickEdgeModel = clickEdge.getModel()
          vm.selectedEdge = clickEdge
          const edgeAppConfig = { ...vm.edgeAppConfig }
          Object.keys(edgeAppConfig).forEach(function(key) {
            edgeAppConfig[key] = ''
          })
          vm.selectedEdgeParams = {
            label: clickEdgeModel.label || '',
            appConfig: { ...edgeAppConfig, ...clickEdgeModel.appConfig }
          }
        }
      } else if (event.item._cfg.type === 'combo') {
        // 更新vm的data: selectedCombo 和 selectedComboParams
        const clickCombo = event.item
        const clickComboModel = clickCombo.getModel()
        vm.selectedCombo = clickCombo
        vm.selectedComboParams = {
          label: clickComboModel.label || '',
          labelPosition: clickComboModel.labelCfg.position || '',
          labelRefX: clickComboModel.labelCfg.refX || 0,
          labelRefY: clickComboModel.labelCfg.refY || 0,
          type: clickComboModel.type || ''
        }
      }
    }
  }
}
