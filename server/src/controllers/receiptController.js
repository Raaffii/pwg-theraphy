const productsService = require("../services/productsService");
require("dotenv").config();
nodemailer = require("nodemailer");

const sentEmail = async (req, res) => {
  try {
    console.log("in here");

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path; // langsung dari multer
    const { email } = req.body; // ambil email dari frontend

    // if (!email) {
    //   return res.status(400).json({ error: "Email tujuan wajib diisi" });
    // }

    // setup transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // kirim email dengan attachment
    await transporter.sendMail({
      from: '"Therapy Centre" <rraaafffii@gmail.com>', // sesuaikan dengan akun Gmail kamu
      to: email, // dari req.body.email
      subject: "Your Receipt",
      text: "Here is your receipt in PDF format",
      attachments: [
        {
          filename: "receipt.pdf",
          path: filePath,
        },
      ],
    });

    // hapus file setelah terkirim
    fs.unlinkSync(filePath);

    res.json({ message: `Email sent to ${email}` });
  } catch (err) {
    console.error("Send email error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
};

module.exports = { sentEmail };
