import React from 'react'
import { Empty, Button } from 'antd';
import {Link} from 'react-router-dom'


const Forbidden: React.FC<{}> = function Forbidden(){

  return (
    <div className="common-container">
      <Empty description="403,对不起，你没有权限访问">
        <Button type="primary">
          <Link to="/">返回首页</Link>
        </Button>
      </Empty>
    </div>
  )
}

export default Forbidden;