import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { Layout, Menu, Icon } from 'antd';
import siderConfig from '../../config/sider.config';
import useRouteInfo from '../../utils/useRouteInfo';
// import { useFormatLanguage } from '../../config/locale';
const { SubMenu } = Menu;
const { Sider } = Layout;

const AppSider: React.FC<{}> = function AppSider() {
	// 切换路由的事件
	const history = useHistory();
	const itemClickAction = useCallback(
		(path: string) => {
			history.push(path);
		},
		[history],
	);

	// 获得展开菜单ids
	const { ids } = useRouteInfo();

	// const formatLanguage = useFormatLanguage();

	return (
		<Sider width={200} style={{ background: '#fff' }}>
			<Menu
				mode='inline'
				defaultOpenKeys={[ids[0]]}
				defaultSelectedKeys={[ids[1]]}
				style={{ height: '100%', borderRight: 0 }}>
				{siderConfig.map((configItem) => (
					<SubMenu
						key={configItem.id}
						title={
							<span>
								<Icon
									type={configItem.icon}
									style={{ marginRight: '4px' }}
								/>
								{/* {formatLanguage(configItem.root)}  国际化*/}
								{configItem.root}
							</span>
						}>
						{configItem.children.map((item) => (
							<Menu.Item
								key={item.id}
								onClick={() => {
									itemClickAction(item.path);
								}}>
								{/* {formatLanguage(item.title)} */}
								{item.title}
							</Menu.Item>
						))}
					</SubMenu>
				))}
			</Menu>
		</Sider>
	);
};

export default AppSider;
