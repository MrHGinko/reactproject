import React from 'react'
import {Link} from 'react-router-dom'
import { Breadcrumb } from 'antd';
import useRouteInfo from '../../utils/useRouteInfo'
import {useFormatLanguage} from '../../config/locale'


const AppBreadcrumb: React.FC<{}> = function AppBreadcrumb(){

  const {breadcrumb} = useRouteInfo();
  const formatLanguage = useFormatLanguage();

  if(!breadcrumb){
    return null;
  }
  
  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      {
        breadcrumb.map((item, index: number)=>(
          <Breadcrumb.Item key={index}>
            {
              item.to ? <Link to={item.to}>
                          {formatLanguage(item.title)}
                        </Link>
            : formatLanguage(item.title)
            }
            
          </Breadcrumb.Item>
        ))
      }
    </Breadcrumb>
  )
}

export default AppBreadcrumb;