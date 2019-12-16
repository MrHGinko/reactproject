import React, { Suspense, useMemo } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import renderRoutes from './routes/renderRoutes';
import Loading from './pages/common/loading';
import { useSelector } from 'react-redux';
import routes from './routes';
import Header from './layout/header';
import Sider from './layout/sider';
import Breadcrumb from './layout/breadcrumb';
import zhCN from 'antd/es/locale/zh_CN';
import enUS from 'antd/es/locale/en_US';
import { Layout, ConfigProvider } from 'antd';
import { LocaleProvider } from './config/locale';
const { Content } = Layout;

const AppLayout: React.FC<{}> = function AppLayout() {
	const role = useSelector((state) =>
		(state as any)
			.get('root')
			.get('userInfo')
			.get('role'),
	);
	return (
		<Layout className='app'>
			{/* 头部 */}
			<Header />
			<Layout>
				{/* 侧边栏 */}
				<Sider />
				<Layout style={{ padding: '0 24px 24px' }}>
					{/* 面包屑，展示层级 */}
					<Breadcrumb />
					{/* 内容 */}
					<Content className='app-content'>
						{/* 懒加载 */}
						<Suspense fallback={<Loading />}>{renderRoutes(routes, role)}</Suspense>
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

const Login: React.FC<{}> = function Login() {
	return <div>登录</div>;
};

const App: React.FC<{}> = function App() {
	const locale = useSelector((state) => {
		return (state as any).get('root').get('locale');
	});

	// 取得仓库的login状态
	const isLogin = useSelector((state) => {
		return (state as any).get('root').get('isLogin');
	});

	console.log(isLogin);

	// 判断语言
	const localeJSON = useMemo(() => {
		if (locale === 'zhCN') {
			return zhCN;
		} else if (locale === 'enUS') {
			return enUS;
		}
		return zhCN;
	}, [locale]);

	return (
		<BrowserRouter>
			<ConfigProvider locale={localeJSON}>
				<LocaleProvider locale={locale}>
					{/* 登录鉴权 */}
					<Switch>
						<Route path='/login' component={Login} />
						<Route
							render={() => {
								if (!isLogin) {
									return <Redirect to='/login' />;
								} else {
									return <AppLayout />;
								}
							}}
						/>
					</Switch>
				</LocaleProvider>
			</ConfigProvider>
		</BrowserRouter>
	);
};

export default App;
