import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Card, Descriptions } from 'antd';
//import SysRingProgress from '../../chart/RingPropgress';
import TabsCard from './DiskCard';
import LiquidChart from '../../chart/LiquidChart';
import axios from 'axios';



const { Title } = Typography;



const CTISystem = () => {
  const [cpu, setCpu] = useState({});
  const [disk, setDisk] = useState({});
  //CPU, MEMORY정보 불러오기
  useEffect(() =>{
      const fetchKERNEL = async () =>{
          try{
              const response = await axios.get('http://127.0.0.1:3041/util/cpu');
              console.log(response.data)
              setCpu(response.data);         
          }catch(e){
              console.log(e);
          }
      };
      fetchKERNEL();
  });

  //DISK정보 불러오기 
  useEffect(() =>{
    const fetchKERNEL = async () =>{
        try{
            const response = await axios.get('http://127.0.0.1:3041/util/disk');
            console.log(response.data)
            setDisk(response.data);         
        }catch(e){
            console.log(e);
        }
    };
    fetchKERNEL();
  },[]);


  return (
    <div style={{paddingTop : "20px"}}>
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
            <LiquidChart percent={cpu.cpuUsage}></LiquidChart>
            <Descriptions style={{paddingTop :20}} size='small' title="" layout="vertical" bordered>
              <Descriptions.Item label="Processor Name">CTIBridge_SVC</Descriptions.Item>
              <Descriptions.Item label="Usage(%)">{cpu.cpuUsage*100}%</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={8} style={{padding :15}}>
          <Card title="Memory Info" bordered={true}>
            <LiquidChart percent={cpu.memoryPer}></LiquidChart>
            <Descriptions style={{paddingTop :20}} size='small' title="" layout="vertical" bordered>
              <Descriptions.Item label="Total">{cpu.totalMemory}GB</Descriptions.Item>
              <Descriptions.Item label="Usage(%)">{cpu.memoryPer*100}%</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={8} style={{padding :15}}>
          <TabsCard data={disk}></TabsCard>
        </Col>
      </Row>
    </div>
  );
};

export default CTISystem;