import React, { useState, useEffect } from 'react';
import { Liquid } from '@ant-design/charts';

const LiquidChart= (props) => {
  let config = {
    height: 120,
    width: 120,
    percent: props.percent,
    outline: {
      border: 1,
      distance: 2,
    },
    wave: { length: 40 },
  };
  return <Liquid {...config} style={{ fontSize : 4}}/>;
};

export default LiquidChart;