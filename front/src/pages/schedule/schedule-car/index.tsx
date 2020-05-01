import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";
import { Input, DatePicker, Select, Row, Col, Form, Button } from "antd";
import CommonTable from "../../../components/checkbox-table";
const { Option } = Select;

const FormItem = Form.Item;

const ScheduleCar: React.FC<{}> = function ScheduleCar() {
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
      title: "发车时间",
      dataIndex: "departureTime",
    },
    {
      title: "购买人数",
      dataIndex: "Purchases",
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
      title: "会员手机",
      dataIndex: "vipPhone",
    },
    {
      title: "订单状态",
      dataIndex: "orderStatus",
    },
    {
      title: "支付金额",
      dataIndex: "paymentAmount",
    },
    {
      title: "支付方式",
      dataIndex: "paymentWay",
    },
    {
      title: "下单时间",
      dataIndex: "orderTime",
    },
    {
      title: "派车状态",
      dataIndex: "sendCarsStatus",
    },
  ];
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      driveWay: "拼车",
      orderNumber: 201903210001,
      departureTime: "2019-03-21 12:30",
      Purchases: 1,
      beginPlace: "保定（老城）",
      endPlace: "北京（丰台）",
      vipPhone: 15701606637,
      orderStatus: "正常",
      paymentAmount: "200.00",
      paymentWay: "微信",
      orderTime: "2019-03-21 10:30",
      sendCarsStatus: "未派车",
    });
  }
  const status = "success";
  let userList = useSelector((state) => (state as any).getIn(["user", "user"]));

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
      xl: { span: 6 },
      xxl: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      xl: { span: 16 },
      xxl: { span: 16 },
    },
  };

  return (
    <>
      <Form {...formItemLayout}>
        <Row>
          <Col span={8}>
            <FormItem label="始发地：">
              <Input placeholder="" />
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem label="目的地：">
              <Input placeholder="" />
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem label="发车时间：">
              <DatePicker
                showTime={{ format: "HH:mm" }}
                placeholder=""
                format="YYYY-MM-DD HH:mm"
              />
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem label="下车时间：">
              <DatePicker
                showTime={{ format: "HH:mm" }}
                placeholder=""
                format="YYYY-MM-DD HH:mm"
              />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="会员手机：">
              <Input placeholder="" />
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem label="">
              <Button type="primary">搜索</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <CommonTable status={status} data={data} columns={columns} />
    </>
  );
};

export default ScheduleCar;
