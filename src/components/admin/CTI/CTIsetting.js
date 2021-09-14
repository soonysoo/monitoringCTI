import React, { useState } from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';




const CTIsetting = () => {
    const [filepath, setFilepath ] = useState('D:\\CTIBridge\\Cfg\\cfg_kernel.json'); 
    const [size, setSize] = useState('large');
    const [data, setData] = useState('');
    const fileopen = () =>{
        let input = document.createElement("input");
        input.type = "file";
        input.accept = "text/plain";
  
        input.click();
        input.onchange=function(event){
          processFile(event.target.files[0]);
        }
    }
    async function processFile(file){
        let reader = new FileReader();
        console.log(reader)
        reader.readAsText(file,"UTF-8");
    
        reader.onload=  function(){
            console.log('1')
            setData(reader.result);
            localStorage.setItem('kernel',data);
        }
        console.log('2');
        
        
    }

    return (
        <div>
            <Button onClick={fileopen} type="primary" shape="round" icon={<DownloadOutlined />} size={size} />
            <h4> 파일경로 : {filepath}</h4>
            <div id='output'></div>
            {data}
            CTIsetting
        </div>
    );
};

export default CTIsetting;