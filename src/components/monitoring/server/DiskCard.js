import { Card, Descriptions } from 'antd';
import React from 'react';
import SysRingProgress from '../../chart/RingPropgress';
import LiquidChart from '../../chart/LiquidChart';

const diskData = {
  'C' : [0.34, 351, 40],
  'D' : [0.5, 39, 6.64],
  'E' : [0.01, 70, 37.3]
}

const tabList = [
  {
    key: 'C',
    tab: 'C Disk',
  },
  {
    key: 'D',
    tab: 'D Disk',
  },
  {
    key: 'E',
    tab: 'E Disk',
  },
];

const contentList =  {
  C: 
    <div>
      <LiquidChart  percent={diskData.C[0]}>article content</LiquidChart>
        <Descriptions style={{paddingTop :10}} size='small' title="" layout="vertical" bordered>
          <Descriptions.Item label="Total">{diskData.C[1]}GB</Descriptions.Item>
          <Descriptions.Item label="Available">{diskData.C[2]}GB</Descriptions.Item>
        </Descriptions>
      </div>
  ,
  D:
    <div>
      <LiquidChart  percent={diskData.D[0]}>app content</LiquidChart>
      <Descriptions style={{paddingTop :10}} size='small' title="" layout="vertical" bordered>
        <Descriptions.Item label="Total">{diskData.D[1]}GB</Descriptions.Item>
        <Descriptions.Item label="Available">{diskData.D[2]}GB</Descriptions.Item>
      </Descriptions>
    </div>
  ,
  E:
  <div> 
    <LiquidChart  percent={diskData.E[0]}>project content</LiquidChart>,
    <Descriptions style={{paddingTop : 10}} size='small' title="" layout="vertical" bordered>
      <Descriptions.Item label="Total">{diskData.E[1]}GB</Descriptions.Item>
      <Descriptions.Item label="Available">{diskData.E[2]}GB</Descriptions.Item>
    </Descriptions>
  </div>
};

class TabsCard extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
  }
  state = {
    key: 'C',
    noTitleKey: 'C',
  };

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };

  render() {
    return (
      <>
        <Card
          style={{ width: '100%' }}
          title="Disk Info"
          tabList={tabList}
          activeTabKey={this.state.key}
          onTabChange={key => {
            this.onTabChange(key, 'key');
          }}
        >
          {contentList[this.state.key]}
        </Card>    
      </>
    );
  }
}

export default TabsCard;