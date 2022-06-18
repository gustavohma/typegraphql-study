export default {
  secret: process.env.SECRET_TOKEN ?? 'secret-key',
  expiresIn: process.env.EXPIRES_IN_TOKEN ?? '1h',
};
