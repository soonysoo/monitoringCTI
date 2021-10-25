import React, { useState, useEffect } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import axios from 'axios';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const CTITable = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');


  useEffect(() =>{
      const fetchKERNEL = async () =>{
          try{
              const response = await axios.get('http://127.0.0.1:3040/resource/kernel');
              console.log(response.data)
              setData(response.data);         
          }catch(e){
              console.log(e);
          }
      };
      fetchKERNEL();
  },[]);

  
  const isEditing = (record) => record.key === editingKey;
 
  const edit = (record) =>  {
    form.setFieldsValue({
      key: '',
      value: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        
        const key = item.key;
        const value = row.value;
        const response = await axios.put('http://127.0.0.1:3040/resource/kernel',
          {key, value}
        );

        if(response.statusText !== 'OK'){
          alert("config를 수정이 실패하였습니다.")
        }
        setData(newData);
        setEditingKey('');
      } else {
      //인덱스를 못찾은 경우인데 왜있는지; 잘 모르겠음?
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'key',
      dataIndex: 'key',
      width: '40%',
      editable: false,
    },
    {
      title: 'value',
      dataIndex: 'value',
      width: '60%',
      editable: true,
    },
    {
      title: 'edit',
      dataIndex: 'edit',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};



export default CTITable;