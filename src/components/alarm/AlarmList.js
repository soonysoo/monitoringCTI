import React from 'react';
import { Table, Row, Col  } from 'antd';

const columns = [
  {
    title: 'Time',
    dataIndex: 'time',
  },
  {
    title: 'Level',
    dataIndex: 'level',
  },
  {
    title: 'Message',
    dataIndex: 'message',
  },
];
const data = [
  {
    key: '1',
    time: '2019.01.11',
    level: 'Error',
    message: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    time: '2019.01.11',
    level: 'Warning',
    message: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    time: '2019.01.11',
    level: 'Critical',
    message: 'Sidney No. 1 Lake Park',
  },
];


const AlarmList = () => {
  return (
    <>
     <Row style={{marginTop :40}} className="alarm-filter">
        <Col style={{backgroundColor:'#001529'}} span={24}>
          <div style={{float : 'left'}}> 
            <h3 style={{ margin :10, color : 'white'}}>ALarm List</h3>
          </div>  
        </Col>
      </Row> 
      
      <Table columns={columns} dataSource={data} size="middle" />
    </>
  );
};

export default AlarmList;