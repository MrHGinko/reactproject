import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./style.scss";
import { Input, DatePicker, Select, Icon, Table } from "antd";
import CommonTable from "../../../components/checkbox-table";
const { Option } = Select;

const ScheduleAddOrder: React.FC<{}> = function ScheduleAddOrder() {
  const [addStatus, setAddStatus] = useState(false);
  const [selectCarStatus, selectCar] = useState(false);
  const [addPassengerStatus, addPassengerAction] = useState(false);
  const columns = [
    {
      title: "乘车方式",
      dataIndex: "driveWay",
      //   render: (text:any) => <a>{text}</a>,
    },
    {
      title: "订单号码",
      dataIndex: "orderNumber",
    },
    {
      title: "订单状态",
      dataIndex: "orderStatus",
    },
    {
      title: "会员手机",
      dataIndex: "vipPhone",
    },
    {
      title: "购买人数",
      dataIndex: "Purchases",
    },
    {
      title: "支付方式",
      dataIndex: "paymentWay",
    },
    {
      title: "支付金额",
      dataIndex: "paymentAmount",
    },
    {
      title: "发车时间",
      dataIndex: "departureTime",
    },
    {
      title: "始发地",
      dataIndex: "beginPlace",
    },
    {
      title: "目的地",
      dataIndex: "endPlace",
    },
    {
      title: "车牌号码",
      dataIndex: "licenseNumber",
    },
    {
      title: "车辆类型",
      dataIndex: "vehicleType",
    },
    {
      title: "座位数量",
      dataIndex: "seatNumber",
    },
    {
      title: "司机",
      dataIndex: "driver",
    },
    {
      title: "司机电话",
      dataIndex: "driverPhone",
    },
    {
      title: "补单时间",
      dataIndex: "replacementOrderTime",
    },
  ];
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      driveWay: "拼车",
      orderNumber: 201903210001,
      orderStatus: "已派车",
      vipPhone: 15701606637,
      Purchases: 6,
      paymentWay: "微信",
      paymentAmount: "200.00",
      departureTime: "2019-03-21 10:30",
      beginPlace: "保定站",
      endPlace: "北京西",
      licenseNumber: "京A88888",
      vehicleType: "别克商务",
      seatNumber: 7,
      driver: "周瑜龙",
      driverPhone: 18911002233,
      replacementOrderTime: "2019-03-21 17:30",
    });
  }
  const status = "success";
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      // console.log(selectedRowKeys, selectedRows);
    },
  };
  let userList = useSelector((state) => (state as any).getIn(["user", "user"]));

  const passengerColumns = [
    {
      title: "姓名",
      dataIndex: "name",
      //   render: (text:any) => <a>{text}</a>,
    },
    {
      title: "身份证号",
      dataIndex: "IDNumber",
    },
    {
      title: "手机",
      dataIndex: "phoneNumber",
    },
    {
      title: "操作",
      dataIndex: "operation",
    },
  ];

  const passengerData = [];
  for (let i = 0; i < 2; i++) {
    passengerData.push({
      key: i,
      name: "王小二",
      IDNumber: 420342199012083412,
      phoneNumber: 15801902345,
      operation: "删除",
    });
  }

  return (
    <div className="wrap">
      <div className="allColumn">
        <div className="column-one">
          <label>
            <span className="title">车牌号码：</span>
            <Input placeholder="" />
          </label>
          <label>
            <span className="title">始发地：</span>
            <Input placeholder="" />
          </label>
        </div>

        <div className="column-two">
          <label>
            <span className="title">发车时间：</span>
            <DatePicker
              showTime={{ format: "HH:mm" }}
              placeholder=""
              format="YYYY-MM-DD HH:mm"
              className="departure-time"
              style={{ width: "150px", minWidth: "150px" }}
            />
            <span className="center-line">——</span>
            <DatePicker
              showTime={{ format: "HH:mm" }}
              placeholder=""
              format="YYYY-MM-DD HH:mm"
              className="departure-time"
              style={{ width: "150px", minWidth: "150px" }}
            />
          </label>
          <label>
            <span className="title">目的地：</span>
            <Input placeholder="" />
          </label>
        </div>

        <div className="column-three">
          <label>
            <span className="title">补单时间：</span>
            <DatePicker
              showTime={{ format: "HH:mm" }}
              placeholder=""
              format="YYYY-MM-DD HH:mm"
              className="departure-time"
              style={{ width: "150px", minWidth: "150px" }}
            />
            <span className="center-line">——</span>
            <DatePicker
              showTime={{ format: "HH:mm" }}
              placeholder=""
              format="YYYY-MM-DD HH:mm"
              className="departure-time"
              style={{ width: "150px", minWidth: "150px" }}
            />
          </label>
          <label>
            <span className="title">会员手机：</span>
            <Input placeholder="" />
          </label>
        </div>

        <div className="column-four">
          <label>
            <span className="title">订单状态：</span>
            <Select defaultValue="全部" className="select">
              <Option value="Option1">Option1</Option>
              <Option value="Option2">Option2</Option>
            </Select>
          </label>
          <button className="query">查询</button>
        </div>
      </div>
      <button
        className="add"
        onClick={() => {
          setAddStatus(true);
        }}
      >
        新增
      </button>
      <button
        className="edit"
        onClick={() => {
          setAddStatus(true);
        }}
      >
        编辑
      </button>
      <button className="delete">删除</button>

      <CommonTable
        status={status}
        data={data}
        columns={columns}
        rowSelection={rowSelection}
      />

      {addStatus === true ? (
        <>
          <div className="addWrap"></div>
          <div className="addTable">
            <p className="addTitle">
              新增/编辑补单
              <Icon
                className="close"
                type="close"
                onClick={() => {
                  setAddStatus(false);
                }}
              />
            </p>
            <div className="content">
              <button
                className="selectCar"
                onClick={() => {
                  selectCar(true);
                }}
              >
                选择车辆
              </button>
              <div className="allColumn">
                <div className="column-one">
                  <label>
                    <span className="title">* 车牌号码：</span>
                    <Input placeholder="" />
                  </label>
                  <label>
                    <span className="title">* 司机姓名：</span>
                    <Input placeholder="" />
                  </label>
                  <label>
                    <span className="title">* 会员手机：</span>
                    <Input placeholder="" />
                  </label>
                  <label>
                    <span className="title">* 上车城市：</span>
                    <Select className="select">
                      <Option value="Option1">Option1</Option>
                      <Option value="Option2">Option2</Option>
                    </Select>
                  </label>
                  <label>
                    <span className="title">* 下车城市：</span>
                    <Select className="select">
                      <Option value="Option1">Option1</Option>
                      <Option value="Option2">Option2</Option>
                    </Select>
                  </label>
                </div>

                <div className="column-two">
                  <label>
                    <span className="title">* 车辆类型：</span>
                    <Select className="select">
                      <Option value="Option1">Option1</Option>
                      <Option value="Option2">Option2</Option>
                    </Select>
                  </label>
                  <label>
                    <span className="title">* 司机电话：</span>
                    <Input placeholder="" />
                  </label>
                  <label>
                    <span className="title">* 支付方式：</span>
                    <Select className="select">
                      <Option value="Option1">Option1</Option>
                      <Option value="Option2">Option2</Option>
                    </Select>
                  </label>
                  <label>
                    <span className="title">* 上车地点：</span>
                    <Input placeholder="" />
                  </label>
                  <label>
                    <span className="title">* 下车地点：</span>
                    <Input placeholder="" />
                  </label>
                </div>

                <div className="column-three">
                  <label>
                    <span className="title">* 总座位数：</span>
                    <Input placeholder="" />
                  </label>
                  <label>
                    <span className="title">* 剩余座位：</span>
                    <Input placeholder="" />
                  </label>
                  <label>
                    <span className="title">* 支付金额：</span>
                    <Input placeholder="" />
                  </label>
                  <label>
                    <span className="title">* 乘车类型：</span>
                    <Select className="select">
                      <Option value="Option1">Option1</Option>
                      <Option value="Option2">Option2</Option>
                    </Select>
                  </label>
                  <label>
                    <span className="title">* 发车时间：</span>
                    <Input placeholder="" />
                  </label>
                </div>
              </div>
              <button
                className="addPassenger"
                onClick={() => {
                  addPassengerAction(true);
                }}
              >
                添加乘客
              </button>
            </div>
            <Table
              columns={passengerColumns}
              dataSource={passengerData}
              className="passengerList"
            />
            <div className="operation">
              <button
                className="save"
                onClick={() => {
                  setAddStatus(false);
                }}
              >
                保存
              </button>
              <button
                className="cancel"
                onClick={() => {
                  setAddStatus(false);
                }}
              >
                取消
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {selectCarStatus ? (
        <>
          <div className="selectCarWrap"></div>
          <div className="selectCarTable">
            <p className="selectCarTitle">
              选择车辆
              <Icon
                className="close"
                type="close"
                onClick={() => {
                  selectCar(false);
                }}
              />
            </p>
            <div className="column">
              <label>
                <span className="title">* 车牌号码：</span>
                <Input placeholder="" />
              </label>
              <label>
                <span className="title">* 车辆类型：</span>
                <Select className="select">
                  <Option value="Option1">Option1</Option>
                  <Option value="Option2">Option2</Option>
                </Select>
              </label>
              <label>
                <span className="title">* 司机姓名：</span>
                <Input placeholder="" />
              </label>
              <label>
                <span className="title">* 司机电话：</span>
                <Input placeholder="" />
              </label>
              <button className="query">查询</button>
              <button className="select">选择</button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      {addPassengerStatus ? (
        <>
          <div className="addPassengerWrap"></div>
          <div className="addPassengerTab">
            <p className="addPassengerTitle">
              选择车辆
              <Icon
                className="close"
                type="close"
                onClick={() => {
                  addPassengerAction(false);
                }}
              />
            </p>
            <div className="allColumn">
              <div className="column">
                <label>
                  <span className="title">姓名：</span>
                  <Input placeholder="" />
                </label>
                <label>
                  <span className="title">身份证号：</span>
                  <Input placeholder="" />
                </label>
                <label>
                  <span className="title">手机号：</span>
                  <Input placeholder="" />
                </label>
              </div>
            </div>
            <div className="operation">
              <button
                className="save"
                onClick={() => {
                  addPassengerAction(false);
                }}
              >
                保存
              </button>
              <button
                className="cancel"
                onClick={() => {
                  addPassengerAction(false);
                }}
              >
                取消
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default ScheduleAddOrder;
