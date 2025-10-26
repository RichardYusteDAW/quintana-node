import nodemailer from "nodemailer";
import he from 'he';
import config from '../../config.js';

class EmailService {

  #user = config.NODEMAILER_USER;
  #pass = config.NODEMAILER_PASS;
  #smtp = config.NODEMAILER_SMTP;
  #port = Number(config.NODEMAILER_PORT ?? 465);
  #transporter;

  constructor() {
    this.#transporter = nodemailer.createTransport({
      host: this.#smtp,
      port: this.#port,
      secure: this.#port === 465,
      auth: { user: this.#user, pass: this.#pass },
      tls: { minVersion: 'TLSv1.2' }
    });
  }

  sendEmail = async (payload) => {
    const { name, phone, email, message, ip, userAgent } = payload;
    const date = new Date().toISOString();

    const from = { name: "Contacto Web · Mago Raúl Quintana", address: this.#user };
    const to = this.#user;
    const subject = 'Nuevo mensaje del formulario de contacto';

    const padLabel = (label, width = 12) => String(label).padEnd(width);
    const text = [
      `${padLabel('Nombre')}: ${name}`,
      `${padLabel('Teléfono')}: ${phone}`,
      `${padLabel('Email')}: ${email}`,
      `${padLabel('Mensaje')}:`,
      `${message}`,
      '',
      'Metadatos:',
      `${padLabel('IP')}: ${ip}`,
      `${padLabel('User-Agent')}: ${userAgent}`,
      `${padLabel('Fecha')}: ${date}`,
    ].join('\n');

    const preheader = 'Nuevo mensaje del formulario de contacto';
    const safe = {
      preheader: he.encode(preheader),
      name: he.encode(String(name)),
      phone: he.encode(String(phone)),
      email: he.encode(String(email)),
      message: he.encode(String(message)),
      ip: he.encode(String(ip)),
      userAgent: he.encode(String(userAgent)),
      date: he.encode(date),
    };
    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; line-height:1.5; color:#111;">
        <!-- Preheader -->
        <div style="display:none;max-height:0;overflow:hidden;color:transparent;opacity:0;">
          ${safe.preheader}
        </div>

        <h1 style="margin:0 0 12px;font-size:18px;">Nuevo mensaje del formulario de contacto</h1>
        <p style="margin:0 0 16px;">Has recibido un nuevo mensaje desde la web.</p>

        <table role="presentation" style="border-collapse:collapse; width:100%; max-width:640px; margin-top:8px;">
          <thead>
            <tr>
              <th style="text-align:left; padding:10px 8px; width:140px; font-weight:700; border-bottom:1px solid #e5e7eb; background:#fafafa;">Campo</th>
              <th style="text-align:left; padding:10px 8px; font-weight:700; border-bottom:1px solid #e5e7eb; background:#fafafa;">Detalle</th>
            </tr>
            </thead>

            <tbody>
              <tr>
                <td style="padding:10px 8px; font-weight:600; vertical-align:top; border-bottom:1px solid #f3f4f6;">Nombre</td>
                <td style="padding:10px 8px; border-bottom:1px solid #f3f4f6;">${safe.name}</td>
              </tr>
              <tr>
                <td style="padding:10px 8px; font-weight:600; vertical-align:top; border-bottom:1px solid #f3f4f6;">Teléfono</td>
                <td style="padding:10px 8px; border-bottom:1px solid #f3f4f6;">${safe.phone}</td>
              </tr>
              <tr>
                <td style="padding:10px 8px; font-weight:600; vertical-align:top; border-bottom:1px solid #f3f4f6;">Email</td>
                <td style="padding:10px 8px; border-bottom:1px solid #f3f4f6;">${safe.email}</td>
              </tr>
              <tr>
                <td style="padding:10px 8px; font-weight:600; vertical-align:top;">Mensaje</td>
                <td style="padding:10px 8px; white-space:pre-wrap;">${safe.message}</td>
              </tr>
            </tbody>
        </table>

        <hr style="border:none; border-top:1px solid #e5e7eb; margin:16px 0;" />

        <p style="margin:0 0 4px; font-size:12px; color:#555;">Metadatos</p>
        <p style="margin:0; font-size:12px; color:#555;">
          IP: ${safe.ip} · User-Agent: ${safe.userAgent} · Fecha: ${safe.date}
        </p>

        <p style="margin:24px 0 0; color:#555;">Un saludo,<br>Raúl Quintana</p>
      </div>`;

    const replyTo = email;
    const headers = { 'X-Source': 'contact-form' };

    return this.#transporter.sendMail({ from, to, subject, text, html, replyTo, headers });
  };
}

export default EmailService;