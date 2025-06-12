export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken();
    const cookieName = user.role === 'Admin' ? 'adminToken' : 'patientToken';
  
    res
      .status(statusCode)
      .cookie(cookieName, token, {
        expires: new Date(
          Date.now() + Number(process.env.COOKIE_EXPIRES) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      })
      .json({
        success: true,
        message,
        user,
        token,
      });
  };
  