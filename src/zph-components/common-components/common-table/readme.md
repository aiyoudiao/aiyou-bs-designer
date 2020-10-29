# 通用表格组件

封装一个通用的表格组件

## 需求

一个通用的表格组件，支持 简单表格展示（有滚动条和无滚动条），支持滚动表格。

## 实现

基于element-ui table 和 dataV 来实现一个通用的数据展示表格组件

## 使用

``` jsx
<common-table :header="sourceDataConfig.header" :data="sourceDataConfig.data" :isScroll="sourceDataConfig.isScroll" :loading="sourceDataConfig.loading" :rowNum="7" @cleanLoading="sourceDataConfig.loading = false"></common-table>
```