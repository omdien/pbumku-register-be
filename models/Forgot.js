// import db_hc from "../config/Database.js";
import transporter from "../config/MailConfig.js";

const sendResetPasswordEmail = async (to, link) => {
  console.log("📨 Menyiapkan email reset password ke:", to);
  try {
    const info = await transporter.sendMail({
      from: `"SIAP MUTU KKP" <${process.env.EMAIL_FROM}>`,
      to,
      subject: "Reset Password Akun Anda",
      html: `
        <p>YTH,  </p>
        <p>Silakan klik link berikut untuk mengatur ulang password Anda:</p>
        <a href="${link}">${link}</a>
        <p>Link ini berlaku selama 1 jam.</p>
        <p>Jika Anda tidak meminta reset password, abaikan email ini.</p>
      `,
    });
    console.log("✅ Email berhasil dikirim:", info.messageId);
  } catch (err) {
    console.error("❌ Gagal mengirim email reset password:", err);
    throw err; 
  }
};

export default sendResetPasswordEmail;
