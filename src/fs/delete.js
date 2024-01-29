import fs, { access } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const remove = async () => {
  const fileName = 'fileToRemove.txt';
  const folderName = 'files';
  const pathToFile = fileURLToPath(import.meta.url);
  const dirName = dirname(pathToFile);
  const filePath = resolve(dirName, folderName, fileName);

  const errorMessage = 'FS operation failed';

  try {
    await access(filePath);
    await fs.unlink(filePath);
  } catch (error) {
    console.error(errorMessage);
  }
};

await remove();
