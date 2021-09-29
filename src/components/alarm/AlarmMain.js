import React from 'react';
import AlarmFilter from './AlarmFilter';
import AlarmList from './AlarmList';

const AlarmMain = () => {
  return (
    <div>
      <AlarmFilter></AlarmFilter>
      <AlarmList></AlarmList>
    </div>
  );
};

export default AlarmMain;
