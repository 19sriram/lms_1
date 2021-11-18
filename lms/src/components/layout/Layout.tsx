import { useEffect, useState } from "react";

import { Layout, Menu, Breadcrumb, Dropdown, Button } from "antd";
import {
  DesktopOutlined,
  UserOutlined,
  CarryOutOutlined,
  AreaChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import FooterComponent from "../common/footer";
import UsersComponent from "../users/Users";
import RolesComponent from "../roles/Roles";
import LeadsComponent from "../leads/Leads";
import DashboardComponent from "../dashboard/Dashboard";
import { _links } from "../common/const";
import auth from '../common/auth';
import "./Layout.css";

const { Header, Content, Footer, Sider } = Layout;

const LayoutComp = (props:any) => {
  const history = useHistory();

  const Logout = () => {
    auth.logout(()=>{
      history.push('/')
    })
  };
  
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => setCollapsed(!collapsed);
  
  /*--settings menu -*/

  const menu = (
    <Menu style={{ alignContent: "center" }}>
      <Menu.Item key={4}>
        <br />
        <h3>{sessionStorage.getItem("email")}</h3>
      </Menu.Item>
      <Menu.Item key={5}>
        <a target="_blank" onClick={Logout}>
          <LogoutOutlined style={{ color: "red" }} /> Logout
        </a>
      </Menu.Item>
    </Menu>
  );
  /*-- end settings menu -*/

  useEffect(()=>{
    console.log(props);
  })
  return (
    <>
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={["4"]} mode="inline">
              {_links?.map((item, index) => {
                return (
                  // to maintain the role management within system
                  item.isAllowed.includes(props.role)? 
                  <Menu.Item key={index}>
                    <Link to={item.to}>
                      <span>{item.name}</span>
                    </Link>
                  </Menu.Item>:
                  <></>
                );
              })}
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header>
              <div className="logo">
                <img
                  style={{ width: "7em" }}
                  src="https://media.wired.com/photos/5926ffe47034dc5f91bed4e8/master/pass/google-logo.jpg"
                />
              </div>
              <div className="layoutOptions">
                <Dropdown overlay={menu} placement="bottomRight" arrow>
                  <Button>Settings</Button>
                </Dropdown>

              </div>
              <div></div>
            </Header>
            <Content className="contentSpace">
              <Switch>
                <Route path="/users" component={UsersComponent}>
                  <UsersComponent />
                </Route>
                <Route path="/roles">
                  <RolesComponent />
                </Route>
                <Route exact path="/leads" component={LeadsComponent} />
                 
                <Route path="/">
                  <DashboardComponent />
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

export default LayoutComp;
