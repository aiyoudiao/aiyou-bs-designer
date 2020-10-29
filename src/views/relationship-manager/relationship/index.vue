<template>
  <el-container>
    <el-header height="60px">
      <el-row>
        <!-- <el-col :span="12" style="text-align: left">
          <router-link to="/">
            <div class="navbar-brand">
              <img id="logo" src="@/assets/logo.png" width="38px" height="38px" alt="CCEditor">
              <span> CCEditor </span>
            </div>
          </router-link>
        </el-col> -->
        <!-- <el-col :span="8" style="text-align: center">
          <div class="navbar-title">.</div>
        </el-col> -->
        <el-col :span="24" style="text-align: right">
          <div class="navbar-btns">
            <div v-if="graphMode === 'preview'">
              <el-button size="mini" @click="handleEditClick">编辑</el-button>
              <el-button size="mini" @click="handleRefreshClick">刷新</el-button>
              <el-dropdown style="margin-left: 10px;" @command="toggleAutoRefresh">
                <el-button class="refresh-button" size="mini">
                  <span v-if="autoRefresh.interval === 'close'">关闭</span>
                  <span v-else>{{ autoRefresh.interval }}分钟刷新</span>
                  <i class="el-icon-arrow-down el-icon--right" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="1">1分钟</el-dropdown-item>
                  <el-dropdown-item command="5">5分钟</el-dropdown-item>
                  <el-dropdown-item command="10">10分钟</el-dropdown-item>
                  <el-dropdown-item command="30">30分钟</el-dropdown-item>
                  <el-dropdown-item command="close">关闭</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div v-else-if="graphMode === 'edit'">
              <el-button size="mini" @click="handleLayoutClick">自动布局</el-button>
              <el-button size="mini" @click="handlePreviewClick">返回</el-button>
              <el-button size="mini" @click="handleGraphDataSave">保存</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <cc-topology
        ref="topology"
        :graph-data="graphData"
        :node-type-list="nodeTypeList"
        :node-app-config="nodeAppConfig"
      />
    </el-main>
  </el-container>
</template>

<script>
import {
  RELATIONSHIP_MANAGER_INDEX
} from '@/constant/relationship-manager'

import _ from 'lodash'
import moment from 'moment'
import { CCTopology } from '@/packages/index'
import { getRandomArrayElements } from '@/utils/index'

// import goodData from './data'
// console.log(goodData)
import getData from './getData'
const goodData = getData()

export default {
  name: RELATIONSHIP_MANAGER_INDEX,
  components: {
    'cc-topology': CCTopology
  },
  data() {
    return {
      graphData: {
        nodes: [
          ...goodData.graphData.nodes
        ],
        edges: [
          ...goodData.graphData.edges
        ]
      },
      nodeTypeList: [
        ...goodData.nodeTypeList
      ],
      // 节点配置
      nodeAppConfig: {
        ...goodData.nodeAppConfig
      },
      autoRefresh: {
        enable: false,
        interval: 5
      },
      autoRefreshTimer: null,
      dataUpdateTime: '暂无关联数据',
      graphMode: 'preview'
    }
  },
  watch: {
    graphMode(value) {
      if (value === 'preview') {
        // let themes = ['darkStyle', 'darkStyle', 'officeStyle']
        // let idx = Math.floor((Math.random() * themes.length))
        // let theme = themes[idx]
        const theme = 'darkStyle'
        this.$refs.topology.changeGraphTheme(theme)
      } else {
        const theme = 'defaultStyle'
        this.$refs.topology.changeGraphTheme(theme)
      }
    }
  },
  mounted() {
    this.initGraphData()
    const theme = 'darkStyle'
    this.$refs.topology.changeGraphTheme(theme)
  },
  methods: {
    handleEditClick() {
      clearInterval(this.autoRefreshTimer)
      this.graphMode = 'edit'
      const graphData = _.cloneDeep(this.graphData)
      this.$refs.topology.changeGraphMode(graphData, 'edit')
    },
    handleRefreshClick() {
      this.getRelatedData()
      // this.handleLayoutClick()
    },
    handleLayoutClick() {
      this.$refs.topology.forceLayoutHandler()
    },
    handlePreviewClick() {
      this.graphMode = 'preview'
      // 需要先去异步请求获取远程的 graphData
      const graphData = _.cloneDeep(this.graphData)
      this.$refs.topology.changeGraphMode(graphData, 'preview')
      this.handleRefreshClick()
    },
    toggleAutoRefresh(command) {
      if (command && command !== 'close') {
        this.autoRefresh.interval = Number(command)
        clearInterval(this.autoRefreshTimer)
        this.autoRefreshTimer = setInterval(() => {
          this.getRelatedData()
        }, this.autoRefresh.interval * 60 * 1000)
        this.$once('hook:beforeDestroy', () => {
          clearInterval(this.autoRefreshTimer)
        })
      } else {
        this.autoRefresh.interval = command
        clearInterval(this.autoRefreshTimer)
      }
    },
    initGraphData() {
      // 异步请求获取远程的 graphData
      const graphData = _.cloneDeep(this.graphData)
      this.$refs.topology.initTopo(graphData)
      this.handleRefreshClick()
    },
    handleGraphDataSave() {
      const { nodes, edges, groups, combos } = this.$refs.topology.getGraphData()

      /* 设置绘制的数据 */
      this.graphData = {
        nodes,
        edges,
        groups,
        combos
      }
      // console.log(JSON.stringify({ nodes, edges, groups, combos }))
    },
    getRelatedData() {
      this.dataUpdateTime = moment().format('YYYY-MM-DD HH:mm:ss')
      const graphData = _.cloneDeep(this.$refs.topology.getGraphData())
      const { nodes, edges } = graphData
      // let randomIdx = Math.floor((Math.random() * nodes.length))
      const randomNodeIds = getRandomArrayElements(nodes, 1).map(x => {
        return x.id
      })
      for (let i = 0, len = nodes.length; i < len; i++) {
        const node = nodes[i]
        console.log('node' + i, node)
        const { ip, port, sysName } = node.appConfig
        // if (randomNodeIds.indexOf(node.id) > -1) {
        if (ip && port && sysName) {
          node.description = `<p class="tooltips-title text-center">${node.label}</p>
                <table class="tooltips-table">
                <tr>
                <td style="text-align:left;color:#303133">设备IP: ${ip}</td>
                </tr>
                <tr>
                <td style="text-align:left;color:#303133">服务器端口号: ${port}</td>
                </tr>
                <tr>
                <td style="text-align:left;color:#303133">设备名称: ${sysName}</td>
                </tr>
                <tr>
                <td style="text-align:left;color:#ff0000">CPU使用率: 99%</td>
                </tr>
                <tr>
                <td style="text-align:left;color:#ff0000">内存使用率: 72%</td>
                </tr>
                <tr>
                <td style="text-align:left;color:#303133">最近刷新时间: ${this.dataUpdateTime}</td>
                </tr>
                </table>`
          node.appState.alert = true
        } else {
          nodes[i].appState.alert = false
          nodes[i]['description'] = '<p class="tooltips-title text-center">没有数据</p>'
        }
      }
      this.$refs.topology.changeGraphData(graphData)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: calc(100vh - 70px);

  .el-header {
    line-height: 60px;
    text-align: center;
    background-color: #FDFDFD;
    box-shadow: 0 2px 8px rgba(229, 229, 229, 0.5);

    .navbar-brand {
      display: inline-block;
      margin: 0 18px 0 35px;
      /*padding: 0 0 0 8px;*/
      line-height: 22px;
      font-size: 20px;

      img {
        vertical-align: middle;
      }

      span {
        vertical-align: middle;
        /*font-family: "Microsoft YaHei";*/
        color: #06080A;
      }
    }

    .navbar-title {
      vertical-align: middle;
      text-align: center;
      font-size: 20px;
    }

    .navbar-btns {
      vertical-align: middle;
      text-align: right;

      .el-button:last-child {
        margin-right: 20px;
      }

      .el-button--text {
        color: #06080A;
      }
    }
  }

  .el-main {
    margin: 0;
    padding: 0;
    height: 100%;
    text-align: center;
  }

  .el-footer {
    width: 100%;
    line-height: 55px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.45);
    background-color: #06080A;
    border: none;
    border-top: 1px solid rgba(197, 203, 217, 0.3);
  }
}
</style>
