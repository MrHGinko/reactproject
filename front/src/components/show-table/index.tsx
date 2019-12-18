import React from 'react';
import { Empty, Table } from 'antd';
import useLoading from '../../utils/useLoading';

import './style.scss'

interface Prop {
	status: string;
	columns: any[];
	data: any[];
}

const ShowTable: React.FC<Prop> = function ShowTable({ status, columns, data }) {
	const dataDOM = data && <Table columns={columns}  className='table' dataSource={data}  />;

	const contentDOM = useLoading(status, dataDOM, <Empty />);

	return (
		<div className='show-table'>
			<div className='content-center table-content'>{contentDOM}</div>
		</div>
	);
};

export default ShowTable;
