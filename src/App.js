import './App.css';
import 'antd/dist/antd.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "./containers/Main";
import React from 'react';
import TopTraffic from "./containers/TopTraffic";
import Portal from "./containers/Portal";
import Web3 from './components/Web3';
import Audience from './components/Audience';
const App = () => {
  return (
    <React.StrictMode>
    <BrowserRouter basename="/creation-intelligence">
      <Routes>
        <Route path="/" element={<Portal />}/>
        <Route path="/Intelligence" element={<Main />}/>
        <Route path="/tops" element={<TopTraffic />} />
        <Route path="/web3" element={<Web3 />} />
        <Route path="/Audience" element={<Audience />} />

      </Routes>

    </BrowserRouter>

  </React.StrictMode>
  );
}


export default App;
