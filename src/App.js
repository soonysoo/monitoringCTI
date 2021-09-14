import React, {useState} from 'react';
import 'antd/dist/antd.css';
import { Layout,Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Route, Link } from 'react-router-dom';
import Home from './components/Home.js';
import Crypto from './components/tool/crypto/Crypto.js';
import Softphone from './components/tool//softphone/Softphone.js'
import Logviewer from './components/tool/logviewer/Logviewer.js';
import CTIsetting from './components/admin/CTI/CTIsetting.js';

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
      <div className="logo" style={{color : 'white'}}/>ctibridge
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="dashboard" icon={<PieChartOutlined />}>
          Dashboard
        </Menu.Item>
        <SubMenu key="Admin" icon={<UserOutlined />} title="Admin">
          <Menu.Item key="cti" onClick={onSeleted}>
            <Link to="/admin/CTIsetting/"/>
              CTI환경설정
          </Menu.Item>
          <Menu.Item key="vdn">VDN 관리</Menu.Item>
          <Menu.Item key="ivr">IVR 관리</Menu.Item>
        </SubMenu>
       
        <SubMenu key="Monitoring" icon={<DesktopOutlined />} title="Monitoring">
          <Menu.Item key="mon_ct">CTI서비스 관리</Menu.Item>
          <Menu.Item key="mon_ser">CTI서버 모니터링</Menu.Item>
        </SubMenu>
        <SubMenu key="Alarm" icon={<TeamOutlined />} title="Alarm">
          <Menu.Item key="view">알람보기</Menu.Item>
          <Menu.Item key="stat">알람통계</Menu.Item>
        </SubMenu>
        <SubMenu key="Tool" icon={<FileOutlined />} title="CTI Tool">
          <Menu.Item key="crypto">
            <Link to="/tool/crypto"/>암복호화
          </Menu.Item>
          <Menu.Item key="log">
            <Link to="/tool/logview"/>로그뷰어
          </Menu.Item>
          <Menu.Item key="softphone">
            <Link to="/tool/softphone"/>Softphone
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
    <Layout className="site-layout">
      <Header className="site-layout-background" style={{ padding: 0 }} />
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        <div>
        {/* <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}> */}
          <Route path='/' component={Home} exact={true}/>
          <Route path='/tool/crypto' component={Crypto}/>
          <Route path='/tool/softphone' component={Softphone}/>
          <Route path='/tool/logview' component={Logviewer}/>
          <Route path='/admin/CTIsetting' component={CTIsetting}/>
          <Route path='/admin/vdn' component={Logviewer}/>
          <Route path='/admin/ivr' component={Logviewer}/>
          <Route path='/admin/agent' component={Logviewer}/>
          
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>CTIBridge admin ©2021 Created by HansolInticube</Footer>
    </Layout>
  </Layout>
  );
}

export default App;
