// import { ID } from './locale';

interface SiderItemInterface {
	id: string;
	title: string;
	path: string;
}
interface SiderConfigInterface {
	id: string;
	root: string;
	icon: string;
	children: SiderItemInterface[];
}

const SiderConfig: SiderConfigInterface[] = [

	// path 对应的是url路径,
	// 需与routes中保持一致
	// 对应root 与 title 的国际化, 对应到ID的key值即可
	{
		id: 'schedule',
		root: '调度管理',
		icon: 'pie-chart',
		children: [
			{
				id: 'schedule-car',
				title: '车辆调度',
				path: '/schedule/car',
			},
			{
				id: 'schedule-addorder',
				title: '补单管理',
				path: '/schedule/addorder',
			},
			{
				id: 'schedule-chargeback',
				title: '退单管理',
				path: '/schedule/chargeback',
			},
			{
				id: 'schedule-rulesetting',
				title: '退单规则设置',
				path: '/schedule/rulesetting',
			}
		]
	},
	{
		id: 'plan',
		root: '计划管理',
		icon: 'unordered-list',
		children: [
			{
				id: 'plan_departure',
				title: '发车计划',
				path: '/plan/departure'
			},
			{
				id: 'plan_rushHour',
				title: '高峰计划',
				path: '/plan/rushhour'
			}
		]
	},
	{
		id: 'addtional',
		root: '注册菜单',
		icon: 'unordered-list',
		children: [
			{
				id: 'user',
				title: '用户注册',
				path: '/addtional/user'
			},
			{
				id: 'addtional-driver',
				title: '司机注册',
				path: '/addtional/driver'
			}
		]
	},
	{
		id: 'statistics',
		root: '统计查询',
		icon: 'pie-chart',
		children: [
			{
				id: 'statistics-order',
				title: '订单统计',
				path: '/statistics/order'
			},
			{
				id: 'statistics-member',
				title: '会员统计',
				path: '/statistics/member'
			},
			{
				id: 'statistics-car',
				title: '车辆统计',
				path: '/statistics/car'
			}
		]
	},
];

export default SiderConfig;
