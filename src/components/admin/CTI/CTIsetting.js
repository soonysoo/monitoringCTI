import { Button } from 'antd';
import React, { useState } from 'react';
import CTITable from './CTITable.js';
import {SettingOutlined, WarningOutlined } from '@ant-design/icons';
import { Typography } from 'antd';


const {  Paragraph, Text} = Typography;

const CTIsetting = () => {
    //const [filepath, setFilepath ] = useState('D:\\CTIBridge\\Cfg\\cfg_kernel.json'); 
    const [size, setSize] = useState('small');

    const startService = () => {
        //confirm('운영 중 재시작시 위험이 있습니다.')
        //const result = confirm('ddd');
    }
    return (
        <div>
            <div style={{padding : "20px"}}>
            <Button style={{ marginBottom : 10 , float : 'right' }} onClick={startService} type="primary" shape="round" icon={<SettingOutlined />} size={size}>서비스 재실행</Button>
            <Paragraph>
                아래의 config는 재실행을 하지 않아도 반영이 바로가능합니다.<br></br>
                <WarningOutlined /><Text strong>이를 제외안 CONFIG는 서비스 재시작을 해주어야합니다</Text>
            </Paragraph>
            <Paragraph>    
                <Text code>res_prefix_code</Text> ,  <Text code>res_area_code</Text>, <Text code>res_cleaning_time</Text> 
                <Text code>res_consult_policy</Text>, <Text code>sock_cti_backup_ip </Text>, <Text code>event_wait_time</Text>, <Text code>log_level </Text>
            </Paragraph>
            </div>
            <CTITable ></CTITable>
        </div>
    );
};

export default CTIsetting;