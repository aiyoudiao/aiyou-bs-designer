<template>
  <div class="center-content-wrapper">
    <transition name="fade-transform" mode="out-in" :duration="500">
      <component :is="subpage" :setting-data="settingData" />
    </transition>

  </div>
</template>

<script>

import BaseInfo from './sub-page/index.vue'

import DeviceInfo from './sub-page/source-info/device-info.vue'
import ServiceInfo from './sub-page/source-info/service-info.vue'
import NetAlarmInfo from './sub-page/operate-info/net-alarm-info.vue'
import ChangeInfo from './sub-page/operate-info/change-info.vue'

import DevopsDevice from './sub-page/devops-info/devops-device.vue'
import DevopsPort from './sub-page/devops-info/devops-port.vue'
import DevopsDedicatedLine from './sub-page/devops-info/devops-dedicated-line.vue'
import DevopsAppSystem from './sub-page/devops-info/devops-app-system.vue'
import DevopsVS from './sub-page/devops-info/devops-vs.vue'
import DevopsRegion from './sub-page/devops-info/devops-region.vue'
import DevopsDomain from './sub-page/devops-info/devops-domain.vue'
import DevopsAppNode from './sub-page/devops-info/devops-app-node.vue'

export default {
  components: {
    'base-info': BaseInfo,
    'device-info': DeviceInfo,
    'service-info': ServiceInfo,
    'net-alarm-info': NetAlarmInfo,
    'change-info': ChangeInfo,
    'devops-device': DevopsDevice,
    'devops-port': DevopsPort,
    'devops-dedicated-line': DevopsDedicatedLine,
    'devops-app-system': DevopsAppSystem,
    'devops-vs': DevopsVS,
    'devops-region': DevopsRegion,
    'devops-domain': DevopsDomain,
    'devops-app-node': DevopsAppNode
  },
  props: {
    subpage: {
      type: String,
      default: () => 'base-info'
    }
  },
  data() {
    return {
      settingDataList: {
        'device-info': {
          name: '',
          table: [],
          date: new Date(),
          submmitter: ''
        },
        'service-info': {},
        'net-alarm-info': {},
        'change-info': {},
        'devops-device': {},
        'devops-port': {},
        'devops-dedicated-line': {},
        'devops-app-system': {},
        'devops-vs': {},
        'devops-region': {},
        'devops-domain': {},
        'devops-app-node': {}
      }}
  },
  computed: {
    settingData() {
      return this.settingDataList[this.subpage]
    }
  }
}
</script>

<style lang="scss">
.center-content-wrapper {
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
}
</style>
