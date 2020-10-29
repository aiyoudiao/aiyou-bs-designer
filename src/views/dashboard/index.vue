<template>
  <div class="wrapper">
    <header class="title">
      前端架构设计图
    </header>
    <section class="box-wrapper">
      <!-- 代码层面 -->
      <aside class="left-box">
        <div class="aside-content">
          <dl>
            <dt>TpyeScript、Jest、Cypress</dt>
            <dd>内置多种测试</dd>
            <dd>代码可读性强</dd>
            <dd>易扩展、好维护</dd>
          </dl>
        </div>
      </aside>
      <!-- 用户层面的 -->
      <article class="center-box">
        <div class="content">
          <dl>
            <dt>多端支持、PC端、移动端</dt>
            <dd>用户可在多种屏幕分辨率下访问该产品</dd>
          </dl>
        </div>
        <div class="content">
          <dl>
            <dt>定制化多种页面</dt>
            <dd>自定义配置 首页、详情页头、尾、logo、背景图</dd>
          </dl>
        </div>
        <div class="content">
          <dl>
            <dt>echarts图表、AntV G6树、图分析和编辑</dt>
            <dd>内置多种图表组件、蕴含图数据的分析及编辑</dd>
          </dl>
        </div>
        <div class="content">
          <dl>
            <dt>Vue、React、Webpack</dt>
            <dd>组件化、高性能、产品运行时优秀、呈现效果极佳</dd>
          </dl>
        </div>
      </article>
      <!-- 优化层面 -->
      <aside class="right-box">
        <div class="aside-content">
          <dl>
            <dt>多端渲染</dt>
            <dd>普通访问量，服务器端渲染</dd>
            <dd>访问量骤增，浏览器端渲染</dd>
            <dd>瓶颈优化，体验更佳</dd>
          </dl>
        </div>
      </aside>
    </section>
  </div>
</template>

<script>
export default {
  name: ''
}
</script>

<style lang="scss" scoped>
@mixin conten-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

dl {
  margin: 0;
  padding: 0;
}
dt {
  margin: 0;
  padding: 0;
}
dd {
  margin: 0;
  padding: 0;
}

.wrapper {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 1200px;
  margin: 20px auto;
  padding: 20px;
  /* background-color: #cc00aacc; */
  font-family: 微软雅黑;
  border-radius: 20px;

  .title {
    font-size: 25px;
    font-weight: 700;
  }
  .box-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .left-box,
    .right-box {
      width: 250px;
      background-color: #cbe3f8;
      border-radius: 10px;
      .aside-content {
        height: 600px;
        @include conten-center;

        dl {
          text-align: center;
          dt {
            height: 120px;
            @include conten-center;
            font-weight: 700;
            color: #e54648;
          }
          dd {
            height: 100px;
            background-color: #fff;
            margin: 20px auto;
            font-size: 16px;
            padding: 10px;
            border-radius: 20px;
            @include conten-center;
          }
        }
      }
    }
    .center-box {
      width: 600px;
      height: 600px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }

    .content {
      height: 90px;
      @include conten-center;
      border-radius: 10px;
      dl {
        width: 100%;
        dt {
          font-weight: 700;
        }
        dd {
          height: 40px;
          width: 70%;
            background-color: #fff;
            margin: 5px auto;
            font-size: 16px;
            padding: 10px;
            border-radius: 20px;
            @include conten-center;
        }
      }
    }

    .content:nth-child(1) {
      background-color: #42c181;
    }
    .content:nth-child(2) {
      background-color: #ffce80;
    }
    .content:nth-child(3) {
      background-color: #87cfa5;
    }
    .content:nth-child(4) {
      background-color: #87cfa5;
    }
  }
}
</style>
