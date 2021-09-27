import React from 'react';
import { RingProgress } from '@ant-design/charts';

const SysRingProgress = (props) => {
  console.log(props)
    let config = {
        height: 100,
        width: 100,
        autoFit: false,
        percent: props.percent,
        color: ['#5B8FF9', '#E8EDF3'],
    };
    return <RingProgress {...config}/>;
};
export default SysRingProgress;