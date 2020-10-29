# 通用折线图组件

封装一个通用的折线图组件

## 需求

一个通用的表格组件，支持 普通折线图、带阴影面积的折线图

## 实现

基于v-charts 和 dataV 来实现一个通用的数据展示折线图组件

## 使用

``` jsx
<common-line :data="onlineBankLineConfig.chartData.rows" :header="onlineBankLineConfig.chartData.columns" :normal="false" :loading="onlineBankLineConfig.loading" @cleanLoading="onlineBankLineConfig.loading = false" />
```