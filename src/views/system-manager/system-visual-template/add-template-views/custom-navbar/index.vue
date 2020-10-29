<template>
  <div class="navbar">
    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <div class="avatar-wrapper">
        <el-button type="text" @click="handleSubmitConfig">提交配置</el-button>
        <el-button type="text" @click="handleBackLevel">回到上级</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from './Breadcrumb'

export default {
  components: {
    Breadcrumb
  },
  computed: {},
  mounted() {},
  methods: {
    handleBackLevel() {
      this.$emit('handleBackLevel')
    },
    handleSubmitConfig() {
      this.$emit('handleSubmitConfig')
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-wrapper {
  // margin-top: 5px;
  padding-right: 20px;
}
.navbar {
  height: 50px;
  line-height: 50px;
  padding-left: 25px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        // margin-top: 5px;
        padding-right: 20px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
