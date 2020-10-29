# 子页面目录 sub-page

## 目录结构设计

sub-page 目录下的所有目录及文件，对应着创建应用可视化模板这里的菜单及子菜单

```js
{
  menuList: [
    {
      name: "source-info",
      meta: { title: "资源信息", icon: "nested" },
      children: [
        {
          name: "device-info",
          meta: { title: "设备信息", icon: "" },
          notTop: true
        },
        {
          name: "service-info",
          meta: { title: "服务器信息", icon: "" },
          notTop: true
        }
      ]
    },
    {
      name: "operate-info",
      meta: { title: "运营信息", icon: "nested" },
      children: [
        {
          name: "net-alarm-info",
          meta: { title: "网管告警信息", icon: "" },
          notTop: true
        },
        {
          name: "change-info",
          meta: { title: "变更信息", icon: "" },
          notTop: true
        }
      ]
    },
    {
      name: "devops-info",
      meta: { title: "运维信息", icon: "nested" },
      children: [
        {
          name: "devops-device",
          meta: { title: "设备", icon: "" },
          notTop: true
        },
        {
          name: "devops-port",
          meta: { title: "端口", icon: "" },
          notTop: true
        },
        {
          name: "devops-dedicated-line",
          meta: { title: "专线", icon: "" },
          notTop: true
        },
        {
          name: "devops-app-system",
          meta: { title: "应用系统", icon: "" },
          notTop: true
        },
        {
          name: "devops-vs",
          meta: { title: "VS", icon: "" },
          notTop: true
        },
        {
          name: "devops-region",
          meta: { title: "区域", icon: "" },
          notTop: true
        },
        {
          name: "devops-domain",
          meta: { title: "域名", icon: "" },
          notTop: true
        },
        {
          name: "devops-app-node",
          meta: { title: "应用节点", icon: "" },
          notTop: true
        }
      ]
    }
  ];
}
```
