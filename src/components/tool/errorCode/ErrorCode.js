import React from 'react';
import { Row, Col } from 'antd';
import { Table } from 'antd';


const columns = [
  {
    title: 'cstaError',
    dataIndex: 'error',
  },
  {
    title: 'comment',
    dataIndex: 'comment',
  }
];
const data = [
  {
    key: '1',
    error: '20000',
    commnet : "로그아웃이 되었는데 로그아웃 시도하는 경우"
  },
  {
    key: '2',
    error: '20000'
  },
  {
    key: '3',
    error: '20000'
  },
];


const ErrorCode = () => {
  return (
    <div>
      <Row>
        <Col span={12} style={{padding:"15px 15px 0 0"}}>
          <Table columns={columns} dataSource={data} size="small" />

        </Col>
        <Col span={12} style={{padding:"15px 15px 0 0"}}>
          <Table columns={columns} dataSource={data} size="small" />
        </Col>
        {/* <Col span={8} style={{padding:"15px 0 0 0"}}>
         <Table columns={columns} dataSource={data} size="small" />
        </Col> */}
      </Row>
    </div>
  );
};

export default ErrorCode;