import React, { useContext, useCallback } from "react";

import zh_CN from "./zh_CN";
import en_US from "./en_US";
import { Locale } from "./types";

const LocaleContext = React.createContext<string>(null!);

const { Provider } = LocaleContext;

// 提供中文英文的Provider
export const LocaleProvider: React.FC<{
  locale: string;
}> = function LocaleProvider({ locale, children }) {
  return <Provider value={locale}>{children}</Provider>;
};

// 组件内部需要使用的转换中英文的方法
export function useFormatLanguage() {
  const locale = useContext(LocaleContext);
  return useCallback(
    // useCallback返回缓存函数
    // id即sideConfig配置的titie/root
    // 根据title (即树形) 查询json文件(对象)中对应的字段
    // 即做到语言切换.
    (id: string) => {
      let json: Locale;
      if (locale === "enUS") {
        json = en_US;
      } else {
        json = zh_CN;
      }

      const ids = id.split(".");
      // 拆分传入的字符串( 找到此文件下的 ID 对应值 )

      let res = findValById(ids, json);
      // 根据 匹配的 ids 与 语言文件, 找到其匹配值

      return res;
    },
    [locale]
  );
}

function findValById(ids: string[], obj: Locale): any {
  if (ids.length === 1) {
    return obj[ids[0]];
  } else {
    let tmp = ids[0];
    ids.shift();

    return findValById(ids, obj[tmp]);
  }

  // 递归输出所有匹配值
}

// 暴露到外部的写法
// 达到缩减代码的目的
export const ID = {
  header_exit: "header.exit",

  sider_schedule: "sider.schedule",
  sider_scheduleCar: "sider.scheduleCar",
  sider_scheduleAddOrder: "sider.scheduleAddOrder",
  sider_scheduleChargeBack: "sider.scheduleChargeBack",
  sider_scheduleRuleSetting: "sider.scheduleRuleSetting",

  sider_plan: "sider.plan",
  sider_planDeparture: "sider.planDeparture",
  sider_planRushHour: "sider.planRushHour",

  sider_addtional: "sider.addtional",
  sider_addtionalUser: "sider.addtionalUser",
  sider_addtionalDriver: "sider.addtionalDriver",

  sider_statistics: "sider.statistics",
  sider_statisticsOrder: "sider.statisticsOrder",
  sider_statisticsMember: "sider.statisticsMember",
  sider_statisticsCar: "sider.statisticsCar",

  // 配置子路由中的breadcrumb
  breadcrumb_home: "breadcrumb.home",
};
