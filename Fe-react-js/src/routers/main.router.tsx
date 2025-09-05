// src/router/AppRoutes.tsx
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/Loading";
import { Dashboard, HomePageRouter } from "./app.router";

import BaseLayoutAdmin from "../layout/adminLayout/BaseLayoutAdmin";
import BaseLayoutUsers from "../layout/ViewsLayout/ViewLayout";

import { RoutePath } from "../util/path/path";
// import AdminRoute from "./AdminRoute";
// import ProtectedRoute from "./ProtectedRoute";
// import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Layout cho người dùng */}
        <Route path={RoutePath.HOME} element={<BaseLayoutUsers />}>
          <Route index element={<HomePageRouter />} />
          {/* <Route path={RoutePath.DETAIL_MOVIE} element={<DetailMovie />} /> */}

          {/* Protected route cho người dùng */}
          {/* <Route path={RoutePath.USER_PROFILE} element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } /> */}
        </Route>

        {/* Layout cho admin */}
        <Route
          path={RoutePath.ADMIN}
          element={
            // <AdminRoute>
            //   <BaseLayoutAdmin />
            // </AdminRoute>
            <BaseLayoutAdmin />
          }
        >
          <Route index element={<Dashboard />} />
        </Route>

        {/* Các route công khai */}
        {/* <Route path={RoutePath.LOGIN} element={
          <PublicRoute>
            <Auth />
          </PublicRoute>
          } />
        <Route path={RoutePath.OTP} element={
          <PublicRoute>
          <Otp />
          </PublicRoute>
          } /> */}

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
