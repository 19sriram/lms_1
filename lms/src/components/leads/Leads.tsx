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
  _addLead,
  _deleteUser,
  _getRoles,
  _getLeads,
  _handleUseractivation,
} from "./api";
import "./Leads.css";

const { Search } = Input;

const LeadsComponent = () => {
  const [allLeads, setAllLeads] = useState([]);
  const [selectedUser, setSelectedUser]: any = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const { Option } = Select;
  const [form] = Form.useForm();
  const {TextArea} = Input;
  useEffect(() => {
    try {
      let executiveValues:any = getDecodedToken();
      
      _getLeads().then((response) => {
        setAllLeads(response.data);
      });
      
let leadValues:any = {};
      let leadInfo = {
        'leadOwner': executiveValues.firstname,
        'owneremail': executiveValues.email,
        'createdById': executiveValues.id,
        'createdByRole': executiveValues.role,
        'createdByName': executiveValues.firstname,
        'company': leadValues.company,
        'firstname': leadValues.firstname,
        'lastname': leadValues.lastname,
        'title': leadValues.title,
        'email': leadValues.email,
        'phone': leadValues.phone,
        'website': leadValues.website,
        'leadSource': leadValues.leadSource,
        'industry': leadValues.industry,
        'address': leadValues.address,
        'description': leadValues.description
      }

    } catch (e) {
      console.error(e);
    }
  }, []);

  const defaultGetUser = () => {
    try {
      _getLeads().then((response) => {
        setAllLeads(response.data);
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

  const onNewLead = async (values: any) => {
    let adminDetails: any = getDecodedToken();

    let userInfo = {
      leadOwner: adminDetails.firstname,
      company: values.company,
      firstName: values.firstname,
      lastname: values.lastname,
      title: values.title,
      email: values.email,
      phone: values.mobile,
      website: values.website,
      leadSource: 'portal',
      industry:'configured',
      address: values.address,
      description: values.description,
      createdById: adminDetails.id,
      createdByRole: adminDetails.role,
      createdByName: adminDetails.firstname
    };


    try {
      _addLead(userInfo).then((response) => {
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
      dataIndex: "firstName",
      render: (value, row, index) => (
        <a key={index} onClick={() => showDrawer(row)}>
          {value}
        </a>
      ),
    },
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
    {
      title: "Lead Owner",
      dataIndex: "createdByName",
    }
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Leads"
        subTitle="Manage leads and activities in this page"
      />
      <div className="usersOptions">
        <Button
          onClick={handleNewUserAddition}
          type="primary"
          className="addUsersBtnStyle"
        >
          Add Leads
        </Button>

        <Search
          placeholder="input search text"
          onSearch={() => console.log(1)}
          style={{ width: 200 }}
        />
      </div>

      <Table columns={columns} dataSource={allLeads} onChange={onChange} />
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
        title="Add new lead"
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
            onFinish={onNewLead}
            autoComplete="off"
            form={form}
          >
             <Form.Item
              label="Enter company"
              name="company"
              rules={[
                { required: true, message: "Please input lead company!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Enter firstname"
              name="firstname"
              rules={[
                { required: true, message: "Please input lead firstname!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Enter lastname"
              name="lastname"
              rules={[
                { required: true, message: "Please input lead lastname!" },
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
                  message: "Please input lead email!",
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


            <Form.Item
              label="Enter title"
              name="title"
              rules={[
                { required: true, message: "Please input lead title!" },
              ]}
            >
              <Input />
            </Form.Item>



            <Form.Item
              label="Enter website"
              name="website"
              rules={[
                { required: true, message: "Please input your website!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Enter address"
              name="address"
              rules={[
                { required: false, message: "Please input your address!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Enter notes"
              name="description"
              rules={[
                { required: false, message: "Please input your notes!" },
              ]}
            >
              <Input />
            </Form.Item>

            {/* <Form.Item label="Select role" name="role">
              <Select>
                {allRoles &&
                  allRoles.map((item: any) => {
                    return <Option value={item.role}>{item.role}</Option>;
                  })}
              </Select>
            </Form.Item> */}

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

export default LeadsComponent;
