import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { BrandLoading } from "components/brand/Loading";
import AuthProvider from "providers/auth";
import TestView from "views/public";

const AdminLayout = lazy(() => import("./views/admin/Layout"));
const AuthLayout = lazy(() => import("./views/auth/Layout"));

function AdminRoute() {
  return (
    <AuthProvider onFaild={<Navigate to="/auth" replace />}>
      <Suspense fallback={<BrandLoading />}>
        <AdminLayout />
      </Suspense>
    </AuthProvider>
  );
}

function AuthRoute() {
  return (
    <AuthProvider
      onFaild={<Navigate to="/admin" replace />}
      validate={(res) => !res}
    >
      <Suspense fallback={<BrandLoading />}>
        <AuthLayout />
      </Suspense>
    </AuthProvider>
  );
}

const App = () => {
  return (
    <Routes>
      <Route path="test" Component={TestView} />
      <Route path="admin/*" Component={AdminRoute} />
      <Route path="auth/*" Component={AuthRoute} />
      <Route path="/" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
};

export default App;
