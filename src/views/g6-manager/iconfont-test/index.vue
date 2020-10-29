<template>
  <div id="g6-chart" class="g6-chart" />
</template>

<script>
import G6, { Minimap, Grid } from '@antv/g6'
// import '@/assets/g6-iconfont/iconfont.css'

export default {
  data() {
    return {
      graph: {}

    }
  },
  mounted() {
    this.regIconfont()
    this.initData()
    this.render()
  },
  methods: {
    regIconfont() {
      G6.registerNode('iconfont', {
        draw(cfg, group) {
          const { backgroundConfig: backgroundStyle, style, labelCfg: labelStyle } = cfg

          if (backgroundStyle) {
            group.addShape('circle', {
              attrs: {
                x: 0,
                y: 0,
                r: cfg.size,
                ...backgroundStyle
              },
              // must be assigned in G6 3.3 and later versions. it can be any value you want
              name: 'circle-shape'
            })
          }

          const keyShape = group.addShape('text', {
            attrs: {
              x: 0,
              y: 0,
              fontFamily: 'iconfont', // 对应css里面的font-family: "iconfont";
              textAlign: 'center',
              textBaseline: 'middle',
              text: cfg.text,
              fontSize: cfg.size,
              ...style
            },
            // must be assigned in G6 3.3 and later versions. it can be any value you want
            name: 'text-shape1'
          })
          const labelY = backgroundStyle ? cfg.size * 2 : cfg.size

          group.addShape('text', {
            attrs: {
              x: 0,
              y: labelY,
              textAlign: 'center',
              text: cfg.label,
              ...labelStyle.style
            },
            // must be assigned in G6 3.3 and later versions. it can be any value you want
            name: 'text-shape1'
          })
          return keyShape
        }
      })
    },
    initData() {
      const COLOR = '#40a9ff'
      const graph = new G6.TreeGraph({
        container: 'g6-chart',
        width: 800,
        height: 600,
        modes: {
          default: ['collapse-expand', 'drag-canvas', 'drag-node']
        },
        defaultNode: {
          backgroundConfig: {
            backgroundType: 'circle',
            fill: COLOR,
            stroke: 'LightSkyBlue'
          },
          type: 'iconfont',
          size: 12,
          style: {
            fill: '#fff'
          },
          labelCfg: {
            style: {
              fill: COLOR,
              fontSize: 12
            }
          }
        },
        // 布局相关
        layout: {
          type: 'compactBox',
          direction: 'LR',
          getId(d) {
            return d.id
          },
          getHeight() {
            return 16
          },
          getWidth() {
            return 16
          },
          getVGap() {
            return 20
          },
          getHGap() {
            return 60
          }
        }
      })

      graph.edge(({ target }) => {
        const fill = target.get('model').backgroundConfig && target.get('model').backgroundConfig.fill
        return {
          type: 'cubic-horizontal',
          color: fill || COLOR,
          label: target.get('model').relation || '',
          labelCfg: {
            style: {
              fill: fill || COLOR,
              fontSize: 12
            }
          }
        }
      })

      this.graph = graph
    },
    render() {
      const data = {
        isRoot: true,
        id: 'Root',
        label: '可疑人员王**',
        text: '\ue6b2', // 对应iconfont.css 里面的content，注意加u，后面的自行修改一下。
        style: {
          fill: 'red'
        },
        labelCfg: {
          style: {
            fill: 'red'
          }
        },
        backgroundConfig: null, // 自定义项，用于判读是否需要圆背景
        size: 30,
        children: [
          {
            id: 'SubTreeNode1',
            label: '**网咖',
            text: '&#xe605;',
            relation: '上网',
            children: [
              {
                id: 'SubTreeNode2',
                label: '多伦多',
                text: '&#xe64b;'
              },
              {
                id: 'id1',
                label: '小王',
                text: '&#xe622;',
                children: [
                  {
                    id: 'SubTreeNode1.2.1',
                    label: '182****2123',
                    text: '&#xe60d;'
                  },
                  {
                    id: 'SubTreeNode4',
                    label: '今晚在吗',
                    text: '&#xe629;'
                  }
                ]
              }
            ]
          },
          {
            id: 'SubTreeNode3',
            label: 'subway',
            text: '&#xe653;',
            children: [
              {
                id: 'SubTreeNode3.1',
                label: '王五',
                text: '&#xe622;'
              },
              {
                id: 'SubTreeNode3.2',
                label: '张三',
                text: '&#xe622;'
              }
            ]
          },
          {
            id: 'SubTreeNode5',
            label: '小花',
            relation: '老婆',
            text: '&#xe74b;',
            backgroundConfig: {
              fill: 'Coral'
            },
            style: {
              fill: '#fff'
            },
            labelCfg: {
              style: {
                fill: 'Coral'
              }
            },
            children: [
              {
                id: 'SubTreeNode1.2.1',
                label: '182****2123',
                text: '&#xe60d;',
                relation: '通话',
                backgroundConfig: {
                  fill: 'Coral'
                },
                style: {
                  fill: '#fff'
                },
                labelCfg: {
                  style: {
                    fill: 'Coral'
                  }
                }
              },
              {
                id: 'SubTreeNode3.3',
                label: '凶器',
                text: '&#xe673;',
                relation: '指纹',
                backgroundConfig: {
                  fill: 'Coral'
                },
                style: {
                  fill: '#fff'
                },
                labelCfg: {
                  style: {
                    fill: 'Coral'
                  }
                }
              }
            ]
          },
          {
            id: 'SubTreeNode6',
            label: '马航37*',
            relation: '乘坐',
            text: '&#xe610;'
          }
        ]
      }

      this.graph.data(data)
      this.graph.render()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/g6-iconfont/iconfont.css";
#g6-chart {
  width: 100%;
  height: calc(100vh - 230px);
}
</style>
