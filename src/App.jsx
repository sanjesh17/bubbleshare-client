import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateBubblePage from "./pages/CreateBubblePage";
import ProtectedRoute from "./components/ProtectedRoute";
import SharedBubblesPage from "./pages/SharedBubblesPage";
import ProfilePage from "./pages/ProfilePage";
import { isTokenValid } from "./utils/authUtils";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {isTokenValid() ? (
          <Route path="/login" element={<Navigate to="/" replace />} />
        ) : (
          <Route path="/login" element={<LoginPage />} />
        )}

        {isTokenValid() ? (
          <Route path="/register" element={<Navigate to="/" replace />} />
        ) : (
          <Route path="/register" element={<RegisterPage />} />
        )}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateBubblePage />} />
          <Route path="/shared" element={<SharedBubblesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
