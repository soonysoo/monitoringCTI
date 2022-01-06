import { Card, Descriptions } from 'antd';
import React from 'react';
import LiquidChart from '../../chart/LiquidChart';



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

// const contentList =  {
//   C: 
//     <div>
//       <LiquidChart  percent={diskData2[2]}>article content</LiquidChart>
//         <Descriptions style={{paddingTop :10}} size='small' title="" layout="vertical" bordered>
//           <Descriptions.Item label="Total">{diskData.C[1]}GB</Descriptions.Item>
//           <Descriptions.Item label="Available">{diskData.C[2]}GB</Descriptions.Item>
//         </Descriptions>
//       </div>
//   ,
//   D:
//     <div>
//       <LiquidChart  percent={diskData.D[0]}>app content</LiquidChart>
//       <Descriptions style={{paddingTop :10}} size='small' title="" layout="vertical" bordered>
//         <Descriptions.Item label="Total">{diskData.D[1]}GB</Descriptions.Item>
//         <Descriptions.Item label="Available">{diskData.D[2]}GB</Descriptions.Item>
//       </Descriptions>
//     </div>
//   ,
//   E:
//   <div> 
//     <LiquidChart  percent={diskData.E[0]}>project content</LiquidChart>,
//     <Descriptions style={{paddingTop : 10}} size='small' title="" layout="vertical" bordered>
//       <Descriptions.Item label="Total">{diskData.E[1]}GB</Descriptions.Item>
//       <Descriptions.Item label="Available">{diskData.E[2]}GB</Descriptions.Item>
//     </Descriptions>
//   </div>
// };

class TabsCard extends React.Component {
  constructor(props){
    super(props);
  }
  state = {
    key: 'C',
    noTitleKey: 'C',
    Disk : this.props.data,
    loading : false
  };
  // loadDisk = async () => {
  //   axios
  //     .get("http://127.0.0.1:3041/util/disk")
  //     .then(({ data }) => {
  //       this.setState({ 
  //         loading: true,
  //         Disk: data
  //       });
  //     })
  //     .catch(e => {  // API 호출이 실패한 경우
  //       console.error(e);  // 에러표시
  //       this.setState({  
  //         loading: false
  //       });
  //     });
  // };

  // async componentDidMount(){
  //   await this.loadDisk();
  //   this.setState({ 
  //     loading: true
  //   });
  // }

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };

  render() {
    const disk  = this.props.data;
    if(Object.keys(disk).length === 0){
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
           ></Card>
        </>
      )
    }


    if(Object.keys(disk).length > 0){
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
           {this.state.key ==='C'?<div>
           <LiquidChart  percent={disk.C[2]}>article content</LiquidChart>
             <Descriptions style={{paddingTop :10}} size='small' title="" layout="vertical" bordered>
               <Descriptions.Item label="Total">{disk.C[0]}GB</Descriptions.Item>
               <Descriptions.Item label="Available">{disk.C[1]}GB</Descriptions.Item>
             </Descriptions>
           </div>:this.state.key ==='D' ?
             <div>
             <LiquidChart  percent={disk.D[2]}>app content</LiquidChart>
             <Descriptions style={{paddingTop :10}} size='small' title="" layout="vertical" bordered>
               <Descriptions.Item label="Total">{disk.D[0]}GB</Descriptions.Item>
               <Descriptions.Item label="Available">{disk.D[1]}GB</Descriptions.Item>
             </Descriptions>
           </div>
            :
            <div> 
           <LiquidChart  percent={disk.E[2]}>project content</LiquidChart>,
             <Descriptions style={{paddingTop : 10}} size='small' title="" layout="vertical" bordered>
               <Descriptions.Item label="Total">{disk.E[0]}GB</Descriptions.Item>
               <Descriptions.Item label="Available">{disk.E[1]}GB</Descriptions.Item>
             </Descriptions>
           </div>
           }
           </Card>
         </> 
       );
    }
    }
  }


export default TabsCard;