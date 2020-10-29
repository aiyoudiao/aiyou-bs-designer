/**
 * @author: winyuan
 * @data: 2019/07/16
 * @repository: https://github.com/winyuan
 * @description: edit mode: 悬浮交互
 */

export default {
  name: 'hover-event-edit',
  options: {
    getEvents() {
      return {
        'node:mouseover': 'onNodeHover',
        'node:mouseout': 'onNodeOut',
        'combo:mouseover': 'onComboHover',
        'combo:mouseout': 'onComboOut'
      }
    },
    onNodeHover(event) {
      const hoverNode = event.item
      hoverNode.setState('hover', true)
    },
    onNodeOut(event) {
      const hoverNode = event.item
      hoverNode.setState('hover', false)
    },
    onComboHover(event) {
      const hoverCombo = event.item
      hoverCombo.setState('hover', true)
    },
    onComboOut(event) {
      const hoverCombo = event.item
      hoverCombo.setState('hover', false)
    }
  }
}
