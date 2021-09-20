import React from 'react';
import VDNTable from './VDNTable.js';
import VDNSearch from './VDNSearch.js';

const vdnData = [{
                    "vdn_no"	  : "16000",
                    "monitor"	  : "1",
                    "type"	      : "1",
                    "split"	      : "",
                    "check_link"  : "0",
                    "comment" 	  : "IVR_IN",
                    "result"	  : "00000"
                  },  
                  {
                    "vdn_no"	  : "16001",
                    "monitor"	  : "1",
                    "type"	      : "2",
                    "split"	      : "",
                    "check_link"  : "0",
                    "comment" 	  : "AGT_IN",
                    "result"	  : "00000"
                  },
                  {
                    "vdn_no"	  : "16003",
                    "monitor"	  : "1",
                    "type"	      : "2",
                    "split"	      : "",
                    "check_link"  : "0",
                    "comment" 	  : "AGT_IN",
                    "result"	  : "00000"
                  },  
                  {
                    "vdn_no"	  : "16005",
                    "monitor"	  : "1",
                    "type"	      : "1",
                    "split"	      : "",
                    "check_link"  : "0",
                    "comment" 	  : "IVR_IN",
                    "result"	  : "00000"
                  },  
                  {
                    "vdn_no"	  : "16002",
                    "monitor"	  : "1",
                    "type"	      : "4",
                    "split"	      : "",
                    "check_link"  : "0",
                    "comment" 	  : "CALLBACK",
                    "result"	  : "00000"
                  },  
                  {
                    "vdn_no"	  : "16006",
                    "monitor"	  : "1",
                    "type"	      : "2",
                    "split"	      : "",
                    "check_link"  : "0",
                    "comment" 	  : "AGT_IN",
                    "result"	  : "00000"
                  },  
                  {
                    "vdn_no"	  : "16007",
                    "monitor"	  : "1",
                    "type"	      : "2",
                    "split"	      : "",
                    "check_link"  : "0",
                    "comment" 	  : "AGT_IN",
                    "result"	  : "00000"
                  },  
                  {
                    "vdn_no"	  : "16010",
                    "monitor"	  : "1",
                    "type"	      : "4",
                    "split"	      : "",
                    "check_link"  : "0",
                    "comment" 	  : "CALLBACK",
                    "result"	  : "00000"
                  },
                  {
                    "vdn_no"	  : "16008",
                    "monitor"	  : "1",
                    "type"	      : "4",
                    "split"	      : "",
                    "check_link"  : "0",
                    "comment" 	  : "CALLBACK",
                    "result"	  : "00000"
                  },  
                  {
                    "vdn_no"	  : "16009",
                    "monitor"	  : "1",
                    "type"	      : "4",
                    "split"	      : "",
                    "check_link"  : "0",
                    "comment" 	  : "CALLBACK",
                    "result"	  : "00000"
                  },  
                  {
                    "vdn_no"	  : "16011",
                    "monitor"	  : "1",
                    "type"	      : "2",
                    "split"	      : "",
                    "check_link"  : "0",
                    "comment" 	  : "AGT_IN",
                    "result"	  : "00000"
                  },  
                  {
                    "vdn_no"	  : "16012",
                    "monitor"	  : "1",
                    "type"	      : "1",
                    "split"	      : "",
                    "check_link"  : "0",
                    "comment" 	  : "IVR_IN",
                    "result"	  : "00000"
                  },
                  {
                    "vdn_no"	  : "16013",
                    "monitor"	  : "1",
                    "type"	      : "2",
                    "split"	      : "",
                    "check_link"  : "0",
                    "comment" 	  : "AGT_IN",
                    "result"	  : "00000"
                  },                    
                  {
                    "vdn_no"	  : "16014",
                    "monitor"	  : "1",
                    "type"	      : "1",
                    "split"	      : "",
                    "check_link"  : "0",
                    "comment" 	  : "IVR_IN",
                    "result"	  : "00000"
                  },
                  {
                    "vdn_no"	  : "16016",
                    "monitor"	  : "1",
                    "type"	      : "1",
                    "split"	      : "",
                    "check_link"  : "0",
                    "comment" 	  : "IVR_IN",
                    "result"	  : "00000"
                  }          
                ];


const VDNsetting = () => {
  
  return (
    <div>
      <VDNSearch></VDNSearch>
      <VDNTable data={vdnData}></VDNTable>
    </div>
  );
};

export default VDNsetting;