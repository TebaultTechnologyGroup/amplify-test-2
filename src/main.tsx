import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import '@aws-amplify/ui-react/styles.css';
import Elders from './pages/Elders';

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='elders' element={<Elders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>




  /*
    <React.StrictMode>
      <Authenticator>
        <App />
      </Authenticator>
    </React.StrictMode>
    */
);
