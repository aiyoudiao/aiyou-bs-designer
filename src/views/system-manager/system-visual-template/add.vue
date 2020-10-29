<template>
  <div class="add-template-wrapper">
    <div class="left-box">
      <left-menu :menu-list="menuList" :open-menu-list="openMenuList" :active-menu-name="activeMenuNameOrSubpage" @handleMenuItemClick="handleMenuItemClick" />
    </div>
    <div class="right-box">
      <top-content @handleBackLevel="handleBackLevel" @handleSubmitConfig="handleSubmitConfig" />
      <center-content ref="addPage" :subpage="activeMenuNameOrSubpage" />
    </div>
  </div>
</template>

<script>
import LeftMenu from './add-template-views/left-menu'
import TopContent from './add-template-views/top-content'
import CenterContent from './add-template-views/center-content'

export default {
  name: 'SystemVisualTemplateAdd',
  components: {
    'left-menu': LeftMenu,
    'top-content': TopContent,
    'center-content': CenterContent
  },
  data() {
    return {
      openMenuList: [
        'source-info',
        'operate-info',
        'devops-info'
      ],
      activeMenuNameOrSubpage: 'base-info',
      menuList: [
        {
          name: 'base-info',
          meta: {
            title: '基本信息', icon: 'nested'
          }
        },
        {
          name: 'source-info',
          meta: { title: '资源信息', icon: 'nested' },
          children: [
            {
              name: 'device-info',
              meta: { title: '设备信息', icon: '' },
              notTop: true
            },
            {
              name: 'service-info',
              meta: { title: '服务器信息', icon: '' },
              notTop: true
            }
          ]
        },
        {
          name: 'operate-info',
          meta: { title: '运营信息', icon: 'nested' },
          children: [
            {
              name: 'net-alarm-info',
              meta: { title: '网管告警信息', icon: '' },
              notTop: true
            },
            {
              name: 'change-info',
              meta: { title: '变更信息', icon: '' },
              notTop: true
            }
          ]
        },
        {
          name: 'devops-info',
          meta: { title: '运维信息', icon: 'nested' },
          children: [
            {
              name: 'devops-device',
              meta: { title: '设备', icon: '' },
              notTop: true
            },
            {
              name: 'devops-port',
              meta: { title: '端口', icon: '' },
              notTop: true
            },
            {
              name: 'devops-dedicated-line',
              meta: { title: '专线', icon: '' },
              notTop: true
            },
            {
              name: 'devops-app-system',
              meta: { title: '应用系统', icon: '' },
              notTop: true
            },
            {
              name: 'devops-vs',
              meta: { title: 'VS', icon: '' },
              notTop: true
            },
            {
              name: 'devops-region',
              meta: { title: '区域', icon: '' },
              notTop: true
            },
            {
              name: 'devops-domain',
              meta: { title: '域名', icon: '' },
              notTop: true
            },
            {
              name: 'devops-app-node',
              meta: { title: '应用节点', icon: '' },
              notTop: true
            }
          ]
        }
      ]
    }
  },
  created() {
    this.hideLayout()
  },
  destroyed() {
    this.showLayout()
  },
  methods: {
    handleMenuItemClick(data) {
      console.log('切换菜单', data)
      if (!data.name) {
        alert('菜单名称不存在')
      }
      this.activeMenuNameOrSubpage = data.name
    },
    hideLayout() {
      document.querySelector('.sidebar-container').style.display = 'none'
      document.querySelector('.main-container').style.marginLeft = '0px'
      document.querySelector('.app-main').style.padding = '0px'
      document.querySelector('.fixed-header').style.display = 'none'
    },

    showLayout() {
      document.querySelector('.sidebar-container').style.display = null
      document.querySelector('.main-container').style.marginLeft = null
      document.querySelector('.app-main').style.padding = null
      document.querySelector('.fixed-header').style.display = null
    },

    handleBackLevel() {
      this.$emit('showHome')
      this.showLayout()
    },
    handleSubmitConfig() {
      const data = this.$refs.addPage.settingDataList
      /* TODO 提交所有配置数据到数据库中 */
    }
  }
}
</script>

<style lang="scss" scoped>
.add-template-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  justify-content: flex-start;

  .left-box {
    width: 150px;

  // overflow-y: auto;
  }
  .right-box {
    width: calc(100% - 150px);
  }
}

</style>
