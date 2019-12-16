import {useMemo} from 'react'
import {useLocation} from 'react-router'
import {matchRoutes} from 'react-router-config'
import routes from '../routes'
import siderConfig from '../config/sider.config'

interface ItemInterface{
  title: string,
  to?: string
}

export default function useRouteInfo(){
  // 根据路由地址
  const {pathname} = useLocation();

  // 得到自定义的路由配置项中的path，breadcrumb
  const [{route: {path, breadcrumb}}] = matchRoutes(routes, pathname);

  const ids = useMemo(()=>{
    // 根据path切割得到菜单的id
    let ids: string[] = [];
    if(typeof path === 'string'){
      ids = path.split('/');
      ids.shift();
      
      //第0个id没有问题，直接使用
      //第1个id需要计算
      const match = siderConfig.find(item=>item.id === ids[0]);
      if(match){
        ids[1] = match.children.length === 1 ? match.children[0].id : `${ids[0]}-${ids[1]}`;
      }
    }
    return ids;
  }, [path]);
  

  // 输出breadcrumb， 菜单id
  return {
    breadcrumb: breadcrumb as ItemInterface[], 
    ids: ids
  };
}