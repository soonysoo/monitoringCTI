import React, { useCallback, useState } from 'react';
import { Button, Input, Row, Col, Divider, Typography } from 'antd';
import CryptoJS from 'crypto-js';
import { LockOutlined, KeyOutlined } from '@ant-design/icons';
const { Text, Title  } = Typography;
const { TextArea } = Input;


export default function CryptoPakcet() {
    const [key, setKey] = useState('4F8ABBD4EE68E655F42146E87D6E4022');
    const [iv, setIv] =useState('32C863027BDDB0C8');
    const [text, setText] =useState('');
    const [result, setResult] = useState('');
    const [size, setSize] = useState(30);

    const onChangeKey = useCallback( e => {
      setKey(e.target.value);
    },[key])
    
    const onChangeIV = useCallback( e => {
      setIv(e.target.value);
    },[iv])

    const onChangeText = useCallback( e => {
      setText(e.target.value);
    },[text])


    const encryptClick = useCallback( e => { 
      const _key = CryptoJS.enc.Utf8.parse(key);
      const _iv = CryptoJS.enc.Utf8.parse(iv);

      const cipherData = CryptoJS.AES.encrypt(text,_key,{
        iv :_iv,
        mode :CryptoJS.mode.CBC,
        padding : CryptoJS.pad.Pkcs7,
        format :CryptoJS.format.OpenSSL
      }).toString();
      
      setResult(cipherData);
    })

    const decryptClick = useCallback( e => {
      const _key = CryptoJS.enc.Utf8.parse(key);
      const _iv = CryptoJS.enc.Utf8.parse(iv);

      const ecryptdata = CryptoJS.AES.decrypt(text, _key, {
        iv :_iv,
        mode :CryptoJS.mode.CBC,
        padding : CryptoJS.pad.Pkcs7,
        format :CryptoJS.format.OpenSSL,
      }).toString(CryptoJS.enc.Utf8)
      console.log(result)
      console.log(ecryptdata.toString(CryptoJS.enc.Utf8));
      setResult(ecryptdata);
    })


    return (      
      <div className="part-crypto-secion"> 
      <Divider/>
      <Title level={4}>KEY / IV </Title>
        <Row style={{marginBottom:20}}>
          <Col span={3}>
            <Text strong>KEY</Text>
          </Col>
          <Col span={21}>
            <Input size="large"  placeholder="key" value={key} 
              style={{backgroundColor : '#F0F2F5'}}
            />
          </Col>
        </Row> 
        <Row>
          <Col span={3}>
            <Text strong>IV</Text>
          </Col>
          <Col span={21}>
            <Input size="large" placeholder="iv"value={iv}
              style={{backgroundColor : '#F0F2F5'}}
            />
          </Col>
        </Row> 
        <Divider />
        <Title level={4}> 암복호화 </Title>
        <Row style={{margin:20, marginTop:10}}>
          <Col span={21}>
            <Input 
              size="large" 
              placeholder="암호화하거나 복호화할 내용을 입력하세요" 
              onChange={onChangeText}
            />
          </Col>  
          <Col span={3}>
            <Text strong >{text.length} byte</Text> 
          </Col>
        </Row>
        <Row>
          <Col style={{ padding: 10}} span={12}>
            <Button type="primary"  onClick={encryptClick}
            size ="large"  icon = {<LockOutlined/>}
            block>
              Encrypt
            </Button>
          </Col>
          <Col style={{ padding: 10}}  span={12}>  
            <Button danger  type="primary" onClick={decryptClick}
            size="large" icon={<KeyOutlined/>}
             block
            >
              Decrypt
            </Button>
          </Col>
        </Row>    
        <Row style={{ padding: 10}}>
          <Col  span={21}>
          <TextArea 
            rows={4}
            placeholder="암복호화 결과입니다"
            autoSize={{ minRows: 2, maxRows: 7 }}
            value ={result}
          />
          </Col>
          <Col span={3}>
            <Text strong >{result.length} byte</Text> 
          </Col>
        </Row>
      </div> 
    );
  }