import React, { useEffect, useState } from 'react';
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

const VDNTableTemp = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;

  useEffect(() =>{
    const fetchVDN = async () =>{
        try{
            const response = await axios.get('http://127.0.0.1:3041/resource/vdn');
            console.log(response.data)
            setData(response.data);         
        }catch(e){
            console.log(e);
        }
    };
    fetchVDN();
  },[]);

  const edit = (record) => {
    console.log("record : "+ record)
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
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
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const deleteVDN = async (vdn_no) => {
    try{
      


    }catch(err){
      console.log('에러가 발생하였습니다.' + err);
    }
  }

  const columns = [
    {
      title: 'VDN',
      dataIndex: 'vdn_no',
      width: '15%',
      editable: false,
    },
    {
      title: 'Monitoring 여부',
      dataIndex: 'monitor',
      width: '10%',
      editable: true,
    },
    {
      title: 'VDN Type',
      dataIndex: 'type',
      width: '10%',
      editable: true,
    },
    {
      title: 'split',
      dataIndex: 'split',
      width: '5%',
      editable: true,
    },
    {
      title: '주요 VDN',
      dataIndex: 'check_link',
      width: '5%',
      editable: true,
    },
    {
      title: 'Description',
      dataIndex: 'comment',
      width: '30%',
      editable: true,
    },
    {
      title: '수정',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        console.log(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
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
    {
      title: '삭제',
      dataIndex: 'delete',
      render: (text, record, index) => {
        const editable = isEditing(record);
        console.log(record.vdn_no);
        console.log(index);
        return  (
          <span>
            <a
              href="javascript:;"
              onClick={() => deleteVDN(record.vdn_no)}
              style={{
                marginRight: 8,
              }}
            >
             Delete
            </a>
          </span>
        ) 
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

export default VDNTableTemp;