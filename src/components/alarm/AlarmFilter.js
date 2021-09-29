import React, { useState } from 'react';
import { Row, Col, Typography, Button,
        DatePicker,  Radio, Input, InputNumber   } from 'antd';
import './alarm.css'
import {ProfileOutlined} from '@ant-design/icons';

const { Text } = Typography;
const { RangePicker } = DatePicker;

const AlarmFilter = () => {
  const [value, setValue] = useState(1);
  const [level, setLevel] = useState(1);

  const onOk = (value)  => {
    console.log('onOk: ', value);
  }
  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }
  const onChangeRadio = (e) => {
    setValue(e.target.value);
    console.log(e.target.value); 

  }
  const onChangeLevel = (e) => {
    setLevel(e.target.level);
    console.log(e.target.level); 
  }

  return (
    <>
      <Row className="alarm-filter">
        <Col style={{backgroundColor:'#001529'}} span={24}>
          <div style={{float : 'left'}}> 
            <h3 style={{ margin :10, color : 'white'}}>Filter</h3>
          </div>  
        </Col>
      </Row> 
      <Row className="alarm-filter">
        <Col span={6}>
          <Text strong style={{padding : 25 }} >조회기간 선택</Text>
        </Col>
        <Col span={18}>    
          <Radio.Group onChange={onChangeRadio} value={value}>
            <Row>
              <Radio value={1}>기간별 조회
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  onChange={onChange}
                  onOk={onOk}
                  style={{marginLeft : 15 }}
                />
              </Radio>
            </Row>
            <Row style={{paddingTop : 10 }}>
              <Radio value={2}>최근알람 조회</Radio>
              <InputNumber min={1} max={100} defaultValue={3} />
            </Row>
          </Radio.Group>
        </Col>       
      </Row>
      <Row className="alarm-filter">
        <Col span={6}>
          <Text strong style={{padding : 25 }} >최소알람 레벨 선택</Text>
        </Col>
        <Col span={18}>
          <Radio.Group onChange={onChangeLevel} level={level}>
            <Radio value={1}>Critical</Radio>
            <Radio value={2}>Error</Radio>
            <Radio value={3}>Warning</Radio>
            <Radio value={4}>Notice</Radio>
            <Radio value={5}>Info</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Row className="alarm-filter">
        <Col  span={6}>
          <Text strong style={{padding : 25 }} >특정 키 선택</Text>
        </Col>
        <Col span={18}>
          <Input style={{width : "70%" }}placeholder="key String" />
        </Col>
      </Row>
      <Row className="alarm-filter">
        <Col span={8} offset={20}>
          <Button icon={<ProfileOutlined />} type="primary">조회하기</Button>
        </Col>
      </Row>
    </>
  );
};

export default AlarmFilter;