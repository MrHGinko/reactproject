import React from 'react'
import CommonTable from '../../../components/checkbox-table'

import './style.scss'


const PlanRushHour: React.FC<{}> = function PlanRushHour(){
  const columns = [
    {
      title: '计划名称',
      dataIndex: 'planName',
      width: 200
    },
    {
      title: '发车时间',
      dataIndex: 'dispatchTime',
      width: 200
    },
    {
      title: '拼车单价',
      dataIndex: 'carpollPrice',
      width: 120
    },
    {
      title: '包车价格',
      dataIndex: 'charterPrice',
      width: 120
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      width: 120
    },
    {
      title: '操作',
      dataIndex: 'operate',
      width: 120
    }
  ];

  const data = [];
  for (let i = 0; i < 12; i++) {
    data.push({
      planName: '保定(老城)-北京(丰台)',
      dispatchTime:'2019-03-21 12:30',
      carpollPrice:'￥200',
      charterPrice:'400',
      remarks: '暂无',
      operate:'查看'
    });
  }

  

  const status = 'success';

  return (
    <div className="plan-rushhour">
      <div className="title-wrap">
        <span className="title">高峰时段计划</span>
      </div>
      <div className="find">
        <div className="find-wrap">
          <div className="plan-name find-item">
            <span>计划名称：</span>
            <input type="text"/>
          </div>
        </div>
        <button className="btn">查询</button>
      </div>
      <div className="operate">
        <button className="add btn">新增</button>
        <button className="edit btn">编辑</button>
        <button className="delete btn">删除</button>
      </div>

      <CommonTable status={status} data={data} columns={columns}/>
    </div>
  )
}

export default PlanRushHour;