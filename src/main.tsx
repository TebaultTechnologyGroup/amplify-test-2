import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import '@aws-amplify/ui-react/styles.css';

// Components
import App from "./App.tsx";
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EldersPage from './pages/Elders';
import DashboardPage from './pages/Dashboard';
import TasksPage from './pages/Tasks';
import RemindersPage from './pages/Reminders';
import CompleteProfile from './pages/CompleteProfile';

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<App />}>
          <Route index element={<LandingPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
        </Route>

        {/* Protected admin routes */}
        <Route path='/admin' element={<App />}>
          <Route path='dashboard' element={<DashboardPage />} />
          <Route path='elders' element={<EldersPage />} />
          <Route path='tasks' element={<TasksPage />} />
          <Route path='reminders' element={<RemindersPage />} />
          <Route path='complete-profile' element={<CompleteProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);