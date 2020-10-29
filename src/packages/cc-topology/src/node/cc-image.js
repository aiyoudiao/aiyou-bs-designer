/**
 * @author: winyuan
 * @data: 2019/07/05
 * @repository: https://github.com/winyuan
 * @description: 图片节点
 */

import utils from '../utils'

// 用来获取调用此js的vue组件实例（this）
let vm = null

const sendThis = (_this) => {
  vm = _this
}

export default {
  sendThis,
  name: 'cc-image',
  extendName: 'image',
  options: {
    setState(name, value, item) {
      // 设置节点状态
      utils.node.setState(name, value, item)
      // 设置锚点状态
      if (vm.graphMode === 'edit') {
        utils.anchor.setState(name, value, item)
      }
    },
    // 绘制后附加锚点
    afterDraw(cfg, group) {
      // 绘制锚点
      if (vm.graphMode === 'edit') {
        utils.anchor.draw(cfg, group)
      }
    },
    // 设置告警状态
    afterUpdate(cfg, node) {
      const group = node.getContainer()
      // 获取children
      const halos = group.findAll(function(item) {
        return item.attrs.name === 'halo'
      })
      // 告警
      if (cfg.appState && cfg.appState.alert) {
        if (halos.length > 0) {
          return
        }
        const size = this.getSize(cfg) || [40, 40]
        const r = size[0] / 2
        const { id } = cfg
        const halo1 = group.addShape('circle', {
          id: id + '_halo_' + 1,
          attrs: {
            name: 'halo',
            x: 0,
            y: 0,
            r: r,
            fill: cfg.color || '#F56C6C',
            opacity: 0.6
          },
          name: 'halo',
          zIndex: -3
        })
        const halo2 = group.addShape('circle', {
          id: id + '_halo_' + 2,
          attrs: {
            name: 'halo',
            x: 0,
            y: 0,
            r: r,
            fill: cfg.color || '#F56C6C', // 为了显示清晰，随意设置了颜色
            opacity: 0.6
          },
          name: 'halo',
          zIndex: -2
        })
        const halo3 = group.addShape('circle', {
          id: id + '_halo_' + 3,
          attrs: {
            name: 'halo',
            x: 0,
            y: 0,
            r: r,
            fill: cfg.color || '#F56C6C',
            opacity: 0.6
          },
          name: 'halo',
          zIndex: -1
        })
        group.sort() // 排序，根据zIndex 排序
        halo1.animate({ // 逐渐放大，并消失
          r: r + 10,
          opacity: 0.1
        }, {
          repeat: true, // 循环
          duration: 3000,
          easing: 'easeCubic',
          delay: 0 // 无延迟
        })
        halo2.animate({ // 逐渐放大，并消失
          r: r + 10,
          opacity: 0.1
        }, {
          repeat: true, // 循环
          duration: 3000,
          easing: 'easeCubic',
          delay: 1000 // 1 秒延迟
        })
        halo3.animate({ // 逐渐放大，并消失
          r: r + 10,
          opacity: 0.1
        }, {
          repeat: true, // 循环
          duration: 3000,
          easing: 'easeCubic',
          delay: 2000 // 2 秒延迟
        })
      } else {
        halos.forEach(halo => {
          // FIXME: G6 3.x在底层库遗留了bug，导致removeChild()方法报错，等待解决
          group.removeChild(halo)
        })
      }
    }
  }
}
