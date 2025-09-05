// // src/router/ProtectedRoute.tsx
// import { Navigate } from "react-router-dom";
// import { ReactNode } from "react";
// import localStorageUtils, {
//   KeyStorage,
// } from "../configs/localStore/localStorageUtils.ts";
// import { AuthData } from "../interFaces/IUsers.ts";

// interface Props {
//   children: ReactNode;
//   requiredRole?: "user" | "admin"; // Optional: nếu muốn kiểm tra vai trò
// }

// const ProtectedRoute = ({ children, requiredRole }: Props) => {
//   const auth = localStorageUtils.getObject<AuthData>(KeyStorage.AUTH, null);

//   // Không có token => chuyển hướng đến login
//   if (!auth?.token) {
//     return <Navigate to="/login" replace />;
//   }

//   // Nếu có yêu cầu vai trò, kiểm tra role
//   if (requiredRole && auth?.user?.role !== requiredRole) {
//     return <Navigate to="/" replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;
