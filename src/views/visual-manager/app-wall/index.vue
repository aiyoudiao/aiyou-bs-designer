<template>
  <div class="app-wall">
    <nav-view
      @handleSearchChange="handleSearchChange"
      @handleSelectChange="handleSelectChange"
    />
    <content-view
      :select-value="selectValue"
      @handlePageSizeChange="handlePageSizeChange"
      @handlePageNumberChange="handlePageNumberChange"
    />
  </div>
</template>

<script>

import NavView from './app-wall-views/nav-view'
import ContentView from './app-wall-views/content-view'
export default {
  name: 'AppWall',
  components: {
    'nav-view': NavView,
    'content-view': ContentView
  },
  data() {
    return {
      searchValue: '',
      selectValue: 'icon',
      pageSize: 36,
      pageNumber: 1
    }
  },
  methods: {
    handleSearchChange(value) {
      this.searchValue = value
      this.resetAppOrList()
    },
    handleSelectChange(value) {
      this.selectValue = value
      // this.resetAppOrList()
    },
    handlePageSizeChange(value) {
      this.pageSize = value
    },
    handlePageNumberChange(value) {
      this.pageNumber = value
    },

    resetAppOrList() {
      this.pageSize = 36
      this.pageNumber = 1
    }
  }
}
</script>

<style lang="scss">
.app-wall {
}
</style>
