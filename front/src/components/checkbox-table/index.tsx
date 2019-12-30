import React from 'react'

import { Table } from 'antd';
import './style.scss'

const CommonTable: React.FC<{} | any> = function CommonTable({status,data,columns,rowSelection}){
  
    
    return (
           <Table rowSelection={rowSelection} columns={columns} 
           dataSource={data} className="table"/>
    )
}

export default CommonTable;


