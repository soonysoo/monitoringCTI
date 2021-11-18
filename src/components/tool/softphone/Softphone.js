import React from 'react';
import DetailView from './DetailView.js';
import LogView from './LogView.js';
import Menubar from './Menubar.js';

const Softphone = () => {
    return (
        <>
            <Menubar></Menubar>
            <LogView></LogView>
            <DetailView></DetailView>
        </>
    );
};

export default Softphone;