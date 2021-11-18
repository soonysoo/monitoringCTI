import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import CTITable from './CTITable.js';
import {SettingOutlined } from '@ant-design/icons';

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
            <div id='output'></div>
            <CTITable ></CTITable>
        </div>
    );
};

export default CTIsetting;