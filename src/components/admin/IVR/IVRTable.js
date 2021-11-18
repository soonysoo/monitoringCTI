import React, { useContext, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../../../index.css';
import { Table, Input, Modal, Button, Popconfirm, Form } from 'antd';
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  //console.log(props);
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class IVRTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'IVR 채널',
        dataIndex: 'IVR',
        width: '30%',
        editable: false,
      },
      {
        title: 'monitoring 여부',
        dataIndex: 'monitoring',
      },
      {
        title: 'IVR채널 삭제',
        dataIndex: 'operation',
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="정말 삭제하시겠습니까?" onConfirm={() =>{this.handleDelete(record.IVR); console.log(record)}}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];
    this.state = {
      isModalVisible : false,
      dataSource: []
    };
  }

  componentDidMount(){
    fetch('http://127.0.0.1:3041/resource/ivr')
      .then((response) => response.json())
      .then((data)=> this.setState({...this.state, dataSource : data}));
  }


 
  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.IVR !== key)
    });
  };
  handleAdd = (data) => {
    const { count, dataSource } = this.state;
    console.log(data);
    
    this.setState({
      dataSource: [...dataSource, ...data],
      count: count +data.length,
    });
  };
  showModal = () => {
    this.setState({
      isModalVisible : true
    })
  };
  handleOk = () => {
    const modalData = document.getElementById('modal-ivr').value;
    console.log(modalData);
    const startIVR = modalData.split(',')[0];
    const num = modalData.split(',')[1];
    const newIVR = [];
    for(let i=0 ; i < num ; i++){
      newIVR.push({
        IVR : startIVR*1+i,
        monitoring : 'true'
      });
    }
    this.handleAdd(newIVR);
    this.setState({
      isModalVisible : false
    })
  };
  handleCancel = () => {
    this.setState({
      isModalVisible : false
    })
  };
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Button style={{
            margin: 16,
          }} 
          type="primary" 
          onClick={this.showModal}>
           Add IVR 채널
        </Button>
        <Modal title="IVR채널 추가" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
        <p>추가할 IVR채널 번호 시작점과 갯수를 입력하세요 </p>
        <p>ex) 1225, 5 (1225채널부터 5개 더 추가(1225~1229))</p>
        <Input id='modal-ivr'  placeholder="시작채널, 갯수"/>
      </Modal>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

export default IVRTable;
