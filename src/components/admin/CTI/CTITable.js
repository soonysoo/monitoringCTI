import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import { KernelAPI } from '../API/api';



let viewData = [];

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
  console.log( props.data)
  const jsonData =  JSON.parse(props.data);
  const entry =  Object.entries(jsonData);
  const kernelMap = new Map(entry);
  const [form] = Form.useForm();
  const [data, setData] = useState(viewData);
  const [editingKey, setEditingKey] = useState('');

  console.log(kernelMap);
  if(viewData.length <= 0){
    kernelMap.forEach(function(v,k){
      viewData.push({
        key : k,
        value : v,
        isChange : false
      })
    })
  }

  const isEditing = (record) => record.key === editingKey;
  console.log(data);
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
      console.log(newData);
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

  const columns = [
    {
      title: 'key',
      dataIndex: 'key',
      width: '40%',
      editable: true,
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
              // href="javascript:;"
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
        dataSource={viewData}
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