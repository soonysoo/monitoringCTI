import React from 'react';
import { Row, Col } from 'antd';
import CryptoLog from './CryptoLog';
import CryptoPacket from './CryptoPacket';


const Crypto = () => {
    return (
        <div>
            <Row>
                <Col style={{padding: '10px'}} span={12}>
                    <CryptoPacket></CryptoPacket>
                </Col>
                <Col style={{padding: '10px'}} span={12}>
                    <CryptoLog></CryptoLog>
                </Col>
            </Row>
        </div>
    );
};

export default Crypto;