/**
 * @author: winyuan
 * @data: 2019/08/15
 * @repository: https://github.com/winyuan
 * @description: update anchor
 */

export default function(cfg, group) {
  const { anchorPoints, width, height, id } = cfg
  if (anchorPoints && anchorPoints.length) {
    for (let i = 0, len = anchorPoints.length; i < len; i++) {
      const [x, y] = anchorPoints[i]
      // 计算Marker中心点坐标
      const originX = -width / 2
      const originY = -height / 2
      const anchorX = x * width + originX
      const anchorY = y * height + originY
      // 锚点背景
      const anchorBgShape = group.findById(id + '_anchor_bg_' + i)
      // 锚点
      const anchorShape = group.findById(id + '_anchor_' + i)
      anchorBgShape.attr({
        x: anchorX,
        y: anchorY
      })
      anchorShape.attr({
        x: anchorX,
        y: anchorY
      })
    }
  }
}
