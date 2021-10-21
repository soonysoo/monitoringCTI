import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import CTITable from './CTITable.js';

const CTIsetting = () => {
    const [filepath, setFilepath ] = useState('D:\\CTIBridge\\Cfg\\cfg_kernel.json'); 
    const [size, setSize] = useState('large');

    const fileopen = () => {
        let input = document.createElement("input");
        input.type = "file";
        input.accept = "text/plain";
  
        input.click();
        input.onchange=function(event){
          setFilepath(event.target.files[0])
        }
    }

    return (
        <div>
            <Button onClick={fileopen} type="primary" shape="round" icon={<DownloadOutlined />} size={size} />
            <h4><b> 현재 파일경로 : {filepath}</b></h4>
            <div id='output'></div>
            <CTITable ></CTITable>
        </div>
    );
};

export default CTIsetting;