import { ID } from "./locale";
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
  {
    id: "schedule",
    root: ID.sider_schedule,
    icon: "pie-chart",
    children: [
      {
        id: "schedule_car",
        title: "sider.scheduleCar",
        path: "/schedule/car",
      },
      {
        id: "schedule_addOrder",
        title: "sider.scheduleAddOrder",
        path: "/schedule/addorder",
      },
      {
        id: "schedule_chargeBack",
        title: "sider.scheduleChargeBack",
        path: "/schedule/chargeback",
      },
      {
        id: "schedule_ruleSetting",
        title: "sider.scheduleRuleSetting",
        path: "/schedule/rulesetting",
      },
    ],
  },
  {
    id: "plan",
    root: ID.sider_plan,
    icon: "unordered-list",
    children: [
      {
        id: "plan_departure",
        title: "sider.planDeparture",
        path: "/plan/departure",
      },
      {
        id: "plan_rushHour",
        title: "sider.planRushHour",
        path: "/plan/rushhour",
      },
    ],
  },
  {
    id: "addtional",
    root: ID.sider_addtional,
    icon: "unordered-list",
    children: [
      {
        id: "addtional-user",
        title: "sider.addtionalUser",
        path: "/addtional/user",
      },
      {
        id: "addtional-driver",
        title: "sider.addtionalDriver",
        path: "/addtional/driver",
      },
    ],
  },
  {
    id: "statistics",
    root: ID.sider_statistics,
    icon: "pie-chart",
    children: [
      {
        id: "statistics_order",
        title: "sider.statisticsOrder",
        path: "/statistics/order",
      },
      {
        id: "statistics_member",
        title: "sider.statisticsMember",
        path: "/statistics/member",
      },
      {
        id: "statistics_car",
        title: "sider.statisticsCar",
        path: "/statistics/car",
      },
    ],
  },
];

export default SiderConfig;
