import React from 'react';
import IVRTable from './IVRTable.js';

const dataIVR = [];

if(!dataIVR.length){
  const id = 1200;
  for(let i = 0 ; i < 30 ; i++){
    dataIVR.push({
      'ivr_id' : id+i,
      'monitoring': true,
    })
  }  
}

const IVRsetting = () => {
  return (
    <div>
      <IVRTable daya={dataIVR}></IVRTable>
    </div>
  );
};

export default IVRsetting;