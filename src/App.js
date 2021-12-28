import React, {useState} from 'react';
import 'antd/dist/antd.css';
import { Layout,Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  FileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Route, Link } from 'react-router-dom';
import Home from './components/Home.js';
import Crypto from './components/tool/crypto/Crypto.js';
import CTIsetting from './components/admin/CTI/CTIsetting.js';
import VDNsetting from './components/admin/VDN/VDNsetting.js';
import IVRsetting from './components/admin/IVR/IVRsetting.js';
import CTIserver from './components/monitoring/server/CTIserver.js';


const { Sider } = Layout;
const { SubMenu } = Menu;


const { Header, Content, Footer } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => {
      console.log(collapsed);
      setCollapsed(collapsed);
  }
  const [page, setPage] = useState('dashboard');
  const onSeleted = (e)=>{
    setPage(e.key);
    console.log(page);
 }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider  collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" style={{color: 'white' 
                                    ,height:'32px'
                                    ,margin :'16px' }}>
        <img src={process.env.PUBLIC_URL+'/img/CTIBridge.png'} alt="CTIBridge"/>
      </div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <SubMenu key="Admin" icon={<UserOutlined />} title="Admin">
          <Menu.Item key="cti" onClick={onSeleted}>
            <Link to="/admin/CTIsetting/"/>
              CTI환경설정
          </Menu.Item>
          <Menu.Item key="vdn">
           <Link to="/admin/vdn/"/>
            VDN 관리
          </Menu.Item>
          <Menu.Item key="ivr">
            <Link to="/admin/ivr/"/>
            IVR 관리
          </Menu.Item>
        </SubMenu>
       
        <SubMenu key="Monitoring" icon={<DesktopOutlined />} title="Monitoring">
          <Menu.Item key="mon_ser">
            <Link to="/monitoring/server/"/>
              CTI서버 모니터링
          </Menu.Item>
        </SubMenu>
        <SubMenu key="Tool" icon={<FileOutlined />} title="CTI Tool">
          <Menu.Item key="crypto">
            <Link to="/tool/crypto"/>암복호화
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
    <Layout className="site-layout">
      <Header className="site-layout-background" style={{ padding: 0 }} />
      <Content style={{ margin: '0 16px' }}>
        <div>
          <Route path='/' component={Home} exact={true}/>
          <Route path='/tool/crypto' component={Crypto}/>
          <Route path='/admin/CTIsetting' component={CTIsetting}/>
          <Route path='/admin/vdn' component={VDNsetting}/>
          <Route path='/admin/ivr' component={IVRsetting}/>
          <Route path='/monitoring/server' component={CTIserver}/>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>CTIBridge admin ©2021 Created by HansolInticube</Footer>
    </Layout>
  </Layout>
  );
}

export default App;
