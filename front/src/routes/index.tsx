import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { RouteConfig } from 'react-router-config';
import { ID } from '../config/locale';

const routes: RouteConfig[] = [
	// 每一个路由配置项的额外 包括breadcrumb 与 鉴权 permisson
	// breadcrumb提供给breadkcrumb组件进行渲染面包屑. 并指定往返路径
	// 到达各区域子路由后需要手动配置其路径breadcrumb
	// 对应的title为locale文件中的中英文配置文件

	{
		path: '/',
		component: lazy(() => import('../pages/common/home')),
		exact: true,
		breadcrumb: [{ title: ID.breadcrumb_home }],
		permission: ['小二', '财务'],
	},

	// schedule
	{
		path: '/schedule/addorder',
		component: lazy(() => import('../pages/schedule/schedule-addorder')),
		breadcrumb: [{ title: ID.sider_schedule }, { title: ID.sider_scheduleAddOrder }],
		permission: ['小二', '财务'],
	},
	{
		path: '/schedule/car',
		component: lazy(() => import('../pages/schedule/schedule-car')),
		breadcrumb: [{ title: ID.sider_schedule }, { title: ID.sider_scheduleCar }],
		permission: ['小二', '财务'],
	},
	{
		path: '/schedule/chargeback',
		component: lazy(() => import('../pages/schedule/schedule-chargeback')),
		breadcrumb: [{ title: ID.sider_schedule }, { title: ID.sider_scheduleChargeBack }],
		permission: ['小二', '财务'],
	},
	{
		path: '/schedule/rulesetting',
		component: lazy(() => import('../pages/schedule/schedule-rulesetting')),
		breadcrumb: [{ title: ID.sider_schedule }, { title: ID.sider_scheduleRuleSetting }],
		permission: ['小二', '财务'],
	},

	// Plan
	// 子路由的配置需提前放置 or 为父路由添加exact: true, 避免父路由提前匹配而导致子路由无法匹配

	{
		path: '/plan/departure',
		exact: true,
		component: lazy(() => import('../pages/plan/plan-departure')),
		breadcrumb: [{ title: ID.sider_plan }, { title: ID.sider_planDeparture }],
		permission: ['财务'],
	},
	{
		path: '/plan/rushhour',
		component: lazy(() => import('../pages/plan/plan-rushhour')),
		breadcrumb: [{ title: ID.sider_plan }, { title: ID.sider_planRushHour }],
		permission: ['小二', '财务'],
	},
	{
		path: '/plan/departure/addplan',
		component: lazy(() => import('../pages/plan/plan-addplan')),
		breadcrumb: [
			{ title: ID.sider_plan },
			{ title: ID.sider_planDeparture, to: '/plan/departure' },
			{ title: ID.sider_planAddPlan },
		],
		permission: ['小二', '财务'],
	},

	// statistics
	{
		path: '/statistics/car',
		component: lazy(() => import('../pages/statistics/statistics-car')),
		breadcrumb: [{ title: ID.sider_statistics }, { title: ID.sider_statisticsCar }],
		permission: ['小二', '财务'],
	},
	{
		path: '/statistics/member',
		component: lazy(() => import('../pages/statistics/statistics-member')),
		breadcrumb: [{ title: ID.sider_statistics }, { title: ID.sider_statisticsMember }],
		permission: ['小二', '财务'],
	},
	{
		path: '/statistics/order',
		component: lazy(() => import('../pages/statistics/statistics-order')),
		breadcrumb: [{ title: ID.sider_statistics }, { title: ID.sider_statisticsOrder }],
		permission: ['小二', '财务'],
	},

	//错误页面
	{
		path: '/error',
		component: lazy(() => import('../pages/common/error')),
	},
	// 没有权限的页面
	{
		path: '/forbidden',
		component: lazy(() => import('../pages/common/forbidden')),
	},
	// 路径错误
	{
		path: '/not-match',
		component: lazy(() => import('../pages/common/not-match')),
	},
	{
		path: '**',
		render: () => <Redirect to='/not-match' />,
	},
];

export default routes;
