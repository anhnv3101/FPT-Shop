// src/router/AdminRoute.tsx
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import localStorageUtils, {
  KeyStorage,
} from "../configs/localStore/localStorageUtils";
import { AuthData } from "../interFaces/IUsers.ts";

interface Props {
  children: ReactNode;
}

const AdminRoute = ({ children }: Props) => {
  const auth = localStorageUtils.getObject<AuthData>(KeyStorage.AUTH, null);

  if (!auth?.token || !auth.user) {
    // Chưa đăng nhập → về login
    return <Navigate to="/login" replace />;
  }

  if (auth.user.role !== "admin") {
    // Không phải admin → về trang 404 (hoặc trang chủ tùy bạn)
    return <Navigate to="/404" replace />;
  }

  // ✅ Đúng admin → truy cập bình thường
  return <>{children}</>;
};

export default AdminRoute;
