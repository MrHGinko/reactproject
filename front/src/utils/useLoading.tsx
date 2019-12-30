import React from 'react';
import { Spin, Empty } from 'antd';
import './useLoading.scss'

function useLoading(status: string, dom: React.ReactNode, emptyDOM?: React.ReactNode) {
	switch (status) {
		case 'loading': {
			return  <div className="useLoding-css"><Spin size='large' tip='loading' /></div>;
		}
		case 'success': {
			return dom;
		}
		case 'fail': {
			return <div className="useLoding-css"><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='请求错误!' /></div>;
		}
		default: {
			//waiting
			return <div className="useLoding-css">{emptyDOM}</div> || null;
		}
	}
}

export default useLoading;
