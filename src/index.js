import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './Component/Admin/Admin';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashBoard from './Component/Admin/Content/DashBoard';
import Food from './Component/Admin/Content/Food/ManagerFood';
import Exercise from './Component/Admin/Content/Exercise/ManagerExercise';
import MealPlanAdmin from './Component/Admin/Content/MealPlan/ManagerMealPlan'; // Renamed to avoid conflict
import ProgramAdmin from './Component/Admin/Content/Program/ManagerProgram'; // Renamed to avoid conflict
import FeedbackMealPlan from './Component/Admin/Content/FeedBackMealPlan/ManagerFeedbackMealPlan';
import LoginForm from './Component/Login/LoginForm';
import FeedbackProgram from './Component/Admin/Content/FeedBackProgram/ManagerFeedBackProgram';
import PersonalTrainerInfo from './Component/Admin/Content/InfoAdmin/PersonalTrainerInfo';
import Logout from './Component/Login/Logout';
import UserInfo from './Component/Admin/Content/InfoAdmin/UserInfo';
import ClientTracking from './Component/Admin/Content/ClientTracking/ManagerTracking';
import Register_Admin from './Component/Login/Register_Admin';
import Register_Client from './Component/Login/Register_Client';
import ForgotPassword from './Component/Login/ForgotPassword';
import ResetPassword from './Component/Login/ResetPassword';
<<<<<<< HEAD
import ClientRoutes from './Component/routes/ClientRoutes';
import Tracking from './Component/Client/ClientTracking/Tracking';
import ProgramClient from './Component/Client/Program/ProgramComponent'; 
import MealPlanClient from './Component/Client/Mealplan/MealPlanComponent'; 
import Home from './Component/Client/Home/Home';
=======
import Calendar from './Component/Admin/Content/Calendar/ManagerCalendar';
import CalendarForm from './Component/Client/Content/Calendar/ClientCalendar';


>>>>>>> 3776e3355faeb279595fad98a25c36340b530e06

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<<<<<<< HEAD
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Home" element={<ClientRoutes />}>
        {/* Nested routes under ClientRoutes */}
        <Route path="" element={<Home />} />
        <Route path="Tracking" element={<Tracking />} />
        <Route path="Program" element={<ProgramClient />} />
        <Route path="MealPlan" element={<MealPlanClient />} />
      </Route>
      <Route path="/Login" element={<LoginForm />} />
      <Route path="/Register_Admin" element={<Register_Admin />} />
      <Route path="/Register_Client" element={<Register_Client />} />
      <Route path="/Forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      
      {/* Admin routes */}
      <Route path="/Admins" element={<Admin />}>
        <Route index element={<DashBoard />} />
        <Route path="DashBoard" element={<DashBoard />} />
        <Route path="Food" element={<Food />} />
        <Route path="Exercise" element={<Exercise />} />
        <Route path="MealPlan" element={<MealPlanAdmin />} />
        <Route path="Program" element={<ProgramAdmin />} />
        <Route path="FeedBackMealPlan" element={<FeedbackMealPlan />} />
        <Route path="FeedBackProgram" element={<FeedbackProgram />} />
        <Route path="ClientTracking" element={<ClientTracking />} />
        <Route path="InfoAdmin" element={<PersonalTrainerInfo />} />
        <Route path="logout" element={<Logout />} />
        <Route path="InfoUser" element={<UserInfo />} />
      </Route>
    </Routes>
  </BrowserRouter>
=======
  // <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/Login" element={<LoginForm/>}/>
        <Route path="/Register_Admin" element={<Register_Admin/>} />
        <Route path="/Register_Client" element={<Register_Client/>} />
        <Route path="/Forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password" element={<ResetPassword/>} /> 
        <Route path="/Register" element={<Register/>} />
        <Route path="/Clients/Calendar" element={<CalendarForm />} /> 
        <Route path="/Admins" element={<Admin/>} >
          <Route index element={<DashBoard />} />
          <Route path='DashBoard' element={<DashBoard />} />
          <Route path="Food" element={<Food />} />
          <Route path="Exercise" element={<Exercise/>} />
          <Route path="MealPlan" element={<MealPlan/>} />
          <Route path="Program" element={<Program/>} />
          <Route path="Calendar" element={<Calendar/>} />
          <Route path="FeedBackMealPlan" element={<FeedbackMealPlan/>} />
          <Route path="FeedBackProgram" element={<FeedbackProgram/>} />
          <Route path="ClientTracking" element={<ClientTracking/>}/>
          <Route path="InfoAdmin" element={<PersonalTrainerInfo/>}/>
          <Route path="logout" element={<Logout/>}/>
          <Route path="InfoUser" element={<UserInfo/>}/>
        </Route>
      </Routes>
    </BrowserRouter> 
  // </React.StrictMode>
>>>>>>> 3776e3355faeb279595fad98a25c36340b530e06
);

reportWebVitals();
