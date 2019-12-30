import React from 'react'
import {Link} from 'react-router-dom'
import CommonTable from '../../../components/checkbox-table'

import './style.scss'


const PlanDeparture: React.FC<{}> = function PlanDeparture(){
  const columns = [
    {
      title: '计划名称',
      dataIndex: 'planName'
    },
    {
      title: '始发地',
      dataIndex: 'origin'
    },
    {
      title: '上车地点',
      dataIndex: 'startPlace'
    },
    {
        title: '目的地',
        dataIndex: 'deatination'
    },
    {
        title: '下车地点',
        dataIndex: 'endPlace'
    },
    {
        title: '发车时间',
        dataIndex: 'dispatchTime'
    },
    {
        title: '拼车单价',
        dataIndex: 'carpollPrice'
    },
    {
        title: '包车价格',
        dataIndex: 'charterPrice'
    },
    {
        title: '拼车等待时间',
        dataIndex: 'carpoolWaitingTime'
    },
    {
        title: '备注',
        dataIndex: 'remarks'
    }
  ];

  const data = [];
  
  for (let i = 0; i < 46; i++) {
    data.push({
      planName: '保定(老城)-北京(丰台)',
      origin: '保定(老城)',
      startPlace: '三里屯',
      deatination:'北京(丰台)',
      endPlace:'东街',
      dispatchTime:'2019-03-21 12:30',
      carpollPrice:'￥200',
      charterPrice:'400',
      carpoolWaitingTime:'50min',
      remarks: '暂无'
    });
  }
  
  const status = 'success';

  return (
    <div className="plan-departure">
      <div className="title-wrap">
        <span className="title">发车计划</span>
      </div>
      <div className="find">
        <div className="find-wrap">
          <div className="plan-name find-item">
            <span>计划名称：</span>
            <input type="text"/>
          </div>
          <div className="origin find-item">
            <span>始发地：</span>
            <input type="text"/>
          </div>
          <div className="destination find-item">
            <span>目的地：</span>
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
	    {/* <Link to='/plan/departure/addplan'>测试用链接, 子路由</Link> */}
    </div>
  )
}

export default PlanDeparture;