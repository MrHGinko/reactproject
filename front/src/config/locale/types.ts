export interface Locale {
	header: {
		exit: string;
	};
	sider: {
		schedule: string;
		scheduleCar: string;
		scheduleAddOrder: string;
		scheduleChargeBack: string;
		scheduleRuleSetting: string;
		
		plan: string;
		planDeparture: string;
		planRushHour: string;
		planAddPlan: string;

		statistics: string;
		statisticsOrder: string;
		statisticsMember: string;
		statisticsCar: string;

	};
	breadcrumb: {
		home: string;
		editGoods: string;
		orderDetail: string;
		editPermission: string;
		editAccount: string;
	};
	[propName: string]: any;
}
