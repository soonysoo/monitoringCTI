import React, {useState} from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapsed({collapsed});
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" style={{color : 'white'}}/>ctibridge
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          Dashboard
        </Menu.Item>
        {/* <Menu.Item key="2" icon={<DesktopOutlined />}>
          Admin
        </Menu.Item> */}
        <SubMenu key="sub1" icon={<UserOutlined />} title="Admin">
          <Menu.Item key="3">CTI환경설정</Menu.Item>
          <Menu.Item key="4">VDN 관리</Menu.Item>
          <Menu.Item key="5">IVR 관리</Menu.Item>
          <Menu.Item key="6">CTI서비스 관리</Menu.Item>
          <Menu.Item key="7">상담사 관리</Menu.Item>
        </SubMenu>
       
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Monitoring">
          <Menu.Item key="8">CTI서비스 관리</Menu.Item>
          <Menu.Item key="9">CTI서버 모니터링</Menu.Item>
          <Menu.Item key="10">CTI서비스 모니터링</Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" icon={<TeamOutlined />} title="Alarm">
          <Menu.Item key="11">알람보기</Menu.Item>
          <Menu.Item key="12">알람통계</Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" icon={<TeamOutlined />} title="CTI Tool">
          <Menu.Item key="13">암복호화</Menu.Item>
          <Menu.Item key="14">로그뷰어</Menu.Item>
          <Menu.Item key="15">Softphone</Menu.Item>
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
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          Bill is a cat.
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </Layout>
  );
}

export default App;
