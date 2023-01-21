import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SdaSheet } from './assets/sdaSheet';
import { DSASheet } from './assets/dsaSheet';

let fetchData = localStorage.getItem('loveBabbarSheet')
fetchData = fetchData === null ? SdaSheet : JSON.parse(fetchData)

let fetchData2 = localStorage.getItem('striversSheet')
fetchData2 = fetchData2 === null ? DSASheet : JSON.parse(fetchData2)

ReactDOM.createRoot(document.getElementById("root")).render(

  <BrowserRouter>
    <App fetchData={fetchData} fetchData2={fetchData2} />
  </BrowserRouter>
);
