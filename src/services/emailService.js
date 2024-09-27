
const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });
  }

  async sendConfirmationEmail(to, reservationDetails) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Reservation Confirmation',
      text: `Your reservation has been confirmed! Details: ${JSON.stringify(reservationDetails)}`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Confirmation email sent successfully.');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}

module.exports = new EmailService();
