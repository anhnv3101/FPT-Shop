import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root")!);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,                 // dữ liệu luôn stale, sẽ luôn refetch nếu được gọi
      refetchOnWindowFocus: false, // không tự động refetch khi focus lại cửa sổ
      retry: 1,                     // chỉ thử lại 1 lần khi lỗi
      refetchOnMount: true,        // refetch lại khi component mount
    },
    mutations: {
      retry: 1, // chỉ retry 1 lần nếu mutation thất bại
    },
  },
});

root.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
  </React.StrictMode>
);
