import React from 'react'
import {Link} from 'react-router-dom'


const PlanDeparture: React.FC<{}> = function PlanDeparture(){

  return (
    <div>
      <h1>发车计划</h1>
	<Link to='/plan/departure/addplan'>测试用链接, 子路由</Link>
    </div>
  )
}

export default PlanDeparture;