import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import { RouteConfig } from "react-router-config";
import { ID } from "../config/locale";

const routes: RouteConfig[] = [
  // 每一个路由配置项的额外 包括breadcrumb 与 鉴权 permisson
  // breadcrumb提供给breadkcrumb组件进行渲染面包屑. 并指定往返路径
  // 到达各区域子路由后需要手动配置其路径breadcrumb
  // 对应的title为locale文件中的中英文配置文件

  {
    path: "/",
    component: lazy(() => import("../pages/common/home")),
    exact: true,
    breadcrumb: [{ title: ID.breadcrumb_home }],
  },

  // schedule
  {
    path: "/schedule/addorder",
    component: lazy(() => import("../pages/schedule/schedule-addorder")),
    breadcrumb: [
      { title: ID.sider_schedule },
      { title: ID.sider_scheduleAddOrder },
    ],
  },
  {
    path: "/schedule/car",
    component: lazy(() => import("../pages/schedule/schedule-car")),
    breadcrumb: [{ title: ID.sider_schedule }, { title: ID.sider_scheduleCar }],
  },
  {
    path: "/schedule/chargeback",
    component: lazy(() => import("../pages/schedule/schedule-chargeback")),
    breadcrumb: [
      { title: ID.sider_schedule },
      { title: ID.sider_scheduleChargeBack },
    ],
  },
  {
    path: "/schedule/rulesetting",
    component: lazy(() => import("../pages/schedule/schedule-rulesetting")),
    breadcrumb: [
      { title: ID.sider_schedule },
      { title: ID.sider_scheduleRuleSetting },
    ],
  },

  // Plan
  // 子路由的配置需提前放置 or 为父路由添加exact: true, 避免父路由提前匹配而导致子路由无法匹配
  {
    path: "/plan/departure",
    exact: true,
    component: lazy(() => import("../pages/plan/plan-departure")),
    breadcrumb: [{ title: ID.sider_plan }, { title: ID.sider_planDeparture }],
  },
  {
    path: "/plan/rushhour",
    component: lazy(() => import("../pages/plan/plan-rushhour")),
    breadcrumb: [{ title: ID.sider_plan }, { title: ID.sider_planRushHour }],
  },

  // addtional 注册
  {
    path: "/addtional/user",
    exact: true,
    component: lazy(() => import("../pages/addtional/addtional-user")),
    breadcrumb: [
      { title: ID.sider_addtional },
      { title: ID.sider_addtionalUser },
    ],
  },
  {
    path: "/addtional/driver",
    component: lazy(() => import("../pages/addtional/addtional-driver")),
    breadcrumb: [
      { title: ID.sider_addtional },
      { title: ID.sider_addtionalDriver },
    ],
  },

  // statistics
  {
    path: "/statistics/car",
    component: lazy(() => import("../pages/statistics/statistics-car")),
    breadcrumb: [
      { title: ID.sider_statistics },
      { title: ID.sider_statisticsCar },
    ],
    permission: ["admin"],
  },
  {
    path: "/statistics/member",
    component: lazy(() => import("../pages/statistics/statistics-member")),
    breadcrumb: [
      { title: ID.sider_statistics },
      { title: ID.sider_statisticsMember },
    ],
    permission: ["admin"],
  },
  {
    path: "/statistics/order",
    component: lazy(() => import("../pages/statistics/statistics-order")),
    breadcrumb: [
      { title: ID.sider_statistics },
      { title: ID.sider_statisticsOrder },
    ],
    permission: ["admin"],
  },

  //错误页面
  {
    path: "/error",
    component: lazy(() => import("../pages/common/error")),
  },
  // 没有权限的页面
  {
    path: "/forbidden",
    component: lazy(() => import("../pages/common/forbidden")),
  },
  // 路径错误
  {
    path: "/not-match",
    component: lazy(() => import("../pages/common/not-match")),
  },

  {
    path: "**",
    render: () => <Redirect to="/" />,
  },
];

export default routes;
