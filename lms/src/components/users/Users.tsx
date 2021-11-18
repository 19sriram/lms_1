import { CheckCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import {
  Table,
  Input,
  PageHeader,
  Modal,
  Spin,
  Form,
  Select,
  message,
  Popconfirm,
} from "antd";
import { Drawer, Button } from "antd";
import { useEffect, useState } from "react";
import { getDecodedToken } from "../common/axios";
import {
  _addUser,
  _deleteUser,
  _getRoles,
  _getUsers,
  _handleUseractivation,
} from "./api";
import "./Users.css";

const { Search } = Input;

const UsersComponent = () => {
  const [allUsers, setAllusers] = useState([]);
  const [selectedUser, setSelectedUser]: any = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const { Option } = Select;
  const [form] = Form.useForm();

  useEffect(() => {
    try {
      _getUsers().then((response) => {
        setAllusers(response.data);
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const defaultGetUser = () => {
    try {
      _getUsers().then((response) => {
        setAllusers(response.data);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleNewUserAddition = async () => {
    try {
      _getRoles().then((response) => {
        if (response.result === "Success" && response.status == 200) {
          setAllRoles(response.data);
        }
        setIsModalVisible(true);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onNewUser = async (values: any) => {
    let adminDetails: any = getDecodedToken();

    let userInfo = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      role: values.role,
      group: values.role,
      profile: values.role,
      mobile: values.mobile,
      createdById: adminDetails.id,
      createdByName: adminDetails.firstname,
      createdByRole: adminDetails.role,
    };

    try {
      _addUser(userInfo).then((response) => {
        if (response.result === "Success" && response.status == 200) {
          message.success(response.message);
        } else {
          message.error(response.message);
        }
        setIsModalVisible(false);
        defaultGetUser();
        form.resetFields();
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteUser = () => {
    let userInfo = { email: selectedUser.email };

    try {
      _deleteUser(userInfo).then((response) => {
        if (response.result === "Success" && response.status == 200) {
          message.success(response.message);
        } else {
          message.error(response.message);
        }
        setIsModalVisible(false);
        defaultGetUser();
        onDrawerClose();
        form.resetFields();
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleUserActivationStatus = (email, isActive) => {
    
    try {
      _handleUseractivation(email, !isActive).then((response) => {
        if (response.result === "Success" && response.status == 200) {
          message.success(response.message);
        } else {
          message.error(response.message);
        }
        defaultGetUser();
        onDrawerClose();
      });
    } catch (e) {
      console.error(e);
    }
  };
  const handleDeleteUserCancel = (e) => {
    console.log(e);
    message.success("You didn`t delete the user");
  };

  const showDrawer = (row) => {
    setDrawerVisible(true);
    setSelectedUser(row);
  };

  const onDrawerClose = () => {
    setDrawerVisible(false);
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstname",
      render: (value, row, index) => (
        <a key={index} onClick={() => showDrawer(row)}>
          {value}
        </a>
      ),
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
    },
    {
      title: "Assigned Role",
      dataIndex: "role",
    },
    {
      title: "Phone Number",
      dataIndex: "mobile",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (value, row, index) => {
        return (
          <>
            <p>{value}</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {value ? (
                <span>
                  <MinusCircleOutlined
                    key={index}
                    style={{ color: "red", width: "2em", fontSize: "1.2em" }}
                    onClick={() =>
                      handleUserActivationStatus(row.email, row.isActive)
                    }
                  />
                </span>
              ) : (
                <span>
                  <CheckCircleOutlined
                    key={index}
                    style={{ width: "2em", fontSize: "1.2em" }}
                    onClick={() =>
                      handleUserActivationStatus(row.email, row.isActive)
                    }
                  />
                </span>
              )}
            </div>
          </>
        );
      },
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Users"
        subTitle="Manage users and activation status in this page"
      />
      <div className="usersOptions">
        <Button
          onClick={handleNewUserAddition}
          type="primary"
          className="addUsersBtnStyle"
        >
          Add Users
        </Button>

        <Search
          placeholder="input search text"
          onSearch={() => console.log(1)}
          style={{ width: 200 }}
        />
      </div>

      <Table columns={columns} dataSource={allUsers} onChange={onChange} 
      rowClassName={allUsers =>  allUsers.email===sessionStorage.getItem('email')?"disabled-row":''}

      />
      <Drawer
        title={selectedUser.firstname + " " + selectedUser.lastname}
        placement="right"
        closable={false}
        onClose={onDrawerClose}
        visible={drawerVisible}
        className={"userDrawer"}
      >
        <div className="drawerInfo" id={selectedUser.email}>
          <label>Email: {selectedUser.email}</label>
          <label>First Name: {selectedUser.firstname}</label>
          <label>Last Name: {selectedUser.lastname}</label>
          <label>Phone Number: {selectedUser.mobile}</label>
          <label>Role: {selectedUser.role}</label>
          <label>
            Managed by: {selectedUser.createdByName},{" "}
            {selectedUser.createdByRole}
          </label>
          <div className="drawerGroupedBtns">
            {
              <Popconfirm
                title="Are you sure to delete this user?"
                onConfirm={handleDeleteUser}
                onCancel={handleDeleteUserCancel}
                okText="Yes"
                cancelText="No"
              >
                <Button danger type="primary">
                  Delete User
                </Button>
              </Popconfirm>
            }
            {selectedUser.isActive ? (
              <Button
                danger
                onClick={() =>
                  handleUserActivationStatus(
                    selectedUser.email,
                    selectedUser.isActive
                  )
                }
              >
                Deactivate
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={() =>
                  handleUserActivationStatus(
                    selectedUser.email,
                    selectedUser.isActive
                  )
                }
              >
                Activate
              </Button>
            )}
          </div>
        </div>
      </Drawer>
      <Modal
        title="Add new user"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {waiting && (
          <div style={{ textAlign: "center" }}>
            {" "}
            <Spin />{" "}
          </div>
        )}

        {
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onNewUser}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Enter firstname"
              name="firstname"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Enter lastname"
              name="lastname"
              rules={[
                { required: true, message: "Please input your lastname!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Enter email"
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Enter phonenumber"
              name="mobile"
              rules={[
                { required: true, message: "Please input your phonenumber!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Select role" name="role">
              <Select>
                {allRoles &&
                  allRoles.map((item: any) => {
                    return <Option value={item.role}>{item.role}</Option>;
                  })}
              </Select>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        }
      </Modal>
    </>
  );
};

export default UsersComponent;
