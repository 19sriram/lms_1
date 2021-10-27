import { useState } from "react";

import { Layout, Menu, Breadcrumb, Dropdown, Button } from "antd";
import {
  DesktopOutlined,
  UserOutlined,
  CarryOutOutlined,
  AreaChartOutlined, 
  LogoutOutlined
} from "@ant-design/icons";

import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import FooterComponent from "../common/footer";
import  UsersComponent  from "../users/Users";
import RolesComponent from "../roles/Roles";
import LeadsComponent from "../leads/Leads";
import DashboardComponent from "../dashboard/Dashboard";

import './Layout.css';

const { Header, Content, Footer, Sider } = Layout;

const SiderDemo = () => {
  const history = useHistory();
  const Logout = ()=>{
    localStorage.clear();
    history.push('/')
  }
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => setCollapsed(!collapsed);
  /*--settings menu -*/

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Profile
        </a>
      </Menu.Item>
      <Menu.Item>
      <a target="_blank" onClick={Logout}>
          Logout
        </a>
      </Menu.Item>
      
    </Menu>
  );
  /*-- end settings menu -*/
  return (
    <>
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
       
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={["4"]} mode="inline">
            <Menu.Item key="4" icon={<AreaChartOutlined />}>
              <Link to="/dashboard">
                <span>
                  Dashboard
                </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="1" icon={<UserOutlined />} >
              <Link to="/users">
                <span>
                  Users
                </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to="/roles">
                <span>
                  Roles
                </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<CarryOutOutlined />}>
              <Link to="/leads">
                <span>
                  Leads
                </span>
                </Link>
              </Menu.Item>
              
            </Menu>
          </Sider>
          <Layout className="site-layout">
            
          <Header>
      <div className="logo" >
      <img style={{width: '7em'}} src="https://media.wired.com/photos/5926ffe47034dc5f91bed4e8/master/pass/google-logo.jpg"/>
      </div>
      <div className='layoutOptions'>
      <Dropdown overlay={menu} placement="bottomRight" arrow>
      <Button>Settings</Button>
    </Dropdown>
     
      {/* <LogoutOutlined onClick={()=>Logout()}/> */}

      </div>
      <div >
      </div>
    </Header>
            <Content className="contentSpace">
            <Switch>
            <Route path="/users">
            <UsersComponent/>
            </Route>
            <Route path="/roles">
            <RolesComponent/>
            </Route>
            <Route path="/leads">
            <LeadsComponent/>
            </Route>
            <Route path="/">
            <DashboardComponent/>
            </Route>
          </Switch>
            </Content>
            <FooterComponent />
          </Layout>
        
        </Layout>
      </Router>
    </>
  );
};

export default SiderDemo;
