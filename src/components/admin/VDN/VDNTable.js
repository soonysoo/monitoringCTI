import React from 'react';
import { Table, Input, Button, Space, Typography, Modal, Popconfirm, Select} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios'; 

const { Text } = Typography;
const { Option } = Select;

class VDNTable extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
  }

  componentDidMount(){
    fetch('http://127.0.0.1:3041/resource/vdn')
      .then((response) => response.json())
      .then((data)=> this.setState({...this.state, vdndata : data}));
  }

  state = {
    filteredInfo: null,
    sortedInfo: null,
    vdndata : [],
    searchText: '',
    searchedColumn: '',
    visibleAdd : false,
    selectedRowKeys :[],
    vdnTypeValue : 1
  };

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  clearFilters = () => {
    this.setState({ 
      filteredInfo: null 
    });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  };
  deleteVDN = async (record) =>{
    console.log(record);
    const deleteBool =  window.confirm(`정말 VDN ${record.vdn_no}를 삭제하시겠습니까?`);
    if(deleteBool){
      await this.deletehandleVDN(record.vdn_no);
    }
  }
  hideModal = () => {
    this.setState({
      visibleAdd : false
    });
  }

   handleAddVDN = async (value) => {
    const vdn_no = document.querySelector('#input_vdn').value;
    const type = this.state.vdnTypeValue;
    const comment = document.querySelector('#input_vdnComment').value;

    const new_VDN = {
      vdn_no,
      'monitor' : '1',
      type,
      'split' : '',
      'check_link' : '0',
      comment,
      'result' : '11111'
    }
    await this.postVDN(new_VDN);
  }

  postVDN = async(new_VDN) =>{
    try{
      const response = await axios.post('http://127.0.0.1:3041/resource/VDN', new_VDN);
      this.setState({
        vdndata : response.data,
        visibleAdd : false
      })
    }catch(e){
        console.log(e.response.status)
        alert(e.response.data);
        console.log(e);
    }
  };

  deletehandleVDN = async(vdn_id) => {
    try{
      const id = vdn_id;
      console.log(id)
      const response = await axios.delete(`http://127.0.0.1:3041/resource/VDN/${id}`);
      this.setState({
        vdndata : response.data
      })
    }catch(e){
        console.log(e.response.status)
        alert(e.response.data);
        console.log(e);
    }
  };
  
  downloadCSV = () => {
    const data = this.state.vdndata;
    const jsonData = JSON.stringify(data);
    let arrData = JSON.parse(jsonData);

    let CSV = '';
    CSV += "VDN정보" + '\r\n\n';

    let row = "";
    console.log(arrData[0])
    for (let index in arrData[0]) {
      console.log(index);
        row += index + ',';
    }
    row = row.slice(0, -1);
    CSV += row + '\r\n';

    for (let i = 0; i < arrData.length; i++) {
      let row = "";
      for (let index in arrData[i]) {
          row += '"' + arrData[i][index] + '",';
      }

      row.slice(0, row.length - 1);
      CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
  
    let fileName = "MyReport_";
    fileName += "VDN 정보".replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    let uri = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURI(CSV);
    
    let link = document.createElement("a");    
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  showModal = () =>{
    this.setState({
      visibleAdd : true
    });
  }
  handleChangeVDNType = (value) =>{
    this.setState({
      vdnTypeValue : value
    })
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  render() {
    let { sortedInfo, filteredInfo, vdndata } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    vdndata = vdndata || {};
    const columns = [
      {
        title: 'VDN',
        dataIndex: 'vdn_no',
        key: 'vdn_no',
        onFilter: (value, record) => record.vdn_no.includes(value),
        sorter: (a, b) => a.vdn_no - b.vdn_no,
        sortOrder: sortedInfo.columnKey === 'vdn_no' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('vdn_no')
      },
      {
        title: 'monitor',
        dataIndex: 'monitor',
        key: 'monitor',
        sorter: (a, b) => a.monitor - b.monitor,
        sortOrder: sortedInfo.columnKey === 'monitor' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'type',
        dataIndex: 'type',
        key: 'type',
        filters: [
          { text: '인입', value: '1' },
          { text: '상담연결', value: '2' },
          { text: '인증', value: '3' },
          { text: 'CALLBACK', value: '4' },
          { text: 'BSR', value: '5' },
        ],
        filteredValue: filteredInfo.type || null,
        onFilter: (value, record) => record.type.includes(value),
        sorter: (a, b) => a.type - b.type,
        sortOrder: sortedInfo.columnKey === 'type' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'split',
        dataIndex: 'split',
        key: 'split',
        filteredValue: filteredInfo.split || null,
        onFilter: (value, record) => record.split.includes(value),
        sorter: (a, b) => a.split.length - b.split.length,
        sortOrder: sortedInfo.columnKey === 'split' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'check_link',
        dataIndex: 'check_link',
        key: 'check_link',
        filters: [
          { text: '주요 VDN', value: '1' },
          { text: '일반 VDN', value: '0' },
        ],
        filteredValue: filteredInfo.check_link || null,
        onFilter: (value, record) => record.check_link.includes(value),
        sorter: (a, b) => a.check_link.length - b.check_link.length,
        sortOrder: sortedInfo.columnKey === 'check_link' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'result',
        dataIndex: 'result',
        key: 'result',
        filters: [
          { text: '모니터링 성공', value: '00000' },
          { text: '모니터링 실패', value: '21012' },
        ],
        filteredValue: filteredInfo.result || null,
        onFilter: (value, record) => record.result.includes(value),
        sorter: (a, b) => a.result.length - b.result.length,
        sortOrder: sortedInfo.columnKey === 'result' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'delete',
        key: 'operation',
        fixed: 'right',
        width: 80,
        render: (record) => {
          return(
            <a onClick={ (_record) => this.deleteVDN(record)}>delete</a>
          )
        },
      }
    ];
    return (
      <>
        <Space style={{ margin: 15 }}>
          <Button type="primary" onClick={this.showModal} >Add VDN</Button>
          <Modal title="VDN 추가"  visible={this.state.visibleAdd} onOk={this.handleAddVDN} onCancel={this.hideModal}>
            <p>추가할 VDN을 입력하세요</p>
            <Input  id='input_vdn'  placeholder="VDN"/>
            <p style={{marginTop:20}}>VDN Type을 선택하세요 </p>
            <Select defaultValue="1" style={{ width: 120 }} onChange={this.handleChangeVDNType}>
              <Option value="1">인입 VDN</Option>
              <Option value="2">상담연결 VDN</Option>
              <Option value="3" >인증 VDN</Option>
              <Option value="4">콜백 VDN</Option>
              <Option value="5">BSR VDN</Option>
            </Select>
            <p style={{marginTop:20}}>VDN에 대한 설명</p>
            <Input  id='input_vdnComment'  placeholder="comment"/>
          </Modal>
          <Button type="primary" onClick={this.downloadCSV}>download CSV</Button>
          <Text strong>총 {vdndata.length}개</Text>
        </Space>
        <Table columns={columns} dataSource={vdndata} onChange={this.handleChange} />
      </>
    );
  }
}

export default VDNTable;