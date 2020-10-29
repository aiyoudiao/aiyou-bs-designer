/**
 * @author: winyuan
 * @data: 2019/08/15
 * @repository: https://github.com/winyuan
 * @description: draw anchor
 */

import theme from '../../theme'

export default function(cfg, group) {
  const themeStyle = theme.defaultStyle // todo...先使用默认主题，后期可能增加其它风格的主体
  const { anchorPoints, width, height, id } = cfg
  if (anchorPoints && anchorPoints.length) {
    for (let i = 0, len = anchorPoints.length; i < len; i++) {
      const [x, y] = anchorPoints[i]
      // 计算Marker中心点坐标
      const originX = -width / 2
      const originY = -height / 2
      const anchorX = x * width + originX
      const anchorY = y * height + originY
      // 添加锚点背景
      const anchorBgShape = group.addShape('marker', {
        id: id + '_anchor_bg_' + i,
        attrs: {
          name: 'anchorBg',
          x: anchorX,
          y: anchorY,
          // 锚点默认样式
          ...themeStyle.anchorBgStyle.default
        },
        draggable: false,
        name: 'markerBg-shape'
      })
      // 添加锚点Marker形状
      const anchorShape = group.addShape('marker', {
        id: id + '_anchor_' + i,
        attrs: {
          name: 'anchor',
          x: anchorX,
          y: anchorY,
          // 锚点默认样式
          ...themeStyle.anchorStyle.default
        },
        draggable: false,
        name: 'marker-shape'
      })

      anchorShape.on('mouseenter', function() {
        anchorBgShape.attr({
          ...themeStyle.anchorBgStyle.active
        })
      })
      anchorShape.on('mouseleave', function() {
        anchorBgShape.attr({
          ...themeStyle.anchorBgStyle.inactive
        })
      })
    }
  }
}
