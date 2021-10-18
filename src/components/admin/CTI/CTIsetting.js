import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import CTITable from './CTITable.js';
import { KernelAPI } from '../API/api.js';

let kernel= '{}';


const CTIsetting = () => {
    const [filepath, setFilepath ] = useState('D:\\CTIBridge\\Cfg\\cfg_kernel.json'); 
    const [size, setSize] = useState('large');
    const [data, setData] = useState(kernel);
    
    const fileopen = () => {
        let input = document.createElement("input");
        input.type = "file";
        input.accept = "text/plain";
  
        input.click();
        input.onchange=function(event){
          processFile(event.target.files[0]);
        }
    }
    useEffect(async() =>{
        const result = await KernelAPI.getKernel();
        console.log(result);
        
        setData(JSON.stringify(result))
    });
    // const fetchData = async () =>{
    //     const response = await KernelAPI.getKernel();
    //     console.log(response)
    // }

    const  processFile = (file) => {
        let reader = new FileReader();
        console.log(reader)
        reader.readAsText(file,"UTF-8");
    
        reader.onload=  function(){
            console.log('1')
            setData(reader.result);
           // localStorage.setItem('kernel',JSON.stringify(data));
           // console.log(localStorage.getItem('kernel'));
        }
    }


    return (
        <div>
            <Button onClick={fileopen} type="primary" shape="round" icon={<DownloadOutlined />} size={size} />
            <h4> 파일경로 : {filepath}</h4>
            <div id='output'></div>
            <CTITable data={data}></CTITable>
            
        </div>
    );
};

export default CTIsetting;