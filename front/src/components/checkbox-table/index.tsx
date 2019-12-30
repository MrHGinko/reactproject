import React from 'react'

import { Table } from 'antd';
import './style.scss'

const CommonTable: React.FC<{} | any> = function CommonTable({status,data,columns}){
  
    const rowSelection = {
        onChange: (selectedRowKeys:any, selectedRows:any) => {
            // console.log(selectedRowKeys, selectedRows);
        }
    };
    return (
        <div>
           <Table rowSelection={rowSelection} columns={columns} 
           dataSource={data} className="table"/>
        </div>
    )
}

export default CommonTable;