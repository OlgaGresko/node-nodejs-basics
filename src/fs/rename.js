import fs, { access } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const rename = async () => {
  const oldFileName = 'wrongFileName.txt';
  const newFileName = 'properFilename.md';

  const folderName = 'files';
  const pathToFile = fileURLToPath(import.meta.url);
  const dirName = dirname(pathToFile);
  const filePath = resolve(dirName, folderName);

  const oldFileNamePath = resolve(filePath, oldFileName);
  const newFileNamePath = resolve(filePath, newFileName);

  const errorMessage = 'FS operation failed';

  try {
    await access(newFileNamePath);
    throw new Error(errorMessage);
  } catch (error) {
    try {
      await access(oldFileNamePath);
      await fs.rename(oldFileNamePath, newFileNamePath);
    } catch (error) {
      console.error(errorMessage);
    }
  }
};

await rename();
