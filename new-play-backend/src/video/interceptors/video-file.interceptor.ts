import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';

// Fonction pour créer l'intercepteur
export const videoFileInterceptor = FileInterceptor('file', {

  storage: diskStorage({
    destination: './dist/uploads', // Dossier où les fichiers seront stockés
    filename: (req, file, callback) => {
      const filename: string = `${Date.now()}${path.extname(file.originalname)}`;
      callback(null, filename);
    },
  })
});
