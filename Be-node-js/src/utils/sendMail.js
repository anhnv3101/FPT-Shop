import nodemailer from "nodemailer";

export const sendVerificationEmail = async (to, name, otp, type = "register") => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Nội dung tùy theo loại email
    let subject = "";
    let introText = "";

    if (type === "register") {
      subject = "Mã xác nhận đăng ký tài khoản của bạn";
      introText = "Mã xác nhận đăng ký tài khoản FPT Shop của bạn là:";
    } else if (type === "reset") {
      subject = "Mã xác nhận đặt lại mật khẩu của bạn";
      introText = "Mã OTP để đặt lại mật khẩu FPT Shop của bạn là:";
    }

    const mailOptions = {
      from: `"FPT Shop" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
        <!-- Header -->
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center;">
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/79/FPT_logo_2010.svg" alt="FPT Logo" style="height: 40px;" />
        </div>

        <!-- Body -->
        <div style="padding: 20px;">
          <p>Xin chào <b>${name}</b>,</p>
          <p>${introText}</p>

          <div style="margin: 20px 0; text-align: center;">
            <span style="font-size: 28px; font-weight: bold; background: #f5f5f5; padding: 12px 24px; border-radius: 6px; border: 1px solid #ddd;">
              ${otp}
            </span>
          </div>

          <p>Mã này sẽ hết hạn sau <b>5 phút</b>, vui lòng không tiết lộ cho bất kỳ ai.</p>
          <p>Cảm ơn bạn đã sử dụng dịch vụ của <b>FPT Shop</b>.</p>
          <p>Trân trọng.</p>
        </div>

        <!-- Footer -->
        <div style="background-color: #fafafa; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          Copyright © ${new Date().getFullYear()} FPT Shop. All rights reserved.
        </div>
      </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email (${type}) đã gửi tới: ${to}`);
    return true;
  } catch (error) {
    console.error("❌ Lỗi gửi email:", error.message);
    return false;
  }
};
