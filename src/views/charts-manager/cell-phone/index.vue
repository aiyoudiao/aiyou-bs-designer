<!--
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-08-26 18:02:48
 * @LastEditTime: 2020-08-31 11:04:57
 * @LastEditors: aiyoudiao
 * @FilePath: \code\src\views\charts-manager\cell-phone\index.vue
-->
<template>
  <div id="cell-phone">
    <!-- <dv-full-screen-container class="bg"> -->
    <div class="bg">
      <!-- <dv-loading v-if="loading">Loading...</dv-loading> -->
      <!-- 四张表格轮播 -->
      <el-row>
        <!-- 左边的资源数据 -->
        <el-col :span="12">
          <div class="zph-container">
            <div class="zph-data-title">资源数据</div>
            <div class="zph-data-top">
              <div class="table-operator clearfix">
                <span class="left-f">设备统计</span>
                <span class="right-f">
                  <i class="el-icon-search" />
                </span>
              </div>
              <div class="table">
                <common-table
                  :header="sourceDataConfig.header"
                  :data="sourceDataConfig.data"
                  :is-scroll="sourceDataConfig.isScroll"
                  :loading="sourceDataConfig.loading"
                  :row-num="7"
                  @cleanLoading="sourceDataConfig.loading = false"
                />
              </div>
            </div>
            <div class="zph-data-bottom zph-data-span">
              <div class="table-operator clearfix">
                <span class="left-f">服务器统计</span>
                <span class="right-f">
                  <i class="el-icon-search" />
                </span>
              </div>
              <div class="table">
                <!-- <dv-scroll-board :config="serverDataConfig" style="min-height:calc(35 * 6.23px)" /> -->
                <common-table
                  :header="serverDataConfig.header"
                  :data="serverDataConfig.data"
                  :is-scroll="serverDataConfig.isScroll"
                  :loading="serverDataConfig.loading"
                  :row-num="6"
                  @cleanLoading="serverDataConfig.loading = false"
                />
              </div>
            </div>
          </div>
        </el-col>

        <!-- 右边的运营数据 -->
        <el-col :span="12" class="zph-container">
          <div class="zph2-data-title">运营数据</div>
          <div class="zph2-data-top">
            <div class="table-operator clearfix">
              <span class="left-f">网管告警信息</span>
              <span class="right-f">
                <i class="el-icon-search" />
              </span>
            </div>
            <div class="table-operator2">
              <span>四级事件</span>
              <span>42</span>
              <span>五级事件</span>
              <span>0</span>
            </div>
            <div class="table">
              <!-- <dv-scroll-board :config="netPoliceDataConfig" style="min-height:calc(35 * 6px)" /> -->
              <common-table
                :header="netPoliceDataConfig.header"
                :data="netPoliceDataConfig.data"
                :is-scroll="netPoliceDataConfig.isScroll"
                :loading="netPoliceDataConfig.loading"
                :row-num="6"
                @cleanLoading="netPoliceDataConfig.loading = false"
              />
            </div>
          </div>
          <div class="zph2-data-bottom zph2-data-span">
            <div class="table-operator clearfix">
              <span class="left-f">变更信息</span>
              <span class="right-f">
                <i class="el-icon-search" />
              </span>
            </div>
            <div class="table-operator2">
              <span>近七日已完成变更</span>
              <span>0</span>
              <span>实施阶段变更数</span>
              <span>234</span>
            </div>
            <div class="table">
              <!-- <dv-scroll-board :config="modifyDataConfig" style="min-height:calc(35 * 6px)" /> -->
              <common-table
                :header="modifyDataConfig.header"
                :data="modifyDataConfig.data"
                :is-scroll="modifyDataConfig.isScroll"
                :loading="modifyDataConfig.loading"
                :row-num="6"
                @cleanLoading="modifyDataConfig.loading = false"
              />
            </div>
          </div>
        </el-col>
      </el-row>

      <!-- 八张折线图 层叠折线图 -->
      <el-row>
        <!-- 网银线路 -->
        <el-col :span="24" class="line-container span-length">
          <div class="right-container">
            <div class="right-content-title">
              <div class="content">网银线路</div>
            </div>
            <div class="right-content-charts">
              <div class="content-charts">
                <!-- <ve-line :data="onlineBankLineConfig.chartData" /> -->
                <div class="radio-wrapper">
                  <el-radio-group
                    v-model="radioSelect"
                    size="small"
                    @change="handleRadioChange"
                  >
                    <el-radio-button label="出" />
                    <el-radio-button label="入" />
                  </el-radio-group>
                </div>
                <common-line
                  :data="onlineBankLineConfig.chartData.rows"
                  :header="onlineBankLineConfig.chartData.columns"
                  :normal="true"
                  :loading="onlineBankLineConfig.loading"
                  @cleanLoading="onlineBankLineConfig.loading = false"
                />
              </div>
            </div>
          </div>
        </el-col>

        <!-- 外层防火墙 -->
        <el-col :span="24" class="line-container span-length">
          <div class="right-container">
            <div class="right-content-title">
              <div class="content">外层防火墙</div>
            </div>
            <div class="right-content-charts">
              <div class="content-charts">
                <common-line
                  :data="outerFirewallAreaConfig.chartData.rows"
                  :header="outerFirewallAreaConfig.chartData.columns"
                  :normal="false"
                  :settings="outerFirewallAreaConfig.chartSettings"
                  :loading="outerFirewallAreaConfig.loading"
                  @cleanLoading="outerFirewallAreaConfig.loading = false"
                />
                <!-- <ve-line :data="outerFirewallAreaConfig.chartData" :settings="outerFirewallAreaConfig.chartSettings" /> -->
              </div>
            </div>
          </div>
        </el-col>

        <!-- 第一层负载均衡 -->
        <el-col :span="24" class="line-container span-length">
          <div class="right-container">
            <div class="right-content-title">
              <div class="content">第一层负载均衡</div>
            </div>
            <div class="right-content-charts">
              <div class="content-charts">
                <common-line
                  :data="layer1LoadBalancLineConfig.chartData.rows"
                  :header="layer1LoadBalancLineConfig.chartData.columns"
                  :normal="true"
                  :loading="layer1LoadBalancLineConfig.loading"
                  @cleanLoading="layer1LoadBalancLineConfig.loading = false"
                />

                <!-- <ve-line :data="layer1LoadBalancLineConfig.chartData" /> -->
              </div>
            </div>
          </div>
        </el-col>

        <!-- SSL加解密 -->
        <el-col :span="24" class="line-container span-length">
          <div class="right-container">
            <div class="right-content-title">
              <div class="content">SSL加解密</div>
            </div>
            <div class="right-content-charts">
              <div class="content-charts">
                <common-line
                  :data="sslLineConfig.chartData.rows"
                  :header="sslLineConfig.chartData.columns"
                  :normal="true"
                  :loading="sslLineConfig.loading"
                  :extend="sslLineConfig.extend"
                  :legend-hides="sslLineConfig.legendHides"
                  @cleanLoading="sslLineConfig.loading = false"
                />

                <!-- <ve-line :data="sslLineConfig.chartData" :extend="sslLineConfig.extend" /> -->
              </div>
            </div>
          </div>
        </el-col>

        <!-- 第二层负载均衡 -->
        <el-col :span="24" class="line-container span-length">
          <div class="right-container">
            <div class="right-content-title">
              <div class="content">第二层负载均衡</div>
            </div>
            <div class="right-content-charts">
              <div class="content-charts">
                <!-- <ve-line :data="layer2LoadBalancLineConfig.chartData" /> -->
                <common-line
                  :data="layer2LoadBalancLineConfig.chartData.rows"
                  :header="layer2LoadBalancLineConfig.chartData.columns"
                  :normal="true"
                  :loading="layer2LoadBalancLineConfig.loading"
                  :extend="layer2LoadBalancLineConfig.extend"
                  @cleanLoading="layer2LoadBalancLineConfig.loading = false"
                />
              </div>
            </div>
          </div>
        </el-col>

        <!-- 代理服务器 -->
        <el-col :span="24" class="line-container span-length">
          <div class="right-container">
            <div class="right-content-title">
              <div class="content">代理服务器</div>
            </div>
            <div class="right-content-charts">
              <div class="content-charts">
                <!-- <ve-line :data="proxyServerLineCofig.chartData" /> -->
                <common-line
                  :data="proxyServerLineCofig.chartData.rows"
                  :header="proxyServerLineCofig.chartData.columns"
                  :normal="true"
                  :loading="proxyServerLineCofig.loading"
                  :extend="proxyServerLineCofig.extend"
                  @cleanLoading="proxyServerLineCofig.loading = false"
                />
              </div>
            </div>
          </div>
        </el-col>

        <!-- 内层防火墙 -->
        <el-col :span="24" class="line-container span-length">
          <div class="right-container">
            <div class="right-content-title">
              <div class="content">内层防火墙</div>
            </div>
            <div class="right-content-charts">
              <div class="content-charts">
                <!-- <ve-line :data="innerFirewallAreaConfig.chartData" :settings="innerFirewallAreaConfig.chartSettings" /> -->
                <common-line
                  :data="innerFirewallAreaConfig.chartData.rows"
                  :header="innerFirewallAreaConfig.chartData.columns"
                  :normal="false"
                  :settings="innerFirewallAreaConfig.chartSettings"
                  :loading="innerFirewallAreaConfig.loading"
                  @cleanLoading="innerFirewallAreaConfig.loading = false"
                />
              </div>
            </div>
          </div>
        </el-col>

        <!-- 局域网负载均衡 -->
        <el-col :span="24" class="line-container span-length">
          <div class="right-container">
            <div class="right-content-title">
              <div class="content">局域网负载均衡</div>
            </div>
            <div class="right-content-charts">
              <div class="content-charts">
                <!-- <ve-line :data="lanLoadBanlancConfig.chartData" /> -->
                <common-line
                  :data="lanLoadBanlancConfig.chartData.rows"
                  :header="lanLoadBanlancConfig.chartData.columns"
                  :normal="true"
                  :loading="lanLoadBanlancConfig.loading"
                  :extend="lanLoadBanlancConfig.extend"
                  @cleanLoading="lanLoadBanlancConfig.loading = false"
                />
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  // CHARTS_MANAGER,
  // CHARTS_MANAGER_PATH,
  // CHARTS_MANAGER_ZHCN,
  CHARTS_MANAGER_INDEX
  // CHARTS_MANAGER_INDEX_PATH,
  // CHARTS_MANAGER_INDEX_ZHCN
} from '@/constant/charts-manager'

import CommonTable from '@/zph-components/common-components/common-table'
import CommonLine from '@/zph-components/common-components/common-line'

export default {
  name: CHARTS_MANAGER_INDEX,
  components: {
    CommonTable,
    CommonLine
  },
  data() {
    return {
      testData: {
        data: [666, 999]
      },

      loading: true,
      /* 四张表格 */
      sourceDataConfig: {
        loading: true,
        isScroll: false,
        header: ['设备类型', '总数', '十四天变量', '运行数量', '十四天变量'],
        data: [
          ['安全设备', 274, 0, 135, 0],
          ['防火墙', 467, +1, 219, 0],
          ['负载均衡', 329, 0, 186, 0],
          ['交换机', 1984, 0, 1346, 0],
          ['路由器', 488, 0, 276, 0],
          ['其他', 878, 0, 692, 0],
          ['统计', 4420, +1, 2854, 0]
        ].concat(new Array(100).fill(['其他', 878, 0, 692, 0])),
        rowNum: 7, // 表格行数
        headerHeight: 30,
        headerBGC: '#fff', // 表头
        oddRowBGC: '#fff', // 奇数行
        evenRowBGC: '#ddd', // 偶数行
        index: false,
        /*                 columnWidth: [175], */
        align: ['center']
      },
      netPoliceDataConfig: {
        loading: true,
        isScroll: true,
        header: ['首次发生时间', '末次发生时间', '级别', '告警内容'],
        data: [
          ['08-11 10:25', '08-12 03:21', 4, '设备[ZJ-RT-7206-CIP-P]99999999999999999999999999999999999999'],
          ['08-11 12:45', '08-12 09:13', 4, '设备[ZJBHSN7K7-KF8-LF1]端...'],
          ['08-12 08:25', '08-12 08:25', 4, '设备[NY-HK_Router_2]FastEt...'],
          ['08-12 08:25', '08-12 08:25', 4, '设备[NY-HK_Router]FastEthe...'],
          ['08-12 08:25', '08-12 08:25', 4, '设备[NY-HK_Router_2]FastEt...'],
          ['08-12 08:25', '08-12 08:25', 4, '设备[NY-HK_Router]FastEthe...'],
          ['08-12 08:06', '08-12 08:06', 4, '设备[R005-L7-003]BGP_Peer...']
        ].concat(
          new Array(100).fill([
            '08-12 08:06',
            '08-12 08:06',
            4,
            '设备[R005-L7-003]BGP_Peer...'
          ])
        ),
        rowNum: 6, // 表格行数
        headerHeight: 30,
        headerBGC: '#fff', // 表头
        oddRowBGC: '#fff', // 奇数行
        evenRowBGC: '#ddd', // 偶数行
        index: false,
        // columnWidth: [220],
        align: ['center']
      },
      serverDataConfig: {
        loading: true,
        isScroll: true,
        header: ['设备名称', '运行数量', '十四天变量'],
        data: [
          ['手机银行WEB', 24, 0],
          ['手机银行APP', 23, 0],
          ['手机银行DB', 3, 0],
          ['手机银行其他', 121, 0],
          ['统计', 171, 0]
        ].concat(new Array(100).fill(['手机银行DB', 3, 0])),
        rowNum: 5, // 表格行数
        headerHeight: 30,
        headerBGC: '#fff', // 表头
        oddRowBGC: '#fff', // 奇数行
        evenRowBGC: '#ddd', // 偶数行
        index: false,
        // columnWidth: [300],
        align: ['center']
      },
      modifyDataConfig: {
        loading: true,
        isScroll: true,
        header: ['单号', '名称', '实施时间', '规划人', '实施人'],
        data: [
          ['NCHG-202...', '数据实验室...', '08-11 21:35', '冯俪恺', '冯俪恺'],
          ['NCHG-202...', '北京市分行...', '08-11 21:30', '阎玮', '阎玮'],
          ['NCHG-202...', '骨干网WH...', '08-11 21:30', '陆延琦', '陆延琦'],
          ['NCHG-202...', '关于开发交...', '08-11 21:27', '冯俪恺', '冯俪恺'],
          ['NCHG-202...', 'ZJGBSN7...', '08-11 21:26', '张琦', '张琦'],
          ['NCHG-202...', 'CHJDREBI...', '08-11 21:26', '阎玮', '阎玮']
        ].concat(
          new Array(100).fill([
            'NCHG-202...',
            '关于开发交...',
            '08-11 21:27',
            '冯俪恺',
            '冯俪恺'
          ])
        ),
        rowNum: 6, // 表格行数
        headerHeight: 30,
        headerBGC: '#fff', // 表头
        oddRowBGC: '#fff', // 奇数行
        evenRowBGC: '#ddd', // 偶数行
        index: false,
        // columnWidth: [175],
        align: ['center']
      },

      /* 折现图配置 普通折线图 */
      onlineBankLineConfig: {
        loading: true,
        chartData: {
          columns: [
            '时间',
            '手机银行应用总带宽（%)',
            '手机银行应用七日均值总带宽（%)',
            '网银线路总带宽使用率(%)',
            '网银线路总带宽七日均值使用率(%)'
          ],
          rows: [].concat(
            [
              ['9:00', 12.60, 9.60, 41.00, 36],
              ['9:05', 11.26, 6.26, 33.00, 24],
              ['9:10', 13.91, 9.91, 34.00, 30],
              ['9:15', 13.89, 11.89, 39.00, 30],
              ['9:20', 14.66, 10.66, 34.00, 31],
              ['9:25', 9.59, 7.59, 42.00, 33],
              ['9:30', 15.41, 13.41, 39.00, 29],
              ['9:35', 18.27, 14.27, 45.00, 36],
              ['9:40', 5.92, 1.92, 23.00, 16],
              ['9:45', 16.38, 11.38, 37.00, 32],
              ['9:50', 16.23, 13.23, 36.00, 32],
              ['9:55', 9.46, 8.46, 36.00, 30],
              ['10:00', 14.61, 12.61, 40.00, 39],
              ['10:05', 20.93, 16.93, 56.00, 51],
              ['10:10', 18.42, 16.42, 45.00, 36],
              ['10:15', 11.95, 7.95, 33.00, 29],
              ['10:20', 19.91, 15.91, 49.00, 42],
              ['10:25', 20.90, 19.90, 47.00, 40],
              ['10:30', 12.14, 10.14, 36.00, 33],
              ['10:35', 18.22, 15.22, 45.00, 42],
              ['10:40', null, null, null, NaN, 34],
              ['10:45', null, NaN, 27.00, 25],
              ['10:50', NaN, NaN, 43.00, 38],
              ['10:58', 10.07, 9.07, 26.00, 23],
              ['11:00', '-', '-', '-', '-']
              // ['11:00', '14.57', '9.57', '36.00', '26']
            ].map(value => {
              const [one, two, three, four, five] = value

              return {
                时间: one,
                '手机银行应用总带宽（%)': two,
                '手机银行应用七日均值总带宽（%)': three,
                '网银线路总带宽使用率(%)': four,
                '网银线路总带宽七日均值使用率(%)': five
              }
            })
          )
        }
      },

      /* 折现图配置2 层叠图 */
      outerFirewallAreaConfig: {
        loading: true,
        chartSettings: {
          stack: {
            时间: ['总会话数七日均值']
          },
          area: true
        },
        chartData: {
          columns: ['时间', '总会话数', '总会话数七日均值'],
          rows: [].concat(
            [
              ['9:00', '17032', '8894'],
              ['9:05', '32069', '22946'],
              ['9:10', '24021', '14756'],
              ['9:15', '22905', '20903'],
              ['9:20', '28756', '18815'],
              ['9:25', '34375', '24450'],
              ['9:30', '41334', '36374'],
              ['9:35', '35969', '27040'],
              ['9:40', '32661', '27430'],
              ['9:45', '34106', '28114'],
              ['9:50', '21520', '16893'],
              ['9:55', '21147', '15751'],
              ['10:00', '28248', '22950'],
              ['10:05', '25755', '19651'],
              ['10:10', '41870', '38109'],
              ['10:15', '23914', '15856'],
              ['10:20', '29066', '22777'],
              ['10:25', '27901', '22792'],
              ['10:30', '20096', '12613'],
              ['10:35', '28470', '24963'],
              ['10:40', '31375', '22173'],
              ['10:45', '28312', '19671'],
              ['10:50', '27105', '18373'],
              ['10:55', '25851', '22784'],
              ['11:00', '27865', '25335']
            ].map(value => {
              const [one, two, three] = value

              return {
                时间: one,
                总会话数: two,
                总会话数七日均值: three
              }
            })
          )
        }
      },

      /* 折现图配置 普通折线图 */
      layer1LoadBalancLineConfig: {
        loading: true,
        chartData: {
          columns: [
            '时间',
            '总并发连接',
            '总并发连接七日均值',
            '总新建连接',
            '总新建连接七日均值'
          ],
          rows: [].concat(
            [
              ['9:00', '16188', '13707', '53899', '42517'],
              ['9:05', '16015', '13727', '61213', '50068'],
              ['9:10', '12552', '10575', '58971', '51719'],
              ['9:15', '14549', '12976', '65870', '55966'],
              ['9:20', '15576', '12511', '57389', '52036'],
              ['9:25', '14828', '12414', '45030', '36132'],
              ['9:30', '16003', '11101', '65426', '60146'],
              ['9:35', '16202', '12000', '58889', '54042'],
              ['9:40', '13731', '11729', '66322', '62893'],
              ['9:45', '13696', '9751', '62153', '49795'],
              ['9:50', '16117', '12151', '62373', '51232'],
              ['9:55', '20209', '18854', '73341', '66559'],
              ['10:00', '13860', '9131', '50394', '37166'],
              ['10:05', '9362', '5467', '59226', '51030'],
              ['10:10', '16837', '11930', '69419', '60365'],
              ['10:15', '10720', '5932', '61923', '53760'],
              ['10:20', '11709', '7484', '58332', '43833'],
              ['10:25', '20828', '17426', '60749', '54501'],
              ['10:30', '11392', '9332', '45850', '31313'],
              ['10:35', '16090', '13749', '65481', '51549'],
              ['10:40', '16663', '12381', '80705', '70045'],
              ['10:45', '15933', '11315', '58657', '48196'],
              ['10:50', '14430', '11185', '63889', '54809'],
              ['10:55', '12903', '11335', '67456', '61253'],
              ['11:00', '16957', '13883', '62700', '57295']
            ].map(value => {
              const [one, two, three, four, five] = value

              return {
                时间: one,
                总并发连接: two,
                总并发连接七日均值: three,
                总新建连接: four,
                总新建连接七日均值: five
              }
            })
          )
        }
      },

      /* 折现图配置 普通折线图 */
      layer2LoadBalancLineConfig: {
        loading: true,
        chartData: {
          columns: [
            '时间',
            '总并发连接',
            '总并发连接七日均值',
            '总新建连接',
            '总新建连接七日均值'
          ],
          rows: [].concat(
            [
              ['9:00', '16305', '12554', '60310', '54945'],
              ['9:05', '16708', '13308', '53890', '47588'],
              ['9:10', '11923', '8880', '75795', '66547'],
              ['9:15', '13400', '9108', '68520', '63326'],
              ['9:20', '14943', '11504', '54397', '46717'],
              ['9:25', '13133', '10093', '66080', '56962'],
              ['9:30', '12986', '8124', '36982', '30372'],
              ['9:35', '14776', '11457', '42614', '35998'],
              ['9:40', '17894', '14168', '46880', '38461'],
              ['9:45', '18111', '14430', '71815', '64816'],
              ['9:50', '16273', '11958', '64932', '59750'],
              ['9:55', '15693', '11860', '48008', '38134'],
              ['10:00', '16644', '12531', '63601', '54435'],
              ['10:05', '12027', '8199', '66962', '58113'],
              ['10:10', '18016', '14289', '65570', '56665'],
              ['10:15', '10877', '7598', '57649', '47740'],
              ['10:20', '18163', '13864', '59703', '53706'],
              ['10:25', '16159', '11884', '76498', '70877'],
              ['10:30', '16772', '12853', '58520', '48952'],
              ['10:35', '16218', '11516', '53450', '46230'],
              ['10:40', '18796', '15186', '68221', '62667'],
              ['10:45', '13443', '9493', '50784', '41978'],
              ['10:50', '13642', '8839', '45945', '38339'],
              ['10:55', '14574', '11542', '60174', '52281'],
              ['11:00', '17713', '12950', '60704', '55449']
            ].map(value => {
              const [one, two, three, four, five] = value

              return {
                时间: one,
                总并发连接: two,
                总并发连接七日均值: three,
                总新建连接: four,
                总新建连接七日均值: five
              }
            })
          )
        }
      },

      /* 折现图配置 普通折线图 */
      proxyServerLineCofig: {
        loading: true,
        chartData: {
          columns: [
            '时间',
            '并发数',
            '并发数七日均值',
            '新建连接',
            '新建连接数七日均值'
          ],
          rows: [].concat(
            [
              ['9:00', '4979', '3734', '26412', '15914'],
              ['9:05', '4848', '3396', '61075', '55673'],
              ['9:10', '5403', '4739', '22337', '10849'],
              ['9:15', '6358', '5272', '47418', '38135'],
              ['9:20', '9275', '8517', '42091', '34478'],
              ['9:25', '2473', '1280', '91414', '80441'],
              ['9:30', '6166', '5266', '71039', '56869'],
              ['9:35', '9583', '8687', '10090', '-2011'],
              ['9:40', '9694', '8267', '78354', '71310'],
              ['9:45', '5579', '4960', '43172', '35375'],
              ['9:50', '8237', '7188', '86186', '75190'],
              ['9:55', '9482', '8518', '63555', '54593'],
              ['10:00', '9770', '8479', '41113', '32465'],
              ['10:05', '2233', '1585', '49782', '41417'],
              ['10:10', '6420', '5809', '87318', '74674'],
              ['10:15', '7588', '6839', '49063', '43529'],
              ['10:20', '6169', '5668', '84548', '77899'],
              ['10:25', '6552', '5319', '64861', '52824'],
              ['10:30', '2675', '1443', '57103', '42187'],
              ['10:35', '9651', '8880', '52668', '45947'],
              ['10:40', '7005', '6026', '14261', '5053'],
              ['10:45', '2248', '1345', '47956', '41243'],
              ['10:50', '2784', '1785', '85069', '71180'],
              ['10:55', '5786', '4961', '94070', '81777'],
              ['11:00', '5456', '4058', '77725', '67297']
            ].map(value => {
              const [one, two, three, four, five] = value

              return {
                时间: one,
                并发数: two,
                并发数七日均值: three,
                新建连接: four,
                新建连接数七日均值: five
              }
            })
          )
        }
      },

      /* 折现图配置2 层叠图 */
      innerFirewallAreaConfig: {
        loading: true,
        chartSettings: {
          stack: {
            时间: ['当前总会话数', '上期总会话数', '上期总会话数']
          },
          area: true
        },
        chartData: {
          columns: ['时间', '当前总会话数', '总会话数同期均值', '上期总会话数'],
          rows: [].concat(
            [
              ['9:00', '30474', '23266', '27752'],
              ['9:05', '17959', '8701', '14859'],
              ['9:10', '25380', '16696', '22730'],
              ['9:15', '32793', '26395', '29647'],
              ['9:20', '28847', '22212', '25747'],
              ['9:25', '34690', '25564', '31896'],
              ['9:30', '30591', '22044', '27135'],
              ['9:35', '27103', '21115', '23880'],
              ['9:40', '24824', '16812', '22283'],
              ['9:45', '16956', '9776', '13882'],
              ['9:50', '28549', '19578', '25969'],
              ['9:55', '28987', '21785', '25813'],
              ['10:00', '24994', '15576', '21860'],
              ['10:05', '36444', '30491', '33936'],
              ['10:10', '29865', '23346', '26537'],
              ['10:15', '20252', '11024', '17363'],
              ['10:20', '29625', '22684', '26969'],
              ['10:25', '27508', '20731', '24088'],
              ['10:30', '29340', '19345', '26298'],
              ['10:35', '28636', '23197', '25909'],
              ['10:40', '31333', '23037', '28425'],
              ['10:45', '27980', '19820', '24680'],
              ['10:50', '26026', '18068', '22926'],
              ['10:55', '27994', '22547', '24823'],
              ['11:00', '28981', '18982', '26205']
            ].map(value => {
              const [one, two, three, four] = value

              return {
                时间: one,
                当前总会话数: two,
                总会话数同期均值: three,
                上期总会话数: four
              }
            })
          )
        }
      },

      /* 折现图配置 普通折线图 */
      lanLoadBanlancConfig: {
        loading: true,
        chartData: {
          columns: [
            '时间',
            '总并发连接',
            '总并发连接七日均值',
            '总新建连接',
            '总新建连接七日均值'
          ],
          rows: [].concat(
            [
              ['9:00', '3922', '3284', '64947', '51983'],
              ['9:05', '3565', '2714', '25054', '2987'],
              ['9:10', '1760', '1067', '73356', '56983'],
              ['9:15', '2838', '1915', '43079', '25482'],
              ['9:20', '1936', '1003', '57604', '36178'],
              ['9:25', '3566', '2619', '65660', '47158'],
              ['9:30', '2866', '2254', '11055', '-8024'],
              ['9:35', '4113', '3573', '92760', '74724'],
              ['9:40', '4013', '3244', '78599', '61357'],
              ['9:45', '4763', '4222', '48130', '27181'],
              ['9:50', '4480', '3886', '84121', '68155'],
              ['9:55', '3805', '2810', '24122', '11506'],
              ['10:00', '2487', '1883', '73436', '58022'],
              ['10:05', '3085', '2523', '76136', '65912'],
              ['10:10', '2803', '2203', '94544', '72157'],
              ['10:15', '3698', '2807', '24070', '227'],
              ['10:20', '3974', '3068', '42992', '21301'],
              ['10:25', '2619', '1770', '60746', '37464'],
              ['10:30', '3402', '2633', '15106', '-1430'],
              ['10:35', '1911', '1033', '42512', '29824'],
              ['10:40', '2188', '1386', '29100', '12381'],
              ['10:45', '1697', '1167', '45930', '30938'],
              ['10:50', '3636', '2891', '61469', '36664'],
              ['10:55', '3829', '3075', '90568', '79845'],
              ['11:00', '1759', '842', '67163', '47998']
            ].map(value => {
              const [one, two, three, four, five] = value

              return {
                时间: one,
                总并发连接: two,
                总并发连接七日均值: three,
                总新建连接: four,
                总新建连接七日均值: five
              }
            })
          )
        }
      },

      /* 折现图配置 普通折线图 */
      sslLineConfig: {
        loading: true,
        legendHides: ['总会话数', '总会话数七日均值'],
        extend: {
          series: {
            label: {
              normal: {
                show: false
              }
            }
          },
          legend: {
            formatter: '{a|{name}}',
            textStyle: {
              rich: {
                a: {
                  color: '#ddd',
                  fontSize: 15,
                  width: 95,
                  height: 21,
                  padding: [0, 0, 0, 1]
                }
              }
            }
          }
        },
        chartData: {
          columns: [
            '时间',
            '总会话数',
            '总会话数七日均值',
            '总新建连接',
            '总新建连接数七日均值'
          ],
          rows: [].concat(
            [
              ['9:00', '25184', '21463', '106358', '24204'],
              ['9:05', '20145', '15947', '132833', '89220'],
              ['9:10', '19883', '11090', '233259', '196925'],
              ['9:15', '18283', '9728', '179076', '171295'],
              ['9:20', '21543', '16396', '287762', '276854'],
              ['9:25', '20959', '16328', '251872', '153122'],
              ['9:30', '16912', '12765', '263338', '207474'],
              ['9:35', '20006', '14370', '238119', '172434'],
              ['9:40', '16656', '10675', '273657', '191154'],
              ['9:45', '20851', '16845', '249101', '189382'],
              ['9:50', '26879', '18009', '114669', '22369'],
              ['9:55', '18482', '14143', '154866', '93204'],
              ['10:00', '26241', '19302', '252503', '159392'],
              ['10:05', '25140', '20949', '293483', '213469'],
              ['10:10', '14197', '9003', '144333', '104419'],
              ['10:15', '25679', '21745', '235801', '138394'],
              ['10:20', '22539', '16609', '236698', '145617'],
              ['10:25', '12110', '5530', '274675', '212153'],
              ['10:30', '19049', '13333', '259017', '186322'],
              ['10:35', '25511', '17131', '188487', '110237'],
              ['10:40', '20995', '16552', '255240', '221215'],
              ['10:45', '21695', '15076', '203275', '166565'],
              ['10:50', '19961', '13763', '225984', '131124'],
              ['10:55', '20647', '17097', '235796', '179966'],
              ['11:00', '18973', '11935', '162738', '110286']
            ].map(value => {
              const [one, two, three, four, five] = value

              return {
                时间: one,
                总会话数: two,
                总会话数七日均值: three,
                总新建连接: four,
                总新建连接数七日均值: five
              }
            })
          )
        }
      },
      radioSelect: '出'
    }
  },
  mounted() {
    this.cancleLoading()

    /* 模拟发送请求后重新刷新数据 */
    /*  setInterval(() => {
                 this.sourceDataConfig.data = [
                     ['安全设备' + Math.random(), 274, 0, 135, 0],
                     ['防火墙999', 467, 100, 219, 0],
                     ['负载均衡', 329, 0, 186, 0],
                     ['交换机', 1984, 0, 1346, 0],
                     ['路由器', 488, 0, 276, 0],
                     ['其他', 878, 0, 692, 0],
                     ['统计', 4420, +1, 2854, 0]
                 ]

                 console.log("!this.sourceDataConfig.loading", this.sourceDataConfig.loading)
                 this.sourceDataConfig.loading = !this.sourceDataConfig.loading
         }, 3000); */
  },
  methods: {
    cancleLoading() {
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    handleRadioChange(value) {
      const dataItem = this.onlineBankLineConfig.chartData.rows.shift()
      this.onlineBankLineConfig.chartData.rows.push(dataItem)
      this.onlineBankLineConfig = { ...this.onlineBankLineConfig }
      console.log('handleRadioChange', value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
