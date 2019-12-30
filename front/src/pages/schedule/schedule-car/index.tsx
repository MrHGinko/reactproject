import React from 'react'
import { useSelector } from 'react-redux';
import './style.scss'
import { Input,DatePicker,Select } from 'antd';
import CommonTable from '../../../components/checkbox-table'
const { Option } = Select;


const ScheduleCar: React.FC<{}> = function ScheduleCar(){
  const columns = [
    {
      title: '乘车方式',
      dataIndex: 'driveWay'
    //   render: (text:any) => <a>{text}</a>,
    },
    {
      title: '订单号码',
      dataIndex: 'orderNumber'
    },
    {
      title: '发车时间',
      dataIndex: 'departureTime'
    },
    {
        title: '购买人数',
        dataIndex: 'Purchases'
    },
    {
        title: '始发地',
        dataIndex: 'beginPlace'
    },
    {
        title: '目的地',
        dataIndex: 'endPlace'
    },
    {
        title: '会员手机',
        dataIndex: 'vipPhone'
    },
    {
        title: '订单状态',
        dataIndex: 'orderStatus'
    },
    {
        title: '支付金额',
        dataIndex: 'paymentAmount'
    },
    {
        title: '支付方式',
        dataIndex: 'paymentWay'
    },
    {
        title: '下单时间',
        dataIndex: 'orderTime'
    },
    {
        title: '派车状态',
        dataIndex: 'sendCarsStatus',
    },
  ];
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        driveWay: '拼车',
        orderNumber: 201903210001,
        departureTime:'2019-03-21 12:30',
        Purchases:1,
        beginPlace:'保定（老城）',
        endPlace:'北京（丰台）',
        vipPhone:15701606637,
        orderStatus:'正常',
        paymentAmount:'200.00',
        paymentWay:'微信',
        orderTime:'2019-03-21 10:30',
        sendCarsStatus:'未派车'
    });
  }
  const status = 'success';
  let userList = useSelector((state) => (state as any).getIn(['user', 'user']));
  console.log(userList);
  return (
    <>
      <div className="allColumn">
        <div className="column-one">
            <label>
              <span className="title">
                订单号码：
              </span>
              <Input placeholder=""/>
            </label>
            <label >
              <span className="title">
                始发地：
              </span>
              <Input placeholder=""/>
            </label>
            <label>
              <span className="title">
                乘车方式：
              </span>
              <Select defaultValue="全部" className="select">
                <Option value="Option1">Option1</Option>
                <Option value="Option2">Option2</Option>
              </Select>
            </label>
        </div>

        <div className="column-two">
          <label>
            <span className="title">
              发车时间：
            </span>
              <DatePicker showTime={{ format: 'HH:mm' }} placeholder=""
              format="YYYY-MM-DD HH:mm" className="departure-time"
              style={{width:"150px",minWidth:"150px"}}/>
              <span className="center-line">——</span>
              <DatePicker showTime={{ format: 'HH:mm' }} placeholder=""
              format="YYYY-MM-DD HH:mm" className="departure-time"
              style={{width:"150px",minWidth:"150px"}}/>
          </label>
          <label >
            <span className="title">
              目的地：
            </span>
            <Input placeholder=""/>
          </label>
          <label>
            <span className="title">
              支付方式：
            </span>
            <Select defaultValue="全部" className="select">
              <Option value="Option1">Option1</Option>
              <Option value="Option2">Option2</Option>
            </Select>
          </label>
        </div>

        <div className="column-three">
          <label>
            <span className="title">
              下车时间：
            </span>
            <DatePicker showTime={{ format: 'HH:mm' }} placeholder=""
              format="YYYY-MM-DD HH:mm" className="departure-time"
              style={{width:"150px",minWidth:"150px"}}/>
              <span className="center-line">——</span>
            <DatePicker showTime={{ format: 'HH:mm' }} placeholder=""
              format="YYYY-MM-DD HH:mm" className="departure-time"
              style={{width:"150px",minWidth:"150px"}}/>
          </label>
          <label >
            <span className="title">
              会员手机：
            </span>
            <Input placeholder=""/>
          </label>
          <label>
            <span className="title">
            派车状态：
            </span>
            <Select defaultValue="全部" className="select">
              <Option value="Option1">Option1</Option>
              <Option value="Option2">Option2</Option>
            </Select>
          </label>
        </div>

        <div className="column-four">
          <label>
            <span className="title">
            订单状态：
            </span>
            <Select defaultValue="全部" className="select">
              <Option value="Option1">Option1</Option>
              <Option value="Option2">Option2</Option>
            </Select>
          </label>
          <button className="query">查询</button>
        </div>
      </div>
      <button className="sendCars">+派车</button>
      <CommonTable status={status} data={data} columns={columns}/>
    </>
  )
}

export default ScheduleCar;