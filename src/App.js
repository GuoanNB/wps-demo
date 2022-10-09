import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "./containers/Main";
import React from 'react';

const App = () => {
  return (
    <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/id/:fileid/name/:filename/url/:fileurl" element={<Main />}/> */}
        <Route path="/" element={<Main />}/>

      </Routes>

    </BrowserRouter>

  </React.StrictMode>
  );
}


export default App;
