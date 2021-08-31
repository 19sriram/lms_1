import { Table, Input } from 'antd';
import { Drawer, Button } from 'antd';
import { useState } from 'react';

import './Roles.css';
const { Search } = Input;

 const  RolesComponent = ()=>{
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
      setVisible(true);
    };
    const onClose = () => {
      setVisible(false);
    };
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          render:()=><a onClick={showDrawer}>1</a>
        },
        {
          title: 'Email',
          dataIndex: 'chinese',
          sorter: {
            compare: (a, b) => a.chinese - b.chinese,
            multiple: 3,
          },
        },
        {
          title: 'Math Score',
          dataIndex: 'math',
          sorter: {
            compare: (a, b) => a.math - b.math,
            multiple: 2,
          },
        },
        {
          title: 'English Score',
          dataIndex: 'english',
          sorter: {
            compare: (a, b) => a.english - b.english,
            multiple: 1,
          },
        },
      ];
      
      const data = [
        {
          key: '1',
          name: 'John Brown',
          chinese: 98,
          math: 60,
          english: 70,
        },
        {
          key: '2',
          name: 'Jim Green',
          chinese: 98,
          math: 66,
          english: 89,
        },
        {
          key: '3',
          name: 'Joe Black',
          chinese: 98,
          math: 90,
          english: 70,
        },
        {
          key: '4',
          name: 'Jim Red',
          chinese: 88,
          math: 99,
          english: 89,
        },
      ];
      function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
      }
      
     return (
         <>
         <h1>Roles</h1>
         <Button onClick={()=>null} type="primary" style={{ marginBottom: 16 }}>
          Add Role
        </Button>
        <div>
        <Search placeholder="input search text" onSearch={()=>console.log(1)} style={{ width: 200 }} />

        </div>
        <Table columns={columns} dataSource={data} onChange={onChange} />
        <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
        </>
     )
}

export default RolesComponent;