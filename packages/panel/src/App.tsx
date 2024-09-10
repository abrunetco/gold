import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import BrandLoading from "components/progress/BrandLoading";
import AuthProvider from "providers/auth";

const AdminLayout = lazy(() => import("./layouts/admin"))
const AuthLayout = lazy(() => import("./layouts/auth"))

function AdminRoute() {
  return (
    <AuthProvider onFaild={<Navigate to="/auth" replace />}>
      <Suspense fallback={<BrandLoading />}>
        <AdminLayout />
      </Suspense>
    </AuthProvider>
  )
}

function AuthRoute() {
  return (
    <AuthProvider onFaild={<Navigate to="/admin" replace />} validate={res => !res}>
      <Suspense fallback={<BrandLoading />}>
        <AuthLayout />
      </Suspense>
    </AuthProvider>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path="admin/*" Component={AdminRoute} />
      <Route path="auth/*" Component={AuthRoute} />
      <Route path="/" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
};

export default App;
