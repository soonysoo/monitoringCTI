import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import CTITable from './CTITable.js';
import {SettingOutlined, WarningOutlined } from '@ant-design/icons';
import { Typography, Divider } from 'antd';


const { Title, Paragraph, Text, Link } = Typography;

const CTIsetting = () => {
    //const [filepath, setFilepath ] = useState('D:\\CTIBridge\\Cfg\\cfg_kernel.json'); 
    const [size, setSize] = useState('middle');

    // const fileopen = () => {
    //     let input = document.createElement("input");
    //     input.type = "file";
    //     input.accept = "text/plain";
  
    //     input.click();
    //     input.onchange=function(event){
    //       setFilepath(event.target.files[0])
    //     }
    // }
    const startService = () => {
        //confirm('운영 중 재시작시 위험이 있습니다.')
        //const result = confirm('ddd');
    }
    return (
        <div>
            <Button style={{ marginBottom : 10 , float : 'right' }} onClick={startService} type="primary" shape="round" icon={<SettingOutlined />} size={size}>서비스 재실행</Button>
            <Paragraph>
                아래의 config는 재실행을 하지 않아도 반영이 바로가능합니다.<br></br>
                <WarningOutlined /><Text strong>이를 제외안 CONFIG는 서비스 재시작을 해주어야합니다</Text>
            </Paragraph>
            <Paragraph>    
                <Text code>res_prefix_code</Text> ,  <Text code>res_area_code</Text>, <Text code>res_cleaning_time</Text> 
                <Text code>res_consult_policy</Text>, <Text code>sock_cti_backup_ip </Text>, <Text code>event_wait_time</Text>, <Text code>log_level </Text>
            </Paragraph>
                
            
            
            <CTITable ></CTITable>
        </div>
    );
};

export default CTIsetting;