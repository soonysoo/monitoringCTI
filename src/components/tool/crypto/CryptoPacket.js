import React, { useCallback, useState } from 'react';
//import Button from '@material-ui/core/Button';
import {Space, Button, Input, Typography, Row, Col} from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CryptoJS from 'crypto-js';
import { LockOutlined, KeyOutlined, UserOutlined } from '@ant-design/icons';
const { Text } = Typography;
const { TextArea } = Input;

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
    width : 300
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  margin: {
    margin: theme.spacing(1),
    
  },
  crypttext : {
    margin: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width :'100%'
  }
}));


export default function CryptoPakcet() {
    const classes = useStyles();
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
        format :CryptoJS.format.OpenSSL
      }).toString(CryptoJS.enc.Utf8)
      console.log(result)
      console.log(ecryptdata.toString(CryptoJS.enc.Utf8));
      setResult(ecryptdata);
    })


    return (
      <div className="part-crypto-secion"> 
        <form className={classes.crypttext} noValidate autoComplete="off">
        <div style={{float: "left"}}>
        KEY :
        <Input 
          size="large" 
          placeholder="key" 
          value={key} 
        />
        
        <Input 
          size="large" 
          placeholder="iv"
          value={iv}
          prefix={<UserOutlined />} 
        />
        </div>
          
          <TextField style={{ margin: 17 }} id="outlined-basic" label="key"  placeholder={key} variant="outlined" onChange={onChangeKey}/>
          <TextField style={{ margin: 17 }} id="outlined-basic" label="iv" placeholder={iv} variant="outlined" onChange={onChangeIV}/>
        </form>
        <div>
          <Space>
            <Row style={{width : '100%'}}>
              <Col  flex="auto">
                <Input 
                  style={{width : '400px'}}
                  size="large" 
                  placeholder="암호화하거나 복호화할 내용을 입력하세요" 
                  prefix={<UserOutlined />} 
                  onChange={onChangeText}
                />
              </Col>
              <Col flex="10px">
                <Text strong type="warning">{text.length} byte</Text> 
              </Col>
            </Row>
          </Space>
        </div> 
        <div>
          <Space  align="center">
            <Button 
            type="primary"
            onClick={encryptClick}
            size ="large"
            icon = {<LockOutlined/>}
            style={{ margin: 20, width : "100%" }}
            block
            >
              Encrypt
            </Button>
            <Button danger
            type="primary"
            onClick={decryptClick}
            size ="large"
            icon = {<KeyOutlined/>}
            style={{ margin: 20, width : "100%" }}
            block
            >
              Decrypt
            </Button>
          </Space>
        </div> 
        <div className={classes.root}>
          <TextArea 
            rows={4}
            placeholder="암복호화 결과입니다"
            autoSize={{ minRows: 2, maxRows: 7 }}
            value ={result}
          />
          <Text strong type="warning">{result.length} byte</Text> 
         
        </div>
      </div>
    );
  }