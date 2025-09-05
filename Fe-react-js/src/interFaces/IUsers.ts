// Kiểu cho người dùng
export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: "user" | "admin";
  isVerified: boolean;
  createdByAdmin?: boolean;
}

// Payload dùng để đăng nhập
export interface LoginPayload {
  email: string;
  password: string;
}

// Payload dùng để đăng ký
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

// Dữ liệu trả về sau khi đăng nhập / đăng ký thành công
export interface AuthData {
  token: string;
  user: User;
}

// Trường hợp dùng OTP xác thực
export interface OtpPayload {
  email: string;
  otp: string;
}