import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Card, Descriptions } from 'antd';
import SysRingProgress from '../../chart/RingPropgress';
import TabsCard from './DiskCard';
import LiquidChart from '../../chart/LiquidChart';

const { Title } = Typography;

const data = {
                'CPU' :
                {
                  'usage' : 0.64,
                  'speed' : '2.71GHz'
                },
                'Memory' : 
                {
                  'total' : '16',
                  'used' : '10.4',
                  'usage' : 0.65
                },
                'Disk' : 
                {
                  'C' : [351, 40],
                  'D' : [40, 6.77],
                  'E' : [70, 27.3]
                }
              }

const CTISystem = () => {
  return (
    <>
      <Row>
       <Col span={24} 
       style={{backgroundColor :'#294762', color:'white'}}>
         <Title  
         level={3}
         style={{color:'white', margin: '0.5em'}}
         >
           DashBoard
           </Title>
       </Col>
      </Row>
      <Row  style={{backgroundColor :'white'}}>
        <Col span={8} style={{padding :15}}>
          <Card title="CPU Info" bordered={true}>
            <LiquidChart percent={data.CPU.usage}></LiquidChart>
            <Descriptions style={{paddingTop :20}} size='small' title="" layout="vertical" bordered>
              <Descriptions.Item label="Processor ID">3341</Descriptions.Item>
              <Descriptions.Item label="Usage(%)">{data.CPU.usage*100}%</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={8} style={{padding :15}}>
          <Card title="Memory Info" bordered={true}>
            <LiquidChart percent={data.Memory.usage}></LiquidChart>
            <Descriptions style={{paddingTop :20}} size='small' title="" layout="vertical" bordered>
              <Descriptions.Item label="Total">{data.Memory.total}GB</Descriptions.Item>
              <Descriptions.Item label="Usage(%)">{data.Memory.usage*100}%</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={8} style={{padding :15}}>
          <TabsCard data={data.Disk}></TabsCard>
        </Col>
      </Row>
    </>
  );
};

export default CTISystem;