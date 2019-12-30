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
				id: 'schedule-addOrder',
				title: '补单管理',
				path: '/schedule/addorder',
			},
			{
				id: 'schedule-chargeBack',
				title: '退单管理',
				path: '/schedule/chargeback',
			},
			{
				id: 'schedule-ruleSetting',
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
				id: 'plan-departure',
				title: '发车计划',
				path: '/plan/departure'
			},
			{
				id: 'plan-rushHour',
				title: '高峰计划',
				path: '/plan/rushhour'
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
