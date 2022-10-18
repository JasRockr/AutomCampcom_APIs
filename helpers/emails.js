import nodemailer from 'nodemailer';

// Email de Registro
const emailRegistro = async (datos) => {
  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
      }
  });

  const { nombre, email, token} = datos

  // Enviar Email
  await transport.sendMail({
      from: `${process.env.PROJECT_DOMAIN}`,
      to: email,
      subject: `Confirma tu cuenta de acceso a ${process.env.PROJECT_NAME ?? "PROJECT_NAME"}`,
      text: `Confirmación de cuenta para ${process.env.PROJECT_NAME ?? "PROJECT_NAME"}`,
      html: `
          <p>Hola ${nombre}, comprueba tu cuenta de ${process.env.PROJECT_NAME ?? "PROJECT_NAME"}</p>

          <p>Tu cuenta ya se encuentra creada, solo debes confirmarla haciendo click en el siguiente enlace: 
          <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">Confirmar Cuenta</a> </p>

          <p>${nombre} si no has solicitado crear esta cuenta, puedes ignorar el mensaje</p>
      `
  })
};

// Email de Nuevo Password
const emailOlvidePassword = async (datos) => {
  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
      }
  });

  const { nombre, email, token } = datos

  // Enviar Email
  await transport.sendMail({
      from: `${process.env.PROJECT_DOMAIN}`,
      to: email,
      subject: `Restablece tu Password en ${process.env.PROJECT_NAME ?? "PROJECT_NAME"}`,
      text: `Restablece tu Password en ${process.env.PROJECT_NAME ?? "PROJECT_NAME"}`,
      html: `
          <p>Hola ${nombre}, has solicitado restablecer tu contraseña en ${process.env.PROJECT_NAME ?? "PROJECT_NAME"}</p>

          <p>Haz click en el siguiente enlace para generar un nuevo password: 
          <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/olvide-password/${token}">Reestablecer Password</a> </p>

          <p>Si tu no has solicitado este cambio de contraseña, puedes ignorar el mensaje</p>
      `
  })
};



export {
  emailRegistro,
  emailOlvidePassword
};