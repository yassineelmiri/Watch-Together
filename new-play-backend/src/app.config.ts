export const configuration = () => ({
    database: {
      url: process.env.DATABASE_URL || 'mongodb://127.0.0.1/config',  // Utilisation de la variable d'environnement DATABASE_URL
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'your-secret-key',  // Clé secrète pour JWT
      expiresIn: process.env.JWT_EXPIRES_IN || '3600s',  // Durée d'expiration
    },
  });
  