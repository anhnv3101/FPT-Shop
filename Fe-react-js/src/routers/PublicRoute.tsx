// // src/router/PublicRoute.tsx
// import { Navigate } from "react-router-dom";
// import localStorageUtils, {
//   KeyStorage,
// } from "../configs/localStore/localStorageUtils.ts";
// import { AuthData } from "../interFaces/IUsers.ts";
// import { RoutePath } from "../util/path/path.ts";
// import { ReactNode } from "react";

// const PublicRoute = ({ children }: { children: ReactNode }) => {
//   const auth = localStorageUtils.getObject<AuthData>(KeyStorage.AUTH, null);

//   if (auth?.token) {
//     const role = auth.user.role;

//     // 👉 Nếu là admin thì vào trang admin profile
//     if (role === "admin") {
//       return <Navigate to={`/admin/${RoutePath.ADMIN_PROFILE}`} replace />;
//     }

//     // 👉 Nếu là user thường thì vào user profile
//     return <Navigate to={RoutePath.USER_PROFILE} replace />;
//   }

//   // ✅ Chưa đăng nhập → cho vào trang login/register
//   return children;
// };

// export default PublicRoute;
