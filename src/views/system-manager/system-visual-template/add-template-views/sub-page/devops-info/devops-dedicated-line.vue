<template>
  <div class="devops-dedicated-line">
    <mutiple-form-table />
  </div>
</template>

<script>
import MutipleFormTable from '../sub-page-views/mutiple-form-table'

export default {
  components: {
    'mutiple-form-table': MutipleFormTable
  },
  data() {
  },
  methods: {
  }
}
</script>

<style lang="scss">
.devops-dedicated-line {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  padding: 20px;
  .el-row {
    padding: 15px 20px 0px 0px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
  }
}
</style>
