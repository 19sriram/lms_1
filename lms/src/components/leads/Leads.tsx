import {
  Table,
  Input,
  PageHeader,
  Modal,
  Spin,
  Form,
  message
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
import { _leadIndustries, _leadStatus } from "../common/const";
import "./Leads.css";
import { AddLeadComponent } from "./addLead";
import ShowLeadInfo from "./showLeadInfo";

const { Search } = Input;


const LeadsComponent = (props) => {
  const [allLeads, setAllLeads] = useState([]);
  const [selectedLead, setSelectedLead]: any = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const [form] = Form.useForm();
  const { TextArea } = Input;
  useEffect(() => {
    try {

      _getLeads().then((response) => {
        setAllLeads(response.data);
      });
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
      leadSource: "portal",
      industry: values.leadindustry,
      address: values.address,
      description: values.description,
      createdById: adminDetails.id,
      createdByRole: adminDetails.role,
      createdByName: adminDetails.firstname,
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

  const showDrawer = (row) => {
    setSelectedLead(row);
    setDrawerVisible(true);
    console.log(row);
  };

  const onDrawerClose = () => {
    setDrawerVisible(false);
  };

  useEffect(() => {
    selectedLead?.status_history?.map((item) => {
      console.log(
        item.status +
          " by " +
          item.createdByName +
          " , " +
          item.createdByRole +
          " on " +
          item.date
      );
    });
  }, [selectedLead]);
  
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
    },
    {
      title: "Status",
      dataIndex: "",
    },
  ];

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

      <Table columns={columns} dataSource={allLeads} 
       />
     <ShowLeadInfo selectedLead={selectedLead} drawerVisible={drawerVisible} onDrawerClose={onDrawerClose}/>
      
      <Modal
        title="Add new lead"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={1000}
      >
        {waiting && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}

        {<AddLeadComponent onNewLead={onNewLead} />}
      </Modal>
    </>
  );
};

export default LeadsComponent;
