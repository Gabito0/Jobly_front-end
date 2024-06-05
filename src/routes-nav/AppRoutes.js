import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../homepage/HomePage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import CompanyList from "../companies/CompanyList";
import JobList from "../jobs/JobList";
import CompanyDetail from "../companies/CompanyDetail";
import ProfileForm from "../profiles/ProfileForm";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = ({ login, signup }) => {
  return (
    <div className="pt-5">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginForm login={login} />} />
        <Route path="/signup" element={<SignupForm signup={signup} />} />
        <Route path="/*" element={<PrivateRoute />}>
          <Route path="companies" element={<CompanyList />} />
          <Route path="jobs" element={<JobList />} />
          <Route path="companies/:handle" element={<CompanyDetail />} />
          <Route path="profile" element={<ProfileForm />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
