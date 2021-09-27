import React from 'react';
import { Table, Input, Button, Space, Typography } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';


const { Text } = Typography;

class VDNTable extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
    //this.data = props;
  }
  

  state = {
    filteredInfo: null,
    sortedInfo: null,
    vdndata : this.props,
    searchText: '',
    searchedColumn: ''
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

  downloadCSV = () => {
    const data = this.props.data;
    const jsonData = JSON.stringify(data);
    let arrData = JSON.parse(jsonData);

    let CSV = '';
    CSV += "IVR채널" + '\r\n\n';

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
    fileName += "IVR채널".replace(/ /g,"_");   
    
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
    console.log(vdndata);
    const columns = [
      {
        title: 'VDN',
        dataIndex: 'vdn_no',
        key: 'vdn_no',
        // filters: [
        //   { text: 'Joe', value: 'Joe' },
        //   { text: 'Jim', value: 'Jim' },
        // ],
        //filteredValue: filteredInfo.vdn_no || null,
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
        //width: '10%',
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
    ];
    return (
      <>
        <Space style={{ margin: 15 }}>
          <Button type="primary" onClick={this.setAgeSort}>Add VDN</Button>
          <Button type="primary" onClick={this.clearFilters}>Delete VDN</Button>
          <Button type="primary" onClick={this.downloadCSV}>download CSV</Button>
          <Text strong>총 {vdndata.data.length}개</Text>
        </Space>
        <Table columns={columns} dataSource={vdndata.data} onChange={this.handleChange} />
      </>
    );
  }
}

export default VDNTable;